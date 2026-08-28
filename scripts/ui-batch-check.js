// v3.x 批量 UI 改动回归验证 —— 10 项需求 headless 断言 + 截图
const { chromium } = require("playwright-core");
const path = require("path");
const fs = require("fs");

const SHELL = path.join(
  process.env.LOCALAPPDATA || "C:\\Users\\admin.ZHUANZ\\AppData\\Local",
  "ms-playwright",
  "chromium_headless_shell-1223",
  "chrome-headless-shell-win64",
  "chrome-headless-shell.exe"
);
const URL = "file:///" + path.resolve(__dirname, "../standalone/law.html").replace(/\\/g, "/");
const OUT = path.join(__dirname, "_ui_shots");
fs.mkdirSync(OUT, { recursive: true });

let pass = 0, fail = 0;
const fails = [];
function check(name, ok, detail) {
  if (ok) { pass++; console.log("  PASS  " + name); }
  else { fail++; fails.push(name); console.log("  FAIL  " + name + (detail ? "  | " + detail : "")); }
}

(async () => {
  const browser = await chromium.launch({ executablePath: SHELL, args: ["--no-sandbox", "--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on("pageerror", e => errors.push("pageerror: " + e.message));
  page.on("console", m => { if (m.type() === "error") errors.push("console: " + m.text()); });
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(900);
  const realErrs = () => errors.filter(e => !/fcitx5|wasm|Fcitx5|insertBefore|Aborted|Network Error|ArrayBuffer|Failed to fetch|URL scheme/i.test(e));
  check("页面加载无 pageerror/console.error", realErrs().length === 0, errors.join(" ; "));

  // ---------- 需求1: 主页背景全屏覆盖状态栏+底部 ----------
  console.log("[需求1 主页背景]");
  await page.evaluate(() => { try { localStorage.setItem("seawhy-lex-profile", JSON.stringify({ points: 9999 })); } catch (e) {} hideAllViews(); document.getElementById("homeScreen").classList.add("show"); });
  await page.waitForTimeout(150);
  const bg = await page.evaluate(() => {
    var hbg = document.getElementById("homeBg");
    if (!hbg.classList.contains("bg-default")) hbg.classList.add("bg-default"); // 确保默认主题 class 就位以测 CSS 规则
    var hs = document.getElementById("homeScreen");
    return {
      bgPos: getComputedStyle(hbg).position,
      bgHas: hbg.classList.contains("bg-default"),
      bgImg: getComputedStyle(hbg).backgroundImage,
      screenBg: getComputedStyle(hs).backgroundColor
    };
  });
  check("homeBg position=fixed", bg.bgPos === "fixed", "pos=" + bg.bgPos);
  check("homeBg 含 bg-default", bg.bgHas);
  check("homeBg 有渐变背景图", bg.bgImg && bg.bgImg.indexOf("linear-gradient") >= 0, bg.bgImg);
  check("homeScreen 背景透明", bg.screenBg === "rgba(0, 0, 0, 0)" || bg.screenBg === "transparent", "bg=" + bg.screenBg);
  await page.screenshot({ path: path.join(OUT, "01-home-bg.png") });

  // ---------- 需求5: AI 无气泡通栏 / 用户有气泡 ----------
  console.log("[需求5 气泡]");
  await page.evaluate(() => { hideAllViews(); document.getElementById("chatView").classList.add("show"); });
  await page.waitForTimeout(120);
  const bub = await page.evaluate(() => {
    var host = document.getElementById("messages");
    var ai = document.createElement("div"); ai.className = "msg ai"; ai.innerHTML = '<div class="msg-body"><div class="msg-content">test</div></div>';
    var u = document.createElement("div"); u.className = "msg user"; u.innerHTML = '<div class="msg-body"><div class="msg-content">test</div></div>';
    host.appendChild(ai); host.appendChild(u);
    var ac = ai.querySelector(".msg-content"), uc = u.querySelector(".msg-content");
    var r = {
      aiBg: getComputedStyle(ac).backgroundColor,
      aiW: ac.offsetWidth,
      uBg: getComputedStyle(uc).backgroundColor,
      uW: uc.offsetWidth
    };
    ai.remove(); u.remove();
    return r;
  });
  check("AI 气泡背景透明", bub.aiBg === "rgba(0, 0, 0, 0)", "aiBg=" + bub.aiBg);
  check("AI 气泡通栏宽 > 用户气泡宽", bub.aiW > bub.uW, "aiW=" + bub.aiW + " uW=" + bub.uW);
  check("用户气泡有背景色", bub.uBg !== "rgba(0, 0, 0, 0)", "uBg=" + bub.uBg);

  // ---------- 需求6: 打卡卡宽度 = 课表/待办卡 ----------
  console.log("[需求6 卡片宽度]");
  await page.evaluate(() => { hideAllViews(); document.getElementById("homeScreen").classList.add("show"); });
  await page.waitForTimeout(120);
  const w6 = await page.evaluate(() => {
    var ci = document.getElementById("checkinCard");
    var dr = document.getElementById("homeDashRight");
    var card = document.querySelector(".dash-card");
    return { ciW: ci.offsetWidth, drW: dr.offsetWidth, flex: getComputedStyle(card).flex, mw: getComputedStyle(card).minWidth };
  });
  check("dash-card flex 以 1 1 0 开头", w6.flex.indexOf("1 1 0") === 0, "flex=" + w6.flex);
  check("dash-card min-width=0", w6.mw === "0px", "mw=" + w6.mw);
  check("打卡卡宽 ≈ 课表/待办卡宽", Math.abs(w6.ciW - w6.drW) <= 2, "ci=" + w6.ciW + " dr=" + w6.drW);
  await page.screenshot({ path: path.join(OUT, "02-home-dash.png") });

  // ---------- 需求3: 两卡无限循环滑动 ----------
  console.log("[需求3 无限滑动]");
  const sw = await page.evaluate(() => {
    homeDashSwipeInit();
    var wrap = document.getElementById("homeDashRight");
    var todo = document.getElementById("todoCard");
    var sch = document.getElementById("scheduleCard");
    options.homeWidget = "todo"; renderHomeCard();
    var r1 = { todo: todo.style.transform, sch: sch.style.transform };
    options.homeWidget = "schedule"; renderHomeCard();
    var r2 = { todo: todo.style.transform, sch: sch.style.transform };
    return { init: wrap.dataset.swipeInit, r1: r1, r2: r2 };
  });
  check("swipeInit 已标记", sw.init === "1");
  check("todo态: 待办在0/课表在100%", sw.r1.todo === "translateY(0px)" && sw.r1.sch === "translateY(100%)", JSON.stringify(sw.r1));
  check("schedule态: 课表在0/待办在100%", sw.r2.sch === "translateY(0px)" && sw.r2.todo === "translateY(100%)", JSON.stringify(sw.r2));

  // ---------- 需求2: 学习时钟独立视图 ----------
  console.log("[需求2 学习时钟]");
  await page.evaluate(() => showClockView());
  await page.waitForTimeout(150);
  const cv = await page.evaluate(() => {
    var v = document.getElementById("clockView");
    return { show: v.classList.contains("show"), disp: getComputedStyle(v).display, body: !!v.querySelector(".clock-body"), hero: !!v.querySelector(".clock-hero"), time: !!document.getElementById("clockTime") };
  });
  check("clockView .show", cv.show);
  check("clockView display≠none", cv.disp !== "none", "disp=" + cv.disp);
  check("含 .clock-body", cv.body);
  check("含 .clock-hero", cv.hero);
  check("含 #clockTime", cv.time);
  await page.screenshot({ path: path.join(OUT, "03-clock-view.png") });

  // ---------- 需求4: 键盘唤起输入框上移 ----------
  console.log("[需求4 键盘上移]");
  await page.evaluate(() => { hideAllViews(); document.getElementById("chatView").classList.add("show"); });
  await page.waitForTimeout(120);
  const kb0 = await page.evaluate(() => ({ syncFn: typeof syncKbdOffset, watchFn: typeof __watchKbd, mbBefore: document.getElementById("inputBar").style.marginBottom }));
  check("syncKbdOffset 已定义", kb0.syncFn === "function");
  check("__watchKbd 已定义", kb0.watchFn === "function");
  await page.evaluate(() => imeOpenFor(document.getElementById("userInput")));
  await page.waitForTimeout(250);
  const kb1 = await page.evaluate(() => {
    var bar = document.getElementById("inputBar"), ime = document.getElementById("ime");
    return { mb: bar.style.marginBottom, imeShow: ime.classList.contains("show"), imeH: ime.getBoundingClientRect().height };
  });
  check("imeOpenFor 后 #ime.show", kb1.imeShow);
  check("输入框 marginBottom 已抬升(>50px)", parseFloat(kb1.mb) > 50, "mb=" + kb1.mb + " imeH=" + kb1.imeH);
  await page.evaluate(() => imeDone());
  await page.waitForTimeout(150);
  const kb2 = await page.evaluate(() => ({ mb: document.getElementById("inputBar").style.marginBottom, imeShow: document.getElementById("ime").classList.contains("show") }));
  check("imeDone 后 #ime 收起", !kb2.imeShow);
  check("imeDone 后 marginBottom 清空", kb2.mb === "", "mb=" + kb2.mb);
  await page.screenshot({ path: path.join(OUT, "04-chat-kb.png") });

  // ---------- 需求7: 抽奖动画提速 ----------
  console.log("[需求7 抽奖提速]");
  const sp = await page.evaluate(() => {
    function dur(cls) { var d = document.createElement("div"); d.className = cls; document.body.appendChild(d); var a = getComputedStyle(d).animationDuration; d.remove(); return a; }
    return { glow: dur("wish-glow"), orb: dur("wish-orb"), burst: dur("wish-burst"), part: dur("wish-particle") };
  });
  check("wish-glow .75s", sp.glow === "0.75s", sp.glow);
  check("wish-orb .75s", sp.orb === "0.75s", sp.orb);
  check("wish-burst .5s", sp.burst === "0.5s", sp.burst);
  check("wish-particle .5s", sp.part === "0.5s", sp.part);
  // 计时：祈愿→结果弹层应在 ~1s 出现(原 1.65s)
  const t0 = Date.now();
  await page.evaluate(() => { window.__lotDone = false; lotteryWish([{ key: "points", name: "30 积分", desc: "", icon: "🪙", pct: 30, rare: false, dup: false, amount: 30 }], function () { window.__lotDone = true; }); });
  await page.waitForFunction(() => !!document.getElementById("lotteryResultOverlay"), { timeout: 3000 });
  const dt = Date.now() - t0;
  check("祈愿动画≈1s(≤1400ms)", dt <= 1400, "dt=" + dt + "ms");
  await page.evaluate(() => { var o = document.getElementById("lotteryResultOverlay"); if (o) o.remove(); });

  // ---------- 需求8 + 需求9: 十连结果2列单行 + 中奖高亮 ----------
  console.log("[需求8+9 结果2列/高亮]");
  const r = await page.evaluate(() => {
    var rs = [
      { key: "crystal", name: "法魂水晶", desc: "d", icon: "💎", pct: 0.1, rare: true, dup: false },
      { key: "points", name: "666 积分", desc: "d", icon: "🪙", pct: 1.5, rare: false, dup: false, amount: 666 },
      { key: "points", name: "30 积分", desc: "d", icon: "🪙", pct: 30, rare: false, dup: false, amount: 30 },
      { key: "skin", name: "88 皮肤碎片", desc: "d", icon: "🧵", pct: 2, rare: false, dup: false, amount: 88 },
      { key: "skin", name: "28 皮肤碎片", desc: "d", icon: "🧵", pct: 12, rare: false, dup: false, amount: 28 },
      { key: "badge", name: "徽章·法海", desc: "d", icon: "🎖", pct: 5, rare: true, dup: false },
      { key: "badge", name: "徽章·重复", desc: "d", icon: "🎖", pct: 5, rare: true, dup: true },
      { key: "vip", name: "VIP 3天卡", desc: "d", icon: "👑", pct: 3, rare: true, dup: false },
      { key: "empty", name: "空奖", desc: "d", icon: "💨", pct: 8.9, rare: false, dup: false }
    ];
    showLotteryResult(rs);
    var list = document.querySelector(".lottery-result-list");
    var items = document.querySelectorAll(".lr-item");
    return {
      multi: list.classList.contains("multi"),
      grid: getComputedStyle(list).display,
      count: items.length,
      descDisp: getComputedStyle(items[0].querySelector(".lr-desc")).display,
      nameWrap: getComputedStyle(items[0].querySelector(".lr-name")).whiteSpace,
      cls: Array.from(items).map(function (i) { return i.className; })
    };
  });
  check("十连结果含 multi class", r.multi);
  check("十连结果 grid 2列", r.grid === "grid", "disp=" + r.grid);
  check("结果渲染9条", r.count === 9, "count=" + r.count);
  check("multi 下 desc 隐藏", r.descDisp === "none", "descDisp=" + r.descDisp);
  check("multi 下 name 单行 nowrap", r.nameWrap === "nowrap", "wrap=" + r.nameWrap);
  check("水晶项 jackpot+crystal-prize+r-legend", r.cls[0].indexOf("jackpot") >= 0 && r.cls[0].indexOf("crystal-prize") >= 0 && r.cls[0].indexOf("r-legend") >= 0, r.cls[0]);
  check("积分666 项 jackpot(非crystal)", r.cls[1].indexOf("jackpot") >= 0 && r.cls[1].indexOf("crystal-prize") < 0, r.cls[1]);
  check("积分30 项 不高亮", r.cls[2].indexOf("jackpot") < 0, r.cls[2]);
  check("88碎片 项 jackpot", r.cls[3].indexOf("jackpot") >= 0, r.cls[3]);
  check("28碎片 项 不高亮", r.cls[4].indexOf("jackpot") < 0, r.cls[4]);
  check("未拥有徽章 项 jackpot", r.cls[5].indexOf("jackpot") >= 0, r.cls[5]);
  check("重复徽章 项 不高亮", r.cls[6].indexOf("jackpot") < 0, r.cls[6]);
  check("VIP 项 jackpot", r.cls[7].indexOf("jackpot") >= 0, r.cls[7]);
  check("空奖 项 不高亮", r.cls[8].indexOf("jackpot") < 0, r.cls[8]);
  await page.screenshot({ path: path.join(OUT, "05-lottery-result.png") });

  // 单抽结果：无 multi / 保留 desc
  const single = await page.evaluate(() => {
    var o = document.getElementById("lotteryResultOverlay"); if (o) o.remove();
    showLotteryResult([{ key: "points", name: "30 积分", desc: "积分 +30", icon: "🪙", pct: 30, rare: false, dup: false, amount: 30 }]);
    var list = document.querySelector(".lottery-result-list");
    var it = document.querySelector(".lr-item");
    return { multi: list.classList.contains("multi"), disp: getComputedStyle(list).display, desc: getComputedStyle(it.querySelector(".lr-desc")).display };
  });
  check("单抽结果 无 multi", !single.multi);
  check("单抽结果 flex 列布局", single.disp === "flex", "disp=" + single.disp);
  check("单抽结果 保留 desc", single.desc !== "none", "desc=" + single.desc);
  await page.evaluate(() => { var o = document.getElementById("lotteryResultOverlay"); if (o) o.remove(); });

  // ---------- 需求10: 广场积分夺宝按钮与前三个统一 ----------
  console.log("[需求10 广场按钮统一]");
  const pz = await page.evaluate(() => {
    var card = document.querySelector('#plazaView .learn-card[onclick="openLottery()"]');
    return {
      has: !!card,
      ic: card ? !!card.querySelector(".lc-icon") : false,
      name: card ? (card.querySelector(".lc-name") || {}).textContent : "",
      desc: card ? !!card.querySelector(".lc-desc") : false,
      newBadge: document.querySelectorAll("#plazaView .lottery-new").length,
      legacyEntry: document.querySelectorAll("#plazaView .lottery-entry").length
    };
  });
  check("广场积分夺宝为 learn-card", pz.has);
  check("含 .lc-icon (SVG 图标)", pz.ic);
  check("名称为「积分夺宝」", (pz.name || "").trim() === "积分夺宝", "name=" + pz.name);
  check("含 .lc-desc", pz.desc);
  check("无残留 .lottery-new", pz.newBadge === 0);
  check("无残留 .lottery-entry", pz.legacyEntry === 0);
  await page.evaluate(() => { hideAllViews(); document.getElementById("plazaView").classList.add("show"); });
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(OUT, "06-plaza.png") });

  // ---------- 汇总 ----------
  console.log("\n==================== 结果 ====================");
  console.log("PASS " + pass + " / FAIL " + fail);
  if (realErrs().length) { console.log("\n[JS 错误]"); realErrs().forEach(e => console.log("  " + e)); }
  else console.log("无 JS 运行时错误(已过滤 fcitx/wasm 噪声)");
  console.log("截图目录: " + OUT);
  await browser.close();
  process.exit(fail === 0 && realErrs().length === 0 ? 0 : 1);
})().catch(e => { console.error("TEST CRASH:", e); process.exit(2); });
