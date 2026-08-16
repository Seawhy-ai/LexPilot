// ============================================================
// 西南民族大学(正方教务 jwglxt)课表 → LexPilot 导入文本 提取脚本
// 用法:在已登录的课表页 (xskbcx_cxXskbcxIndex.html) 按 F12,
//       打开 Console,粘贴本脚本回车。
// 产物:弹出覆盖层,内含 LexPilot 文本导入格式的文本 + 复制/下载按钮;
//       控制台同时输出原始表格转储(排查字段顺序用)。
// 说明:只读取当前页面显示的学期;请先在页面上选好学期再运行。
// ============================================================
(function () {
  "use strict";
  function clean(s) { return String(s || "").replace(/\s+/g, " ").trim(); }
  function stripNBSP(s) { return String(s || "").replace(/ /g, "").trim(); }

  // ---------- 1. 定位课表表格 ----------
  function findTable() {
    var ids = ["kbgridTable_0", "kbgridTable", "timetable", "jzTable", "kbtable"];
    for (var i = 0; i < ids.length; i++) {
      var t = document.getElementById(ids[i]);
      if (t && t.tagName === "TABLE") return t;
    }
    var all = document.querySelectorAll("table");
    for (var j = 0; j < all.length; j++) {
      var h = all[j].innerText || "";
      if (h.indexOf("星期") >= 0 && /第\s*\d+\s*节/.test(h)) return all[j];
    }
    return null;
  }

  // ---------- 2. 周次解析(支持 1-16 周 / 1-16周(单)(双) / 1,3,5 周) ----------
  function parseWeeks(text) {
    var s = String(text || "").replace(/\s+/g, "").replace(/[（]/g, "(").replace(/[）]/g, ")");
    var parity = /\(单\)/.test(s) ? "odd" : (/\(双\)/.test(s) ? "even" : null);
    if (!parity && /单周$/.test(s)) parity = "odd";
    if (!parity && /双周$/.test(s)) parity = "even";
    var segs = s.match(/(\d{1,2})\s*[-~至到]\s*(\d{1,2})|\d{1,2}/g) || [];
    var set = {};
    for (var i = 0; i < segs.length; i++) {
      var m = segs[i].match(/^(\d{1,2})\s*[-~至到]\s*(\d{1,2})$/);
      if (m) { for (var w = parseInt(m[1], 10); w <= parseInt(m[2], 10); w++) set[w] = 1; }
      else set[parseInt(segs[i], 10)] = 1;
    }
    var list = [];
    for (var k in set) if (set[k]) list.push(parseInt(k, 10));
    list.sort(function (a, b) { return a - b; });
    if (parity === "odd") list = list.filter(function (w) { return w % 2 === 1; });
    if (parity === "even") list = list.filter(function (w) { return w % 2 === 0; });
    return list.filter(function (w) { return w >= 1 && w <= 20; });
  }
  function weeksText(list) {
    if (!list || !list.length) return "";
    if (list.length === 1) return "第" + list[0] + "周";
    var cont = true;
    for (var i = 1; i < list.length; i++) if (list[i] !== list[i - 1] + 1) { cont = false; break; }
    if (cont) return "第" + list[0] + "-" + list[list.length - 1] + "周";
    return "第" + list.join(",") + "周";
  }

  // ---------- 3. 单元格解析 ----------
  var WEEKS_LINE = /^第?\s*\d{1,2}(?:\s*[-~至到]\s*\d{1,2}|\s*,\s*\d{1,2})+\s*周.*$|^第?\s*\d{1,2}\s*周.*$/;
  function cellBlocks(cell) {
    var divs = cell.querySelectorAll("div.kbcontent");
    if (divs.length) {
      var arr = [];
      for (var i = 0; i < divs.length; i++) arr.push(divs[i]);
      return arr;
    }
    return [cell];
  }
  function parseCell(cell) {
    // 返回课程数组(一格可能叠多门课)
    var out = [];
    var blocks = cellBlocks(cell);
    for (var b = 0; b < blocks.length; b++) {
      var lines = blocks[b].innerText.split("\n").map(clean).filter(Boolean);
      if (!lines.length) continue;
      var weeks = null;
      for (var i = 0; i < lines.length; i++) {
        var wl = lines[i].match(/(第?\s*\d{1,2}(?:\s*[-~至到]\s*\d{1,2}|\s*[,，、]\s*\d{1,2})*\s*周(?:\s*[（(]单|双[)）])?)/);
        if (wl) { weeks = parseWeeks(wl[1]); lines.splice(i, 1); break; }
      }
      var name = lines.length ? lines[0] : "";
      var loc = lines.length >= 2 ? lines[lines.length - 1] : "";
      var teacher = lines.length >= 3 ? lines.slice(1, -1).join(" ") : "";
      if (!name) continue;
      out.push({ name: name, teacher: teacher, loc: loc, weeks: weeks });
    }
    return out;
  }

  // ---------- 4. 主提取 ----------
  function extract() {
    var table = findTable();
    if (!table) return { error: "找不到课表表格。已尝试 #kbgridTable_0 / #kbgridTable / #timetable 等及含'星期'的表。请确认已打开课表查询页并加载出课表。" };
    var rows = table.rows;
    var headerRow = null, headerIdx = -1;
    for (var r = 0; r < rows.length; r++) {
      if ((rows[r].innerText || "").indexOf("星期") >= 0) { headerRow = rows[r]; headerIdx = r; break; }
    }
    if (!headerRow) return { error: "找不到表头行(应含'星期')。课表可能未加载,请刷新后重试。" };
    var DAY = { "一": 0, "二": 1, "三": 2, "四": 3, "五": 4, "六": 5, "日": 6, "天": 6 };
    var dayCol = {};
    var hcells = headerRow.cells;
    for (var c = 0; c < hcells.length; c++) {
      var ht = clean(hcells[c].innerText);
      var m = ht.match(/星期([一二三四五六日天])/) || ht.match(/周([一二三四五六日天])/) || ht.match(/Week\s*([1-7])/i);
      if (m) {
        var d = m[1] ? DAY[m[1]] : (parseInt(m[2], 10) - 1);
        dayCol[c] = d;
      }
    }
    if (!Object.keys(dayCol).length) {
      for (var c2 = 1; c2 < hcells.length; c2++) dayCol[c2] = c2 - 1;
    }

    var courses = [];
    var rawDump = [];
    var kbcontentSeen = false;
    for (var r2 = headerIdx + 1; r2 < rows.length; r2++) {
      var row = rows[r2];
      var t0 = clean(stripNBSP(row.cells[0] ? row.cells[0].innerText : ""));
      var pm = t0.match(/第?\s*(\d{1,2})\s*节/);
      var period = pm ? parseInt(pm[1], 10) : (r2 - headerIdx);
      var dumpRow = [t0.split("\n")[0]];
      for (var c3 = 0; c3 < row.cells.length; c3++) {
        if (!(c3 in dayCol)) continue;
        var cell = row.cells[c3];
        var cls = cell.className || "";
        var txt = clean(stripNBSP(cell.innerText));
        var isKb = /kbcontent1/i.test(cls);
        if (isKb) kbcontentSeen = true;
        dumpRow.push((isKb ? "[课]" : "") + txt.slice(0, 40));
        if (!isKb && txt.length <= 2) continue;
        var parsed = parseCell(cell);
        var start = period;
        var end = start + (cell.rowSpan || 1) - 1;
        for (var bi = 0; bi < parsed.length; bi++) {
          var co = parsed[bi];
          if (!co.name) continue;
          courses.push({
            day: dayCol[c3], start: start, end: end,
            name: co.name, teacher: co.teacher, loc: co.loc,
            weeks: co.weeks && co.weeks.length ? co.weeks : null
          });
        }
      }
      rawDump.push(dumpRow.join(" | "));
    }
    return { courses: courses, rawDump: rawDump, kbcontentSeen: kbcontentSeen };
  }

  // ---------- 5. 转 LexPilot 文本 ----------
  function toLexText(courses) {
    var DAYTXT = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    var lines = [];
    for (var i = 0; i < courses.length; i++) {
      var co = courses[i];
      var line = "";
      var w = weeksText(co.weeks);
      if (w) line += w + " ";
      line += DAYTXT[co.day] + " 第" + co.start + "-" + co.end + "节";
      var tail = co.name;
      if (co.loc) tail += " " + co.loc;
      if (co.teacher) tail += " " + co.teacher;
      lines.push(line + " " + tail);
    }
    return lines;
  }

  // ---------- 6. 输出 UI ----------
  function showOutput(lines, res) {
    var overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px";
    var box = document.createElement("div");
    box.style.cssText = "background:#fff;color:#111;border-radius:12px;max-width:640px;width:100%;max-height:86vh;display:flex;flex-direction:column;padding:16px;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif";
    box.innerHTML =
      '<div style="font-size:15px;font-weight:700;margin-bottom:4px">已提取 ' + lines.length + ' 门课程</div>' +
      '<div style="font-size:12px;color:#666;margin-bottom:8px">复制下面的文本 → 打开 LexPilot 课表 → 导入课表 → ① 文本导入 → 粘贴 → 追加导入</div>';
    var ta = document.createElement("textarea");
    ta.value = lines.join("\n");
    ta.style.cssText = "flex:1;width:100%;box-sizing:border-box;min-height:200px;font-size:12px;font-family:Consolas,monospace;padding:8px;border:1px solid #ccc;border-radius:8px;resize:none";
    box.appendChild(ta);
    var btns = document.createElement("div");
    btns.style.cssText = "margin-top:10px;display:flex;gap:8px;flex-wrap:wrap";
    var mk = function (label, fn, style) {
      var b = document.createElement("button");
      b.textContent = label;
      b.style.cssText = "padding:8px 14px;border:0;border-radius:8px;font-size:13px;cursor:pointer;font-family:inherit;" + (style || "background:#111;color:#fff");
      b.onclick = fn;
      btns.appendChild(b);
    };
    mk("复制文本", function () { ta.select(); document.execCommand("copy"); alert("已复制"); }, "background:#111;color:#fff");
    mk("下载 .txt", function () {
      var a = document.createElement("a");
      a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(ta.value);
      a.download = "lexpilot-schedule.txt";
      a.click();
    }, "background:#eee;color:#111");
    mk("查看原始转储", function () {
      var d = document.createElement("details");
      d.style.cssText = "font-size:11px;color:#333;margin-top:6px";
      d.innerHTML = "<summary>原始单元格内容(调试用)</summary><pre style='max-height:200px;overflow:auto;white-space:pre-wrap;background:#f6f6f6;padding:8px;border-radius:6px'>" + (res.rawDump.join("\n").replace(/</g, "&lt;")) + "</pre>";
      box.appendChild(d);
      alert("已展开原始转储,见输出框下方");
    }, "background:#eee;color:#111");
    mk("关闭", function () { overlay.remove(); }, "background:#eee;color:#111");
    box.appendChild(btns);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  // ---------- 执行 ----------
  var res = extract();
  if (res.error) {
    console.error("[swun-import]", res.error);
    alert("课表提取失败:\n" + res.error);
    return;
  }
  res.courses.sort(function (a, b) { return a.day - b.day || a.start - b.start; });
  var lines = toLexText(res.courses);
  console.log("[swun-import] 共 " + res.courses.length + " 门课程");
  console.log("[swun-import] 原始转储(供排查字段顺序):\n" + res.rawDump.join("\n"));
  console.log("[swun-import] LexPilot 导入文本:\n" + lines.join("\n"));
  showOutput(lines, res);
})();
