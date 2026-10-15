// ============================================================
// TYPWRITER + LEGAL QUOTES
// ============================================================
// 合并题库扩展（新增题以案例分析题为主，含难度分级）
if (typeof QUIZ_EXTRA_ADD === "object" && QUIZ_EXTRA_ADD) {
  for (var __ek in QUIZ_EXTRA_ADD) {
    if (QUIZ_EXTRA_ADD.hasOwnProperty(__ek)) {
      QUIZ_DATA[__ek] = (QUIZ_DATA[__ek] || []).concat(QUIZ_EXTRA_ADD[__ek]);
    }
  }
}
function getGreeting() {
  var h = new Date().getHours();
  var base;
  if (h >= 5 && h < 9) base = "早上好";
  else if (h >= 9 && h < 12) base = "上午好";
  else if (h >= 12 && h < 14) base = "中午好";
  else if (h >= 14 && h < 18) base = "下午好";
  else if (h >= 18 && h < 23) base = "晚上好";
  else base = "夜深了";
  var who = "法律人";
  try {
    if (options.showNickname) {
      var p = loadProfile();
      if (p && p.nickname && p.nickname.trim()) who = p.nickname.trim();
    }
  } catch(e) {}
  return base + "，" + who;
}
var TYPEWRITER_TEXT = "你好，法律人";
var LEGAL_QUOTES = [
  { "text": "公理之下，正义不朽", "author": "网络" },
  { "text": "法不阿贵，绳不挠曲", "author": "网络" },
  { "text": "法律不能使人人平等，但在法律面前人人平等", "author": "网络" },
  { "text": "为苍天请命，为弱者鸣冤。苦难无声，却震耳欲聋。", "author": "网络" },
  { "text": "我不同意你说的每一句话，但我誓死捍卫你说话的权利", "author": "网络" },
  { "text": "我将用毕生捍卫法律的尊严", "author": "网络" },
  { "text": "我将以律法为枪，正义为膛，击溃这世界腐烂的土壤", "author": "网络" },
  { "text": "什么是法律？是天理是国法是人情。我不相信没有天理的国法，我也不相信没有人情的天理", "author": "网络" },
  { "text": "一个玩笑，如果你不会说给你妈妈和你女儿听，那你也不应该说给你的女同事和女同学听", "author": "网络" },
  { "text": "无罪推定", "author": "网络" },
  { "text": "法者天下之公器也，变者天下之公理也。", "author": "网络" },
  { "text": "没有被听见不是沉默的理由", "author": "网络" },
  { "text": "当每一个问题只有一个答案，答案的正确性总是可疑的", "author": "网络" },
  { "text": "挥法律之利剑，持正义之天平，除人间之邪恶，守正法治圣洁，积人文之底蕴，昌世界之文明", "author": "网络" },
  { "text": "法律的生命不在于逻辑，而在于经验。", "author": "霍姆斯" },
  { "text": "法律需要被信仰，否则它形同虚设。", "author": "伯尔曼" },
  { "text": "正义不仅应当得到实现，而且要以人们看得见的方式实现。", "author": "桑德拉·戴·奥康纳" },
  { "text": "迟来的正义即非正义。", "author": "网络" },
  { "text": "一次不公的裁判比多次不平的举动为祸尤烈。", "author": "培根" },
  { "text": "法不强人所难。", "author": "网络" },
  { "text": "在民主的国家里，法律就是国王；在专制的国家里，国王就是法律。", "author": "马克思" },
  { "text": "自由是做法律所许可的一切事情的权利。", "author": "孟德斯鸠" },
  { "text": "对普通人而言，法无禁止即可为；对公权力而言，法无授权即禁止。", "author": "网络" },
  { "text": "法无明文规定不为罪，法无明文规定不处罚。", "author": "网络" },
  { "text": "为权利而斗争是权利人对自己的义务。", "author": "耶林" },
  { "text": "权利不会永远等在原地。真正珍视权利的人，也要主动维护它。", "author": "网络" },
  { "text": "程序是法治和恣意而治的分水岭。", "author": "网络" },
  { "text": "我们办的不是案子，是别人的人生。", "author": "网络" },
  { "text": "法不能向不法让步。", "author": "网络" },
  { "text": "法律是让坏人犯罪的成本更高，而不是让好人出手的代价更高。", "author": "网络" },
  { "text": "律师的使命不是评判对错，而是捍卫权利。", "author": "网络" },
  { "text": "法律的意义，不只在于逻辑自洽，更在于它能回应真实生活中的复杂经验。", "author": "网络" },
  { "text": "法律是成文的道德，道德是内心的法律。", "author": "网络" },
  { "text": "法不阿贵，绳不绕曲。", "author": "韩非子" },
  { "text": "天下之事，不难于立法，而难于法之必行。", "author": "张居正" },
  { "text": "法律就是秩序，有好的法律才有好的秩序。", "author": "亚里士多德" },
  { "text": "刑罚的威慑力不在于刑罚的严酷性，而在于其不可避免性。", "author": "贝卡利亚" }
];

function typeWriter(el, text, speed, callback) {
  var i = 0;
  el.innerHTML = '<span class="cursor"></span>';
  var cursor = el.querySelector(".cursor");
  function type() {
    if (i < text.length) {
      var span = document.createElement("span");
      span.textContent = text.charAt(i);
      // 页面切换导致光标脱离容器时终止动画，避免 insertBefore 报错
      if (!cursor || cursor.parentNode !== el) { if (callback) callback(); return; }
      el.insertBefore(span, cursor);
      i++;
      setTimeout(type, speed + Math.random() * 60);
    } else {
      if (cursor) cursor.remove();
      if (callback) callback();
    }
  }
  setTimeout(type, 300);
}

var _lastQuoteIndex = -1;
var _quoteRotationTimer = null;
var QUOTE_ROTATION_MS = 5000;

function showRandomQuote() {
  var available = LEGAL_QUOTES.length;
  var nextIndex = Math.floor(Math.random() * available);
  if (available > 1) {
    while (nextIndex === _lastQuoteIndex) {
      nextIndex = Math.floor(Math.random() * available);
    }
  }
  _lastQuoteIndex = nextIndex;

  var q = LEGAL_QUOTES[nextIndex];
  var textEl = document.getElementById("quoteText");
  var authorEl = document.getElementById("quoteAuthor");
  var card = document.getElementById("quoteCard");
  if (card) card.style.opacity = "0";
  setTimeout(function() {
    if (textEl) textEl.textContent = "「" + q.text + "」";
    if (authorEl) authorEl.textContent = "—— " + q.author;
    if (card) card.style.opacity = "1";
  }, 300);
}

function startQuoteRotation() {
  if (_quoteRotationTimer || !options.quoteAuto) return;
  _quoteRotationTimer = setInterval(function() {
    showRandomQuote();
  }, QUOTE_ROTATION_MS);
}

function stopQuoteRotation() {
  if (_quoteRotationTimer) {
    clearInterval(_quoteRotationTimer);
    _quoteRotationTimer = null;
  }
}

function applyQuoteAutoState() {
  var sBtn = document.getElementById("sQuoteAuto");
  var pBtn = document.getElementById("settingsQuoteAutoState");
  if (sBtn) {
    sBtn.textContent = options.quoteAuto ? "开启" : "关闭";
    sBtn.classList.toggle("active", options.quoteAuto);
  }
  if (pBtn) {
    pBtn.classList.toggle("on", options.quoteAuto);
  }
  if (options.quoteAuto) {
    startQuoteRotation();
  } else {
    stopQuoteRotation();
  }
}

function toggleQuoteAuto() {
  options.quoteAuto = !options.quoteAuto;
  try { localStorage.setItem("seawhy-lex-opts", JSON.stringify(options)); } catch(e) {}
  applyQuoteAutoState();
  showToast(options.quoteAuto ? "名言自动轮播已开启" : "名言自动轮播已关闭");
}

function applyNicknameState() {
  var btn = document.getElementById("settingsNicknameState");
  if (btn) btn.classList.toggle("on", options.showNickname);
}

function toggleShowNickname() {
  options.showNickname = !options.showNickname;
  try { localStorage.setItem("seawhy-lex-opts", JSON.stringify(options)); } catch(e) {}
  applyNicknameState();
  showToast(options.showNickname ? "主页欢迎语将显示昵称" : "主页欢迎语不显示昵称");
}

// ===== AI 咨询聊天气泡样式 =====
var BUBBLE_STYLES = ["classic", "law", "mint", "sunset", "aurora", "ocean"];
function applyBubbleStyle() {
  var val = options.bubbleStyle || "classic";
  if (BUBBLE_STYLES.indexOf(val) < 0) val = "classic";
  if (document.body) {
    for (var i = 0; i < BUBBLE_STYLES.length; i++) document.body.classList.remove("bubble-" + BUBBLE_STYLES[i]);
    document.body.classList.add("bubble-" + val);
  }
  var sws = document.querySelectorAll("#bubbleSwatches .bubble-swatch");
  for (var j = 0; j < sws.length; j++) sws[j].classList.toggle("on", sws[j].className.indexOf("s-" + val) >= 0);
}
function selectBubbleStyle(key) {
  options.bubbleStyle = key;
  try { localStorage.setItem("seawhy-lex-opts", JSON.stringify(options)); } catch(e) {}
  applyBubbleStyle();
  showToast("气泡样式已切换");
}

// ===== 主页动态背景 =====
var HOME_BGS = [
  { key: "default", name: "简约白", desc: "经典渐变" },
  { key: "aurora", name: "极光", desc: "流动光晕" },
  { key: "starry", name: "星空", desc: "闪烁星辰" },
  { key: "ocean", name: "海洋", desc: "波纹光影" },
  { key: "forest", name: "森林", desc: "绿意流光" },
  { key: "sunset", name: "日落", desc: "暖霞余晖" }
];
function applyHomeBg() {
  var val = options.homeBg || "default";
  if (document.body) document.body.classList.toggle("bg-on", val !== "default");
  // 同时驱动首页背景层(主页内)与全局背景层(全页面固定)
  var bg = document.getElementById("homeBg");
  var gb = document.getElementById("globalBg");
  var els = [];
  if (bg) els.push(bg);
  if (gb) els.push(gb);
  if (!els.length) return;
  for (var e = 0; e < els.length; e++) {
    var el = els[e];
    el.className = "home-bg bg-" + val;
    var h = "";
    if (val === "aurora" || val === "forest" || val === "sunset") {
      h = '<div class="bg-layer"></div><div class="bg-layer"></div><div class="bg-layer"></div>';
    } else if (val === "ocean") {
      h = '<div class="wave"></div><div class="wave"></div>';
    } else if (val === "starry") {
      for (var i = 0; i < 55; i++) {
        var x = Math.random() * 100, y = Math.random() * 100, s = (Math.random() * 2.2 + 0.8).toFixed(1), d = (Math.random() * 3).toFixed(2);
        var big = Math.random() > 0.82 ? " big" : "";
        h += '<div class="star' + big + '" style="left:' + x + '%;top:' + y + '%;width:' + s + 'px;height:' + s + 'px;animation-delay:' + d + 's"></div>';
      }
      for (var si = 0; si < 3; si++) {
        var sx = Math.random() * 90 + 5, sy = Math.random() * 40 + 5, sd = (Math.random() * 5).toFixed(1);
        h += '<div class="shooting" style="left:' + sx + '%;top:' + sy + '%;animation-delay:' + sd + 's"></div>';
      }
    }
    el.innerHTML = h;
  }
}
function getOwnedBgs() {
  var p = loadProfile();
  return p.bgOwned || [];
}
function ownBg(key) {
  var p = loadProfile();
  if (!p.bgOwned) p.bgOwned = [];
  if (p.bgOwned.indexOf(key) < 0) p.bgOwned.push(key);
  saveProfile(p);
}
function openHomeBgPicker() {
  var overlay = document.createElement("div");
  overlay.id = "homeBgOverlay";
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:600;display:flex;align-items:center;justify-content:center;padding:16px";
  var box = document.createElement("div");
  box.style.cssText = "position:relative;background:var(--card-bg);border-radius:18px;padding:18px;max-width:320px;width:100%";
  var owned = getOwnedBgs();
  var p = loadProfile();
  var h = '<button class="modal-close" onclick="document.getElementById(\'homeBgOverlay\').remove()">✕</button>' +
    '<p style="font-size:16px;font-weight:700;color:var(--text);margin:0 0 4px">主页背景</p>' +
    '<p style="font-size:11px;color:var(--text2);margin:0 0 12px">高级背景 100 积分/个，余额 ' + (p.points || 0) + ' 分</p>';
  for (var i = 0; i < HOME_BGS.length; i++) {
    var b = HOME_BGS[i];
    var cur = (options.homeBg || "default") === b.key;
    var isOwned = b.key === "default" || owned.indexOf(b.key) >= 0;
    var status = cur ? ' ✓ 使用中' : (isOwned ? ' 已拥有' : ' · 100积分');
    h += '<div class="hbg-opt' + (cur ? " on" : "") + '" onclick="selectHomeBg(\'' + b.key + '\')">' +
      '<div class="hbg-swatch bg-' + b.key + '"></div>' +
      '<div><div class="hbg-name">' + b.name + '<span style="font-size:11px;color:var(--accent)">' + status + '</span></div><div class="hbg-desc">' + b.desc + '</div></div>' +
      '</div>';
  }
  box.innerHTML = h;
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}
function selectHomeBg(key) {
  var p = loadProfile();
  var owned = getOwnedBgs();
  if (key !== "default" && owned.indexOf(key) < 0) {
    // 未拥有：需要 100 积分兑换
    if ((p.points || 0) < 100) {
      showToast("积分不足，高级背景需 100 积分");
      return;
    }
    addPoints(-100, "兑换背景");
    ownBg(key);
    showToast("已解锁背景");
  }
  options.homeBg = key;
  try { localStorage.setItem("seawhy-lex-opts", JSON.stringify(options)); } catch(e) {}
  applyHomeBg();
  var ov = document.getElementById("homeBgOverlay");
  if (ov) ov.remove();
  showToast("主页背景已切换");
}

function initWelcome() {
  var el = document.getElementById("typewriter");
  var card = document.getElementById("quoteCard");
  if (card) {
    card.title = "点击切换名言";
    card.addEventListener("click", function() {
      if (card.dataset.busy === "true") return;
      card.dataset.busy = "true";
      card.style.transform = "scale(0.98)";
      setTimeout(function() {
        card.style.transform = "";
        card.dataset.busy = "false";
      }, 180);
      showRandomQuote();
      if (options.quoteAuto) startQuoteRotation();
    });
  }
  applyQuoteAutoState();
  if (el) {
    typeWriter(el, getGreeting(), 120, function() {
      showRandomQuote();
      if (options.quoteAuto) startQuoteRotation();
      _welcomePlayed = true;
    });
  }
}

// ============================================================
// 打卡 + 今日待办
// ============================================================
var CHECKIN_KEY = "seawhy-lex-checkin";
var TODO_KEY = "seawhy-lex-todos";

function todayStr() {
  var d = new Date();
  return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
}

function loadCheckin() {
  try { return JSON.parse(localStorage.getItem(CHECKIN_KEY)) || { days: {}, count: 0 }; }
  catch (e) { return { days: {}, count: 0 }; }
}
function saveCheckin(c) { try { localStorage.setItem(CHECKIN_KEY, JSON.stringify(c)); } catch (e) {} }

function checkinToday() {
  var c = loadCheckin();
  var t = todayStr();
  if (c.days[t]) { showToast("今天已打卡啦"); return; }
  c.days[t] = true;
  c.count = (c.count || 0) + 1;
  c.lastDate = t;
  saveCheckin(c);
  renderCheckin();
  var pts = isVip() ? 5 + Math.floor(Math.random() * 6) : 1 + Math.floor(Math.random() * 3);
  addPoints(pts, "每日打卡");
  showToast("打卡成功 ✔ 累计 " + c.count + " 天");
}

function renderCheckin() {
  var el = document.getElementById("checkinStatus");
  var card = document.getElementById("checkinCard");
  if (!el) return;
  var c = loadCheckin();
  var pre = document.getElementById("checkinPreview");
  if (c.days[todayStr()]) {
    el.textContent = "已打卡 · 累计 " + (c.count || 0) + " 天";
    if (card) card.classList.add("checked");
    if (pre) pre.innerHTML = '<div class="tp-empty">今日已打卡 ✔</div>';
  } else {
    el.textContent = "点我打卡";
    if (card) card.classList.remove("checked");
    if (pre) pre.innerHTML = '<div class="tp-empty">坚持打卡赢积分</div>';
  }
}

function loadTodos() {
  var t = todayStr();
  try {
    var o = JSON.parse(localStorage.getItem(TODO_KEY)) || {};
    if (o.date !== t) return { date: t, items: [] };
    return o;
  } catch (e) { return { date: t, items: [] }; }
}
function saveTodos(o) { try { localStorage.setItem(TODO_KEY, JSON.stringify(o)); } catch (e) {} }

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderTodoStatus() {
  var el = document.getElementById("todoStatus");
  var pre = document.getElementById("todoPreview");
  var o = loadTodos();
  if (el) {
    var pending = 0;
    for (var i = 0; i < o.items.length; i++) if (!o.items[i].done) pending++;
    el.textContent = pending > 0 ? pending + " 项待完成" : (o.items.length ? "已全部完成 ✓" : "暂无待办");
  }
  if (!pre) return;
  if (o.items.length === 0) {
    pre.innerHTML = '<div class="tp-empty">点此添加待办事项</div>';
    return;
  }
  var h = "";
  var shown = 0;
  var cap = o.items.length > 3 ? 2 : 3;
  for (var j = 0; j < o.items.length && shown < cap; j++) {
    var it = o.items[j];
    h += '<div class="tp-item' + (it.done ? ' done' : '') + '">' + (it.done ? '✓ ' : '· ') + escapeHtml(it.text) + '</div>';
    shown++;
  }
  if (o.items.length > 3) h += '<div class="tp-empty">还有 ' + (o.items.length - 2) + ' 项…</div>';
  pre.innerHTML = h;
}

// ===== 主页卡片：今日课表（替代/切换 今日待办） =====
function getUpcomingCoursesToday() {
  var d = loadSchedule();
  var week = d.currentWeek || 1;
  var day = (new Date().getDay() + 6) % 7; // 周一=0
  if (d.showWeekend === false && day > 4) return [];
  var now = new Date();
  var nowMin = now.getHours() * 60 + now.getMinutes();
  var times = getScheduleTimes(d);
  var list = d.courses.filter(function(c) {
    if (c.day !== day) return false;
    if (getCourseWeeks(c).indexOf(week) < 0) return false;
    var p = c.start;
    if (!p || p < 1 || p > times.length) return false;
    var et = times[p - 1][1].split(":");
    var eMin = (+et[0]) * 60 + (+et[1]);
    return eMin > nowMin; // 还没结束的课（进行中或即将开始）
  });
  list.sort(function(a, b) { return (a.start || 1) - (b.start || 1); });
  return list.slice(0, 2);
}

function renderScheduleCard() {
  var stEl = document.getElementById("scheduleStatus");
  var pre = document.getElementById("schedulePreview");
  if (!stEl || !pre) return;
  var d = loadSchedule();
  if (!d.courses.length) {
    stEl.textContent = "今日无课程";
    pre.innerHTML = '<div class="tp-empty">去课表设置导入</div>';
    return;
  }
  var up = getUpcomingCoursesToday();
  if (!up.length) {
    stEl.textContent = "今日无课程";
    pre.innerHTML = '<div class="tp-empty">今天没有课了</div>';
    return;
  }
  stEl.textContent = "接下来 " + up.length + " 节";
  var h = "";
  for (var i = 0; i < up.length; i++) {
    var c = up[i];
    var p = c.start || 1;
    var t = SCHEDULE_TIMES[p - 1];
    var col = SCHEDULE_COLORS[(c.color == null ? 0 : c.color) % SCHEDULE_COLORS.length];
    h += '<div class="tp-item" style="color:' + col + '">· ' + escapeHtml(c.name) + ' <span style="color:var(--text2);margin-left:2px">' + t + '</span></div>';
  }
  pre.innerHTML = h;
}

function renderHomeCard() {
  var cards = [document.getElementById("todoCard"), document.getElementById("scheduleCard")];
  var active = (options.homeWidget || "todo") === "schedule" ? 1 : 0;
  var inactive = 1 - active;
  // 活动卡归位 0，非活动卡默认待在下方(100%)等待向上滑
  if (cards[active]) { cards[active].style.transition = ""; cards[active].style.transform = "translateY(0)"; }
  if (cards[inactive]) { cards[inactive].style.transition = ""; cards[inactive].style.transform = "translateY(100%)"; }
  renderScheduleCard();
}
function toggleHomeWidget() {
  options.homeWidget = (options.homeWidget === "schedule") ? "todo" : "schedule";
  try { localStorage.setItem("seawhy-lex-opts", JSON.stringify(options)); } catch(e) {}
  renderHomeCard();
  showToast(options.homeWidget === "schedule" ? "已切换为今日课表" : "已切换为今日待办");
}

function renderHomeCards() {
  renderCheckin();
  renderTodoStatus();
  renderHomeCard();
}

// 首页「今日待办/今日课表」上下无限循环滑动(pointer 事件,兼容鼠标+触摸)
function homeDashSwipeInit() {
  var wrap = document.getElementById("homeDashRight");
  if (!wrap || wrap.dataset.swipeInit) return;
  wrap.dataset.swipeInit = "1";
  var cards = [document.getElementById("todoCard"), document.getElementById("scheduleCard")];
  var startY = 0, rawDy = 0, dragging = false, moved = false, suppressClick = false;
  var CARD_H = 148, TH = 50, ACT_TH = 8;
  var dragDir = 0; // 1=向下滑(dy>0,下一张从上方进), -1=向上滑(下一张从下方进)

  function activeIdx() { return (options.homeWidget || "todo") === "schedule" ? 1 : 0; }
  function resetTrans() { for (var i = 0; i < cards.length; i++) if (cards[i]) cards[i].style.transition = ""; }
  function waitPos(dir) { return dir > 0 ? -CARD_H : CARD_H; }

  function liveTransform(dy) {
    for (var i = 0; i < cards.length; i++) if (cards[i]) cards[i].style.transition = "none";
    var a = activeIdx(), wp = waitPos(dragDir);
    if (cards[a]) cards[a].style.transform = "translateY(" + dy + "px)";
    if (cards[1-a]) cards[1-a].style.transform = "translateY(" + (wp + dy) + "px)";
  }
  function clampDrag(dy) {
    if (dragDir > 0) { if (dy < 0) dy = dy * 0.3; if (dy > CARD_H) dy = CARD_H + (dy - CARD_H) * 0.3; }
    else { if (dy > 0) dy = dy * 0.3; if (dy < -CARD_H) dy = -CARD_H + (dy + CARD_H) * 0.3; }
    return dy;
  }
  function animateTo(t0, t1, cb) {
    var a = activeIdx();
    if (cards[a]) { cards[a].style.transition = "transform .42s cubic-bezier(.2,.9,.35,1)"; void cards[a].offsetWidth; cards[a].style.transform = "translateY(" + t0 + "px)"; }
    if (cards[1-a]) { cards[1-a].style.transition = "transform .42s cubic-bezier(.2,.9,.35,1)"; void cards[1-a].offsetWidth; cards[1-a].style.transform = "translateY(" + t1 + "px)"; }
    setTimeout(function() { resetTrans(); if (cb) cb(); }, 460);
  }
  function completeSwipe(dir) {
    var a = activeIdx();
    var exit = dir > 0 ? CARD_H : -CARD_H;
    var wp = waitPos(dir);
    animateTo(exit, 0, function() {
      options.homeWidget = (a === 0) ? "schedule" : "todo";
      try { localStorage.setItem("seawhy-lex-opts", JSON.stringify(options)); } catch(e) {}
      var newInactive = 1 - activeIdx();
      if (cards[newInactive]) { cards[newInactive].style.transition = "none"; cards[newInactive].style.transform = "translateY(" + wp + "px)"; void cards[newInactive].offsetWidth; resetTrans(); }
      renderScheduleCard();
    });
  }
  function snapBack() { var wp = waitPos(dragDir); animateTo(0, wp, null); }

  wrap.addEventListener("pointerdown", function(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startY = e.clientY; rawDy = 0; dragging = false; moved = false;
  }, { passive: true });
  wrap.addEventListener("pointermove", function(e) {
    rawDy = e.clientY - startY;
    if (!moved && Math.abs(rawDy) > ACT_TH) {
      moved = true; dragging = true;
      dragDir = rawDy > 0 ? 1 : -1;
      var ia = 1 - activeIdx();
      if (cards[ia]) { cards[ia].style.transition = "none"; cards[ia].style.transform = "translateY(" + waitPos(dragDir) + "px)"; void cards[ia].offsetWidth; }
      try { wrap.setPointerCapture(e.pointerId); } catch(err) {}
      liveTransform(clampDrag(rawDy));
      return;
    }
    if (!dragging) return;
    liveTransform(clampDrag(rawDy));
  }, { passive: true });
  wrap.addEventListener("pointerup", function(e) {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(rawDy) >= TH) {
      suppressClick = true;
      completeSwipe(dragDir);
      setTimeout(function() { suppressClick = false; }, 400);
    } else { snapBack(); }
  }, { passive: true });
  wrap.addEventListener("pointercancel", function() { dragging = false; resetTrans(); renderHomeCard(); }, { passive: true });
  wrap.addEventListener("click", function(e) {
    if (suppressClick) { suppressClick = false; e.stopPropagation(); e.preventDefault(); }
  }, true);
}

function openTodoModal() {
  var o = loadTodos();
  var overlay = document.createElement("div");
  overlay.id = "todoOverlay";
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px";
  var box = document.createElement("div");
  box.style.cssText = "position:relative;background:var(--card-bg);border-radius:20px;padding:20px;max-width:340px;width:100%;max-height:72vh;display:flex;flex-direction:column";
  box.innerHTML =
    '<button class="modal-close" onclick="document.getElementById(\'todoOverlay\').remove()">✕</button>' +
    '<p style="font-size:14px;font-weight:600;margin-bottom:12px;color:var(--text)">今日待办</p>' +
    '<div style="display:flex;gap:8px;margin-bottom:10px;flex-shrink:0">' +
    '<input id="todoInput" placeholder="添加待办事项…" maxlength="50" style="flex:1;padding:10px 12px;border:2px solid var(--card-border);border-radius:12px;background:var(--input-bg);color:var(--text);font-size:14px;outline:none;font-family:inherit" />' +
    '<button id="todoAddBtn" type="button" style="padding:0 16px;border:none;border-radius:12px;background:var(--accent);color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit">添加</button>' +
    '</div>' +
    '<div id="todoList" style="flex:1;overflow-y:auto;"></div>';
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  function addTodo() {
    var input = document.getElementById("todoInput");
    var txt = input ? input.value.trim() : "";
    if (!txt) return;
    var isFirst = o.items.length === 0;
    o.items.push({ text: txt, done: false });
    saveTodos(o);
    if (input) input.value = "";
    renderTodoList(o, box);
    renderTodoStatus();
    if (isFirst) {
      var tb = oneTimeBonus("todo", 5, "首次创建待办");
    }
  }
  var addBtn = document.getElementById("todoAddBtn");
  if (addBtn) addBtn.onclick = addTodo;
  var input = document.getElementById("todoInput");
  if (input) input.onkeydown = function(e) { if (e.key === "Enter") addTodo(); };

  renderTodoList(o, box);
}

function renderTodoList(o, box) {
  var list = document.getElementById("todoList");
  if (!list) return;
  if (!o.items.length) {
    list.innerHTML = '<p style="text-align:center;color:var(--text2);font-size:12px;padding:18px 0">还没有待办，添加一个吧</p>';
    return;
  }
  var h = "";
  for (var i = 0; i < o.items.length; i++) {
    var it = o.items[i];
    h += '<div style="display:flex;align-items:center;gap:8px;padding:10px 2px;border-bottom:1px solid var(--card-border)">' +
      '<button type="button" class="todo-toggle" data-idx="' + i + '" style="width:22px;height:22px;border-radius:50%;border:2px solid ' + (it.done ? 'var(--accent)' : 'var(--card-border)') + ';background:' + (it.done ? 'var(--accent)' : 'transparent') + ';cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;line-height:1">' + (it.done ? '✓' : '') + '</button>' +
      '<span style="flex:1;font-size:13px;color:var(--text);' + (it.done ? 'text-decoration:line-through;opacity:.5' : '') + '">' + escapeHtml(it.text) + '</span>' +
      '<button type="button" class="todo-del" data-idx="' + i + '" style="border:none;background:none;color:var(--text2);cursor:pointer;font-size:16px;flex-shrink:0;padding:2px 6px;font-family:inherit">✕</button>' +
      '</div>';
  }
  list.innerHTML = h;
  var toggles = list.querySelectorAll(".todo-toggle");
  for (var t = 0; t < toggles.length; t++) {
    toggles[t].onclick = function() {
      var idx = parseInt(this.getAttribute("data-idx"), 10);
      var wasDone = o.items[idx].done;
      o.items[idx].done = !o.items[idx].done;
      saveTodos(o);
      renderTodoList(o, box);
      renderTodoStatus();
      // 完成待办：普通+1 VIP+2（每日限3次）
      if (!wasDone && o.items[idx].done && dailyCount("todo") < 3) {
        dailyInc("todo");
        awardPoints(vipRate(1), "完成任务");
      }
    };
  }
  var dels = list.querySelectorAll(".todo-del");
  for (var d = 0; d < dels.length; d++) {
    dels[d].onclick = function() {
      var idx = parseInt(this.getAttribute("data-idx"), 10);
      o.items.splice(idx, 1);
      saveTodos(o);
      renderTodoList(o, box);
      renderTodoStatus();
    };
  }
}

if (document.visibilityState !== 'hidden') {
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      stopQuoteRotation();
    } else if (options.quoteAuto) {
      startQuoteRotation();
    }
  });
}

// Run on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWelcome);
} else {
  initWelcome();
}
// ============================================================
// ACCOUNT SYSTEM
// ============================================================
var ACCOUNT_KEY = "seawhy-lex-account";
var currentUser = null;

function loadAccount() {
  try { return JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "null"); } catch(e) { return null; }
}
function saveAccount(acc) {
  try { localStorage.setItem(ACCOUNT_KEY, JSON.stringify(acc)); } catch(e) {}
}

// Simple password hash using available API
function hashPassword(pw) {
  var hash = 0;
  for (var i = 0; i < pw.length; i++) {
    var ch = pw.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash |= 0;
  }
  // Add salt
  var salt = "seawhy-lex-salt-2026";
  var combined = pw + salt;
  var hash2 = 0;
  for (var i = 0; i < combined.length; i++) {
    hash2 = ((hash2 << 5) - hash2) + combined.charCodeAt(i);
    hash2 |= 0;
  }
  return Math.abs(hash).toString(36) + "." + Math.abs(hash2).toString(36);
}

function checkLoginState() {
  var acc = loadAccount();
  if (acc && acc.username) {
    currentUser = acc.username;
    return true;
  }
  return false;
}

function showLoginScreen() {
  ["homeScreen","chatView","dbView","aboutView","settingsView","quizView","docView","caseView","caseDetail","learnCenterView","materialsView","notebookView","plazaView","lotteryView","noteDetailView","profileView","pointsView","scheduleView","scheduleSettingsView","scheduleAppearanceView","videoView"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) { el.classList.remove("show"); el.style.display = "none"; }
  });
  document.getElementById("loginScreen").classList.add("show");
  document.getElementById("loginScreen").style.display = "";
}

function goHomeAfterLogin() {
  document.getElementById("loginScreen").classList.remove("show");
  document.getElementById("loginScreen").style.display = "none";
  var home = document.getElementById("homeScreen");
  home.style.display = "";
  home.classList.add("show");
  applyHomeBg();
  renderHomeCards();
  renderHomeAvatar();
  updateProfileUI();
  if (!_welcomePlayed) {
    var el = document.getElementById("typewriter");
    if (el) { el.innerHTML = ""; initWelcome(); }
  }
  updateProfileUI();
}

function doLogin() {
  var username = document.getElementById("loginUsername").value.trim();
  var password = document.getElementById("loginPassword").value;
  var msgEl = document.getElementById("loginMsg");
  if (!username) { msgEl.textContent = "请输入用户名"; return; }
  if (!password) { msgEl.textContent = "请输入密码"; return; }

  var stored = loadAccount();
  if (!stored || !stored.username) {
    msgEl.textContent = "账号不存在，请先注册";
    return;
  }
  if (stored.username !== username) {
    msgEl.textContent = "用户名错误";
    return;
  }
  if (stored.passwordHash !== hashPassword(password)) {
    msgEl.textContent = "密码错误";
    return;
  }
  currentUser = username;
  msgEl.textContent = "";
  showToast("欢迎回来，" + username);
  goHomeAfterLogin();
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("loginMsg").textContent = "";
  document.getElementById("regMsg").textContent = "";
}

function showLogin() {
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("regMsg").textContent = "";
}

function doRegister() {
  var username = document.getElementById("regUsername").value.trim();
  var password = document.getElementById("regPassword").value;
  var password2 = document.getElementById("regPassword2").value;
  var msgEl = document.getElementById("regMsg");
  if (!username || username.length < 2) { msgEl.textContent = "用户名至少2个字符"; return; }
  if (!password || password.length < 8) { msgEl.textContent = "密码至少8个字符"; return; }
  if (password !== password2) { msgEl.textContent = "两次密码不一致"; return; }

  var stored = loadAccount();
  if (stored && stored.username) {
    msgEl.textContent = "已有账号，请直接登录";
    return;
  }

  saveAccount({
    username: username,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString()
  });
  currentUser = username;
  msgEl.textContent = "";
  showToast("注册成功！欢迎，" + username);
  goHomeAfterLogin();
}

function skipLogin() {
  currentUser = null;
  goHomeAfterLogin();
}

function logoutAccount() {
  if (confirm("确定要退出登录吗？本机学习数据会保留，下次登录可继续使用。")) {
    currentUser = null;
    try { sessionStorage.removeItem("seawhy-lex-api-key"); } catch(e) {}
    showToast("已退出登录，本机数据已保留");
    location.reload();
  }
}

// ===== CLOUD BACKUP/RESTORE =====
function getAllUserData() {
  var data = {
    username: currentUser,
    version: "2.1.0",
    exportedAt: new Date().toISOString(),
    profile: loadProfile(),
    settings: {},
    notes: loadNotes(),
    points: 0,
    theme: userTheme
  };
  try { data.points = parseInt(localStorage.getItem("ai-points") || "0"); } catch(e) {}
  try {
    var savedSettings = JSON.parse(localStorage.getItem("seawhy-lex-config") || "{}");
    data.settings = { model: savedSettings.model || "deepseek-v4-flash" };
  } catch(e) {}
  try {
    var stats = loadLearnStats();
    data.learnStats = stats;
  } catch(e) {}
  try {
    var msgs = JSON.parse(localStorage.getItem("seawhy-lex-msgs") || "[]");
    if (msgs.length > 50) msgs = msgs.slice(-50);
    data.recentChats = msgs;
  } catch(e) {}
  return data;
}

function restoreAllUserData(data) {
  if (!data || !data.username) return false;
  try {
    if (data.profile) saveProfile(data.profile);
    if (data.settings && data.settings.model) localStorage.setItem("seawhy-lex-config", JSON.stringify({model:data.settings.model}));
    if (data.notes) saveNotes(data.notes);
    if (data.points) localStorage.setItem("ai-points", String(data.points));
    if (data.learnStats) {
      localStorage.setItem("seawhy-lex-learn-stats", JSON.stringify(data.learnStats));
    }
    return true;
  } catch(e) { return false; }
}

function cloudBackup() {
  var data = getAllUserData();
  var json = JSON.stringify(data, null, 2);
  // Download file
  var blob = new Blob([json], {type: "application/json"});
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "seawhy-lex-backup-" + new Date().toISOString().slice(0,10) + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  document.getElementById("backupStatus").textContent = "备份文件已下载 · " + new Date().toLocaleTimeString();
  showToast("本地备份已导出");
}

function cloudRestore() {
  document.getElementById("restoreFileInput").click();
}

function handleRestoreFile(input) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      if (restoreAllUserData(data)) {
        updateProfileUI();
        renderNotes();
        document.getElementById("backupStatus").textContent = "数据已恢复 · " + new Date().toLocaleTimeString();
        showToast("数据恢复成功！");
      } else {
        showToast("恢复失败：数据格式错误");
      }
    } catch(err) {
      showToast("恢复失败：文件损坏");
    }
  };
  reader.readAsText(file);
}

// ===== INIT: show login on first visit =====
// 【临时】登录界面已暂时跳过（代码全部保留，恢复时把下面 initApp 换回旧逻辑即可）。
// 不登录也能进主页；本地备份不依赖账号，也不会影响原有账号数据。
function initApp() {
  clockStartLoop(); // 学习时钟秒级心跳(跨页面/刷新续算)
  var acc = loadAccount();
  if (acc && acc.username) {
    currentUser = acc.username; // 有账号就用原账号
  } else {
    currentUser = currentUser || "guest"; // 无账号时用 guest，保证云备份不崩
  }
  var loginEl = document.getElementById("loginScreen");
  if (loginEl) { loginEl.classList.remove("show"); loginEl.style.display = "none"; }
  var home = document.getElementById("homeScreen");
  if (home) {
    home.style.display = "";
    home.classList.add("show");
    applyHomeBg();
    renderHomeCards();
    homeDashSwipeInit(); // 今日待办/课表卡片上下滑动切换
    renderHomeAvatar();
    updateProfileUI();
    initWelcome();
  }
}

// Override initial page load
var _origInit = initWelcome;
initWelcome = function() {
  _origInit();
  updateProfileUI();
};

// Run init on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// 移动端键盘适配：iOS 16.4+ 已支持 viewport meta 的 interactive-widget=resizes-content，
// 键盘弹出时布局视口自动收缩、100dvh 自动跟随，无需再手动改写 body 高度；
// 聚焦时也不用手动 scrollIntoView（iOS 会自动把输入框保持在可视区），
// 手动滚动反而会与系统自动滚动互相覆盖，造成页面上下滑动/下移不复原。
// 这里仅保留「失焦后把文档滚动复位到顶部」的兜底。
(function() {
  if (!window.visualViewport) return;
  var restoreTimer = null;
  function isEditable(el) {
    return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
  }
  document.addEventListener("focusout", function(e) {
    if (!isEditable(e.target)) return;
    clearTimeout(restoreTimer);
    restoreTimer = setTimeout(function() {
      if (!isEditable(document.activeElement) && (window.scrollY !== 0 || window.pageXOffset !== 0)) {
        window.scrollTo(0, 0);
      }
    }, 300);
  });
})();

// 打开任何新界面默认滑到最顶端（聊天保留阅读位置）
(function() {
  if (!window.MutationObserver) return;
  var SELS = ".about-body,.points-body,.video-body,.learn-body,.quiz-body,.db-body,.doc-body,.case-body,.notebook-body,.schedule-scroll,.lr-body,.plaza-body,.lottery-body,.note-detail-body,.screen,.case-detail";
  new MutationObserver(function(muts) {
    for (var i = 0; i < muts.length; i++) {
      if (muts[i].type !== "attributes" || muts[i].attributeName !== "class") continue;
      var el = muts[i].target;
      if (!el.classList || !el.classList.contains("show")) continue;
      if (el.id === "chatView") continue; // 聊天保留位置
      var sc = el.querySelector(SELS);
      if (sc) requestAnimationFrame(function(s) { return function() { s.scrollTop = 0; }; }(sc));
    }
  }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });
})();


// ============================================================
// SeaWhy Lex v2.0 — Full App Logic
// ============================================================

// ----- CONFIG -----
var DEFAULTS = { apiKey: "sk-1a551106191f4489a031787a3b81b533", model: "deepseek-v4-flash" };
var SETTINGS = {};
try { var s = JSON.parse(localStorage.getItem("seawhy-lex-config") || "{}"); SETTINGS = Object.assign({}, DEFAULTS, s); } catch(e) { SETTINGS = Object.assign({}, DEFAULTS); }

var userTheme = "light";
try { userTheme = JSON.parse(localStorage.getItem("seawhy-lex-theme") || '"light"'); } catch(e) {}

var options = { deep: true, multi: false, practical: false, compare: false, quoteAuto: true, showNickname: false, homeBg: "default", bubbleStyle: "classic", homeWidget: "todo", imeEngine: "fcitx", kbdMode: "system" };
try { var o = JSON.parse(localStorage.getItem("seawhy-lex-opts") || "{}"); Object.keys(options).forEach(function(k){ if(k in o) options[k] = o[k]; }); } catch(e) {}
// 【临时】停用内置键盘，强制系统键盘：无论本地是否存过 kbdMode=ime，一律走系统键盘（内置键盘实现保留，稳定后可删本行恢复）
options.kbdMode = "system";
// 立即应用已保存的背景与气泡样式（不等 DOMContentLoaded，避免外部脚本加载慢导致重开后恢复默认）
try { applyHomeBg(); } catch(e) {}
try { applyBubbleStyle(); } catch(e) {}

// ============================================================
// AUTO CHANGELOG — 自动更新日志系统
// ============================================================
var APP_VERSION = "v3.11.0";
var APP_VERSION_DATE = "2026.08.17";
var CHANGELOG_KEY = "seawhy-lex-changelog";

var DEFAULT_CHANGELOG = [
  { ver: "v3.11.0", date: "2026.08.17", notes: "积分夺宝十连抽：五连抽改为十连抽，280 积分（原 130/五连），十连必出其一；祈愿动画标题同步更新" },
  { ver: "v3.10.0", date: "2026.08.17", notes: "皮肤系统升级：皮肤扩充至9套并按档定价（普通88/勇者288/史诗588/传说988碎片，典藏1法魂水晶），新增墨海书童/碧潮卫士/极光律者/天御法尊/星河法皇造型；抽奖改为王者祈愿式动画（光球升腾、星尘上升、爆发放光、卡片翻牌揭晓，不再九宫格滚动）；重复徽章/背景/头像框奖励不再触发大奖闪光" },
  { ver: "v3.9.2", date: "2026.08.17", notes: "虚拟角色登场：新增「法海星旅」虚拟角色，皮肤图鉴顶部实时展示角色形象，佩戴不同皮肤时法袍颜色与饰品（法冕/星灯/波浪/星芒）随之变化" },
  { ver: "v3.9.1", date: "2026.08.17", notes: "积分夺宝体验优化：抽奖扫光动画加速（约2秒缩短至约1秒）；新增大奖闪光表现——抽中个体概率低于1.5%的奖励（法魂水晶/限定徽章/VIP7天与3天卡/666·888·999积分/58·88皮肤碎片等）时，九宫格落地格金芒闪烁、结果弹层绽放金光并高亮该奖品" },
  { ver: "v3.9.0", date: "2026.08.17", notes: "积分夺宝改版：奖池重构（VIP卡3%/答案解析12%/背景头像框5%/积分35%/法魂水晶0.1%保底/题目挑战8%/皮肤碎片18%/限定徽章10%/空奖8.9%）；法魂水晶改为365抽保底分段曲线（概率从空奖压缩）；五连抽改130积分；新增皮肤系统（碎片合成衣服、皮肤图鉴、可佩戴）；新增限定徽章系统（法脉·星海典藏8款，重复徽章转20积分，徽章图鉴）；题目挑战奖励改30/40/50，背景/头像框重复转化改为20/10积分" },
  { ver: "v3.8.0", date: "2026.08.16", notes: "新增广场「积分夺宝」：单抽30积分/五连抽120积分，九宫格扫光抽奖，奖品含VIP卡、法魂水晶、积分、背景/头像框、题目挑战、答案解析时间；幸运值365必中水晶，1水晶兑换永久VIP；题目挑战从题库随机出题答对加积分；新增头像框系统（随机获得、个人中心佩戴）" },
  { ver: "v3.7.1", date: "2026.08.16", notes: "修复：设置页打开白屏（补上 #settingsView 布局样式，.show 才真正生效）" },
  { ver: "v3.7.0", date: "2026.08.16", notes: "设置页重构：新增「设置」页收纳名言自动轮播、欢迎语显示昵称、主页背景、兑换码与「关于我们」，个人中心不再重复；学习时钟改为学习中心小方块卡片（点击展开/收起），倒计时中锁定时长滑块" },
  { ver: "v3.6.0", date: "2026.08.16", notes: "学习时钟移入学习中心（大号数字、专注/休息改滑动选择）；所有图标UI统一为纯色；待办/课表卡片切换改为iOS组件式平滑回弹并修复轻点误滑、点卡片打不开待办的问题；修复考试模式已答题数不变、无法交卷；打卡卡片与今日待办/课表卡片尺寸统一" },
  { ver: "v3.5.0", date: "2026.08.16", notes: "批量优化：输入法加按键触感与左右方向键、符号键改为常用标点；学习时钟独立为首页按钮；主页卡片上下循环滑动（去掉切换按钮）；去掉所有获得积分弹窗；修复多选题取消后仍显示蓝框；考试模式交卷前可更改答案；B站登录检测优化（明确提示/可重试）；修复自定义背景覆盖不到、底部留白；AI咨询改为用户气泡并扣除积分（VIP免费）、AI回复无气泡全宽；课表外观弹窗半透明并去掉实时预览" },
  { ver: "v3.4.1", date: "2026.08.16", notes: "课程表支持教务系统一键导入（hash 桥接）：在教务系统课表页运行 tools/swun-import.js 后可一键跳转并预填导入弹层" },
  { ver: "v3.4.0", date: "2026.08.16", notes: "课程表升级：卡片长度/透明度/圆角移至外观设置（改为半屏弹层）、一次课默认两节、可设一天节数与显示周六日/非本周(幽灵课)/授课教师、修复非白背景下白色格子" },
  { ver: "v3.3.0", date: "2026.08.16", notes: "新增哔哩哔哩登录与视频搜索播放、学习时钟(番茄钟)、首页待办/课表上下滑动切换、输入法升级(iOS式触感、字母键简洁化)" },
  { ver: "v3.2.0", date: "2026.08.16", notes: "课程表升级：课表外观高度自定义（背景/文字/边框/字体/贴纸/深色模式）、多学期管理与节次时间自定义、JSON/分享码导入导出与数据备份" },
  { ver: "v3.1.0", date: "2026.08.09", notes: "新增课程表，支持自定义创建大学课程表" },
  { ver: "v3.0.0", date: "2026.08.08", notes: "新增等级与积分系统，支持完成任务赚积分、积分升级换好礼；VIP权益正式上线；主页欢迎语优化升级" },
  { ver: "v2.5.5", date: "2026.08.05", notes: "新增主界面打卡和每日待办功能" },
  { ver: "v2.5.0", date: "2026.08.03", notes: "学习题库优化升级，支持按章节查询题目" },
  { ver: "v2.4.0", date: "2026.08.01", notes: "主界面名言卡片优化升级，支持自动轮播和手动切换" },
  { ver: "v2.3.7", date: "2026.07.31", notes: "新增笔记本，支持创建学习笔记" },
  { ver: "v2.3.0", date: "2026.07.30", notes: "新增个人中心，支持创建头像与昵称" },
  { ver: "v2.2.0", date: "2026.07.29", notes: "新增注册登录系统，支持云备份恢复" },
  { ver: "v2.1.0", date: "2026.07.27", notes: "新增主界面名言卡片，备忘录优化升级" },
  { ver: "v2.0.0", date: "2026.07.25", notes: "品牌升级为SeaWhy Lex，全新UI设计，全新主界面，学习题库升级为学习中心" },
  { ver: "v1.3.1", date: "2026.06.28", notes: "修复已知问题、提高系统稳定性" },
  { ver: "v1.3.0", date: "2026.06.26", notes: "题库科目题量升级，新增错题本" },
  { ver: "v1.2.7", date: "2026.06.24", notes: "AI咨询优化升级" },
  { ver: "v1.2.4", date: "2026.06.23", notes: "法律文书生成优化升级" },
  { ver: "v1.2.0", date: "2026.06.21", notes: "新增案例数据库，学习题库" },
  { ver: "v1.1.0", date: "2026.06.20", notes: "新增法律文书生成、界面UI美化升级" },
  { ver: "v1.0.5", date: "2026.06.17", notes: "新增法律数据库" },
  { ver: "v1.0.0", date: "2026.06.15", notes: "SeaWhy Lex（原LexPilot）正式上线，支持AI咨询功能" }
];

function loadChangelog() {
  try {
    var saved = JSON.parse(localStorage.getItem(CHANGELOG_KEY) || "null");
    if (Array.isArray(saved) && saved.length > 0 && saved[0].ver === DEFAULT_CHANGELOG[0].ver) return saved;
  } catch(e) {}
  try { localStorage.setItem(CHANGELOG_KEY, JSON.stringify(DEFAULT_CHANGELOG)); } catch(e) {}
  return DEFAULT_CHANGELOG.slice();
}

function saveChangelog(log) {
  try { localStorage.setItem(CHANGELOG_KEY, JSON.stringify(log)); } catch(e) {}
}

function autoCheckVersion() {
  var log = loadChangelog();
  var latestVer = (log.length > 0) ? log[0].ver : "";
  if (latestVer !== APP_VERSION) {
    // Look for notes in DEFAULT_CHANGELOG
    var notes = "";
    for (var i = 0; i < DEFAULT_CHANGELOG.length; i++) {
      if (DEFAULT_CHANGELOG[i].ver === APP_VERSION) {
        notes = DEFAULT_CHANGELOG[i].notes;
        break;
      }
    }
    var entry = { ver: APP_VERSION, date: APP_VERSION_DATE, notes: notes };
    log.unshift(entry);
    saveChangelog(log);
  }
  return log;
}

function renderChangelog() {
  var log = loadChangelog();
  var el = document.getElementById("changelogContent");
  if (!el) return;
  var html = "";
  for (var i = 0; i < log.length; i++) {
    var entry = log[i];
    html += "<strong>" + entry.ver + "</strong> (" + entry.date + ")";
    if (entry.notes) html += " · " + entry.notes;
    if (i < log.length - 1) html += "<br>";
  }
  el.innerHTML = html;
}

autoCheckVersion();

// ============================================================
// PROFILE
// ============================================================
var PROFILE_KEY = "seawhy-lex-profile";
var AVATARS = ["👤","🐋","⚖️","📚","🎓","💼","🏛️","🦉","🌟","🔥","💎","🦊","🐱","🐼","🦁"];

function loadProfile() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}"); } catch(e) { return {}; }
}
function saveProfile(p) {
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch(e) {}
}

function updateProfileUI() {
  var p = ensureProfileId(loadProfile());
  var avatarEl = document.getElementById("profileAvatar");
  var nameEl = document.getElementById("profileName");
  var ptsEl = document.getElementById("profilePoints");
  var daysEl = document.getElementById("profileStudyDays");
  var notesEl = document.getElementById("profileNotes");
  var nickInput = document.getElementById("profileNicknameInput");

  if (avatarEl) {
    if (p.avatarType === "image" && p.avatarDataUrl) {
      avatarEl.innerHTML = '<img src="' + p.avatarDataUrl + '" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%" />';
    } else {
      avatarEl.innerHTML = "";
      avatarEl.textContent = p.avatar || "👤";
    }
  }
  if (nameEl) nameEl.textContent = p.nickname || "法律人";
  var idChip = document.getElementById("profileIdChip");
  if (idChip) {
    idChip.textContent = "ID " + (p.id || "-----");
    idChip.classList.toggle("fancy", !!p.idVip);
  }
  renderHomeAvatar();
  renderLevelBadges();
  renderTitleChip();
  renderVipCard();
  if (ptsEl) ptsEl.textContent = p.points || 0;
  // 学习天数与首页「累计打卡」统一口径：完成打卡的天数（是否打卡成功才算学习天数）
  var cdays = loadCheckin().days || {};
  if (daysEl) daysEl.textContent = Object.keys(cdays).length;
  if (notesEl) notesEl.textContent = loadNotes().length;
  var vipBadge = document.getElementById("profileVipBadge");
  if (vipBadge) vipBadge.style.display = isVip() ? "inline-block" : "none";
  var vipRemain = getVipRemainDays();
  if (vipRemain) vipBadge.setAttribute("title", vipRemain === "永久" ? "永久VIP" : "VIP 剩余 " + vipRemain + " 天");
  if (nickInput) nickInput.value = p.nickname || "";
  applyAvatarFrame();
}

function editProfile() {
  pickProfileAvatar();
}

function pickProfileAvatar() {
  var p = loadProfile();
  var current = p.avatar || "👤";
  var customSelected = p.avatarType === "image" && !!p.avatarDataUrl;
  var overlay = document.createElement("div");
  overlay.id = "avatarPickOverlay";
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px";
  var box = document.createElement("div");
  box.style.cssText = "position:relative;background:var(--card-bg);border-radius:20px;padding:20px;max-width:340px;width:100%;text-align:center";
  var h = '<button class="modal-close" id="avatarCloseBtn">✕</button><p style="font-size:14px;margin-bottom:10px">选择头像</p>' +
    '<div id="avatarPreview" style="width:56px;height:56px;border-radius:50%;margin:0 auto 12px;font-size:28px;display:flex;align-items:center;justify-content:center;background:#f5f5f5;border:2px solid var(--card-border);overflow:hidden"></div>' +
    '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px">';
  for (var i = 0; i < AVATARS.length; i++) {
    var isCurrent = AVATARS[i] === current && !customSelected;
    h += '<button class="avatar-pick-btn' + (isCurrent ? ' selected' : '') + '" data-emoji="' + AVATARS[i] + '" style="width:44px;height:44px;border-radius:50%;border:2px solid ' + (isCurrent ? 'var(--accent)' : 'var(--card-border)') + ';background:var(--card-bg);font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center' + (isCurrent ? ';transform:scale(1.15);box-shadow:0 0 0 3px rgba(74,144,217,0.25)' : '') + '">' + AVATARS[i] + '</button>';
  }
  h += '</div><div style="display:flex;justify-content:center;margin-bottom:12px"><button id="avatarUploadBtn" type="button" style="width:100%;max-width:220px;height:44px;border-radius:12px;border:2px solid ' + (customSelected ? 'var(--accent)' : 'var(--card-border)') + ';background:var(--card-bg);font-size:14px;color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px' + (customSelected ? ';transform:scale(1.01);box-shadow:0 0 0 3px rgba(74,144,217,0.18)' : '') + '"><span>📷</span><span>上传头像</span></button></div>';
  h += '<input id="avatarUploadInput" type="file" accept="image/*" style="display:none" />';
  var ownedF = getOwnedAvatarFrames();
  h += '<div class="af-section"><div class="af-label">头像框</div><div class="af-row">';
  h += '<button type="button" class="af-opt' + ((p.avatarFrame || "") === "" ? ' selected' : '') + '" data-frame="" title="无头像框"><span class="af-circle" style="border:2px solid var(--card-border)">🚫</span></button>';
  for (var fi = 0; fi < AVATAR_FRAMES.length; fi++) {
    var f = AVATAR_FRAMES[fi];
    var fOwned = ownedF.indexOf(f.key) >= 0;
    var fSel = (p.avatarFrame || "") === f.key;
    if (!fOwned) {
      h += '<button type="button" class="af-opt locked" title="未拥有" disabled><span class="af-circle" style="border:1px solid var(--card-border)">🔒</span></button>';
    } else {
      h += '<button type="button" class="af-opt' + (fSel ? ' selected' : '') + '" data-frame="' + f.key + '" title="' + f.name + '"><span class="af-circle" style="border:2px solid ' + f.borderColor + ';box-shadow:' + f.boxShadow + '">👤</span></button>';
    }
  }
  h += '</div></div>';
  h += '</div><div style="display:flex;gap:8px;justify-content:center">' +
       '<button id="confirmAvatarPickBtn" style="flex:1;padding:10px;border:none;border-radius:12px;background:var(--accent);color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit">确定</button>' +
       '<button id="closeAvatarPickBtn" style="flex:1;padding:10px;border:1px solid var(--card-border);border-radius:12px;background:var(--input-bg);color:var(--text);font-size:14px;cursor:pointer;font-family:inherit">取消</button>' +
       '</div>';
  box.innerHTML = h;
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  // Track pending selection (blue frame moves but not yet saved)
  var selectedEmoji = current;

  // ---- 事件委托：弹窗内所有按钮统一响应 ----
  box.onclick = function(e) {
    var t = e.target;
    while (t && t !== box && t.tagName !== "BUTTON") t = t.parentNode;
    if (!t || t.tagName !== "BUTTON") return;
    var id = t.id;
    if (id === "avatarUploadBtn") {
      var input = document.getElementById("avatarUploadInput");
      if (input) input.click();
      return;
    }
    if (id === "confirmAvatarPickBtn") { setAvatar(selectedEmoji); return; }
    if (id === "closeAvatarPickBtn") { closeAvatarPick(); return; }
    var fkAttr = t.getAttribute("data-frame");
    if (fkAttr !== null) {
      setAvatarFrame(fkAttr);
      var fbtns = box.querySelectorAll(".af-opt");
      for (var fb = 0; fb < fbtns.length; fb++) {
        fbtns[fb].classList.toggle("selected", fbtns[fb].getAttribute("data-frame") === fkAttr && !fbtns[fb].classList.contains("locked"));
      }
      return;
    }
    var emoji = t.getAttribute("data-emoji");
    if (!emoji) return;
    // Move blue frame to newly clicked avatar
    var btns = box.querySelectorAll(".avatar-pick-btn");
    for (var j = 0; j < btns.length; j++) {
      var b = btns[j];
      var isSel = b.getAttribute("data-emoji") === emoji;
      b.className = "avatar-pick-btn" + (isSel ? " selected" : "");
      b.style.borderColor = isSel ? "var(--accent)" : "var(--card-border)";
      b.style.transform = isSel ? "scale(1.15)" : "";
      b.style.boxShadow = isSel ? "0 0 0 3px rgba(74,144,217,0.25)" : "";
    }
    selectedEmoji = emoji;
    var pv = document.getElementById("avatarPreview");
    if (pv) { pv.innerHTML = ""; pv.textContent = emoji; }
  };

  // 初始预览
  var pv = document.getElementById("avatarPreview");
  if (pv) {
    if (customSelected) {
      pv.innerHTML = '<img src="' + p.avatarDataUrl + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%" />';
    } else {
      pv.textContent = current;
    }
  }
  var uploadInput = document.getElementById("avatarUploadInput");
  if (uploadInput) uploadInput.onchange = function() { handleAvatarUpload(this); };
  var avClose = document.getElementById("avatarCloseBtn");
  if (avClose) avClose.onclick = function() { closeAvatarPick(); };
  // 头像框应用到预览
  if (p.avatarFrame) {
    var pvInit = document.getElementById("avatarPreview");
    if (pvInit) applyFrameToEl(pvInit, p.avatarFrame);
  }
}

function setAvatar(emoji) {
  var p = loadProfile();
  p.avatar = emoji;
  p.avatarType = "emoji";
  p.avatarDataUrl = "";
  saveProfile(p);
  updateProfileUI();
  var overlay = document.getElementById("avatarPickOverlay");
  if (overlay) overlay.remove();
  var bonus = oneTimeBonus("avatar", 5, "更换头像");
  showToast("头像已更新");
}

function handleAvatarUpload(input) {
  var file = input && input.files ? input.files[0] : null;
  if (!file) return;
  if (!file.type || !file.type.startsWith("image/")) {
    showToast("请选择图片文件");
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var p = loadProfile();
    p.avatar = "📷";
    p.avatarType = "image";
    p.avatarDataUrl = e.target.result;
    saveProfile(p);
    updateProfileUI();
    var overlay = document.getElementById("avatarPickOverlay");
    if (overlay) overlay.remove();
    var bonus = oneTimeBonus("avatar", 5, "更换头像");
    showToast("头像已更新");
  };
  reader.readAsDataURL(file);
}

function closeAvatarPick() {
  var overlay = document.getElementById("avatarPickOverlay");
  if (overlay) overlay.remove();
}

function editNickname() {
  var p = loadProfile();
  var name = prompt("修改昵称", p.nickname || "法律人");
  if (name === null || !name.trim()) return;
  p.nickname = name.trim();
  saveProfile(p);
  updateProfileUI();
  var bonus = oneTimeBonus("nickname", 5, "更换昵称");
  showToast("昵称已更新");
}

function rechargeVip() {
  var overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px";
  var box = document.createElement("div");
  box.style.cssText = "position:relative;background:var(--card-bg);border-radius:20px;padding:24px;max-width:340px;width:100%;text-align:center";
  box.innerHTML = '<button class="modal-close" onclick="this.parentElement.parentElement.remove()">✕</button>' +
    '<div style="font-size:40px;margin-bottom:8px">👑</div><h3 style="margin-bottom:4px">SeaWhy Lex VIP</h3><p style="font-size:13px;color:var(--text2);margin-bottom:16px">解锁全部功能 · 无限AI咨询 · 高级模型</p>' +
    '<div style="display:flex;gap:8px;margin-bottom:8px"><button id="vipBtnMonth" style="flex:1;padding:14px;border:2px solid var(--accent);border-radius:14px;background:var(--accent);color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">月度 ¥29</button></div>' +
    '<div style="display:flex;gap:8px;margin-bottom:12px"><button id="vipBtnYear" style="flex:1;padding:14px;border:2px solid #d4a017;border-radius:14px;background:linear-gradient(135deg,#f5a623,#d4a017);color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">年度 ¥199</button></div>' +
    '<button onclick="this.parentElement.parentElement.remove()" style="padding:10px 24px;border:none;border-radius:12px;background:var(--input-bg);color:var(--text);font-size:13px;cursor:pointer;font-family:inherit">暂不需要</button>';
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  setTimeout(function() {
    var bm = document.getElementById("vipBtnMonth");
    var by = document.getElementById("vipBtnYear");
    if (bm) bm.onclick = function() { doVipPay("month"); };
    if (by) by.onclick = function() { doVipPay("year"); };
  }, 50);
}

var VIP_KEY = "seawhy-lex-vip";
function isVip() {
  try {
    if (localStorage.getItem(VIP_KEY) === "1") return true; // 永久VIP（兑换码0815）
    var p = loadProfile();
    return !!(p.vipUntil && p.vipUntil > Date.now());
  } catch(e) { return false; }
}
function setVip(v) { try { localStorage.setItem(VIP_KEY, v ? "1" : "0"); } catch(e) {} }

// ===== 等级系统 =====
var LEVELS = [
  { name: "见习", icon: "images/levels/LV1.png", min: 0 },
  { name: "辅庭", icon: "images/levels/LV2.png", min: 50 },
  { name: "出庭", icon: "images/levels/LV3.png", min: 200 },
  { name: "合伙", icon: "images/levels/LV4.png", min: 500 },
  { name: "资深合伙", icon: "images/levels/LV5.png", min: 1000 },
  { name: "掌门人", icon: "images/levels/LV6.png", min: 2000 },
  { name: "法魂圣印", icon: "images/levels/LV7.png", min: 5000 },
  { name: "永恒法典", icon: "images/levels/LV8.png", min: 10000 }
];
function getLevelInfo(totalPoints) {
  totalPoints = totalPoints || 0;
  var idx = 0;
  for (var i = 0; i < LEVELS.length; i++) if (totalPoints >= LEVELS[i].min) idx = i;
  var info = { index: idx, name: LEVELS[idx].name, icon: LEVELS[idx].icon, min: LEVELS[idx].min };
  if (idx < LEVELS.length - 1) {
    info.next = LEVELS[idx + 1].name;
    info.nextMin = LEVELS[idx + 1].min;
    info.need = LEVELS[idx + 1].min - LEVELS[idx].min;
    info.have = totalPoints - LEVELS[idx].min;
    info.progress = Math.min(100, Math.round(info.have / info.need * 100));
  } else {
    info.next = null;
    info.progress = 100;
  }
  return info;
}
function getLevel(totalPoints) { return getLevelInfo(totalPoints).name; }

// 主页左上角头像
function renderHomeAvatar() {
  var btn = document.getElementById("homeProfileBtn");
  if (!btn) return;
  var p = loadProfile();
  if (p.avatarType === "image" && p.avatarDataUrl) {
    btn.innerHTML = '<img src="' + p.avatarDataUrl + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%" />';
  } else {
    btn.textContent = p.avatar || "👤";
  }
  applyAvatarFrame();
}

// 头像飞向个人中心动画
function makeFlyAvatar() {
  var p = loadProfile();
  var fly = document.createElement("div");
  var isImg = p.avatarType === "image" && p.avatarDataUrl;
  if (isImg) {
    fly.innerHTML = '<img src="' + p.avatarDataUrl + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%" />';
  } else {
    fly.textContent = p.avatar || "👤";
  }
  fly.style.cssText = "position:fixed;z-index:999;width:40px;height:40px;border-radius:50%;font-size:22px;display:flex;align-items:center;justify-content:center;background:#fff;overflow:hidden;box-shadow:0 4px 14px rgba(0,0,0,0.25);transition:all .3s cubic-bezier(.35,.1,.25,1);";
  document.body.appendChild(fly);
  return fly;
}

function goToProfile() {
  var btn = document.getElementById("homeProfileBtn");
  if (!btn) { showProfile(); return; }
  var home = document.getElementById("homeScreen");
  var profile = document.getElementById("profileView");
  var startRect = btn.getBoundingClientRect();
  var fly = makeFlyAvatar();
  fly.style.left = startRect.left + "px";
  fly.style.top = startRect.top + "px";
  // 个人中心以 fixed 透明覆盖出现，用于测量目标并同时渐显
  profile.style.position = "fixed";
  profile.style.inset = "0";
  profile.style.display = "";
  profile.classList.add("show");
  profile.style.opacity = "0";
  profile.style.transition = "opacity .3s ease";
  var target = document.querySelector(".profile-card .ph-avatar");
  var endRect = target ? target.getBoundingClientRect() : { left: 0, top: 0 };
  if (target) target.style.visibility = "hidden";
  // 同步开始：主页渐隐 + 个人中心渐显 + 头像飞行（同一时刻）
  if (home) { home.style.transition = "opacity .3s ease"; home.style.opacity = "0"; }
  requestAnimationFrame(function() {
    profile.style.opacity = "1";
    fly.style.left = endRect.left + "px";
    fly.style.top = endRect.top + "px";
    fly.style.width = endRect.width + "px";
    fly.style.height = endRect.height + "px";
    fly.style.fontSize = "30px";
  });
  setTimeout(function() {
    hideAllViews();
    profile.style.position = "";
    profile.style.opacity = "";
    profile.classList.add("show");
    profile.style.display = "";
    if (target) target.style.visibility = "";
    if (home) { home.style.transition = ""; home.style.opacity = ""; }
    updateProfileUI();
    // 等布局完成后把徽章滚动到当前等级
    requestAnimationFrame(function() {
      requestAnimationFrame(function() { scrollLevelToCurrent(); });
    });
  }, 300);
  setTimeout(function() { if (fly.parentNode) fly.parentNode.removeChild(fly); }, 620);
}

// 退出个人中心：渐隐 + 主页渐显（无头像飞行动画）
function exitProfile() {
  var profile = document.getElementById("profileView");
  var home = document.getElementById("homeScreen");
  if (profile) { profile.style.transition = "opacity .3s ease"; profile.style.opacity = "0"; }
  setTimeout(function() {
    goHome(); // 主页先显示
    if (profile) { profile.style.transition = ""; profile.style.opacity = ""; }
    // 主页渐显
    if (home) {
      home.style.transition = "opacity .3s ease";
      home.style.opacity = "0";
    }
    requestAnimationFrame(function() { if (home) home.style.opacity = "1"; });
    setTimeout(function() { if (home) home.style.transition = ""; }, 300);
  }, 300);
}

// 徽章轮播渲染
function renderLevelBadges() {
  var scroll = document.getElementById("levelScroll");
  if (!scroll) return;
  var p = loadProfile();
  var total = p.totalPoints || 0;
  var curIdx = getLevelInfo(total).index;
  var h = "";
  for (var i = 0; i < LEVELS.length; i++) {
    var locked = total < LEVELS[i].min ? " locked" : "";
    h += '<div class="ph-level-item lvl' + i + locked + '"><div class="ph-level-img"><img src="' + LEVELS[i].icon + '" alt="" /></div></div>';
  }
  scroll.innerHTML = h;
  scroll.onscroll = function() {
    var idx = Math.round(this.scrollLeft / this.clientWidth);
    idx = Math.max(0, Math.min(LEVELS.length - 1, idx));
    updateLevelDisplay(idx);
  };
  scrollLevelToCurrent();
}

// 将徽章轮播滚动到当前等级(需视图已可见,否则 clientWidth 为 0)
function scrollLevelToCurrent() {
  var scroll = document.getElementById("levelScroll");
  if (!scroll) return;
  var p = loadProfile();
  var total = p.totalPoints || 0;
  var curIdx = getLevelInfo(total).index;
  var itemW = scroll.clientWidth;
  if (itemW > 0) scroll.scrollLeft = curIdx * itemW;
  updateLevelDisplay(curIdx);
}

function updateLevelDisplay(idx) {
  if (idx < 0 || idx >= LEVELS.length) return;
  var p = loadProfile();
  var total = p.totalPoints || 0;
  var curIdx = getLevelInfo(total).index;
  var fill = document.getElementById("profileLevelFill");
  var prog = document.getElementById("profileLevelProg");
  var pct, txt;
  if (idx === curIdx) {
    // 当前等级：显示到下一级的进度
    if (idx < LEVELS.length - 1) {
      var span = LEVELS[idx + 1].min - LEVELS[idx].min;
      var have = total - LEVELS[idx].min;
      pct = Math.max(0, Math.min(100, Math.round(have / span * 100)));
      txt = "距下一级还需 " + Math.max(0, LEVELS[idx + 1].min - total) + " 积分";
    } else {
      // 满级后进入称号体系，积分继续有意义
      var ti = getTitleInfo(total);
      pct = ti.progress;
      var stars = Math.max(0, Math.floor((total - 100000) / 10000));
      txt = ti.next
        ? "已达最高等级 · 称号「" + ti.name + "」· 距「" + ti.next + "」还需 " + (ti.nextMin - total) + " 积分"
        : "已达最高等级 · 最高称号「" + ti.name + "」" + (stars > 0 ? " · 星数 " + stars : "");
    }
  } else {
    // 其余等级：当前积分 / 该等级需要积分
    var need = LEVELS[idx].min;
    pct = need > 0 ? Math.max(0, Math.min(100, Math.round(total / need * 100))) : 100;
    txt = need > 0 ? "当前 " + total + " / 需要 " + need + " 积分" : "当前 " + total + " 积分";
  }
  if (fill) fill.style.width = pct + "%";
  if (prog) prog.textContent = txt;
  // 高亮当前查看的徽章 + 保留未解锁灰色
  var items = document.querySelectorAll(".ph-level-item");
  for (var i = 0; i < items.length; i++) {
    var locked = total < LEVELS[i].min ? " locked" : "";
    items[i].className = "ph-level-item lvl" + i + locked + (i === idx ? " active" : "");
  }
}

// ===== 积分系统 =====
function addPoints(amount, label) {
  var p = loadProfile();
  p.points = (p.points || 0) + amount;
  if (amount > 0) p.totalPoints = (p.totalPoints || 0) + amount; // 累计积分只增不减
  if (!p.transactions) p.transactions = [];
  p.transactions.push({ a: amount, t: Date.now(), m: label || "" });
  if (p.transactions.length > 300) p.transactions = p.transactions.slice(-300);
  saveProfile(p);
  updateProfileUI();
}
function awardPoints(amount, msg) {
  if (!amount || amount <= 0) return;
  addPoints(amount, msg || "");
  // v3.5.0：去掉所有“获得积分”弹窗（积分只静默累计）
}
function vipRate(base) { return isVip() ? base * 2 : base; }

// 每日计数
function dailyCount(key) {
  var p = loadProfile();
  if (!p.daily || p.daily.date !== getTodayStr()) return 0;
  return p.daily[key] || 0;
}
function dailyInc(key) {
  var p = loadProfile();
  if (!p.daily || p.daily.date !== getTodayStr()) p.daily = { date: getTodayStr() };
  p.daily[key] = (p.daily[key] || 0) + 1;
  saveProfile(p);
}

// 一次性任务奖励（返回奖励的积分，0=已完成过）
function oneTimeBonus(task, amount, label) {
  var p = loadProfile();
  if (!p.doneTasks) p.doneTasks = {};
  if (p.doneTasks[task]) return 0;
  p.doneTasks[task] = true;
  saveProfile(p);
  addPoints(amount, label || "任务奖励");
  return amount;
}

// ===== 积分兑换 / 权限 =====
function canViewQuizExplanation() {
  if (isVip()) return true;
  var p = loadProfile();
  return !!(p.quizUnlockUntil && p.quizUnlockUntil > Date.now());
}
function getQuizUnlockRemain() {
  var p = loadProfile();
  if (!p.quizUnlockUntil || p.quizUnlockUntil <= Date.now()) return 0;
  return Math.ceil((p.quizUnlockUntil - Date.now()) / 3600000);
}
function getVipRemainDays() {
  var p = loadProfile();
  if (localStorage.getItem(VIP_KEY) === "1") return "永久";
  if (!p.vipUntil || p.vipUntil <= Date.now()) return 0;
  return Math.ceil((p.vipUntil - Date.now()) / 86400000);
}

var VIP_PLANS = [
  { days: 1, cost: 100, label: "24小时" },
  { days: 3, cost: 188, label: "72小时" },
  { days: 7, cost: 398, label: "7天" },
  { days: 30, cost: 998, label: "30天" }
];
var QUIZ_PLANS = [ { hours: 3, cost: 5 }, { hours: 12, cost: 10 }, { hours: 48, cost: 15 } ];

function redeemVipPlan(idx) {
  var plan = VIP_PLANS[idx];
  var p = loadProfile();
  if ((p.points || 0) < plan.cost) { showToast("积分不足，需要 " + plan.cost + " 积分"); return; }
  var now = Date.now();
  var base = (p.vipUntil && p.vipUntil > now) ? p.vipUntil : now;
  p.vipUntil = base + plan.days * 86400000;
  saveProfile(p);
  addPoints(-plan.cost, "兑换VIP");
  updateProfileUI();
  showToast("VIP 已开通 " + plan.label + " 🎉");
  renderPointsPanel();
}
function redeemQuizPlan(idx) {
  var plan = QUIZ_PLANS[idx];
  var p = loadProfile();
  if ((p.points || 0) < plan.cost) { showToast("积分不足，需要 " + plan.cost + " 积分"); return; }
  var now = Date.now();
  var base = (p.quizUnlockUntil && p.quizUnlockUntil > now) ? p.quizUnlockUntil : now;
  p.quizUnlockUntil = base + plan.hours * 3600000;
  saveProfile(p);
  addPoints(-plan.cost, "解锁解析");
  showToast("题目解析已解锁 " + plan.hours + " 小时");
  renderPointsPanel();
}
function redeemNoteCredit() {
  var p = loadProfile();
  if ((p.points || 0) < 5) { showToast("积分不足，需要 5 积分"); return; }
  p.noteCredits = (p.noteCredits || 0) + 1;
  saveProfile(p);
  addPoints(-5, "笔记本额度");
  showToast("已获得 1 篇笔记额度（VIP 免费创建）");
  renderPointsPanel();
}

// ===== 积分兑换面板 =====
function openPointsPanel() {
  var overlay = document.createElement("div");
  overlay.id = "pointsOverlay";
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:600;display:flex;align-items:center;justify-content:center;padding:20px";
  var box = document.createElement("div");
  box.id = "pointsPanelBox";
  box.style.cssText = "position:relative;background:var(--card-bg);border-radius:20px;padding:20px;max-width:360px;width:100%;max-height:78vh;display:flex;flex-direction:column;overflow-y:auto;";
  box.innerHTML = '<button class="modal-close">✕</button>';
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  var mc = box.querySelector(".modal-close");
  if (mc) mc.onclick = function() { overlay.remove(); };
  renderPointsPanel();
}

function renderPointsPanel() {
  var box = document.getElementById("pointsPanelBox");
  if (!box) return;
  var p = loadProfile();
  var vipRemain = getVipRemainDays();
  var quizRemain = getQuizUnlockRemain();
  var h = '<button class="modal-close">✕</button>' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
    '<p style="font-size:16px;font-weight:700;color:var(--text);margin:0">积分兑换</p>' +
    '<span style="font-size:13px;color:var(--accent);font-weight:700">余额 ' + (p.points || 0) + ' 分</span></div>';
  h += '<div style="background:var(--input-bg);border-radius:12px;padding:10px 12px;margin-bottom:12px;font-size:12px;color:var(--text)">VIP 状态：' +
    (vipRemain === "永久" ? '<b style="color:#f7b733">👑 永久VIP</b>' : vipRemain > 0 ? '<b style="color:#f7b733">👑 VIP 剩余 ' + vipRemain + ' 天</b>' : '<b>未开通</b>') +
    (quizRemain > 0 ? '　·　解析解锁剩 ' + quizRemain + ' 小时' : '') + '</div>';
  h += '<p style="font-size:12px;font-weight:700;color:var(--text);margin:0 0 8px">VIP 兑换</p>';
  h += '<div class="pp-grid">';
  for (var i = 0; i < VIP_PLANS.length; i++) {
    h += '<div class="pp-card" onclick="redeemVipPlan(' + i + ')"><div class="pp-name">' + VIP_PLANS[i].label + '</div><div class="pp-cost">' + VIP_PLANS[i].cost + ' 分</div></div>';
  }
  h += '</div>';
  h += '<p style="font-size:12px;font-weight:700;color:var(--text);margin:14px 0 8px">题目解析解锁</p>';
  h += '<div class="pp-grid">';
  for (var j = 0; j < QUIZ_PLANS.length; j++) {
    h += '<div class="pp-card" onclick="redeemQuizPlan(' + j + ')"><div class="pp-name">' + QUIZ_PLANS[j].hours + ' 小时</div><div class="pp-cost">' + QUIZ_PLANS[j].cost + ' 分</div></div>';
  }
  h += '</div>';
  h += '<p style="font-size:12px;font-weight:700;color:var(--text);margin:14px 0 8px">笔记本</p>';
  h += '<div class="pp-grid"><div class="pp-card" onclick="redeemNoteCredit()"><div class="pp-name">1 篇笔记额度' + (p.noteCredits ? '（现有 ' + p.noteCredits + '）' : '') + '</div><div class="pp-cost">5 分</div></div></div>';
  h += '<p style="font-size:10px;color:var(--text2);margin:12px 0 0;line-height:1.6">VIP 无限查看解析、免费创建笔记。兑换码 0815 可开通永久 VIP。</p>';
  box.innerHTML = h;
  var mc = box.querySelector(".modal-close");
  if (mc) mc.onclick = function() { var o = document.getElementById("pointsOverlay"); if (o) o.remove(); };
}

// ===== 积分中心（任务 + 明细） =====
function openPointsCenter() {
  hideAllViews();
  document.getElementById("pointsView").style.display = "";
  document.getElementById("pointsView").classList.add("show");
  renderPointsView();
}

function closePointsView() {
  showProfile();
}

function renderPointsView() {
  var p = loadProfile();
  var isV = isVip();
  var balanceEl = document.getElementById("pcBalance");
  var totalEl = document.getElementById("pcTotal");
  if (balanceEl) balanceEl.textContent = p.points || 0;
  if (totalEl) totalEl.textContent = "累计 " + (p.totalPoints || 0) + " 积分";
  var checked = loadCheckin().days[todayStr()];
  var tasks = [
    { n: "每日打卡", d: (isV ? "5-10" : "1-3") + " 积分/天", s: checked ? "已完成" : "未打卡", c: checked ? "pc-done" : "" },
    { n: "答对题目", d: (isV ? "+2" : "+1") + " 积分/题", s: "", c: "" },
    { n: "学习时间", d: (isV ? "+2" : "+1") + " 积分/5分钟", s: "", c: "" },
    { n: "AI 对话", d: (isV ? "+2" : "+1") + " 积分/条，今日 " + dailyCount("chat") + "/10", s: dailyCount("chat") >= 10 ? "已满" : "", c: dailyCount("chat") >= 10 ? "pc-done" : "" },
    { n: "完成待办", d: (isV ? "+2" : "+1") + " 积分/个，今日 " + dailyCount("todo") + "/3", s: dailyCount("todo") >= 3 ? "已满" : "", c: dailyCount("todo") >= 3 ? "pc-done" : "" },
    { n: "生成文书", d: (isV ? "+2" : "+1") + " 积分/次，今日 " + dailyCount("doc") + "/3", s: dailyCount("doc") >= 3 ? "已满" : "", c: dailyCount("doc") >= 3 ? "pc-done" : "" }
  ];
  var oneTimes = [
    { n: "更换头像", a: 5, k: "avatar" },
    { n: "更换昵称", a: 5, k: "nickname" },
    { n: "首次 AI 对话", a: 20, k: "chat" },
    { n: "首次创建笔记", a: 5, k: "note" },
    { n: "首次创建待办", a: 5, k: "todo" }
  ];
  var h = '<div class="pc-tasks">';
  for (var i = 0; i < tasks.length; i++) {
    h += '<div class="pc-task ' + tasks[i].c + '"><span>' + tasks[i].n + '</span><span class="pc-tdesc">' + tasks[i].d + '</span><span class="pc-tdone">' + tasks[i].s + '</span></div>';
  }
  h += '</div>';
  h += '<h3 style="font-size:12px;font-weight:700;color:var(--text);margin:14px 0 6px">一次性任务' + (isV ? ' <span style="color:#f7b733">· VIP 双倍</span>' : '') + '</h3><div class="pc-tasks">';
  for (var j = 0; j < oneTimes.length; j++) {
    var o = oneTimes[j];
    var done = p.doneTasks && p.doneTasks[o.k];
    h += '<div class="pc-task ' + (done ? "pc-done" : "") + '"><span>' + o.n + '</span><span class="pc-tdesc">+' + o.a + '</span><span class="pc-tdone">' + (done ? "已完成" : "未完成") + '</span></div>';
  }
  h += '</div>';
  var tasksEl = document.getElementById("pcTasksView");
  if (tasksEl) tasksEl.innerHTML = h;

  var txns = (p.transactions || []).slice().reverse();
  var th = "";
  if (!txns.length) {
    th = '<div style="text-align:center;color:var(--text2);font-size:12px;padding:20px 0">暂无积分记录，做任务赚积分吧</div>';
  } else {
    for (var k = 0; k < txns.length && k < 100; k++) {
      var tr = txns[k];
      var d = new Date(tr.t);
      var tm = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + " " + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);
      th += '<div class="pc-txn"><span>' + (tr.m || "积分变动") + '</span><span class="pc-tm">' + tm + '</span>' +
        '<span class="pc-amt ' + (tr.a > 0 ? "pc-plus" : "pc-minus") + '">' + (tr.a > 0 ? "+" : "") + tr.a + '</span></div>';
    }
  }
  var txnEl = document.getElementById("pcTxnView");
  if (txnEl) txnEl.innerHTML = th;
}

// ============================================================
// 积分夺宝 (LOTTERY)
// ============================================================
// 固定池(非水晶/空奖)= 91; 水晶(基础0.1)+空奖(8.9)= 9; 水晶保底概率从空奖压缩
// 奖池图标:与应用统一的纯色线性 SVG(展示于九宫格与中奖弹层)
function _lpIcon(paths, sz) {
  sz = sz || 24;
  return '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>';
}
var LOTTERY_PRIZES = [
  { key: "vip",       name: "VIP卡",         weight: 3,    icon: _lpIcon('<path d="M2 20h20"/><path d="M4 20L2.5 8.5 8 12l4-8 4 8 5.5-3.5L20 20"/>'), cell: 0 },
  { key: "unlock",    name: "答案解析时间",    weight: 12,   icon: _lpIcon('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>'), cell: 1 },
  { key: "bgFrame",   name: "随机背景/头像框", weight: 5,   icon: _lpIcon('<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>'), cell: 2 },
  { key: "points",    name: "积分奖励",        weight: 35,   icon: _lpIcon('<circle cx="12" cy="12" r="9"/><path d="M12 6v12"/><path d="M15 9.5c0-1-1.2-2-3-2s-3 1-3 2 1 1.8 3 2 3 .9 3 2-1.2 2-3 2-3-1-3-2"/>'), cell: 3 },
  { key: "crystal",   name: "法魂水晶",       weight: 0.1,  icon: _lpIcon('<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20"/><path d="M12 21L8 9l4-6 4 6z"/>'), cell: 4, rare: true },
  { key: "challenge", name: "随机题目挑战",    weight: 8,   icon: _lpIcon('<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'), cell: 5 },
  { key: "skin",      name: "皮肤碎片",        weight: 18,   icon: _lpIcon('<path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>'), cell: 6 },
  { key: "badge",     name: "限定徽章",        weight: 10,   icon: _lpIcon('<circle cx="12" cy="8" r="6"/><path d="M15.5 13l1.5 8-5-3-5 3 1.5-8"/>'), cell: 7 },
  { key: "empty",     name: "空奖",           weight: 8.9,  icon: _lpIcon('<path d="M9.59 4.59A2 2 0 1 1 11 8H2"/><path d="M12.59 19.41A2 2 0 1 0 14 16H2"/><path d="M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2"/>'), cell: 8 }
];
// 皮肤(衣服): 图鉴 + 碎片合成 + 佩戴记录(角色实机展示后续版本接入)
// 皮肤分档: 普通88碎片 / 勇者288碎片 / 史诗588碎片 / 传说988碎片 / 典藏1法魂水晶(crystal:true)
var SKINS = [
  { key: "sea",   name: "沧海法袍", cost: 88,  icon: "🌊", rarity: "普通", color: "#38bdf8", accent: "#0284c7", desc: "碧波为衬,法袍翻卷,像潮水一样奔赴每一次学习", art: "images/skins/sea.webp" },
  { key: "ink",   name: "墨海书童", cost: 88,  icon: "🖋️", rarity: "普通", color: "#64748b", accent: "#334155", desc: "墨海为卷,书童执笔,在知识的浪尖一笔一划", art: "images/skins/ink.webp" },
  { key: "star",  name: "星河律裳", cost: 288, icon: "🌌", rarity: "勇者", color: "#a78bfa", accent: "#6d28d9", desc: "以星河为裳,衣袂间流淌着无数法条的微光", art: "images/skins/star.webp" },
  { key: "tide",  name: "碧潮卫士", cost: 288, icon: "⚔️", rarity: "勇者", color: "#34d399", accent: "#047857", desc: "碧潮为甲,勇者无畏,守护每一次向前的努力", art: "images/skins/tide.webp" },
  { key: "gold",  name: "鎏金法冕", cost: 588, icon: "👑", rarity: "史诗", color: "#f7b733", accent: "#b45309", desc: "鎏金镶边,法冕加身,沉稳中透出规则的锋芒", art: "images/skins/gold.webp" },
  { key: "aurora",name: "极光律者", cost: 588, icon: "🌈", rarity: "史诗", color: "#2dd4bf", accent: "#0d9488", desc: "极光为冕,律者临风,天边有一道属于你的辉光", art: "images/skins/aurora.webp" },
  { key: "crown", name: "星海执灯人", cost: 988, icon: "🏮", rarity: "传说", color: "#fb7185", accent: "#be185d", desc: "提一盏星灯,行走于浩瀚法海之巅", art: "images/skins/crown.webp" },
  { key: "lord",  name: "天御法尊", cost: 988, icon: "🛡️", rarity: "传说", color: "#cbd5e1", accent: "#64748b", desc: "白袍法尊,御守正道,为迷途的人指引方向", art: "images/skins/lord.webp" },
  { key: "starlord", name: "星河法皇", cost: 1,  icon: "🌟", rarity: "典藏", crystal: true, color: "#8b5cf6", accent: "#f7b733", desc: "典藏限定。星河加冕,法皇临世,以整片星海为袍", art: "images/skins/starlord.webp" }
];
// 限定徽章(法脉·星海典藏), weight 合计 10%
var BADGE_ART = {
  qingjian: "images/badges/qingjian.webp", zhuyin: "images/badges/zhuyin.webp", hengmen: "images/badges/hengmen.webp",
  lvhai: "images/badges/lvhai.webp", xinghe: "images/badges/xinghe.webp", mohen: "images/badges/mohen.webp",
  buxiu: "images/badges/buxiu.webp", fayu: "images/badges/fayu.webp"
};
var BADGES = [
  { key: "qingjian", name: "青简遗章", weight: 2.2, rarity: "基础", color: "#9ca3af", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='20' y='30' width='60' height='40' rx='4' fill='%23e5e7eb' stroke='%239ca3af' stroke-width='2'/%3E%3Crect x='18' y='28' width='10' height='44' rx='5' fill='%239ca3af'/%3E%3Crect x='72' y='28' width='10' height='44' rx='5' fill='%239ca3af'/%3E%3Cline x1='40' y1='40' x2='40' y2='60' stroke='%236b7280' stroke-width='2'/%3E%3C/svg%3E", desc: "一卷青简,承载古今法意。象征法律知识跨越时间的传承与积淀。" },
  { key: "zhuyin",   name: "朱印流光", weight: 1.7, rarity: "基础", color: "#9ca3af", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='25' y='35' width='50' height='50' rx='6' fill='%23d1d5db' stroke='%239ca3af' stroke-width='2'/%3E%3Crect x='43' y='20' width='14' height='15' fill='%239ca3af'/%3E%3Crect x='35' y='45' width='30' height='30' fill='none' stroke='%236b7280' stroke-width='2'/%3E%3C/svg%3E", desc: "一枚印记,留下属于法治文明的独特痕迹。象征规则被确立、被遵循,也被一代代人铭记。" },
  { key: "hengmen",  name: "衡门问道", weight: 1.5, rarity: "基础", color: "#9ca3af", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='30' y='25' width='6' height='55' fill='%239ca3af'/%3E%3Crect x='64' y='25' width='6' height='55' fill='%239ca3af'/%3E%3Crect x='30' y='22' width='40' height='8' fill='%23d1d5db' stroke='%239ca3af' stroke-width='1'/%3E%3C/svg%3E", desc: "推开法理之门,始见规则背后的秩序与价值。象征从记忆法律条文走向理解法律精神。" },
  { key: "lvhai",    name: "律海拾光", weight: 1.3, rarity: "稀有", color: "#38bdf8", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 50 Q 30 40 40 50 T 60 50 T 80 50' fill='none' stroke='%2338bdf8' stroke-width='2' opacity='0.6'/%3E%3Cpath d='M 20 60 Q 30 50 40 60 T 60 60 T 80 60' fill='none' stroke='%2338bdf8' stroke-width='2' opacity='0.8'/%3E%3Ccircle cx='35' cy='45' r='3' fill='%23fbbf24' opacity='0.9'/%3E%3C/svg%3E", desc: "法海浩瀚,每一次学习都是拾取一束属于自己的光。象征持续学习与知识积累。" },
  { key: "xinghe",   name: "星河法脉", weight: 1.1, rarity: "稀有", color: "#38bdf8", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='42' fill='%23f0f4ff' stroke='%2338bdf8' stroke-width='2'/%3E%3Ccircle cx='50' cy='30' r='3' fill='%2338bdf8'/%3E%3Ccircle cx='65' cy='45' r='2.5' fill='%2338bdf8'/%3E%3Ccircle cx='50' cy='65' r='2.5' fill='%2338bdf8'/%3E%3C/svg%3E", desc: "无数知识汇聚成星河,无数思考延续成法脉。象征法律知识体系的连接与传承。" },
  { key: "mohen",    name: "墨痕成律", weight: 0.9, rarity: "史诗", color: "#a78bfa", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='42' y='20' width='6' height='50' rx='3' fill='%23a78bfa' stroke='%237c3aed' stroke-width='1'/%3E%3Cpath d='M 43 70 L 38 85 L 50 82 L 57 85 L 52 70 Z' fill='%236b21a8' stroke='%237c3aed' stroke-width='1'/%3E%3C/svg%3E", desc: "落笔成文,墨痕最终化为规则。象征从思想、文字到法律规范的形成过程。" },
  { key: "buxiu",    name: "不朽誓约", weight: 0.8, rarity: "史诗", color: "#a78bfa", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='25' y='50' width='16' height='12' rx='2' fill='%23f3e8ff' stroke='%23a78bfa' stroke-width='1.5'/%3E%3Crect x='59' y='50' width='16' height='12' rx='2' fill='%23f3e8ff' stroke='%23a78bfa' stroke-width='1.5'/%3E%3Cline x1='38' y1='50' x2='36' y2='35' stroke='%23a78bfa' stroke-width='1.5'/%3E%3C/svg%3E", desc: "真正的规则不仅写在纸上,也存在于人们对公平与秩序的共同守护之中。象征法律所承载的责任与信念。" },
  { key: "fayu",     name: "法域星冠", weight: 0.5, rarity: "传说", color: "#f7b733", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 60 L 30 35 L 40 45 L 50 25 L 60 45 L 70 35 L 80 60 Z' fill='%23fef3c7' stroke='%23f7b733' stroke-width='2'/%3E%3Crect x='15' y='60' width='70' height='12' rx='3' fill='%23fde047' stroke='%23f7b733' stroke-width='1.5'/%3E%3Ccircle cx='50' cy='32' r='4' fill='%23fbbf24' stroke='%23f59e0b' stroke-width='1'/%3E%3C/svg%3E", desc: "星光汇聚于法域之上,象征在漫长的求法之路上抵达属于自己的高光时刻。" }
];
var AVATAR_FRAMES = [
  { key: "gold",     name: "金色传说", borderColor: "#f7b733", boxShadow: "0 0 8px rgba(247,183,51,.85)" },
  { key: "fire",     name: "烈焰",     borderColor: "#fc4a1a", boxShadow: "0 0 8px rgba(252,74,26,.8)" },
  { key: "ice",      name: "冰晶",     borderColor: "#7fd7ff", boxShadow: "0 0 8px rgba(127,215,255,.85)" },
  { key: "royal",    name: "贵族紫",   borderColor: "#a78bfa", boxShadow: "0 0 8px rgba(167,139,250,.8)" },
  { key: "jade",     name: "翡翠",     borderColor: "#34d399", boxShadow: "0 0 8px rgba(52,211,153,.8)" },
  { key: "midnight", name: "暗夜",     borderColor: "#3b82f6", boxShadow: "0 0 10px rgba(59,130,246,.85)" },
  { key: "diamond",  name: "钻石",     borderColor: "#c0d6ff", boxShadow: "0 0 10px rgba(192,214,255,.9)" },
  { key: "neon",     name: "霓虹",     borderColor: "#f472b6", boxShadow: "0 0 10px rgba(244,114,182,.85)" }
];
var _lotteryBusy = false;

function openLottery() {
  hideAllViews();
  var el = document.getElementById("lotteryView");
  el.style.display = "";
  el.classList.add("show");
  renderLottery();
}
function renderLottery() {
  var p = loadProfile();
  var pts = p.points || 0, luck = p.lotteryLuck || 0, cry = p.soulCrystals || 0, chg = p.quizChallengeCount || 0;
  var frags = p.skinFragments || 0, skins = p.skinsOwned || [], badges = p.badgesOwned || [];
  var pe = document.getElementById("lotPoints"); if (pe) pe.textContent = pts;
  var le = document.getElementById("lotLuck"); if (le) le.textContent = luck + "/365";
  var lf = document.getElementById("lotLuckFill");
  if (lf) {
    lf.style.width = Math.min(100, luck / 365 * 100) + "%";
    lf.classList.toggle("full", luck >= 365);
    lf.classList.toggle("near", luck >= 292 && luck < 365); // 80% 起开始发光变色
  }
  var ce = document.getElementById("lotCrystals"); if (ce) ce.textContent = cry;
  var cc = document.getElementById("lotChallengeCount"); if (cc) cc.textContent = chg;
  var ec = document.getElementById("lotExchangeCount"); if (ec) ec.textContent = cry;
  var sf = document.getElementById("lotSkinFrags"); if (sf) sf.textContent = frags;
  var sc = document.getElementById("lotSkinCount"); if (sc) sc.textContent = skins.length + "/" + SKINS.length;
  var bc = document.getElementById("lotBadgeCount"); if (bc) bc.textContent = badges.length + "/" + BADGES.length;
  var b1 = document.getElementById("lotDraw1"), b10 = document.getElementById("lotDraw10");
  if (b1) b1.disabled = _lotteryBusy || pts < 30;
  if (b10) b10.disabled = _lotteryBusy || pts < 280;
  // 红点提示: 有挑战次数 / 碎片够合成新皮肤 / 水晶可兑换
  var cb = document.getElementById("lotChallengeBtn");
  if (cb) cb.classList.toggle("has-dot", chg > 0);
  var sb = document.getElementById("lotSkinBtn");
  if (sb) {
    var craftable = false;
    for (var si = 0; si < SKINS.length && !craftable; si++) {
      if (skins.indexOf(SKINS[si].key) >= 0) continue;
      craftable = SKINS[si].crystal ? cry >= 1 : frags >= SKINS[si].cost;
    }
    sb.classList.toggle("has-dot", craftable);
  }
  var eb = document.getElementById("lotExchangeBtn");
  if (eb) eb.classList.toggle("has-dot", cry > 0);
  var cb2 = document.getElementById("lotChallengeBtn");
  if (cb2) cb2.disabled = chg <= 0;
}
// 幸运值保底详情
function showLuckDetail() {
  var p = loadProfile();
  var luck = p.lotteryLuck || 0;
  showToast("幸运值 " + luck + "/365 · 再抽 " + Math.max(0, 365 - luck) + " 次必得法魂水晶！");
}
function pickPrizeByKey(key) {
  for (var i = 0; i < LOTTERY_PRIZES.length; i++) if (LOTTERY_PRIZES[i].key === key) return LOTTERY_PRIZES[i];
  return LOTTERY_PRIZES[0];
}
// 法魂水晶 365 抽保底分段曲线(概率从空奖中压缩)
function crystalPityRate(n) {
  if (n <= 50)  return 0.05;
  if (n <= 100) return 0.06;
  if (n <= 150) return 0.08;
  if (n <= 200) return 0.10;
  if (n <= 250) return 0.15;
  if (n <= 300) return 0.25;
  if (n <= 325) return 0.50;
  if (n <= 340) return 1.00;
  if (n <= 350) return 2.00;
  if (n <= 360) return 5.00;
  if (n <= 364) return 9.00;
  return 100; // n >= 365 必中
}
// n = 当前保底次数(已自增); 内部绝不读 loadProfile,避免与 lotteryDraw 自增重复计数
function pickLotteryReward(n) {
  n = (n === undefined || n === null) ? 0 : n;
  var crystal = pickPrizeByKey("crystal");
  if (n >= 365) return crystal;
  var crystalP = crystalPityRate(n);
  if (Math.random() * 100 < crystalP) return crystal;
  var emptyP = 9 - crystalP; if (emptyP < 0) emptyP = 0;
  var fixedTotal = 0, i;
  for (i = 0; i < LOTTERY_PRIZES.length; i++) {
    var k = LOTTERY_PRIZES[i].key;
    if (k !== "crystal" && k !== "empty") fixedTotal += LOTTERY_PRIZES[i].weight; // = 91
  }
  var r = Math.random() * (fixedTotal + emptyP), acc = 0;
  for (i = 0; i < LOTTERY_PRIZES.length; i++) {
    var pr = LOTTERY_PRIZES[i];
    if (pr.key === "crystal" || pr.key === "empty") continue;
    acc += pr.weight;
    if (r < acc) return pr;
  }
  return pickPrizeByKey("empty");
}
// VIP 卡子加权: 7天 7.69% / 3天 15.38% / 12小时 76.92%（w=子加权小数）
function pickVipSub() {
  var r = Math.random();
  if (r < 0.0769) return { label: "7天", ms: 7 * 86400000, w: 0.0769 };
  if (r < 0.2307) return { label: "3天", ms: 3 * 86400000, w: 0.1538 };
  return             { label: "12小时", ms: 12 * 3600000, w: 0.7692 };
}
// 答案解析时间子加权: 3天 10% / 1天 30% / 3小时 60%（w=子加权小数）
function pickUnlockSub() {
  var r = Math.random();
  if (r < 0.10) return { label: "3 天", ms: 3 * 86400000, w: 0.10 };
  if (r < 0.40) return { label: "1 天", ms: 1 * 86400000, w: 0.30 };
  return           { label: "3 小时", ms: 3 * 3600000, w: 0.60 };
}
// 积分区间子加权: 1-10(35%)/11-30(30%)/31-60(20%)/61-85(8%)/86-99(4%)/666(1.5%)/888(1%)/999(0.5%)
function rollLotteryPoints() {
  var r = Math.random() * 100, lo, hi;
  if (r < 35)        { lo = 1;  hi = 10; }
  else if (r < 65)   { lo = 11; hi = 30; }
  else if (r < 85)   { lo = 31; hi = 60; }
  else if (r < 93)   { lo = 61; hi = 85; }
  else if (r < 97)   { lo = 86; hi = 99; }
  else if (r < 98.5) { return 666; }
  else if (r < 99.5) { return 888; }
  else               { return 999; }
  return lo + Math.floor(Math.random() * (hi - lo + 1));
}
// 皮肤碎片子加权: 8(55%)/18(25%)/28(12%)/58(6%)/88(2%)
function rollSkinFragments() {
  var r = Math.random() * 100;
  if (r < 55) return 8;
  if (r < 80) return 18;
  if (r < 92) return 28;
  if (r < 98) return 58;
  return 88;
}
// 限定徽章按 weight 加权抽取
function pickBadge() {
  var total = 0, i;
  for (i = 0; i < BADGES.length; i++) total += BADGES[i].weight;
  var r = Math.random() * total, acc = 0;
  for (i = 0; i < BADGES.length; i++) {
    acc += BADGES[i].weight;
    if (r < acc) return BADGES[i];
  }
  return BADGES[BADGES.length - 1];
}
// 直接修改传入档案加分（避免 addPoints 二次读写把本函数后续改动冲掉）
function lotAddPoints(p, amount, label) {
  p.points = (p.points || 0) + amount;
  if (amount > 0) p.totalPoints = (p.totalPoints || 0) + amount;
  if (!p.transactions) p.transactions = [];
  p.transactions.push({ a: amount, t: Date.now(), m: label || "积分夺宝" });
  if (p.transactions.length > 300) p.transactions = p.transactions.slice(-300);
}
function applyLotteryReward(prize) {
  var p = loadProfile();
  var res = { key: prize.key, icon: prize.icon, name: prize.name, desc: "", rare: !!prize.rare, cell: prize.cell };
  var now = Date.now();
  if (prize.key === "vip") {
    var vs = pickVipSub();
    p.vipUntil = Math.max(now, p.vipUntil || 0) + vs.ms;
    res.name = "VIP " + vs.label + "卡";
    res.desc = "VIP 延长 " + vs.label;
    res.pct = 3 * vs.w; // 个体概率 = 奖池3% × 子加权
  } else if (prize.key === "crystal") {
    p.soulCrystals = (p.soulCrystals || 0) + 1;
    p.lotteryLuck = 0; // 抽中水晶幸运值清零
    res.desc = "可在兑换中换取永久VIP";
    res.pct = 0.1;
  } else if (prize.key === "points") {
    var n = rollLotteryPoints();
    res.name = n + " 积分";
    res.amount = n;
    res.desc = "积分 +" + n;
    var tp = n === 666 ? 1.5 : n === 888 ? 1 : n === 999 ? 0.5 : n <= 10 ? 35 : n <= 30 ? 30 : n <= 60 ? 20 : n <= 85 ? 8 : 4;
    res.pct = 35 * tp / 100; // 个体概率 = 奖池35% × 档位占比
    lotAddPoints(p, n, "积分夺宝奖励");
  } else if (prize.key === "bgFrame") {
    if (Math.random() < 0.5) {
      var bgs = [];
      for (var b = 0; b < HOME_BGS.length; b++) if (HOME_BGS[b].key !== "default") bgs.push(HOME_BGS[b].key);
      if (!bgs.length) {
        lotAddPoints(p, 20, "积分夺宝背景转化");
        res.desc = "已拥有全部背景，转化 20 积分";
        res.dup = true;
      } else {
        var bk = bgs[Math.floor(Math.random() * bgs.length)];
        var ownedBgs = p.bgOwned || [];
        if (ownedBgs.indexOf(bk) >= 0) {
          lotAddPoints(p, 20, "积分夺宝背景转化");
          res.desc = "已拥有背景，转化 20 积分";
          res.dup = true;
        } else {
          if (!p.bgOwned) p.bgOwned = [];
          p.bgOwned.push(bk);
          var bgn = bk;
          for (var bi = 0; bi < HOME_BGS.length; bi++) if (HOME_BGS[bi].key === bk) bgn = HOME_BGS[bi].name;
          res.name = "背景 · " + bgn;
          res.desc = "已获得背景「" + bgn + "」，可在设置中切换";
        }
      }
    } else {
      var fk = AVATAR_FRAMES[Math.floor(Math.random() * AVATAR_FRAMES.length)].key;
      var ownedF = p.avatarFramesOwned || [];
      if (ownedF.indexOf(fk) >= 0) {
        lotAddPoints(p, 10, "积分夺宝头像框转化");
        res.desc = "已拥有头像框，转化 10 积分";
        res.dup = true;
      } else {
        if (!p.avatarFramesOwned) p.avatarFramesOwned = [];
        p.avatarFramesOwned.push(fk);
        var fn = fk;
        for (var fi = 0; fi < AVATAR_FRAMES.length; fi++) if (AVATAR_FRAMES[fi].key === fk) fn = AVATAR_FRAMES[fi].name;
        res.name = "头像框 · " + fn;
        res.desc = "已获得头像框「" + fn + "」，可在个人中心佩戴";
      }
    }
  } else if (prize.key === "challenge") {
    p.quizChallengeCount = (p.quizChallengeCount || 0) + 1;
    res.desc = "题目挑战次数 +1，答对按难度得 30/40/50 积分";
  } else if (prize.key === "unlock") {
    var us = pickUnlockSub();
    p.quizUnlockUntil = Math.max(now, p.quizUnlockUntil || 0) + us.ms;
    res.desc = "答案解析时间 +" + us.label;
    res.pct = 12 * us.w; // 个体概率 = 奖池12% × 子加权
  } else if (prize.key === "skin") {
    var nf = rollSkinFragments();
    p.skinFragments = (p.skinFragments || 0) + nf;
    res.name = nf + " 皮肤碎片";
    res.amount = nf;
    res.desc = "皮肤碎片 +" + nf + "，可在皮肤图鉴合成衣服";
    var fp = nf === 88 ? 2 : nf === 58 ? 6 : nf === 28 ? 12 : nf === 18 ? 25 : 55;
    res.pct = 18 * fp / 100; // 个体概率 = 奖池18% × 档位占比
  } else if (prize.key === "badge") {
    var bg = pickBadge();
    res.pct = 10 * bg.weight / 100; // 个体概率 = 奖池10% × 徽章权重
    var ownedBadges = p.badgesOwned || [];
    if (ownedBadges.indexOf(bg.key) >= 0) {
      lotAddPoints(p, 20, "积分夺宝徽章重复转化");
      res.name = "徽章 · " + bg.name;
      res.desc = "重复徽章，转化 20 积分";
      res.rare = bg.rarity === "传说";
      res.dup = true; // 重复徽章不触发大奖闪光
    } else {
      if (!p.badgesOwned) p.badgesOwned = [];
      p.badgesOwned.push(bg.key);
      res.name = "徽章 · " + bg.name;
      res.desc = "已获得限定徽章「" + bg.name + "」";
      res.rare = bg.rarity === "史诗" || bg.rarity === "传说";
    }
  } else if (prize.key === "empty") {
    res.desc = "很遗憾，什么也没抽到";
  }
  saveProfile(p);
  return res;
}
// 王者祈愿式抽奖动画: 全屏暗场 + 光球升腾 + 星尘上升,爆破后进入卡片翻牌揭晓
function lotteryWish(results, cb) {
  var overlay = document.createElement("div");
  overlay.id = "lotteryWishOverlay";
  overlay.className = "wish";
  var dots = "";
  for (var i = 0; i < 14; i++) {
    var left = (6 + Math.random() * 88).toFixed(1);
    var size = (3 + Math.random() * 4).toFixed(1);
    var dur = (0.5 + Math.random() * 0.4).toFixed(2);
    var delay = (Math.random() * 0.3).toFixed(2);
    var top = (54 + Math.random() * 22).toFixed(1);
    dots += '<div class="wish-dot" style="left:' + left + '%;top:' + top + '%;width:' + size + 'px;height:' + size + 'px;animation-duration:' + dur + 's;animation-delay:' + delay + 's"></div>';
  }
  overlay.innerHTML = '<div class="wish-glow"></div>' + dots +
    '<div class="wish-orb"></div>' +
    '<div class="wish-title">星辰汇聚 · 祈愿中<small>' + (results.length > 1 ? "十连祈愿 · 必出其一" : "心之所向,星河回响") + '</small></div>';
  document.body.appendChild(overlay);
  setTimeout(function() {
    var burst = document.createElement("div");
    burst.className = "wish-burst";
    overlay.appendChild(burst);
    for (var p = 0; p < 16; p++) {
      var part = document.createElement("div");
      part.className = "wish-particle";
      var ang = Math.random() * Math.PI * 2;
      var dist = 60 + Math.random() * 95;
      part.style.setProperty("--fx", (Math.cos(ang) * dist).toFixed(0) + "px");
      part.style.setProperty("--fy", (Math.sin(ang) * dist).toFixed(0) + "px");
      part.style.left = "50%";
      part.style.top = "43%";
      part.style.animationDelay = (p * 0.018).toFixed(2) + "s";
      overlay.appendChild(part);
    }
  }, 600);
  setTimeout(function() {
    overlay.remove();
    showLotteryResult(results);
    if (cb) cb();
  }, 1000);
}
// 中奖高亮判定: 积分666/888/999、VIP、未拥有徽章、58/88 碎片视为大奖;水晶特别高亮(独立判定)
function isWinResult(r) {
  if (!r || r.dup) return false;
  if (r.key === "vip") return true;
  if (r.key === "badge") return true; // 未拥有的徽章(dup 已排除)
  if (r.key === "points") return r.amount === 666 || r.amount === 888 || r.amount === 999;
  if (r.key === "skin") return r.amount === 58 || r.amount === 88;
  return false;
}
function isCrystalResult(r) { return !!r && r.key === "crystal"; }
// 兼容旧调用: 任何高亮(大奖或水晶)即视为 jackpot
function isJackpotResult(r) { return isWinResult(r) || isCrystalResult(r); }
function lotteryDraw(n) {
  if (_lotteryBusy) return;
  var cost = n === 10 ? 280 : 30;
  var p0 = loadProfile();
  if ((p0.points || 0) < cost) { showToast("积分不足，无法抽奖"); renderLottery(); return; }
  _lotteryBusy = true;
  addPoints(-cost, "积分夺宝" + (n === 10 ? "十连抽" : "单抽"));
  var results = [], i;
  for (i = 0; i < n; i++) {
    var pp = loadProfile();
    pp.lotteryLuck = (pp.lotteryLuck || 0) + 1;
    saveProfile(pp);
    var prize = pickLotteryReward(pp.lotteryLuck);
    results.push(applyLotteryReward(prize));
  }
  renderLottery();
  // 九宫格快速闪烁, 强化期待感
  var grid = document.getElementById("lotteryGrid");
  if (grid) grid.classList.add("drawing");
  lotteryWish(results, function() {
    _lotteryBusy = false;
    if (grid) grid.classList.remove("drawing");
    renderLottery();
  });
}
// 大奖音效: WebAudio 上行琶音
function playWinChime() {
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var notes = [523.25, 659.25, 783.99, 1046.5];
    for (var i = 0; i < notes.length; i++) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sine"; o.frequency.value = notes[i];
      var t0 = ctx.currentTime + i * 0.09;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.22, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.35);
      o.start(t0); o.stop(t0 + 0.4);
    }
  } catch(e) {}
}
function showLotteryResult(results) {
  var overlay = document.createElement("div");
  overlay.id = "lotteryResultOverlay";
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:680;display:flex;align-items:center;justify-content:center;padding:20px";
  var box = document.createElement("div");
  box.className = "lrBox";
  box.style.cssText = "position:relative;background:var(--card-bg);border-radius:20px;padding:20px;max-width:340px;width:100%;max-height:80vh;overflow-y:auto;";
  var hasRare = false, hasJackpot = false, i;
  for (i = 0; i < results.length; i++) { if (results[i].rare) hasRare = true; if (isJackpotResult(results[i])) hasJackpot = true; }
  var headIc = results[0].key === "crystal" ? "🏆" : hasJackpot ? "🌟" : hasRare ? "🎉" : "✨";
  var h = '<button class="modal-close">✕</button>';
  h += '<div style="text-align:center;margin-bottom:12px">' +
    '<div style="font-size:34px">' + headIc + '</div>' +
    '<p style="font-size:16px;font-weight:800;color:var(--text);margin:4px 0 0">' +
    (results.length > 1 ? "十连抽结果" : (results[0].key === "crystal" ? "恭喜获得法魂水晶！" : (hasJackpot ? "恭喜抽中大奖！" : (hasRare ? "获得稀有奖励！" : "获得奖品")))) + '</p>' +
    (hasJackpot ? '<div style="font-size:11px;font-weight:700;color:#f7b733;margin-top:4px">✦ 大奖降临 ✦</div>' : '') + '</div>';
  h += '<div class="lottery-result-list' + (results.length > 1 ? ' multi' : '') + '">';
  for (i = 0; i < results.length; i++) {
    var r = results[i];
    var RK = { crystal:'r-legend', vip:'r-legend', bgFrame:'r-epic', badge:'r-epic', challenge:'r-brave', skin:'r-brave' };
    var rcls = RK[r.key] || 'r-common';
    h += '<div class="lr-item ' + rcls + (r.rare ? ' rare' : '') + (isJackpotResult(r) ? ' jackpot' : '') + (isCrystalResult(r) ? ' crystal-prize' : '') + '" style="animation-delay:' + (i * 0.06).toFixed(2) + 's"><span class="lr-ic">' + r.icon + '</span>' +
      '<div style="flex:1;min-width:0"><div class="lr-name">' + escHtml(r.name) + '</div><div class="lr-desc">' + escHtml(r.desc) + '</div></div></div>';
  }
  h += '</div>';
  h += '<button onclick="document.getElementById(\'lotteryResultOverlay\').remove()" style="width:100%;margin-top:14px;padding:12px;border:none;border-radius:12px;background:var(--accent);color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">收下</button>';
  box.innerHTML = h;
  if (hasJackpot) {
    var flash = document.createElement("div");
    flash.className = "lrf";
    overlay.appendChild(flash);
    // 大奖瞬间: 上行琶音 + 震动 + 弹窗抖动
    playWinChime();
    try { if (navigator.vibrate) navigator.vibrate([60, 40, 60, 40, 120]); } catch(e) {}
    box.classList.add("shake");
  }
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  var mc = box.querySelector(".modal-close");
  if (mc) mc.onclick = function() { overlay.remove(); };
}
function openLotteryExchange() {
  var p = loadProfile();
  var cry = p.soulCrystals || 0;
  if (cry < 1) { showToast("暂无法魂水晶，抽奖可得"); return; }
  if (localStorage.getItem(VIP_KEY) === "1") { showToast("您已是永久VIP"); return; }
  if (!confirm("消耗 1 个法魂水晶，兑换永久 VIP？\n（当前水晶 " + cry + " 个）")) return;
  p.soulCrystals = cry - 1;
  saveProfile(p);
  setVip(true);
  renderLottery();
  showToast("🎉 已兑换永久 VIP");
}
function rarityCls(r) {
  // 皮肤档位: 普通/勇者/史诗/传说/典藏
  if (r === "普通") return "common";
  if (r === "勇者") return "brave";
  if (r === "典藏") return "mythic";
  // 徽章档位: 基础/稀有/史诗/传说
  if (r === "基础") return "basic";
  if (r === "稀有") return "rare";
  if (r === "史诗") return "epic";
  return "legend";
}
function skinNameByKey(key) { for (var i = 0; i < SKINS.length; i++) if (SKINS[i].key === key) return SKINS[i].name; return ""; }
// 虚拟角色(法海星旅)SVG —— 法袍颜色与饰品随佩戴皮肤变化(back=身后层,front=身前层)
// ===== 换装系统：女性模特基底 + 上衣/下装部件化自由搭配 =====
var _HAIR_C = "#4a3b52", _FACE_C = "#ffd9b3";

function _lgStar(x, y, s, fill, op) {
  return '<path d="M' + x + ' ' + (y - s) + ' L' + (x + s * 0.32) + ' ' + (y - s * 0.32) + ' L' + (x + s) + ' ' + y + ' L' + (x + s * 0.32) + ' ' + (y + s * 0.32) + ' L' + x + ' ' + (y + s) + ' L' + (x - s * 0.32) + ' ' + (y + s * 0.32) + ' L' + (x - s) + ' ' + y + ' L' + (x - s * 0.32) + ' ' + (y - s * 0.32) + ' Z" fill="' + fill + '" opacity="' + (op || ".9") + '"/>';
}
// 上衣部件：衣身+衣领+袖+腰带（覆盖图层 y57-96）
function _topGroup(top, gid) {
  var g = '<path d="M45 57 Q60 52 75 57 L78 95 Q60 99.5 42 95 Z" fill="url(#' + gid + ')"/>';
  g += '<path d="M52 57 L60 68 L68 57 Q60 53.5 52 57 Z" fill="' + top.c2 + '"/>';
  g += '<path d="M52 57 L60 68 L68 57" fill="none" stroke="#ffffff" stroke-width="1" opacity=".35"/>';
  g += '<path d="M45 58 Q39 60 38.5 92 L47 94 Q48 72 50 62 Z" fill="url(#' + gid + ')"/>';
  g += '<path d="M75 58 Q81 60 81.5 92 L73 94 Q72 72 70 62 Z" fill="url(#' + gid + ')"/>';
  g += '<rect x="43.5" y="89" width="33" height="5.5" rx="2.75" fill="' + top.c2 + '"/>';
  g += '<circle cx="60" cy="91.8" r="1.8" fill="#fff" opacity=".8"/>';
  if (top.deco === "stars") g += _lgStar(52, 74, 3.4, "#fff") + _lgStar(66, 82, 2.6, "#fff", ".8") + '<circle cx="70" cy="70" r="1.1" fill="#fff" opacity=".8"/>';
  if (top.deco === "gem") g += '<circle cx="60" cy="77" r="4.2" fill="#fff" opacity=".92"/><circle cx="60" cy="77" r="2.2" fill="#e11d48"/>';
  if (top.deco === "trim") g += '<path d="M45 57 Q60 52 75 57" fill="none" stroke="#fbbf24" stroke-width="2"/>';
  return g;
}
// 下装部件：短裙/长裙/短裤/长裤（覆盖图层 y93+）
function _bottomGroup(bottom, gid) {
  var type = bottom.type || "longskirt";
  var g;
  if (type === "skirt") {
    g = '<path d="M46 93 L41 111 Q60 116 79 111 L74 93 Q60 98 46 93 Z" fill="url(#' + gid + ')"/>';
    g += '<path d="M50 96 L47 109 M60 97 L60 113 M70 96 L73 109" stroke="#000" opacity=".12" stroke-width="1.4" fill="none"/>';
  } else if (type === "shorts") {
    g = '<path d="M47 94 L45.5 112 L56.5 112 L60 100 L63.5 112 L74.5 112 L73 94 Q60 98 47 94 Z" fill="url(#' + gid + ')"/>';
  } else if (type === "pants") {
    g = '<path d="M47 94 L45 130 L56.5 130 L59.5 102 L60.5 102 L63.5 130 L75 130 L73 94 Q60 98 47 94 Z" fill="url(#' + gid + ')"/>';
  } else {
    g = '<path d="M46 93 L37 126 Q60 132 83 126 L74 93 Q60 98 46 93 Z" fill="url(#' + gid + ')"/>';
    g += '<path d="M37 126 Q60 132 83 126" stroke="#fff" opacity=".3" stroke-width="1.6" fill="none"/>';
    g += '<path d="M50 96 L45 124 M60 98 L60 128 M70 96 L75 124" stroke="#000" opacity=".12" stroke-width="1.4" fill="none"/>';
    if (bottom.deco === "waves") g += '<path d="M40 120 q3 -4 6 0 q3 4 6 0 q3 -4 6 0 q3 4 6 0 q3 -4 6 0 q3 4 6 0 q3 -4 6 0" stroke="#e0f2fe" stroke-width="2" fill="none" stroke-linecap="round"/>';
    if (bottom.deco === "stars") g += _lgStar(50, 108, 2.8, "#fff", ".85") + _lgStar(68, 116, 2.2, "#fff", ".75");
    if (bottom.deco === "aurora") g += '<path d="M40 118 Q52 108 62 118 Q72 108 80 116" stroke="#99f6e4" stroke-width="2" fill="none" opacity=".7"/>';
  }
  return g;
}
// 组装：后发→腿鞋→下装→躯干手臂→上衣→手→头脸前发→配饰
function outfitSVG(o, w, h) {
  w = w || 96; h = h || 120;
  var top = o.top || { key: "t0", c1: "#f8fafc", c2: "#cbd5e1" };
  var bottom = o.bottom || { key: "b0", c1: "#334155", c2: "#1e293b", type: "skirt" };
  var gt = "gt-" + top.key, gb = "gb-" + bottom.key;
  var s = '<svg viewBox="0 0 120 150" width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg">';
  s += '<defs><linearGradient id="' + gt + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + top.c1 + '"/><stop offset="1" stop-color="' + top.c2 + '"/></linearGradient>'
     + '<linearGradient id="' + gb + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + bottom.c1 + '"/><stop offset="1" stop-color="' + bottom.c2 + '"/></linearGradient></defs>';
  if (o.accBack) s += o.accBack;
  s += '<path d="M40 30 Q38 14 60 12 Q82 14 80 30 L83 84 Q83 96 72 97 L48 97 Q37 96 37 84 Z" fill="' + _HAIR_C + '"/>';
  s += '<rect x="50.5" y="98" width="8" height="36" rx="4" fill="' + _FACE_C + '"/><rect x="61.5" y="98" width="8" height="36" rx="4" fill="' + _FACE_C + '"/>';
  s += '<rect x="48" y="131" width="12.5" height="8" rx="4" fill="#8a5a44"/><rect x="59.5" y="131" width="12.5" height="8" rx="4" fill="#8a5a44"/>';
  s += _bottomGroup(bottom, gb);
  s += '<path d="M46 58 Q60 53 74 58 L71 96 L49 96 Z" fill="' + _FACE_C + '"/>';
  s += '<rect x="36.5" y="59" width="7.5" height="40" rx="3.75" fill="' + _FACE_C + '" transform="rotate(7 40 61)"/>';
  s += '<rect x="76" y="59" width="7.5" height="40" rx="3.75" fill="' + _FACE_C + '" transform="rotate(-7 80 61)"/>';
  s += _topGroup(top, gt);
  s += '<circle cx="40.5" cy="101" r="3.8" fill="' + _FACE_C + '"/><circle cx="79.5" cy="101" r="3.8" fill="' + _FACE_C + '"/>';
  s += '<circle cx="41.5" cy="42" r="3" fill="' + _FACE_C + '"/><circle cx="78.5" cy="42" r="3" fill="' + _FACE_C + '"/>';
  s += '<circle cx="60" cy="40" r="19" fill="' + _FACE_C + '"/>';
  s += '<circle cx="52.5" cy="42" r="2.7" fill="#2b2b33"/><circle cx="67.5" cy="42" r="2.7" fill="#2b2b33"/>';
  s += '<circle cx="53.4" cy="41" r="0.9" fill="#fff"/><circle cx="68.4" cy="41" r="0.9" fill="#fff"/>';
  s += '<path d="M48.5 38.6 q4 -3.4 8 -1.4" stroke="#2b2b33" stroke-width="1.2" fill="none" stroke-linecap="round"/>';
  s += '<path d="M63.5 37.2 q4 -2 8 1.4" stroke="#2b2b33" stroke-width="1.2" fill="none" stroke-linecap="round"/>';
  s += '<circle cx="47" cy="48" r="3.2" fill="#ff9d9d" opacity=".35"/><circle cx="73" cy="48" r="3.2" fill="#ff9d9d" opacity=".35"/>';
  s += '<path d="M55.5 50.5 Q60 54.5 64.5 50.5" stroke="#c96f4a" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
  s += '<path d="M41 42 Q40 19 60 18.5 Q80 19 79 42 Q75.5 30 68.5 32.5 Q72 37 62.5 38 Q52.5 38.8 47 33.5 Q44 37.5 41 42 Z" fill="' + _HAIR_C + '"/>';
  s += '<path d="M41 40 Q38.5 52 43 61 L47.5 59 Q43.5 50 45 41 Z" fill="' + _HAIR_C + '"/>';
  s += '<path d="M79 40 Q81.5 52 77 61 L72.5 59 Q76.5 50 75 41 Z" fill="' + _HAIR_C + '"/>';
  if (o.accFront) s += o.accFront;
  s += '</svg>';
  return s;
}
// 成套皮肤 = 预设搭配（保留各皮肤的专属配饰）
var SKIN_OUTFITS = {
  sea:      { top: { key: "tsea", c1: "#38bdf8", c2: "#0284c7" }, bottom: { key: "bsea", c1: "#38bdf8", c2: "#0284c7", type: "longskirt", deco: "waves" } },
  ink:      { top: { key: "tink", c1: "#94a3b8", c2: "#334155" }, bottom: { key: "bink", c1: "#475569", c2: "#1e293b", type: "pants" },
              accFront: '<rect x="40" y="86" width="19" height="3.6" rx="1.8" transform="rotate(-26 49 88)" fill="#0f172a"/><rect x="40" y="86" width="4" height="3.6" rx="1.8" transform="rotate(-26 49 88)" fill="#f8fafc"/>' },
  star:     { top: { key: "tstar", c1: "#a78bfa", c2: "#6d28d9", deco: "stars" }, bottom: { key: "bstar", c1: "#a78bfa", c2: "#6d28d9", type: "longskirt", deco: "stars" } },
  tide:     { top: { key: "ttide", c1: "#34d399", c2: "#047857" }, bottom: { key: "btide", c1: "#34d399", c2: "#047857", type: "shorts" },
              accFront: '<circle cx="40" cy="60" r="4.2" fill="#047857"/><circle cx="80" cy="60" r="4.2" fill="#047857"/><path d="M54 76 l6 -5 6 5 v6 q-6 5 -6 5 q-6 -5 -6 -5 Z" fill="#a7f3d0" opacity=".95"/>' },
  gold:     { top: { key: "tgold", c1: "#f7b733", c2: "#b45309", deco: "gem" }, bottom: { key: "bgold", c1: "#f7b733", c2: "#b45309", type: "longskirt" },
              accFront: '<path d="M48 14 l3 -5 3 5 3 -6 3 6 3 -5 3 5 v4 h-18 Z" fill="#f7b733" stroke="#b45309" stroke-width="1.1"/><circle cx="60" cy="9" r="1.6" fill="#fde68a"/>' },
  aurora:   { top: { key: "taur", c1: "#2dd4bf", c2: "#0d9488" }, bottom: { key: "baur", c1: "#2dd4bf", c2: "#0d9488", type: "longskirt", deco: "aurora" } },
  crown:    { top: { key: "tcrown", c1: "#fb7185", c2: "#be185d", deco: "trim" }, bottom: { key: "bcrown", c1: "#fb7185", c2: "#be185d", type: "longskirt" },
              accFront: '<g><rect x="88" y="70" width="3" height="34" rx="1.5" fill="#b45309"/><rect x="80" y="88" width="19" height="15" rx="3.5" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/><rect x="85" y="91" width="9" height="9" rx="2" fill="#fff7d6"/><circle cx="89.5" cy="95.5" r="9" fill="#fbbf24" opacity=".28"/></g>' },
  lord:     { top: { key: "tlord", c1: "#e2e8f0", c2: "#94a3b8", deco: "trim" }, bottom: { key: "blord", c1: "#e2e8f0", c2: "#94a3b8", type: "longskirt" },
              accBack: '<circle cx="60" cy="40" r="29" fill="none" stroke="#fef3c7" stroke-width="2.2" opacity=".7"/>' },
  starlord: { top: { key: "tsl", c1: "#8b5cf6", c2: "#b45309", deco: "gem" }, bottom: { key: "bsl", c1: "#8b5cf6", c2: "#5b21b6", type: "longskirt", deco: "stars" },
              accBack: '<path d="M42 58 Q24 100 36 140 L84 140 Q96 100 78 58 Z" fill="#6d28d9" opacity=".6"/>',
              accFront: '<path d="M46 10 l3 -6 3 6 4 -8 4 8 3 -6 3 6 v4 h-20 Z" fill="#f7b733" stroke="#b45309" stroke-width="1.2"/>' + _lgStar(50, 74, 3, "#ede9fe") + _lgStar(72, 88, 2.4, "#ede9fe", ".85") }
};
// 成套皮肤渲染入口（图鉴卡片/展示区仍调用此函数）
function characterSVG(skinKey, w, h) {
  var o = SKIN_OUTFITS[skinKey] || { top: { key: "t0", c1: "#f8fafc", c2: "#cbd5e1" }, bottom: { key: "b0", c1: "#334155", c2: "#1e293b", type: "skirt" } };
  return outfitSVG(o, w, h);
}
// ===== 自由搭配部件库（AI 生图素材: images/dress/*.webp, fit 为叠加定位百分比） =====
var DRESS_BASE = "images/dress/base.webp";
var TOPS = [
  { key: "shirt",   name: "律政白衬衫", cost: 0,   rarity: "初始", c1: "#f8fafc", c2: "#cbd5e1", free: true, img: "images/dress/top-shirt.webp", fit: { w: 100, y: 0 } },
  { key: "sea-t",   name: "沧海短衫",   cost: 38,  rarity: "普通", c1: "#38bdf8", c2: "#0284c7", img: "images/dress/top-sea.webp", fit: { w: 100, y: 0 } },
  { key: "ink-t",   name: "墨海书衣",   cost: 38,  rarity: "普通", c1: "#94a3b8", c2: "#334155", img: "images/dress/top-ink.webp", fit: { w: 100, y: 0 } },
  { key: "star-t",  name: "星河衫",     cost: 120, rarity: "勇者", c1: "#a78bfa", c2: "#6d28d9", img: "images/dress/top-star.webp", fit: { w: 100, y: 0 } },
  { key: "gold-t",  name: "鎏金华服",   cost: 240, rarity: "史诗", c1: "#f7b733", c2: "#b45309", img: "images/dress/top-gold.webp", fit: { w: 100, y: 0 } },
  { key: "crown-t", name: "执灯红衣",   cost: 400, rarity: "传说", c1: "#fb7185", c2: "#be185d", img: "images/dress/top-crown.webp", fit: { w: 100, y: 0 } }
];
var BOTTOMS = [
  { key: "skirt",   name: "藏青百褶裙", cost: 0,   rarity: "初始", c1: "#334155", c2: "#1e293b", type: "skirt", free: true, img: "images/dress/bottom-skirt.webp", fit: { w: 100, y: 0 } },
  { key: "sea-b",   name: "沧海袍摆",   cost: 38,  rarity: "普通", c1: "#38bdf8", c2: "#0284c7", type: "longskirt", img: "images/dress/bottom-sea.webp", fit: { w: 100, y: 0 } },
  { key: "ink-b",   name: "墨色长裤",   cost: 38,  rarity: "普通", c1: "#475569", c2: "#1e293b", type: "pants", img: "images/dress/bottom-ink.webp", fit: { w: 100, y: 0 } },
  { key: "star-b",  name: "星河长裙",   cost: 120, rarity: "勇者", c1: "#a78bfa", c2: "#6d28d9", type: "longskirt", img: "images/dress/bottom-star.webp", fit: { w: 100, y: 0 } },
  { key: "gold-b",  name: "鎏金舞裙",   cost: 240, rarity: "史诗", c1: "#f7b733", c2: "#b45309", type: "longskirt", img: "images/dress/bottom-gold.webp", fit: { w: 100, y: 0 } },
  { key: "crown-b", name: "执灯长裙",   cost: 400, rarity: "传说", c1: "#fb7185", c2: "#be185d", type: "longskirt", img: "images/dress/bottom-crown.webp", fit: { w: 100, y: 0 } }
];
// 三层叠加换装视觉: 基底 → 下装 → 上衣
function outfitVisualHTML(top, bottom, wPx) {
  var h = Math.round(wPx * 560 / 420);
  var s = '<div style="position:relative;width:' + wPx + 'px;height:' + h + 'px;overflow:hidden;margin:0 auto;background:linear-gradient(180deg,var(--accent-light),transparent)">';
  s += '<img src="' + DRESS_BASE + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain" />';
  if (bottom && bottom.img) {
    var bf = bottom.fit || { w: 70, y: 40 };
    s += '<img src="' + bottom.img + '" style="position:absolute;left:50%;transform:translateX(-50%);top:' + bf.y + '%;width:' + bf.w + '%;z-index:2" />';
  }
  if (top && top.img) {
    var tf = top.fit || { w: 76, y: 25 };
    s += '<img src="' + top.img + '" style="position:absolute;left:50%;transform:translateX(-50%);top:' + tf.y + '%;width:' + tf.w + '%;z-index:3" />';
  }
  s += '</div>';
  return s;
}
function topByKey(k) { for (var i = 0; i < TOPS.length; i++) if (TOPS[i].key === k) return TOPS[i]; return null; }
function bottomByKey(k) { for (var i = 0; i < BOTTOMS.length; i++) if (BOTTOMS[i].key === k) return BOTTOMS[i]; return null; }
// 迁移：初始化搭配数据；已拥有的成套皮肤自动解锁对应部件
function ensureOutfitData(p) {
  var changed = false;
  if (!p.outfit || !p.outfit.top || !p.outfit.bottom) { p.outfit = { top: "shirt", bottom: "skirt" }; changed = true; }
  if (!p.topsOwned) { p.topsOwned = ["shirt"]; changed = true; }
  if (!p.bottomsOwned) { p.bottomsOwned = ["skirt"]; changed = true; }
  var grantMap = { sea: ["sea-t", "sea-b"], ink: ["ink-t", "ink-b"], star: ["star-t", "star-b"], gold: ["gold-t", "gold-b"], crown: ["crown-t", "crown-b"] };
  for (var i = 0; i < (p.skinsOwned || []).length; i++) {
    var g = grantMap[p.skinsOwned[i]];
    if (!g) continue;
    if (topByKey(g[0]) && p.topsOwned.indexOf(g[0]) < 0) { p.topsOwned.push(g[0]); changed = true; }
    if (bottomByKey(g[1]) && p.bottomsOwned.indexOf(g[1]) < 0) { p.bottomsOwned.push(g[1]); changed = true; }
  }
  return changed;
}

// ===== 皮肤图鉴（碎片合成衣服 + 佩戴） =====
var _skinTab = "sets";
function openSkinGallery() {
  var p = loadProfile();
  if (ensureOutfitData(p)) saveProfile(p);
  var frags = p.skinFragments || 0, owned = p.skinsOwned || [], active = p.activeSkin || "";
  var overlay = document.createElement("div");
  overlay.id = "skinGalleryOverlay";
  overlay.className = "lottery-challenge";
  var box = document.createElement("div");
  box.className = "lottery-challenge-box gallery-box";
  var cry = p.soulCrystals || 0;
  var h = '<button class="modal-close">✕</button>';
  h += '<div class="g-tabs"><button class="g-tab' + (_skinTab !== "mix" ? " on" : "") + '" data-tab="sets">成套皮肤</button><button class="g-tab' + (_skinTab === "mix" ? " on" : "") + '" data-tab="mix">自由搭配</button></div>';
  if (_skinTab === "mix") {
    h += _renderDressTab(p);
    box.innerHTML = h;
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    _bindGalleryCommon(box, overlay);
    _bindDressChips(box, overlay);
    return;
  }
  h += '<div style="text-align:center;margin-bottom:2px"><div style="font-size:15px;font-weight:800;color:var(--text)">皮肤图鉴</div>' +
    '<div style="font-size:11px;color:var(--text2);margin-top:3px">碎片 <b style="color:var(--accent)">' + frags + '</b> · 法魂水晶 <b style="color:#f7b733">' + cry + '</b></div></div>';
  var activeSkinObj = null;
  for (var ai = 0; ai < SKINS.length; ai++) if (SKINS[ai].key === active) activeSkinObj = SKINS[ai];
  var wearColor = "#7dd3fc", wearName = "未佩戴皮肤", avatarHtml;
  if (activeSkinObj && activeSkinObj.art) {
    wearColor = activeSkinObj.color; wearName = activeSkinObj.name;
    avatarHtml = '<img class="g-art-img" src="' + activeSkinObj.art + '" alt="" onclick="viewSkinArt(\'' + activeSkinObj.key + '\')" />';
  } else if (activeSkinObj) {
    wearColor = activeSkinObj.color; wearName = activeSkinObj.name;
    avatarHtml = characterSVG(active);
  } else if (p.outfit && topByKey(p.outfit.top) && bottomByKey(p.outfit.bottom)) {
    wearColor = topByKey(p.outfit.top).c1; wearName = "自由搭配";
    avatarHtml = outfitVisualHTML(topByKey(p.outfit.top), bottomByKey(p.outfit.bottom), 96);
  } else {
    avatarHtml = characterSVG("");
  }
  h += '<div class="g-char"><div class="g-char-avatar' + (activeSkinObj && activeSkinObj.art ? ' has-art' : '') + '">' + avatarHtml + '</div>' +
    '<div class="g-char-info"><div class="g-char-title">虚拟角色 · 法海星旅</div>' +
    '<div class="g-char-wear" style="color:' + wearColor + '">' + (active || (p.outfit && p.outfit.top) ? '穿着「' + escHtml(wearName) + '」' : '未佩戴皮肤') + '</div>' +
    '<div class="g-char-hint">普通88/勇者288/史诗588/传说988碎片,典藏需1法魂水晶</div></div></div>';
  h += '<div class="g-grid">';
  for (var i = 0; i < SKINS.length; i++) {
    var s = SKINS[i];
    var has = owned.indexOf(s.key) >= 0;
    var isActive = active === s.key;
    var cls = "g-card" + (has ? " owned" : " locked") + (isActive ? " active" : "");
    // 卡片按皮肤主题色轻微着色,预览图直接展示穿着该皮肤的角色
    var cardStyle = has
      ? 'border-color:' + s.color + ';background:linear-gradient(165deg,' + s.color + '1f,transparent 68%)'
      : '';
    var preview = s.art ? '<img src="' + s.art + '" alt="" loading="lazy" />' : characterSVG(s.key, 58, 72);
    h += '<div class="' + cls + '" style="' + cardStyle + '">' +
      '<div class="g-char-mini">' + preview + '</div>' +
      '<div class="g-name">' + escHtml(s.name) + '</div>' +
      '<div class="g-rarity g-rarity-' + rarityCls(s.rarity) + '" style="color:' + s.color + '">' + s.rarity + ' · ' + (s.crystal ? "1水晶" : s.cost + "碎片") + '</div>' +
      '<div class="g-desc">' + escHtml(s.desc) + '</div>';
    if (has) {
      h += '<button class="g-btn' + (isActive ? " on" : "") + '" data-action="wear" data-key="' + s.key + '">' + (isActive ? "佩戴中" : "佩戴") + '</button>';
    } else {
      var can = s.crystal ? (cry >= 1) : (frags >= s.cost);
      h += '<button class="g-btn craft' + (can ? "" : " off") + '" data-action="craft" data-key="' + s.key + '"' + (can ? "" : " disabled") + '>合成</button>';
    }
    h += '</div>';
  }
  h += '</div>';
  box.innerHTML = h;
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  _bindGalleryCommon(box, overlay);
}
// 图鉴弹层公共绑定（关闭按钮 + 成套皮肤卡片按钮 + 页签切换）
function _bindGalleryCommon(box, overlay) {
  var mc = box.querySelector(".modal-close");
  if (mc) mc.onclick = function() { overlay.remove(); };
  var tabs = box.querySelectorAll(".g-tab");
  for (var ti = 0; ti < tabs.length; ti++) {
    tabs[ti].onclick = function() {
      _skinTab = this.getAttribute("data-tab");
      overlay.remove();
      openSkinGallery();
    };
  }
  var btns = box.querySelectorAll("button[data-action]");
  for (var bi = 0; bi < btns.length; bi++) {
    btns[bi].onclick = function() {
      var act = this.getAttribute("data-action"), key = this.getAttribute("data-key");
      var pp = loadProfile();
      if (act === "wear") {
        pp.activeSkin = key;
      } else if (act === "craft") {
        var sk = null;
        for (var i2 = 0; i2 < SKINS.length; i2++) if (SKINS[i2].key === key) sk = SKINS[i2];
        if (!sk) return;
        if (sk.crystal) {
          if ((pp.soulCrystals || 0) < 1) { showToast("法魂水晶不足"); return; }
          pp.soulCrystals = (pp.soulCrystals || 0) - 1;
        } else {
          if ((pp.skinFragments || 0) < sk.cost) { showToast("皮肤碎片不足"); return; }
          pp.skinFragments = (pp.skinFragments || 0) - sk.cost;
        }
        if (!pp.skinsOwned) pp.skinsOwned = [];
        pp.skinsOwned.push(sk.key);
        pp.activeSkin = sk.key;
      }
      saveProfile(pp);
      renderLottery();
      overlay.remove();
      openSkinGallery();
      showToast(act === "wear" ? "已佩戴「" + skinNameByKey(key) + "」" : "合成成功「" + skinNameByKey(key) + "」");
    };
  }
}

// ===== 自由搭配页签：预览 + 上衣/下装选择 =====
function _renderDressTab(p) {
  ensureOutfitData(p);
  var top = topByKey(p.outfit.top) || TOPS[0];
  var bottom = bottomByKey(p.outfit.bottom) || BOTTOMS[0];
  var h = '<div class="dw-preview">' + outfitVisualHTML(top, bottom, 220) + '</div>';
  h += '<div class="dw-frag">皮肤碎片 <b style="color:var(--accent)">' + (p.skinFragments || 0) + '</b> · 点击部件直接换上，未拥有的用碎片合成</div>';
  h += '<div class="dw-label">上衣</div><div class="dw-row">';
  for (var i = 0; i < TOPS.length; i++) {
    var t = TOPS[i];
    var has = p.topsOwned.indexOf(t.key) >= 0, on = p.outfit.top === t.key;
    h += '<button class="dw-chip' + (on ? " active" : "") + (has ? "" : " locked") + '" data-kind="top" data-key="' + t.key + '"><img class="dw-thumb" src="' + t.img + '" />' + t.name + (has ? "" : '<span class="dw-cost">' + t.cost + '碎片</span>') + '</button>';
  }
  h += '</div><div class="dw-label">下装</div><div class="dw-row">';
  for (var j = 0; j < BOTTOMS.length; j++) {
    var b = BOTTOMS[j];
    var hasB = p.bottomsOwned.indexOf(b.key) >= 0, onB = p.outfit.bottom === b.key;
    h += '<button class="dw-chip' + (onB ? " active" : "") + (hasB ? "" : " locked") + '" data-kind="bottom" data-key="' + b.key + '"><img class="dw-thumb" src="' + b.img + '" />' + b.name + (hasB ? "" : '<span class="dw-cost">' + b.cost + '碎片</span>') + '</button>';
  }
  h += '</div><div class="dw-hint">已拥有的成套皮肤会自动解锁对应部件；上衣下装可跨系列自由组合</div>';
  return h;
}
function _bindDressChips(box, overlay) {
  var chips = box.querySelectorAll(".dw-chip");
  for (var i = 0; i < chips.length; i++) {
    chips[i].onclick = function() {
      var kind = this.getAttribute("data-kind"), key = this.getAttribute("data-key");
      var pp = loadProfile();
      ensureOutfitData(pp);
      var item = kind === "top" ? topByKey(key) : bottomByKey(key);
      if (!item) return;
      var ownedArr = kind === "top" ? pp.topsOwned : pp.bottomsOwned;
      if (ownedArr.indexOf(key) >= 0) {
        pp.outfit[kind] = key;
        saveProfile(pp);
        renderLottery();
        overlay.remove();
        openSkinGallery();
        showToast("已换上「" + item.name + "」");
      } else {
        var frags = pp.skinFragments || 0;
        if (frags < item.cost) { showToast("碎片不足，还差 " + (item.cost - frags) + " 个"); return; }
        if (!confirm("用 " + item.cost + " 皮肤碎片合成「" + item.name + "」？")) return;
        pp.skinFragments = frags - item.cost;
        ownedArr.push(key);
        pp.outfit[kind] = key;
        saveProfile(pp);
        renderLottery();
        overlay.remove();
        openSkinGallery();
        showToast("合成成功「" + item.name + "」");
      }
    };
  }
}

// ===== 独立皮肤图鉴：仅保留成套皮肤（覆盖旧弹层入口） =====
var _skinSelected = "";
function openSkinGallery() {
  hideAllViews();
  var view = document.getElementById("skinView");
  view.style.display = "";
  view.classList.add("show");
  renderSkinView();
}
function renderSkinView() {
  var p = loadProfile(), owned = p.skinsOwned || [], active = p.activeSkin || "";
  if (!_skinSelected || !SKINS.some(function(s) { return s.key === _skinSelected; })) _skinSelected = active || SKINS[0].key;
  var selected = SKINS.filter(function(s) { return s.key === _skinSelected; })[0] || SKINS[0];
  var has = owned.indexOf(selected.key) >= 0, isActive = active === selected.key;
  var can = selected.crystal ? (p.soulCrystals || 0) >= 1 : (p.skinFragments || 0) >= selected.cost;
  var art = selected.art || "images/skins/" + selected.key + ".webp";
  var h = '<section class="skin-stage" style="--sc:' + selected.color + '"><img src="' + art + '" alt="" /><div class="skin-stage-copy"><h2>' + escHtml(selected.name) + '</h2><p>' + escHtml(selected.desc) + '</p></div><div class="skin-actions"><button onclick="showToast(\'展示动作敬请期待\')">▷ 展示动作</button><button onclick="showToast(\'“' + escHtml(selected.name) + '” · ' + escHtml(selected.desc) + '\')">▣ 皮肤故事</button></div></section>';
  h += '<div class="skin-tabs"><span class="on">成套皮肤</span></div><div class="skin-rail">';
  for (var i = 0; i < SKINS.length; i++) {
    var s = SKINS[i], own = owned.indexOf(s.key) >= 0;
    var thumb = s.art || "images/skins/" + s.key + ".webp";
    h += '<button class="sp-card' + (s.key === selected.key ? ' selected' : '') + '" style="--sc:' + s.color + '" onclick="selectSkin(\'' + s.key + '\')"><img src="' + thumb + '" alt="" /><span class="sp-name">' + escHtml(s.name) + '</span>' + (own ? '' : '<span class="sp-lock">🔒</span>') + '</button>';
  }
  h += '</div><div class="skin-bottom"><div class="skin-currency">皮肤碎片 <b>' + (p.skinFragments || 0) + '</b>　法魂水晶 <b>' + (p.soulCrystals || 0) + '</b></div>';
  h += '<button class="skin-main-btn' + ((has || can) ? '' : ' off') + '" onclick="applySelectedSkin()">' + (has ? (isActive ? '佩戴中' : '穿戴') : (selected.crystal ? '1 水晶兑换' : selected.cost + ' 碎片合成')) + '</button></div>';
  document.getElementById("skinPage").innerHTML = h;
}
function selectSkin(key) {
  var rail = document.querySelector('#skinView .skin-rail');
  var offset = rail ? rail.scrollLeft : 0;
  _skinSelected = key; renderSkinView();
  rail = document.querySelector('#skinView .skin-rail');
  if (rail) rail.scrollLeft = offset;
}
function applySelectedSkin() {
  var p = loadProfile(), s = SKINS.filter(function(x) { return x.key === _skinSelected; })[0];
  if (!s) return;
  if (!p.skinsOwned) p.skinsOwned = [];
  if (p.skinsOwned.indexOf(s.key) >= 0) { p.activeSkin = s.key; saveProfile(p); renderSkinView(); showToast('已穿戴「' + s.name + '」'); return; }
  if (s.crystal) { if ((p.soulCrystals || 0) < 1) { showToast('法魂水晶不足'); return; } p.soulCrystals--; }
  else { if ((p.skinFragments || 0) < s.cost) { showToast('皮肤碎片不足'); return; } p.skinFragments -= s.cost; }
  p.skinsOwned.push(s.key); p.activeSkin = s.key; saveProfile(p); renderLottery(); renderSkinView(); showToast('合成成功「' + s.name + '」');
}

// 全屏查看皮肤高清立绘
function viewSkinArt(key) {
  var s = null;
  for (var i = 0; i < SKINS.length; i++) if (SKINS[i].key === key) s = SKINS[i];
  if (!s || !s.art) return;
  var ov = document.createElement("div");
  ov.id = "skinArtOverlay";
  ov.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:900;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;gap:12px;cursor:zoom-out";
  ov.innerHTML = '<img src="' + s.art + '" style="max-width:100%;max-height:74vh;border-radius:16px;box-shadow:0 12px 48px rgba(0,0,0,.6)" />' +
    '<div style="color:#fff;font-size:15px;font-weight:800">' + escHtml(s.name) + ' · ' + escHtml(s.rarity) + '</div>' +
    '<div style="color:rgba(255,255,255,.72);font-size:12px;max-width:320px;text-align:center;line-height:1.6">' + escHtml(s.desc || "") + '</div>' +
    '<div style="color:rgba(255,255,255,.45);font-size:10px">点击任意位置关闭</div>';
  ov.onclick = function() { ov.remove(); };
  document.body.appendChild(ov);
}

// ===== 限定徽章图鉴（法脉 · 星海典藏） =====
function openBadgeGallery() {
  var p = loadProfile();
  var owned = p.badgesOwned || [];
  var order = { "传说": 4, "史诗": 3, "稀有": 2, "基础": 1 };
  var sorted = BADGES.slice().sort(function(a, b) {
    var d = (order[b.rarity] || 0) - (order[a.rarity] || 0);
    return d !== 0 ? d : b.weight - a.weight;
  });
  var overlay = document.createElement("div");
  overlay.id = "badgeGalleryOverlay";
  overlay.className = "lottery-challenge";
  var box = document.createElement("div");
  box.className = "lottery-challenge-box gallery-box";
  var h = '<button class="modal-close">✕</button>';
  h += '<div style="text-align:center;margin-bottom:2px"><div style="font-size:15px;font-weight:800;color:var(--text)">限定徽章</div>' +
    '<div style="font-size:11px;color:var(--text2);margin-top:3px">法脉 · 星海典藏 · 已收集 <b style="color:var(--accent)">' + owned.length + '/' + BADGES.length + '</b></div></div>';
  h += '<div class="g-grid">';
  for (var i = 0; i < sorted.length; i++) {
    var b = sorted[i];
    var has = owned.indexOf(b.key) >= 0;
    var cls = "g-card" + (has ? " owned" : " locked");
    // 章牌式图标:取徽章名首字,按品级配色(未获得置灰)
    var art = BADGE_ART[b.key];
    var medal = art
      ? '<div class="badge-medal has-art"><img src="' + art + '" alt="" /></div>'
      : '<div class="badge-medal"' + (has
        ? ' style="color:' + b.color + ';border-color:' + b.color + ';background:linear-gradient(165deg,' + b.color + '1f,transparent)"'
        : '') + '>' + escHtml((b.name || "").charAt(0)) + '</div>';
    h += '<div class="' + cls + '">' +
      medal +
      '<div class="g-name">' + escHtml(b.name) + '</div>' +
      '<div class="g-rarity g-rarity-' + rarityCls(b.rarity) + '" style="color:' + b.color + '">' + b.rarity + '</div>' +
      '<div class="g-desc">' + escHtml(b.desc) + '</div>' +
      '<div class="g-state" style="font-size:10px;font-weight:700;color:' + (has ? "#34d399" : "var(--text2)") + '">' + (has ? "已获得" : "未获得") + '</div>' +
      '</div>';
  }
  h += '</div>';
  box.innerHTML = h;
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  var mc = box.querySelector(".modal-close");
  if (mc) mc.onclick = function() { overlay.remove(); };
}

// ===== 独立徽章典藏（覆盖旧弹层入口） =====
var _badgeSelected = "";
function openBadgeGallery() {
  hideAllViews();
  var view = document.getElementById("badgeView");
  view.style.display = "";
  view.classList.add("show");
  renderBadgeView();
}
function renderBadgeView() {
  var p = loadProfile(), owned = p.badgesOwned || [];
  if (!_badgeSelected || !BADGES.some(function(b) { return b.key === _badgeSelected; })) _badgeSelected = owned[0] || "buxiu";
  var selected = BADGES.filter(function(b) { return b.key === _badgeSelected; })[0] || BADGES[0];
  var has = owned.indexOf(selected.key) >= 0;
  var h = '<section class="badge-stage"><img class="badge-stage-art" src="' + BADGE_ART[selected.key] + '" alt="" /><div class="badge-stage-copy"><div class="badge-state">' + (has ? '✓ 已获得' : '🔒 未获得') + '</div><h2>' + escHtml(selected.name) + '</h2><p>' + escHtml(selected.desc) + '</p></div></section>';
  h += '<div class="badge-progress"><span>已收集 <b>' + owned.length + ' / ' + BADGES.length + '</b></span><span class="badge-progress-line"><i style="width:' + (owned.length / BADGES.length * 100) + '%"></i></span></div>';
  h += '<div class="badge-grid-new">';
  for (var i = 0; i < BADGES.length; i++) {
    var b = BADGES[i], own = owned.indexOf(b.key) >= 0;
    h += '<button class="badge-card-new' + (b.key === selected.key ? ' selected' : '') + (own ? '' : ' locked') + '" onclick="selectBadge(\'' + b.key + '\')"><img src="' + BADGE_ART[b.key] + '" alt="' + escHtml(b.name) + '" />' + (own ? '' : '<span class="lock">🔒</span>') + '</button>';
  }
  h += '</div><div class="badge-footer"><button class="primary" onclick="openLottery()">限定夺宝可获得 ›</button><button class="secondary" onclick="showToast(\'' + escHtml(selected.name) + '：' + escHtml(selected.desc) + '\')">徽章故事 ›</button></div>';
  document.getElementById("badgePage").innerHTML = h;
}
function selectBadge(key) { _badgeSelected = key; renderBadgeView(); }

// ===== 随机题目挑战（题目来自题库 QUIZ_DATA） =====
function startQuizChallenge() {
  var p = loadProfile();
  var chg = p.quizChallengeCount || 0;
  if (chg <= 0) { showToast("暂无题目挑战次数，抽奖可得"); renderLottery(); return; }
  p.quizChallengeCount = chg - 1;
  saveProfile(p);
  renderLottery();
  var tiers = [1, 2, 3];
  var tier = tiers[Math.floor(Math.random() * 3)];
  var pool = [], k, i;
  for (k in QUIZ_DATA) {
    if (QUIZ_DATA.hasOwnProperty(k) && Array.isArray(QUIZ_DATA[k])) {
      for (i = 0; i < QUIZ_DATA[k].length; i++) {
        if (QUIZ_DATA[k][i].diff === tier) {
          var qq = QUIZ_DATA[k][i];
          qq._subject = k;
          pool.push(qq);
        }
      }
    }
  }
  if (!pool.length) {
    for (k in QUIZ_DATA) {
      if (QUIZ_DATA.hasOwnProperty(k) && Array.isArray(QUIZ_DATA[k]) && QUIZ_DATA[k].length) {
        var qq2 = QUIZ_DATA[k][0];
        qq2._subject = k;
        tier = qq2.diff || 1;
        pool.push(qq2);
        break;
      }
    }
  }
  if (!pool.length) { showToast("题库暂无题目"); return; }
  var q = pool[Math.floor(Math.random() * pool.length)];
  var reward = tier === 3 ? 50 : tier === 2 ? 40 : 30;
  renderQuizChallengeModal(q, tier, reward);
}
function renderQuizChallengeModal(q, tier, reward) {
  var overlay = document.createElement("div");
  overlay.id = "lotteryChallengeOverlay";
  overlay.className = "lottery-challenge";
  var box = document.createElement("div");
  box.className = "lottery-challenge-box";
  var h = '<button class="modal-close" id="lqClose">✕</button>';
  h += '<div style="margin-bottom:6px">' +
    '<span class="lq-diff d' + tier + '">' + (tier === 3 ? "困难" : tier === 2 ? "普通" : "简单") + ' · 答对 +' + reward + ' 积分</span>' +
    '<span style="font-size:10px;color:var(--text2);margin-left:6px">' + escHtml(q._subject || "") + '</span></div>';
  h += '<div class="lq-q">' + escHtml(q.q) + '</div>';
  var labels = ["A","B","C","D","E","F"];
  var opts = q.opts || [];
  for (var i = 0; i < opts.length; i++) {
    h += '<div class="lq-opt" data-i="' + i + '"><span style="font-weight:800;flex-shrink:0">' + labels[i] + '.</span><span>' + escHtml(opts[i]) + '</span></div>';
  }
  h += '<div class="lq-exp" id="lqExp" style="display:none"></div>';
  h += '<button class="lq-done" id="lqDone" style="display:none">完成</button>';
  box.innerHTML = h;
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  var closeBtn = box.querySelector(".modal-close");
  if (closeBtn) closeBtn.onclick = function() { overlay.remove(); };
  var doneBtn = box.querySelector("#lqDone");
  if (doneBtn) doneBtn.onclick = function() { overlay.remove(); };
  var optsEl = box.querySelectorAll(".lq-opt");
  var answered = false;
  for (var oi = 0; oi < optsEl.length; oi++) {
    optsEl[oi].onclick = function() {
      if (answered) return;
      answered = true;
      var idx = parseInt(this.getAttribute("data-i"), 10);
      var ansArr = Array.isArray(q.ans) ? q.ans : [q.ans];
      var correct = ansArr.indexOf(idx) >= 0;
      for (var x = 0; x < optsEl.length; x++) optsEl[x].classList.add("disabled");
      for (var y = 0; y < optsEl.length; y++) {
        if (ansArr.indexOf(y) >= 0) optsEl[y].classList.add("correct");
        else if (y === idx) optsEl[y].classList.add("wrong");
      }
      var expEl = box.querySelector("#lqExp");
      if (expEl) {
        expEl.style.display = "block";
        var ansLabel = ansArr.map(function(ai) { return labels[ai]; }).join("、");
        expEl.innerHTML = (correct ? '✅ <b>回答正确</b>，+' + reward + ' 积分。' : '❌ <b>回答错误</b>（正确答案：' + ansLabel + '），不加积分。') + (q.exp ? '<br><br>' + escHtml(q.exp) : '');
      }
      var db = box.querySelector("#lqDone");
      if (db) db.style.display = "block";
      if (correct) addPoints(reward, "题目挑战答对");
    };
  }
}

// ===== 头像框系统 =====
function getOwnedAvatarFrames() {
  var p = loadProfile();
  return p.avatarFramesOwned || [];
}
function ownAvatarFrame(key) {
  var p = loadProfile();
  if (!p.avatarFramesOwned) p.avatarFramesOwned = [];
  if (p.avatarFramesOwned.indexOf(key) < 0) p.avatarFramesOwned.push(key);
  saveProfile(p);
}
function setAvatarFrame(key) {
  var p = loadProfile();
  p.avatarFrame = key || "";
  saveProfile(p);
  applyAvatarFrame();
  var pv = document.getElementById("avatarPreview");
  if (pv) applyFrameToEl(pv, p.avatarFrame);
}
function applyFrameToEl(el, frameKey) {
  if (!el) return;
  var frame = null;
  for (var i = 0; i < AVATAR_FRAMES.length; i++) if (AVATAR_FRAMES[i].key === frameKey) frame = AVATAR_FRAMES[i];
  if (frame) {
    el.style.borderColor = frame.borderColor;
    el.style.boxShadow = frame.boxShadow;
  } else {
    el.style.borderColor = "";
    el.style.boxShadow = "";
  }
}
function applyAvatarFrame() {
  var p = loadProfile();
  var fk = p.avatarFrame || "";
  var av = document.getElementById("profileAvatar");
  if (av) applyFrameToEl(av, fk);
  var hb = document.getElementById("homeProfileBtn");
  if (hb) applyFrameToEl(hb, fk);
}

// ===== VIP特权页 =====
function showVipPerks() {
  var perks = [
    "不限量 AI 问答，超快响应速度",
    "支持使用笔记本功能（免费无限创建）",
    "支持自定义上传头像",
    "超炫酷专属徽标",
    "课程表功能",
    "每日打卡 5-10 积分，完成任务双倍积分",
    "题库无限查看解析",
    "错题本无限使用"
  ];
  var overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:600;display:flex;align-items:center;justify-content:center;padding:20px";
  var box = document.createElement("div");
  box.style.cssText = "position:relative;background:var(--card-bg);border-radius:20px;padding:22px;max-width:340px;width:100%;max-height:80vh;overflow-y:auto";
  var h = '<div style="text-align:center;margin-bottom:14px">' +
    '<div style="width:56px;height:56px;margin:0 auto 8px;border-radius:50%;background:linear-gradient(135deg,#f7b733,#fc4a1a);display:flex;align-items:center;justify-content:center;font-size:28px">👑</div>' +
    '<h3 style="margin:0 0 2px;color:var(--text)">SeaWhy Lex VIP</h3>' +
    '<p style="font-size:12px;color:var(--text2);margin:0">' + (isVip() ? "您已是 VIP 会员 🎉" : "开通 VIP 解锁全部特权") + '</p></div>';
  for (var i = 0; i < perks.length; i++) {
    h += '<div style="display:flex;align-items:flex-start;gap:8px;padding:9px 4px;border-bottom:1px solid var(--card-border);font-size:13px;color:var(--text)">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px"><path d="M20 6L9 17l-5-5"/></svg>' +
      '<span>' + perks[i] + '</span></div>';
  }
  h += '<button onclick="openPointsPanel()" style="width:100%;margin-top:14px;padding:12px;border:none;border-radius:12px;background:linear-gradient(135deg,#f7b733,#fc4a1a);color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">积分兑换 VIP</button>';
  box.innerHTML = '<button class="modal-close">✕</button>' + h;
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  var mc = box.querySelector(".modal-close");
  if (mc) mc.onclick = function() { overlay.remove(); };
}

// ===== 课程表（VIP专属）· 独立网页版 =====
var SCHEDULE_KEY = "seawhy-lex-schedule";
var SCHEDULE_DAYS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
var SCHEDULE_TIMES = ["08:30", "09:20", "10:25", "11:15", "14:00", "14:50", "15:55", "16:45", "19:00", "19:50"];
var SCHEDULE_ENDTIMES = ["09:15", "10:05", "11:10", "12:00", "14:45", "15:35", "16:40", "17:30", "19:45", "20:35"];
var SCHEDULE_COLORS = ["#FFB300", "#4CAF50", "#7E57C2", "#EC407A", "#29B6F6", "#FF7043", "#E53935", "#00897B", "#F06292", "#8D6E63", "#5C6BC0", "#26A69A"];
var SCHEDULE_BG_COLORS = ["#FFFFFF", "#FFF3E0", "#FFEBEE", "#F3E5F5", "#E8F5E9", "#E3F2FD", "#FFF8E1", "#FBE9E7", "#E0F7FA", "#EFEBE9", "#F1F8E9", "#FCE4EC"];
var SCHEDULE_TEXT_COLORS = ["#FFFFFF", "#111111", "#E53935", "#4CAF50", "#1565C0", "#7E57C2", "#FF8F00", "#00897B"];
var SCHEDULE_ACCENT_COLORS = ["#667EEA", "#4A90D9", "#4CAF50", "#FF7043", "#EC407A", "#FFB300", "#7E57C2", "#26A69A"];
var SCHEDULE_STICKERS = ["📚", "✏️", "🎯", "💡", "⭐", "🎨", "🏆", "🔥"];
var SCHEDULE_FONTS = {
  "default": "inherit",
  "sans": "system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif",
  "serif": "Georgia, 'Times New Roman', 'Songti SC', 'SimSun', serif",
  "mono": "'Courier New', Consolas, monospace"
};
var SCHEDULE_APPEAR_DEFAULTS = {
  bgType: "default", bgColor: "#FFFFFF", bgImage: "",
  textColor: "#FFFFFF", textSize: 13,
  colorMode: "course", unifiedColor: "#FFB300",
  borderStyle: "none", borderColor: "#FFFFFF", borderWidth: 0,
  fontFamily: "default",
  stickers: ["", "", "", ""],
  themeMode: "auto",
  accentColor: "",
  cardHeight: 96, cardOpacity: 100, cardRadius: 8
};

function loadSchedule() {
  try {
    var d = JSON.parse(localStorage.getItem(SCHEDULE_KEY)) || {};
    if (!Array.isArray(d.courses)) d.courses = [];
    // 迁移旧数据（按周存储 → 全局课程+周范围）
    if (d.weeks) {
      for (var wk in d.weeks) {
        var arr = d.weeks[wk] || [];
        for (var i = 0; i < arr.length; i++) {
          var c = arr[i];
          if (c.wStart == null && c.wEnd == null) { c.wStart = parseInt(wk, 10); c.wEnd = parseInt(wk, 10); }
          d.courses.push(c);
        }
      }
      delete d.weeks;
    }
    // 旧范围数据(wStart/wEnd) → weeks 数组
    for (var ci = 0; ci < d.courses.length; ci++) {
      var cc = d.courses[ci];
      if (!Array.isArray(cc.weeks) && cc.wStart != null) {
        var ww = [];
        for (var wk2 = cc.wStart; wk2 <= (cc.wEnd || cc.wStart); wk2++) if (wk2 <= 20) ww.push(wk2);
        cc.weeks = ww;
        delete cc.wStart; delete cc.wEnd;
      }
    }
    if (!d.currentWeek) d.currentWeek = 1;
    // 多学期迁移:无 semesters 时建默认学期,旧课程补 semId
    if (!Array.isArray(d.semesters) || !d.semesters.length) {
      d.semesters = [{ id: 1, name: d.semesterName || "默认学期" }];
      delete d.semesterName;
      d.currentSem = 1;
      for (var si2 = 0; si2 < d.courses.length; si2++) if (d.courses[si2].semId == null) d.courses[si2].semId = 1;
    }
    if (d.currentSem == null) d.currentSem = d.semesters[0].id;
    // 外观字段默认值合并(向后兼容)
    var apK = Object.keys(SCHEDULE_APPEAR_DEFAULTS);
    for (var ak = 0; ak < apK.length; ak++) if (d[apK[ak]] === undefined) d[apK[ak]] = SCHEDULE_APPEAR_DEFAULTS[apK[ak]];
    // 课表设置默认值(向后兼容)
    var SET_DEFAULTS = { periodsPerDay: 10, showWeekend: true, showTeacher: true, showOtherWeeks: true };
    for (var sk in SET_DEFAULTS) if (d[sk] === undefined) d[sk] = SET_DEFAULTS[sk];
    return d;
  } catch (e) {
    var e0 = { courses: [], currentWeek: 1 };
    for (var ek in SCHEDULE_APPEAR_DEFAULTS) e0[ek] = SCHEDULE_APPEAR_DEFAULTS[ek];
    return e0;
  }
}
function saveSchedule(s) { try { localStorage.setItem(SCHEDULE_KEY, JSON.stringify(s)); } catch (e) {} }
function hexToRgba(hex, a) {
  var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}
function getCourseWeeks(c) {
  if (Array.isArray(c.weeks) && c.weeks.length) return c.weeks;
  var w = [];
  for (var wk = (c.wStart || 1); wk <= (c.wEnd || 20); wk++) w.push(wk);
  return w;
}
function getVisibleCourses(d, week) {
  var sem = d.currentSem;
  return d.courses.filter(function(c) {
    if (c.semId != null && c.semId !== sem) return false;
    return getCourseWeeks(c).indexOf(week) >= 0;
  });
}

function getSemesterStart() {
  var d = loadSchedule();
  if (!d.semesterStart) {
    var now = new Date();
    var day = (now.getDay() + 6) % 7; // 周一=0
    d.semesterStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day).getTime();
    saveSchedule(d);
  }
  return new Date(d.semesterStart);
}
function getWeekDates(week) {
  var base = getSemesterStart().getTime();
  var mon = new Date(base + (week - 1) * 7 * 86400000);
  var dates = [];
  for (var i = 0; i < 7; i++) dates.push(new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + i));
  return dates;
}
function fmtSchDate(d) { return (d.getMonth() + 1) + "." + d.getDate(); }

function showSchedule() {
  if (!isVip()) {
    showToast("课程表为 VIP 专属功能");
    showVipPerks();
    return;
  }
  hideAllViews();
  document.getElementById("scheduleView").style.display = "";
  document.getElementById("scheduleView").classList.add("show");
  applyScheduleTheme();
  applyScheduleAccent();
  // 时间轴横向滚动：滑动到哪个周，顶部栏跟随更新（原生滚动跟手无缝）
  var tl = document.getElementById("scheduleTimeline");
  if (tl && !tl.dataset.bound) {
    tl.dataset.bound = "1";
    tl.addEventListener("scroll", function() {
      if (_tlLocked) return;
      if (_tlTimer) clearTimeout(_tlTimer);
      var self = this;
      _tlTimer = setTimeout(function() {
        if (self.clientWidth === 0) return;
        var idx = Math.round(self.scrollLeft / self.clientWidth);
        var tiles = self.querySelectorAll(".sch-week");
        var target = tiles[idx];
        if (!target) return;
        var week = parseInt(target.getAttribute("data-week"), 10);
        var d = loadSchedule();
        if (d.currentWeek !== week) {
          d.currentWeek = week;
          saveSchedule(d);
          renderScheduleView();
        }
      }, 80);
    });
  }
  renderScheduleView();
}
function closeScheduleView() { showLearningCenter(); }

function getTodayWeekStatus() {
  var sem = getSemesterStart().getTime();
  var now = new Date();
  var todayMs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  var dayNum = Math.floor((todayMs - sem) / 86400000);
  var week = Math.floor(dayNum / 7) + 1;
  var dateStr = fmtSchDate(now);
  if (dayNum < 0) return { text: "未开学", date: dateStr };
  if (week > 20) return { text: "已结束", date: dateStr };
  return { text: "当前第" + week + "周", date: dateStr };
}

function renderScheduleView() {
  var d = loadSchedule();
  var week = d.currentWeek;
  var dates = getWeekDates(week);
  applyScheduleTheme();
  applyScheduleAccent();
  document.getElementById("scheduleWeekLabel").textContent = "第 " + week + " 周";
  document.getElementById("scheduleDateRange").textContent = fmtSchDate(dates[0]) + " — " + fmtSchDate(dates[6]);
  var st = getTodayWeekStatus();
  var tw = document.getElementById("scheduleTodayWeek");
  var td = document.getElementById("scheduleTodayDate");
  if (tw) tw.textContent = st.text;
  if (td) td.textContent = "今日 " + st.date;
  renderScheduleTimeline();
}

// ===== 课表设置 =====
function openScheduleSettings() {
  hideAllViews();
  document.getElementById("scheduleSettingsView").style.display = "";
  document.getElementById("scheduleSettingsView").classList.add("show");
  renderScheduleSettings();
}
function closeScheduleSettings() { showSchedule(); }
function renderScheduleSettings() {
  var d = loadSchedule();
  setBtnGroup("ssPeriodsPerDay", d.periodsPerDay);
  setBtnGroup("ssShowWeekend", d.showWeekend);
  setBtnGroup("ssShowOtherWeeks", d.showOtherWeeks);
  setBtnGroup("ssShowTeacher", d.showTeacher);
  var dEl = document.getElementById("ssSemesterStart");
  if (dEl) {
    if (d.semesterStart) {
      var dt = new Date(d.semesterStart);
      dEl.value = dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + dt.getDate()).slice(-2);
    } else { dEl.value = ""; }
  }
  renderSemesterControls();
  renderScheduleTimes();
  renderAccentSwatches();
  applyScheduleAccent();
}
function setScheduleSetting(key, val) {
  var d = loadSchedule();
  d[key] = val;
  saveSchedule(d);
  renderScheduleSettings();
  var sv = document.getElementById("scheduleView");
  if (sv && sv.classList.contains("show")) renderScheduleView();
  showToast("课表设置已保存");
}
function saveScheduleSettings() {
  var d = loadSchedule();
  var ppd = getPeriodsPerDay(d);
  var dEl = document.getElementById("ssSemesterStart");
  if (dEl && dEl.value) d.semesterStart = new Date(dEl.value + "T00:00:00").getTime();
  var nt = [];
  for (var ti = 0; ti < ppd; ti++) {
    var sEl = document.getElementById("ssT" + ti + "S");
    var eEl = document.getElementById("ssT" + ti + "E");
    if (sEl && eEl) nt.push([sEl.value || SCHEDULE_TIMES[ti], eEl.value || SCHEDULE_ENDTIMES[ti]]);
  }
  if (nt.length === ppd) d.times = nt;
  saveSchedule(d);
  showToast("课表设置已保存");
  closeScheduleSettings();
}

// ===== 课表外观 + 学期 + 节次时间 + 数据管理 =====
function applyScheduleTheme() {
  var d = loadSchedule();
  var dark = d.themeMode === "dark" || (d.themeMode === "auto" && userTheme === "dark");
  var el = document.getElementById("scheduleView");
  if (el) el.classList.toggle("sch-dark", dark);
}
function applyScheduleAccent() {
  var d = loadSchedule();
  var accent = d.accentColor || "";
  ["scheduleView", "scheduleSettingsView", "scheduleAppearanceView"].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    if (accent) el.style.setProperty("--accent", accent);
    else el.style.removeProperty("--accent");
  });
}
function downloadFile(name, content, mime) {
  var blob = new Blob([content], { type: mime || "application/json" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

// ---- 学期管理 ----
function getScheduleSem(d, id) {
  for (var i = 0; i < d.semesters.length; i++) if (d.semesters[i].id === id) return d.semesters[i];
  return d.semesters[0];
}
function renderSemesterControls() {
  var d = loadSchedule();
  var sel = document.getElementById("ssSemSelect");
  if (sel) {
    var html = "";
    for (var i = 0; i < d.semesters.length; i++) {
      var s = d.semesters[i];
      html += '<option value="' + s.id + '"' + (s.id === d.currentSem ? " selected" : "") + '>' + escHtml(s.name) + '</option>';
    }
    sel.innerHTML = html;
  }
  var cur = getScheduleSem(d, d.currentSem);
  var nameEl = document.getElementById("ssSemName");
  if (nameEl) nameEl.value = cur ? cur.name : "";
  var info = document.getElementById("ssSemInfo");
  if (info) {
    var cnt = 0;
    for (var j = 0; j < d.courses.length; j++) if (d.courses[j].semId === d.currentSem) cnt++;
    info.textContent = "当前学期课程 " + cnt + " 门" + (d.semesters.length > 1 ? " · 共 " + d.semesters.length + " 个学期" : "");
  }
}
function switchScheduleSem(id) {
  var d = loadSchedule();
  d.currentSem = parseInt(id, 10);
  saveSchedule(d);
  renderSemesterControls();
  showToast("已切换学期");
}
function saveScheduleSemName() {
  var d = loadSchedule();
  var s = getScheduleSem(d, d.currentSem);
  var nameEl = document.getElementById("ssSemName");
  var name = nameEl ? nameEl.value.trim() : "";
  if (!name) { showToast("请输入学期名称"); return; }
  if (s) s.name = name;
  saveSchedule(d);
  renderSemesterControls();
  showToast("学期已重命名");
}
function addScheduleSem() {
  var d = loadSchedule();
  var maxId = 0;
  for (var i = 0; i < d.semesters.length; i++) if (d.semesters[i].id > maxId) maxId = d.semesters[i].id;
  var id = maxId + 1;
  d.semesters.push({ id: id, name: "新学期" + id });
  saveSchedule(d);
  renderSemesterControls();
  showToast("已新增学期");
}
function delScheduleSem() {
  var d = loadSchedule();
  if (d.semesters.length <= 1) { showToast("至少保留一个学期"); return; }
  if (!confirm("删除当前学期及其全部课程？")) return;
  var id = d.currentSem;
  d.semesters = d.semesters.filter(function(s) { return s.id !== id; });
  d.courses = d.courses.filter(function(c) { return c.semId !== id; });
  if (d.semesters.length) d.currentSem = d.semesters[0].id;
  saveSchedule(d);
  renderSemesterControls();
  showToast("学期已删除");
}

// ---- 节次时间 ----
function renderScheduleTimes() {
  var d = loadSchedule();
  var el = document.getElementById("ssTimesList");
  if (!el) return;
  var times = getScheduleTimes(d);
  var ppd = getPeriodsPerDay(d);
  var html = "";
  for (var ti = 0; ti < ppd; ti++) {
    html += '<div class="ss-time-row">' +
      '<span class="ss-time-idx">第' + (ti + 1) + '节</span>' +
      '<input type="time" id="ssT' + ti + 'S" value="' + times[ti][0] + '" class="ss-time-input" />' +
      '<span class="ss-time-sep">—</span>' +
      '<input type="time" id="ssT' + ti + 'E" value="' + times[ti][1] + '" class="ss-time-input" />' +
      '</div>';
  }
  el.innerHTML = html;
}
function renderAccentSwatches() {
  var d = loadSchedule();
  var el = document.getElementById("ssAccentSwatches");
  if (!el) return;
  var active = d.accentColor || "";
  var html = "";
  for (var i = 0; i < SCHEDULE_ACCENT_COLORS.length; i++) {
    var col = SCHEDULE_ACCENT_COLORS[i];
    html += '<button type="button" data-col="' + col + '" style="width:26px;height:26px;border-radius:50%;border:2px solid ' + (col === active ? "#111" : "transparent") + ';background:' + col + ';cursor:pointer;margin:3px"></button>';
  }
  el.innerHTML = html;
  var btns = el.querySelectorAll("button");
  for (var j = 0; j < btns.length; j++) btns[j].onclick = function() { pickScheduleAccent(this.getAttribute("data-col")); };
}
function pickScheduleAccent(col) {
  var d = loadSchedule();
  d.accentColor = col;
  saveSchedule(d);
  renderAccentSwatches();
  applyScheduleAccent();
  showToast("强调色已更新");
}

// ---- 数据管理 ----
function exportScheduleJson() {
  var d = loadSchedule();
  var courses = d.courses.filter(function(c) { return c.semId === d.currentSem; });
  var name = (getScheduleSem(d, d.currentSem).name || "课表").replace(/[\\/:*?"<>|]/g, "_");
  downloadFile("课表_" + name + "_" + new Date().toISOString().slice(0, 10) + ".json", JSON.stringify(courses, null, 2));
  showToast("已导出 " + courses.length + " 门课程");
}
function exportScheduleBackup() {
  var d = loadSchedule();
  downloadFile("课表备份_" + new Date().toISOString().slice(0, 10) + ".json", JSON.stringify(d, null, 2));
  showToast("备份已导出");
}
function importScheduleBackup(input) {
  var file = input.files && input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function() {
    try {
      var obj = JSON.parse(reader.result);
      if (!obj || !Array.isArray(obj.courses)) { showToast("备份文件格式不正确"); return; }
      if (!confirm("导入备份将覆盖当前全部课表数据，是否继续？")) return;
      localStorage.setItem(SCHEDULE_KEY, JSON.stringify(obj));
      loadSchedule();
      showToast("备份已导入");
      closeScheduleSettings();
      showSchedule();
    } catch (e) { showToast("备份导入失败：" + e.message); }
  };
  reader.readAsText(file);
}
function clearAllCourses() {
  if (!confirm("确定清空当前学期全部课程？此操作不可恢复。")) return;
  var d = loadSchedule();
  d.courses = d.courses.filter(function(c) { return c.semId !== d.currentSem; });
  saveSchedule(d);
  renderScheduleSettings();
  showToast("当前学期课程已清空");
}

// ---- 数据导入导出（适配器模式：Json / 分享码 / 文本 / HTML占位） ----
function b64EncodeJson(obj) { return btoa(unescape(encodeURIComponent(JSON.stringify(obj)))); }
function b64DecodeJson(str) { return JSON.parse(decodeURIComponent(escape(atob(str.replace(/\s+/g, ""))))); }
var ScheduleImporter = {
  fromJson: function(jsonStr) {
    var arr = JSON.parse(jsonStr);
    if (!Array.isArray(arr)) throw new Error("JSON 不是课程数组");
    var d = loadSchedule();
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      var c = arr[i];
      if (!c || c.name == null || c.day == null) continue;
      var start = Math.max(1, Math.min(10, parseInt(c.start, 10) || 1));
      var end = Math.max(start, Math.min(10, parseInt(c.end, 10) || start));
      out.push({
        day: Math.max(0, Math.min(6, parseInt(c.day, 10) || 0)),
        start: start, end: end,
        name: String(c.name || "").slice(0, 20),
        loc: String(c.loc || "").slice(0, 12),
        color: parseInt(c.color, 10) || 0,
        weeks: Array.isArray(c.weeks) && c.weeks.length ? c.weeks.map(function(w) { return Math.max(1, Math.min(20, parseInt(w, 10) || 1)); }) : allWeeks(),
        semId: d.currentSem
      });
    }
    return out;
  },
  fromShareCode: function(code) {
    var obj = b64DecodeJson(code);
    var arr = Array.isArray(obj) ? obj : (Array.isArray(obj.courses) ? obj.courses : null);
    if (!arr) throw new Error("分享码解析失败");
    return ScheduleImporter.fromJson(JSON.stringify(arr));
  },
  fromText: function(text) { return parseScheduleText(text); },
  fromHtml: function(html) {
    // 待实现：各校教务系统 HTML 结构差异大，预留接口
    return [];
  }
};
function applyImportCourses(courses, overwrite) {
  var d = loadSchedule();
  if (overwrite) d.courses = d.courses.filter(function(c) { return c.semId !== d.currentSem; });
  for (var i = 0; i < courses.length; i++) courses[i].semId = d.currentSem;
  d.courses = d.courses.concat(courses);
  saveSchedule(d);
  renderScheduleView();
  return courses.length;
}
function importScheduleJsonFile(input) {
  var file = input.files && input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function() {
    try {
      var courses = ScheduleImporter.fromJson(reader.result);
      if (!courses.length) { showToast("未识别到有效课程"); return; }
      if (!confirm("将覆盖当前学期全部课程，是否继续？")) return;
      var n = applyImportCourses(courses, true);
      showToast("已导入 " + n + " 门课程");
      var ov = document.getElementById("scheduleImportOverlay");
      if (ov) ov.remove();
    } catch (e) { showToast("导入失败：" + e.message); }
  };
  reader.readAsText(file);
}
function importScheduleShareCode() {
  var ta = document.getElementById("impShareCode");
  var code = ta ? ta.value.trim() : "";
  if (!code) { showToast("请输入分享码"); return; }
  try {
    var courses = ScheduleImporter.fromShareCode(code);
    if (!courses.length) { showToast("分享码内没有有效课程"); return; }
    if (!confirm("将覆盖当前学期全部课程，是否继续？")) return;
    var n = applyImportCourses(courses, true);
    showToast("已导入 " + n + " 门课程");
    var ov = document.getElementById("scheduleImportOverlay");
    if (ov) ov.remove();
  } catch (e) { showToast("分享码解析失败：" + e.message); }
}
function exportScheduleShareCode() {
  var d = loadSchedule();
  var courses = d.courses.filter(function(c) { return c.semId === d.currentSem; });
  var code = b64EncodeJson(courses);
  var ta = document.getElementById("impShareCode");
  if (ta) ta.value = code;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(function() { showToast("分享码已复制"); }).catch(function() {});
  } else if (ta) {
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
  }
  showToast("已生成分享码，可复制分享");
}

// ---- 课表外观(半屏底部弹层,课表保持显示) ----
function openScheduleAppearance() {
  renderAppearanceView();
  applyScheduleAccent();
  document.getElementById("scheduleAppearanceView").classList.add("show");
  var bd = document.getElementById("appSheetBackdrop");
  if (bd) bd.classList.add("show");
}
function closeScheduleAppearance() {
  document.getElementById("scheduleAppearanceView").classList.remove("show");
  var bd = document.getElementById("appSheetBackdrop");
  if (bd) bd.classList.remove("show");
}
function setBtnGroup(id, activeVal) {
  var el = document.getElementById(id);
  if (!el) return;
  var btns = el.querySelectorAll("[data-val]");
  for (var i = 0; i < btns.length; i++) btns[i].classList.toggle("on", String(btns[i].getAttribute("data-val")) === String(activeVal));
}
function renderSwatches(id, colors, active, pickFn) {
  var el = document.getElementById(id);
  if (!el) return;
  var html = "";
  for (var i = 0; i < colors.length; i++) {
    var col = colors[i];
    html += '<button type="button" data-col="' + col + '" style="width:24px;height:24px;border-radius:50%;border:2px solid ' + (col.toLowerCase() === (active || "").toLowerCase() ? "#111" : "transparent") + ';background:' + col + ';cursor:pointer;margin:3px"></button>';
  }
  el.innerHTML = html;
  if (pickFn) {
    var btns = el.querySelectorAll("button");
    for (var j = 0; j < btns.length; j++) btns[j].onclick = function() { pickFn(this.getAttribute("data-col")); };
  }
}
function renderAppearanceView() {
  var d = loadSchedule();
  var ap = d;
  setBtnGroup("appBgGroup", ap.bgType);
  setBtnGroup("appColorModeGroup", ap.colorMode);
  setBtnGroup("appBorderStyleGroup", ap.borderStyle);
  setBtnGroup("appFontGroup", ap.fontFamily);
  setBtnGroup("appThemeGroup", ap.themeMode);
  renderSwatches("appBgSwatches", SCHEDULE_BG_COLORS, ap.bgColor, appBgColorPick);
  renderSwatches("appTextSwatches", SCHEDULE_TEXT_COLORS, ap.textColor, appTextColorPick);
  renderSwatches("appUnifiedSwatches", SCHEDULE_COLORS, ap.unifiedColor, appUnifiedColorPick);
  renderSwatches("appBorderSwatches", SCHEDULE_TEXT_COLORS, ap.borderColor, appBorderColorPick);
  var tc = document.getElementById("appTextCustom");
  if (tc) tc.value = ap.textColor;
  var ts = document.getElementById("appTextSize");
  var tv = document.getElementById("appTextSizeVal");
  if (ts) ts.value = ap.textSize;
  if (tv) tv.textContent = ap.textSize + "px";
  var bw = document.getElementById("appBorderWidth");
  var bv = document.getElementById("appBorderWidthVal");
  if (bw) bw.value = ap.borderWidth;
  if (bv) bv.textContent = ap.borderWidth + "dp";
  var chEl = document.getElementById("appCardHeight");
  var chV = document.getElementById("appCardHeightVal");
  if (chEl) chEl.value = ap.cardHeight;
  if (chV) chV.textContent = (ap.cardHeight || 96) + "px";
  var coEl = document.getElementById("appCardOpacity");
  var coV = document.getElementById("appCardOpacityVal");
  if (coEl) coEl.value = ap.cardOpacity;
  if (coV) coV.textContent = (ap.cardOpacity != null ? ap.cardOpacity : 100) + "%";
  var crEl = document.getElementById("appCardRadius");
  var crV = document.getElementById("appCardRadiusVal");
  if (crEl) crEl.value = ap.cardRadius;
  if (crV) crV.textContent = (ap.cardRadius != null ? ap.cardRadius : 8) + "px";
  for (var i = 0; i < 4; i++) {
    var sel = document.getElementById("appSticker" + i);
    if (!sel) continue;
    if (sel.options.length === 0) {
      var opts = '<option value="">无</option>';
      for (var ei = 0; ei < SCHEDULE_STICKERS.length; ei++) opts += '<option value="' + SCHEDULE_STICKERS[ei] + '">' + SCHEDULE_STICKERS[ei] + '</option>';
      sel.innerHTML = opts;
    }
    sel.value = (ap.stickers && ap.stickers[i]) || "";
  }
}
function setAppField(key, value) {
  var d = loadSchedule();
  d[key] = value;
  saveSchedule(d);
  renderAppearanceView();
  var sv = document.getElementById("scheduleView");
  if (sv && sv.classList.contains("show")) renderScheduleView();
}
function appCardHeightIn() {
  var el = document.getElementById("appCardHeight");
  if (!el) return;
  var v = parseInt(el.value, 10);
  var val = document.getElementById("appCardHeightVal");
  if (val) val.textContent = v + "px";
  setAppField("cardHeight", v);
}
function appCardOpacityIn() {
  var el = document.getElementById("appCardOpacity");
  if (!el) return;
  var v = parseInt(el.value, 10);
  var val = document.getElementById("appCardOpacityVal");
  if (val) val.textContent = v + "%";
  setAppField("cardOpacity", v);
}
function appCardRadiusIn() {
  var el = document.getElementById("appCardRadius");
  if (!el) return;
  var v = parseInt(el.value, 10);
  var val = document.getElementById("appCardRadiusVal");
  if (val) val.textContent = v + "px";
  setAppField("cardRadius", v);
}
function appBgColorPick(col) { setAppField("bgColor", col); }
function appTextColorPick(col) { setAppField("textColor", col); }
function appTextCustomPick() {
  var el = document.getElementById("appTextCustom");
  if (el) setAppField("textColor", el.value);
}
function appUnifiedColorPick(col) { setAppField("unifiedColor", col); }
function appBorderColorPick(col) { setAppField("borderColor", col); }
function appTextSizeIn() {
  var el = document.getElementById("appTextSize");
  if (!el) return;
  var v = parseInt(el.value, 10);
  document.getElementById("appTextSizeVal").textContent = v + "px";
  setAppField("textSize", v);
}
function appBorderWidthIn() {
  var el = document.getElementById("appBorderWidth");
  if (!el) return;
  var v = parseFloat(el.value);
  document.getElementById("appBorderWidthVal").textContent = v + "dp";
  setAppField("borderWidth", v);
}
function appStickerIn(idx) {
  var sel = document.getElementById("appSticker" + idx);
  if (!sel) return;
  var d = loadSchedule();
  if (!Array.isArray(d.stickers)) d.stickers = ["", "", "", ""];
  d.stickers[idx] = sel.value;
  saveSchedule(d);
  renderAppearanceView();
}
function appPickBgImage() {
  var inp = document.getElementById("appBgInput");
  if (inp) inp.click();
}
function appBgImageChanged(input) {
  var file = input.files && input.files[0];
  if (!file) return;
  if (file.type.indexOf("image/") !== 0) { showToast("请选择图片文件"); return; }
  var reader = new FileReader();
  reader.onload = function() {
    var img = new Image();
    img.onload = function() {
      var maxW = 1280, maxH = 1280, w = img.width, h = img.height;
      if (w > maxW || h > maxH) {
        var r = Math.min(maxW / w, maxH / h);
        w = Math.round(w * r); h = Math.round(h * r);
      }
      var cv = document.createElement("canvas");
      cv.width = w; cv.height = h;
      cv.getContext("2d").drawImage(img, 0, 0, w, h);
      var d = loadSchedule();
      d.bgImage = cv.toDataURL("image/jpeg", 0.85);
      d.bgType = "image";
      saveSchedule(d);
      renderAppearanceView();
      showToast("背景图片已设置");
    };
    img.onerror = function() { showToast("图片读取失败"); };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}
function appClearBgImage() {
  var d = loadSchedule();
  d.bgImage = "";
  d.bgType = "default";
  saveSchedule(d);
  renderAppearanceView();
}
function resetScheduleAppearance() {
  var d = loadSchedule();
  var def = SCHEDULE_APPEAR_DEFAULTS;
  for (var k in def) d[k] = (Array.isArray(def[k]) ? def[k].slice() : def[k]);
  saveSchedule(d);
  renderAppearanceView();
  var sv = document.getElementById("scheduleView");
  if (sv && sv.classList.contains("show")) renderScheduleView();
  showToast("已恢复默认外观");
}
// ===== 视频中心（B站嵌入） =====
var VIDEO_KEY = "seawhy-lex-videos";
var DEFAULT_VIDEOS = [
  { title: "2027法硕精讲 · 刑法学（车润海·众合）", bvid: "BV1ZqPNzTEss" }
];
function loadVideos() {
  try {
    var v = JSON.parse(localStorage.getItem(VIDEO_KEY) || "null");
    if (Array.isArray(v)) return v;
  } catch (e) {}
  saveVideos(DEFAULT_VIDEOS);
  return DEFAULT_VIDEOS.slice();
}
function saveVideos(v) { try { localStorage.setItem(VIDEO_KEY, JSON.stringify(v)); } catch (e) {} }
function showVideoCenter() {
  hideAllViews();
  document.getElementById("videoView").style.display = "";
  document.getElementById("videoView").classList.add("show");
  recordLastStudy("videoView");
  renderBiliLogin();
  biliCheckLogin(false);
  renderVideos();
}
function renderVideos() {
  var list = document.getElementById("videoList");
  if (!list) return;
  var vids = loadVideos();
  if (!vids.length) {
    list.innerHTML = '<div class="video-empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M10 9l5 3-5 3z"/></svg><p>还没有视频<br>点右上角 + 粘贴 B 站链接添加</p></div>';
    return;
  }
  var h = "";
  for (var i = 0; i < vids.length; i++) {
    var v = vids[i];
    var src = "https://player.bilibili.com/player.html?bvid=" + encodeURIComponent(v.bvid) + "&high_quality=1&danmaku=0";
    h += '<div class="video-card">' +
      '<div class="video-wrap"><iframe src="' + src + '" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe></div>' +
      '<div class="video-title">' + escHtml(v.title || ("B站视频" + (i + 1))) + '</div>' +
      '<div class="video-meta"><span>bilibili · ' + escHtml(v.bvid) + '</span>' +
      '<button class="video-del" onclick="deleteVideo(' + i + ')">删除</button></div>' +
      '</div>';
  }
  list.innerHTML = h;
}
function deleteVideo(idx) {
  var vids = loadVideos();
  if (idx < 0 || idx >= vids.length) return;
  if (!confirm("删除该视频？")) return;
  vids.splice(idx, 1);
  saveVideos(vids);
  renderVideos();
}
function parseBvid(url) {
  var m = url.match(/BV[0-9A-Za-z]+/);
  return m ? m[0] : "";
}
function openAddVideoForm() {
  var overlay = document.createElement("div");
  overlay.id = "videoFormOverlay";
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:600;display:flex;align-items:center;justify-content:center;padding:16px";
  var box = document.createElement("div");
  box.style.cssText = "position:relative;background:var(--card-bg);border-radius:18px;padding:18px;max-width:320px;width:100%";
  box.innerHTML =
    '<button class="modal-close" onclick="document.getElementById(\'videoFormOverlay\').remove()">✕</button>' +
    '<p style="font-size:16px;font-weight:700;color:var(--text);margin:0 0 12px">添加 B 站视频</p>' +
    '<label class="sf-label">视频标题</label>' +
    '<input id="vfTitle" type="text" maxlength="30" placeholder="如：民法典讲解" class="vid-form-input" />' +
    '<label class="sf-label">B 站视频链接</label>' +
    '<input id="vfUrl" type="text" placeholder="https://www.bilibili.com/video/BV1xx411c7mD" class="vid-form-input" />' +
    '<div style="display:flex;gap:8px">' +
    '<button class="sf-save" onclick="addVideo()">添加</button>' +
    '<button class="sf-cancel" onclick="document.getElementById(\'videoFormOverlay\').remove()">取消</button>' +
    '</div>';
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}
function addVideo() {
  var title = document.getElementById("vfTitle").value.trim();
  var url = document.getElementById("vfUrl").value.trim();
  var bvid = parseBvid(url);
  if (!bvid) { showToast("请输入有效的 B 站视频链接"); return; }
  if (!title) title = "B站视频";
  var vids = loadVideos();
  vids.push({ title: title, bvid: bvid });
  saveVideos(vids);
  var ov = document.getElementById("videoFormOverlay");
  if (ov) ov.remove();
  renderVideos();
  showToast("视频已添加");
}

// ===== 哔哩哔哩 登录 / 搜索 / 播放 =====
var BILI_KEY = "seawhy-lex-bili";
var BILI_WBI_CACHE = null, BILI_WBI_AT = 0, BILI_LAST_CHECK = 0, BILI_CB_ID = 1;
window._biliResList = [];

// —— MD5(Paul Johnston 紧凑实现),WBI 签名需要 ——
function md5(s) {
  function add32(a, b) { return (a + b) & 0xFFFFFFFF; }
  function md5cycle(x, k) {
    var a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a,b,c,d,k[0],7,-680876936); d = ff(d,a,b,c,k[1],12,-389564586); c = ff(c,d,a,b,k[2],17,606105819);
    b = ff(b,c,d,a,k[3],22,-1044525330); a = ff(a,b,c,d,k[4],7,-176418897); d = ff(d,a,b,c,k[5],12,1200080426);
    c = ff(c,d,a,b,k[6],17,-1473231341); b = ff(b,c,d,a,k[7],22,-45705983); a = ff(a,b,c,d,k[8],7,1770035416);
    d = ff(d,a,b,c,k[9],12,-1958414417); c = ff(c,d,a,b,k[10],17,-42063); b = ff(b,c,d,a,k[11],22,-1990404162);
    a = ff(a,b,c,d,k[12],7,1804603682); d = ff(d,a,b,c,k[13],12,-40341101); c = ff(c,d,a,b,k[14],17,-1502002290);
    b = ff(b,c,d,a,k[15],22,1236535329); a = gg(a,b,c,d,k[1],5,-165796510); d = gg(d,a,b,c,k[6],9,-1069501632);
    c = gg(c,d,a,b,k[11],14,643717713); b = gg(b,c,d,a,k[0],20,-373897302); a = gg(a,b,c,d,k[5],5,-701558691);
    d = gg(d,a,b,c,k[10],9,38016083); c = gg(c,d,a,b,k[15],14,-660478335); b = gg(b,c,d,a,k[4],20,-405537848);
    a = gg(a,b,c,d,k[9],5,568446438); d = gg(d,a,b,c,k[14],9,-1019803690); c = gg(c,d,a,b,k[3],14,-187363961);
    b = gg(b,c,d,a,k[8],20,1163531501); a = gg(a,b,c,d,k[13],5,-1444681467); d = gg(d,a,b,c,k[2],9,-51403784);
    c = gg(c,d,a,b,k[7],14,1735328473); b = gg(b,c,d,a,k[12],20,-1926607734); a = hh(a,b,c,d,k[5],4,-378558);
    d = hh(d,a,b,c,k[8],11,-2022574463); c = hh(c,d,a,b,k[11],16,1839030562); b = hh(b,c,d,a,k[14],23,-35309556);
    a = hh(a,b,c,d,k[1],4,-1530992060); d = hh(d,a,b,c,k[4],11,1272893353); c = hh(c,d,a,b,k[7],16,-155497632);
    b = hh(b,c,d,a,k[10],23,-1094730640); a = hh(a,b,c,d,k[13],4,681279174); d = hh(d,a,b,c,k[0],11,-358537222);
    c = hh(c,d,a,b,k[3],16,-722521979); b = hh(b,c,d,a,k[6],23,76029189); a = hh(a,b,c,d,k[9],4,-640364487);
    d = hh(d,a,b,c,k[12],11,-421815835); c = hh(c,d,a,b,k[15],16,530742520); b = hh(b,c,d,a,k[2],23,-995338651);
    a = ii(a,b,c,d,k[0],6,-198630844); d = ii(d,a,b,c,k[7],10,1126891415); c = ii(c,d,a,b,k[14],15,-1416354905);
    b = ii(b,c,d,a,k[5],21,-57434055); a = ii(a,b,c,d,k[12],6,1700485571); d = ii(d,a,b,c,k[3],10,-1894986606);
    c = ii(c,d,a,b,k[10],15,-1051523); b = ii(b,c,d,a,k[1],21,-2054922799); a = ii(a,b,c,d,k[8],6,1873313359);
    d = ii(d,a,b,c,k[15],10,-30611744); c = ii(c,d,a,b,k[6],15,-1560198380); b = ii(b,c,d,a,k[13],21,1309151649);
    a = ii(a,b,c,d,k[4],6,-145523070); d = ii(d,a,b,c,k[11],10,-1120210379); c = ii(c,d,a,b,k[2],15,718787259);
    b = ii(b,c,d,a,k[9],21,-343485551);
    x[0] = add32(a,x[0]); x[1] = add32(b,x[1]); x[2] = add32(c,x[2]); x[3] = add32(d,x[3]);
  }
  function cmn(q,a,b,x,s,t) { a = add32(add32(a,q),add32(x,t)); return add32((a << s) | (a >>> (32 - s)), b); }
  function ff(a,b,c,d,x,s,t) { return cmn((b & c) | ((~b) & d), a,b,x,s,t); }
  function gg(a,b,c,d,x,s,t) { return cmn((b & d) | (c & (~d)), a,b,x,s,t); }
  function hh(a,b,c,d,x,s,t) { return cmn(b ^ c ^ d, a,b,x,s,t); }
  function ii(a,b,c,d,x,s,t) { return cmn(c ^ (b | (~d)), a,b,x,s,t); }
  function md51(s) {
    var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
    for (i = 64; i <= s.length; i += 64) md5cycle(state, md5blk(s.substring(i - 64, i)));
    s = s.substring(i - 64);
    var tail = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) { md5cycle(state, tail); tail = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }
  function md5blk(s) {
    var md5blks = [], i;
    for (i = 0; i < 64; i += 4) md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    return md5blks;
  }
  function hexMD5(s) {
    var hex_chr = "0123456789abcdef", state = md51(s), str = "", j;
    for (j = 0; j < 4; j++) str += hex_chr.charAt((state[j] >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((state[j] >> (j * 8)) & 0x0F);
    return str;
  }
  return hexMD5(s);
}

// —— WBI 编码:不编码 ' ! * ( ) 五个字符 ——
function encWbi(s) {
  var filter = ["'", "!", "*", "(", ")"];
  var res = "";
  for (var i = 0; i < s.length; i++) {
    var c = s[i];
    if (filter.indexOf(c) >= 0) { res += c; continue; }
    res += "%" + c.charCodeAt(0).toString(16).toUpperCase();
  }
  return res;
}

// —— 通用 JSONP(URL 已含 jsonp=cbName)——
function biliJsonp(fullUrl, cbName, onData, onErr) {
  var scr = document.createElement("script");
  var done = false;
  window[cbName] = function(data) { cleanup(); if (onData) onData(data); };
  function cleanup() {
    done = true;
    try { delete window[cbName]; } catch(e) {}
    if (scr.parentNode) scr.parentNode.removeChild(scr);
  }
  scr.src = fullUrl;
  scr.onerror = function() { cleanup(); if (onErr) onErr(); };
  setTimeout(function() { if (!done) { cleanup(); if (onErr) onErr(); } }, 20000);
  document.head.appendChild(scr);
}

// —— 取 WBI mixin key(nav 响应,缓存 6h)——
function biliWbiKeys(cb) {
  var now = Date.now();
  if (BILI_WBI_CACHE && now - BILI_WBI_AT < 6 * 3600 * 1000) { cb(BILI_WBI_CACHE); return; }
  var cbName = "lexbili_k" + (BILI_CB_ID++);
  biliJsonp("https://api.bilibili.com/x/web-interface/nav?jsonp=" + cbName, cbName, function(d) {
    if (!d || d.code !== 0 || !d.data || !d.data.wbi_img) { cb(null); return; }
    var img = (d.data.wbi_img.img_url || "").split("/").pop().split(".")[0];
    var sub = (d.data.wbi_img.sub_url || "").split("/").pop().split(".")[0];
    if (!img || !sub) { cb(null); return; }
    var MIXIN = [46,47,18,44,33,40,27,7];
    var origin = (img + sub).split("");
    var key = "";
    for (var i = 0; i < origin.length; i++) if (MIXIN.indexOf(i) < 0) key += origin[i];
    key = key.slice(0, 32);
    BILI_WBI_CACHE = key; BILI_WBI_AT = now;
    cb(key);
  }, function() { cb(null); });
}

// —— 搜索 ——
function biliSearch(page) {
  page = page || 1;
  var kw = (document.getElementById("biliSearchInput").value || "").trim();
  if (!kw) { showToast("请输入搜索关键词"); return; }
  var box = document.getElementById("biliResults");
  if (!box) return;
  box.style.display = "block";
  box.innerHTML = '<div class="bili-res-loading">搜索「' + escHtml(kw) + '」…</div>';
  biliWbiKeys(function(key) {
    if (!key) { box.innerHTML = '<div class="bili-res-empty">获取搜索密钥失败，请检查网络后重试</div>'; return; }
    var cbName = "lexbili_s" + (BILI_CB_ID++);
    var params = { search_type: "video", keyword: kw, page: page, page_size: 20, wts: Math.round(Date.now() / 1000) };
    var keys = Object.keys(params).sort();
    var q = "";
    for (var i = 0; i < keys.length; i++) q += (i ? "&" : "") + encWbi(keys[i]) + "=" + encWbi(String(params[keys[i]]));
    var w_rid = md5(q + key);
    var url = "https://api.bilibili.com/x/web-interface/search/type?" + q + "&w_rid=" + w_rid + "&jsonp=" + cbName;
    biliJsonp(url, cbName, function(d) {
      if (!d || d.code !== 0 || !d.data || !d.data.result || !d.data.result.length) {
        box.innerHTML = '<div class="bili-res-empty">未找到相关视频，或搜索被风控拦截<br><span style="font-size:12px;opacity:.7">请先在哔哩哔哩登录 / 打开一次 bilibili.com 后重试</span></div>';
        return;
      }
      renderBiliResults(d.data.result, page);
    }, function() {
      box.innerHTML = '<div class="bili-res-empty">搜索失败（网络或风控），请稍后重试</div>';
    });
  });
}

function stripBiliTags(s) { return String(s || "").replace(/<[^>]+>/g, ""); }
function fmtBiliPlay(n) {
  n = Number(n) || 0;
  if (n >= 100000000) return (n / 100000000).toFixed(1).replace(/\.0$/, "") + "亿";
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "万";
  return String(n);
}
function renderBiliResults(list, page) {
  window._biliResList = list;
  var box = document.getElementById("biliResults");
  if (!box) return;
  var h = '<div class="video-sec-hd">搜索结果</div>';
  for (var i = 0; i < list.length; i++) {
    var v = list[i];
    if (!v || !v.bvid) continue;
    var meta = (v.author || "未知UP主") + " · " + fmtBiliPlay(v.play) + " 播放";
    if (v.duration) meta += " · " + escHtml(v.duration);
    h += '<div class="bili-res" onclick="playBiliResult(' + i + ')">' +
      (v.pic ? '<img class="bili-res-thumb" loading="lazy" src="' + escAttr(v.pic) + '" alt="" />' : '<div class="bili-res-thumb bili-res-thumb-ph"></div>') +
      '<div class="bili-res-info">' +
        '<div class="bili-res-title">' + escHtml(stripBiliTags(v.title)) + '</div>' +
        '<div class="bili-res-meta">' + meta + '</div>' +
      '</div>' +
      '<button class="bili-res-add" onclick="event.stopPropagation();addToMyVideos(' + i + ')" title="添加到我的视频">＋</button>' +
    '</div>';
  }
  h += '<div class="bili-pager"><button onclick="biliSearch(' + (page + 1) + ')">下一页</button></div>';
  box.innerHTML = h;
  box.style.display = "block";
}
function playBiliResult(i) {
  var v = window._biliResList[i];
  if (!v || !v.bvid) return;
  var box = document.getElementById("biliPlayer");
  if (!box) return;
  var src = "https://player.bilibili.com/player.html?bvid=" + encodeURIComponent(v.bvid) + "&high_quality=1&danmaku=0&autoplay=1";
  box.style.display = "block";
  box.innerHTML = '<div class="bili-player"><iframe src="' + src + '" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe></div>' +
    '<div class="bili-player-title">' + escHtml(stripBiliTags(v.title)) + '</div>' +
    '<div class="bili-res-meta">清晰度 / 倍速请在播放器右下角「设置」中调整</div>';
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}
function addToMyVideos(i) {
  var v = window._biliResList[i];
  if (!v || !v.bvid) return;
  var vids = loadVideos();
  for (var j = 0; j < vids.length; j++) if (vids[j].bvid === v.bvid) { showToast("已在你的视频列表中"); return; }
  vids.push({ title: stripBiliTags(v.title) || "B站视频", bvid: v.bvid });
  saveVideos(vids);
  renderVideos();
  showToast("已添加到我的视频");
}

// —— 登录(新窗口)——
function biliDoLogin() {
  window.open("https://passport.bilibili.com/login", "_blank");
  showToast("请在打开的窗口完成哔哩哔哩登录，返回后点「检测登录」");
}
function biliCheckLogin(force) {
  // v3.5.0:失败/超时不写 BILI_LAST_CHECK,避免压住重试;仅在成功时记录节流。
  var cbName = "lexbili_n" + (BILI_CB_ID++);
  biliJsonp("https://api.bilibili.com/x/web-interface/nav?jsonp=" + cbName, cbName, function(d) {
    if (d && d.code === 0 && d.data && d.data.isLogin) {
      BILI_LAST_CHECK = Date.now();
      var snap = { uname: d.data.uname || "", mid: d.data.mid || 0, checkedAt: Date.now() };
      try { localStorage.setItem(BILI_KEY, JSON.stringify(snap)); } catch(e) {}
      renderBiliLogin();
      showToast("已登录哔哩哔哩：" + snap.uname);
    } else if (d && d.code === 0) {
      // 明确未登录:清除陈旧登录态展示
      try { localStorage.removeItem(BILI_KEY); } catch(e) {}
      renderBiliLogin();
      if (force) showToast("未检测到登录：请先在弹出窗口完成登录，再点「检测登录」");
    } else {
      // 接口被拦截(code!==0)或超时:第三方网页受浏览器 Cookie/风控限制
      renderBiliLogin();
      if (force) showToast(d ? ("检测被拦截(code " + d.code + ")：受浏览器第三方 Cookie 限制，可能无法检测；搜索/播放无需登录") : "检测超时：网络或风控原因，请稍后重试");
    }
  }, function() {
    renderBiliLogin();
    if (force) showToast("检测超时：网络或风控原因，请稍后重试");
  });
}
function renderBiliLogin() {
  var st = document.getElementById("biliLoginState");
  var btn = document.getElementById("biliLoginBtn");
  if (!st) return;
  var snap = null;
  try { snap = JSON.parse(localStorage.getItem(BILI_KEY) || "null"); } catch(e) {}
  if (snap && snap.uname) {
    st.textContent = "已登录：" + snap.uname;
    if (btn) btn.style.display = "none";
  } else {
    st.textContent = "哔哩哔哩";
    if (btn) btn.style.display = "";
  }
}

function getPeriodsPerDay(d) { return Math.max(4, Math.min(14, d.periodsPerDay || 10)); }
function getScheduleTimes(d) {
  var ppd = getPeriodsPerDay(d);
  if (Array.isArray(d.times) && d.times.length >= ppd) {
    var ok = true;
    for (var i = 0; i < ppd; i++) if (!Array.isArray(d.times[i]) || d.times[i].length !== 2) { ok = false; break; }
    if (ok) return d.times.slice(0, ppd);
  }
  var t = [];
  for (var j = 0; j < ppd; j++) t.push([SCHEDULE_TIMES[j], SCHEDULE_ENDTIMES[j]]);
  return t;
}

function buildWeekGrid(week) {
  var d = loadSchedule();
  var cardH = d.cardHeight || 96;
  var ppd = getPeriodsPerDay(d);
  var days = d.showWeekend === false ? 5 : 7;
  var courses = getVisibleCourses(d, week);
  var dates = getWeekDates(week);
  var times = getScheduleTimes(d);
  var ap = d; // 外观字段(loadSchedule 已合并默认值)
  var font = SCHEDULE_FONTS[ap.fontFamily] || "inherit";
  var bgStyle = "";
  var bgCustom = false;
  if (ap.bgType === "color" && ap.bgColor) { bgStyle = "background:" + ap.bgColor + ";"; bgCustom = true; }
  else if (ap.bgType === "image" && ap.bgImage) { bgStyle = "background-image:url('" + ap.bgImage + "');background-size:cover;background-position:center;"; bgCustom = true; }
  var html = '<div class="schedule-grid' + (bgCustom ? " sch-bg-custom" : "") + '" style="grid-auto-rows:' + cardH + 'px;grid-template-columns:48px repeat(' + days + ',1fr);' + bgStyle + 'font-family:' + font + '">';
  // 表头
  html += '<div class="sch-corner" style="grid-column:1;grid-row:1">节次</div>';
  for (var day = 0; day < days; day++) {
    html += '<div class="sch-dayhead" style="grid-column:' + (day + 2) + ';grid-row:1">' + SCHEDULE_DAYS[day] + '<span>' + fmtSchDate(dates[day]) + '</span></div>';
  }
  // 时间列（读自定义节次时间）
  for (var p = 1; p <= ppd; p++) {
    html += '<div class="sch-time" style="grid-column:1;grid-row:' + (p + 1) + '">' + p + '<span>' + times[p - 1][0] + '<br>' + times[p - 1][1] + '</span></div>';
  }
  // 课程块（带跨行）
  var txtCol = ap.textColor || "#FFFFFF";
  var txtSize = ap.textSize || 13;
  var rd = d.cardRadius != null ? d.cardRadius : 8;
  var occupied = {};
  for (var day = 0; day < days; day++) {
    var dayCourses = [];
    for (var ci = 0; ci < courses.length; ci++) {
      if (courses[ci].day === day) dayCourses.push({ c: courses[ci], idx: ci });
    }
    for (var i = 0; i < dayCourses.length; i++) {
      var c = dayCourses[i].c;
      var start = c.start, end = c.end || start;
      if (start > ppd) continue;
      if (end > ppd) end = ppd;
      for (var pp = start; pp <= end; pp++) occupied[day + "_" + pp] = true;
      var color = (ap.colorMode === "unified" && ap.unifiedColor) ? ap.unifiedColor : SCHEDULE_COLORS[(c.color == null ? 0 : c.color) % SCHEDULE_COLORS.length];
      var op = d.cardOpacity != null ? d.cardOpacity : 100;
      var bg = op >= 100 ? color : hexToRgba(color, op / 100);
      var bd = "";
      if (ap.borderStyle && ap.borderStyle !== "none" && ap.borderWidth > 0) {
        bd = "border:" + ap.borderWidth + "px " + ap.borderStyle + " " + (ap.borderColor || "#FFFFFF") + ";box-sizing:border-box;";
      }
      html += '<div class="sch-course" style="grid-column:' + (day + 2) + ';grid-row:' + (start + 1) + '/' + (end + 2) + ';background:' + bg + ';border-radius:' + rd + 'px;color:' + txtCol + ';' + bd + '" onclick="editScheduleCourse(' + week + ',' + dayCourses[i].idx + ')">' +
        '<div class="sc-name" style="font-size:' + txtSize + 'px;color:' + txtCol + '">' + escHtml(c.name || "课程") + '</div>' +
        (c.loc ? '<div class="sc-loc">' + escHtml(c.loc) + '</div>' : '') +
        (ap.showTeacher && c.teacher ? '<div class="sc-teacher">👨‍🏫 ' + escHtml(c.teacher) + '</div>' : '') +
        '</div>';
    }
  }
  // 幽灵课：同学期但不在本周的课程，半透明显示(显示非本周课程)
  var ghostKeys = {};
  if (ap.showOtherWeeks) {
    var semCourses = d.courses.filter(function(cc) { return cc.semId == null || cc.semId === d.currentSem; });
    for (var gi = 0; gi < semCourses.length; gi++) {
      var gc = semCourses[gi];
      if (gc.day >= days) continue;
      if (getCourseWeeks(gc).indexOf(week) >= 0) continue;
      var gs = gc.start || 1, ge = gc.end || gs;
      if (gs > ppd) continue;
      var free = true;
      for (var gp = gs; gp <= Math.min(ge, ppd); gp++) {
        if (occupied[gc.day + "_" + gp] || ghostKeys[gc.day + "_" + gp]) { free = false; break; }
      }
      if (!free) continue;
      for (var gp2 = gs; gp2 <= Math.min(ge, ppd); gp2++) ghostKeys[gc.day + "_" + gp2] = true;
      var gcolor = (ap.colorMode === "unified" && ap.unifiedColor) ? ap.unifiedColor : SCHEDULE_COLORS[(gc.color == null ? 0 : gc.color) % SCHEDULE_COLORS.length];
      html += '<div class="sch-course sch-ghost" style="grid-column:' + (gc.day + 2) + ';grid-row:' + (gs + 1) + '/' + (Math.min(ge, ppd) + 2) + ';background:' + gcolor + ';border-radius:' + rd + 'px;color:' + txtCol + ';opacity:.35;filter:grayscale(.3);pointer-events:none;box-shadow:none;border:1px dashed rgba(0,0,0,.25);box-sizing:border-box;">' +
        '<div class="sc-name" style="font-size:' + txtSize + 'px;color:' + txtCol + '">' + escHtml(gc.name || "课程") + '</div>' +
        (gc.loc ? '<div class="sc-loc">' + escHtml(gc.loc) + '</div>' : '') +
        '</div>';
    }
  }
  // 空格子
  for (var p2 = 1; p2 <= ppd; p2++) {
    for (var day2 = 0; day2 < days; day2++) {
      if (occupied[day2 + "_" + p2] || ghostKeys[day2 + "_" + p2]) continue;
      html += '<div class="sch-empty" style="grid-column:' + (day2 + 2) + ';grid-row:' + (p2 + 1) + '" onclick="addScheduleCourse(' + day2 + ',' + p2 + ')"></div>';
    }
  }
  html += '</div>';
  // 贴纸（固定四角，不做自由拖拽）
  var stk = Array.isArray(ap.stickers) ? ap.stickers : ["", "", "", ""];
  var hasStk = false;
  for (var si = 0; si < 4; si++) if (stk[si]) { hasStk = true; break; }
  if (hasStk) {
    html += '<div class="sch-stickers">';
    var pos = [["top:2px;left:6px", "top:2px;right:6px"], ["bottom:2px;left:6px", "bottom:2px;right:6px"]];
    for (var si2 = 0; si2 < 4; si2++) {
      if (!stk[si2]) continue;
      html += '<span class="sch-sticker" style="position:absolute;' + pos[si2 >> 1][si2 & 1] + ';font-size:22px;opacity:.75;pointer-events:none;z-index:5">' + stk[si2] + '</span>';
    }
    html += '</div>';
  }
  return html;
}

// 横向时间轴：本周周日右侧紧贴下周周一，原生滚动跟手无缝切换
var _tlStart = 1, _tlEnd = 1, _tlTimer = null, _tlLocked = false;
function renderScheduleTimeline() {
  var d = loadSchedule();
  var cw = d.currentWeek;
  _tlStart = Math.max(1, cw - 2);
  _tlEnd = Math.min(30, cw + 2);
  var tl = document.getElementById("scheduleTimeline");
  if (!tl) return;
  _tlLocked = true;
  var html = "";
  for (var w = _tlStart; w <= _tlEnd; w++) {
    html += '<div class="sch-week" data-week="' + w + '">' + buildWeekGrid(w) + '</div>';
  }
  tl.innerHTML = html;
  requestAnimationFrame(function() {
    tl.scrollLeft = (cw - _tlStart) * tl.clientWidth;
    _tlLocked = false;
  });
}

// ===== 新增/编辑课程表单 =====
var _schedEditRef = null;
function allWeeks() {
  var w = [];
  for (var i = 1; i <= 20; i++) w.push(i);
  return w;
}
function addScheduleCourse(day, period) {
  _schedEditRef = null;
  var d = loadSchedule();
  var ppd = getPeriodsPerDay(d);
  // 一次课默认两节，无单节
  var start = Math.min(period, ppd);
  var end = Math.min(start + 1, ppd);
  if (end === start) start = Math.max(1, start - 1);
  openScheduleForm({ day: day, start: start, end: end, name: "", loc: "", color: 0, weeks: allWeeks() });
}
function editScheduleCourse(week, idx) {
  var d = loadSchedule();
  var courses = getVisibleCourses(d, week);
  var c = courses[idx];
  if (!c) return;
  _schedEditRef = { realIdx: d.courses.indexOf(c) };
  openScheduleForm({ day: c.day, start: c.start, end: c.end, name: c.name, loc: c.loc, teacher: c.teacher || "", color: c.color, weeks: getCourseWeeks(c) });
}
function openScheduleForm(prefill) {
  var overlay = document.createElement("div");
  overlay.id = "scheduleFormOverlay";
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:600;display:flex;align-items:center;justify-content:center;padding:16px";
  var box = document.createElement("div");
  box.style.cssText = "position:relative;background:var(--card-bg);border-radius:18px;padding:18px;max-width:320px;width:100%";
  var colorOptions = "";
  for (var i = 0; i < SCHEDULE_COLORS.length; i++) {
    colorOptions += '<button type="button" data-col="' + i + '" style="width:22px;height:22px;border-radius:50%;border:2px solid ' + (prefill.color == i ? "#111" : "transparent") + ';background:' + SCHEDULE_COLORS[i] + ';cursor:pointer;margin:2px"></button>';
  }
  var dayOptions = "";
  for (var di = 0; di < 7; di++) dayOptions += '<option value="' + di + '"' + (prefill.day == di ? " selected" : "") + '>' + SCHEDULE_DAYS[di] + '</option>';
  var ppd = getPeriodsPerDay(loadSchedule());
  var startOptions = "";
  for (var pi = 1; pi <= ppd; pi++) startOptions += '<option value="' + pi + '"' + (prefill.start == pi ? " selected" : "") + '>第' + pi + '节</option>';
  var endOptions = "";
  for (var pe = 1; pe <= ppd; pe++) endOptions += '<option value="' + pe + '"' + (prefill.end == pe ? " selected" : "") + '>第' + pe + '节</option>';
  var selWeeks = Array.isArray(prefill.weeks) && prefill.weeks.length ? prefill.weeks.slice() : allWeeks();
  var weekBtns = "";
  for (var wk = 1; wk <= 20; wk++) {
    weekBtns += '<button type="button" data-wk="' + wk + '" class="sf-week' + (selWeeks.indexOf(wk) >= 0 ? " on" : "") + '">' + wk + '</button>';
  }
  box.innerHTML =
    '<button class="modal-close">✕</button>' +
    '<p style="font-size:16px;font-weight:700;color:var(--text);margin:0 0 12px">' + (_schedEditRef ? "编辑课程" : "新增课程") + '</p>' +
    '<label class="sf-label">课程名称</label>' +
    '<input id="sfName" type="text" maxlength="12" value="' + escAttr(prefill.name || "") + '" placeholder="如：国际法" style="width:100%;box-sizing:border-box;padding:9px 12px;border:1px solid var(--card-border);border-radius:10px;background:var(--input-bg);color:var(--text);font-size:14px;outline:none;margin-bottom:10px;font-family:inherit" />' +
    '<label class="sf-label">上课地点</label>' +
    '<input id="sfLoc" type="text" maxlength="12" value="' + escAttr(prefill.loc || "") + '" placeholder="如：A教201" style="width:100%;box-sizing:border-box;padding:9px 12px;border:1px solid var(--card-border);border-radius:10px;background:var(--input-bg);color:var(--text);font-size:14px;outline:none;margin-bottom:10px;font-family:inherit" />' +
    '<label class="sf-label">授课教师</label>' +
    '<input id="sfTeacher" type="text" maxlength="12" value="' + escAttr(prefill.teacher || "") + '" placeholder="如：张三" style="width:100%;box-sizing:border-box;padding:9px 12px;border:1px solid var(--card-border);border-radius:10px;background:var(--input-bg);color:var(--text);font-size:14px;outline:none;margin-bottom:10px;font-family:inherit" />' +
    '<label class="sf-label">星期</label>' +
    '<select id="sfDay" style="width:100%;padding:9px;border:1px solid var(--card-border);border-radius:10px;background:var(--input-bg);color:var(--text);font-size:13px;outline:none;margin-bottom:10px;font-family:inherit">' + dayOptions + '</select>' +
    '<div style="display:flex;gap:8px;margin-bottom:10px">' +
    '<div style="flex:1"><label class="sf-label">开始节次</label><select id="sfStart" onchange="adjustSchedPeriods()" style="width:100%;padding:8px;border:1px solid var(--card-border);border-radius:10px;background:var(--input-bg);color:var(--text);font-size:12px;outline:none;font-family:inherit">' + startOptions + '</select></div>' +
    '<div style="flex:1"><label class="sf-label">结束节次</label><select id="sfEnd" style="width:100%;padding:8px;border:1px solid var(--card-border);border-radius:10px;background:var(--input-bg);color:var(--text);font-size:12px;outline:none;font-family:inherit">' + endOptions + '</select></div>' +
    '</div>' +
    '<label class="sf-label">上课周次（点选 / 点掉）</label>' +
    '<div id="sfWeeks" class="sf-week-grid">' + weekBtns + '</div>' +
    '<label class="sf-label">颜色（12色可选）</label>' +
    '<div id="sfColors" style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px">' + colorOptions + '</div>' +
    '<div style="display:flex;gap:8px">' +
    (_schedEditRef ? '<button class="sf-del" onclick="deleteScheduleCourse()">删除</button>' : '') +
    '<button class="sf-save" onclick="saveScheduleCourse()">保存</button>' +
    '<button class="sf-cancel" onclick="document.getElementById(\'scheduleFormOverlay\').remove()">取消</button>' +
    '</div>';
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  var selColor = prefill.color || 0;
  var colorBtns = box.querySelectorAll("#sfColors button");
  for (var ci = 0; ci < colorBtns.length; ci++) {
    colorBtns[ci].onclick = function() {
      selColor = parseInt(this.getAttribute("data-col"), 10);
      for (var j = 0; j < colorBtns.length; j++) colorBtns[j].style.borderColor = "transparent";
      this.style.borderColor = "#111";
    };
  }
  var mc = box.querySelector(".modal-close");
  if (mc) mc.onclick = function() { overlay.remove(); };
  // 周次按钮点选/点掉
  var wkBtns = box.querySelectorAll("#sfWeeks .sf-week");
  for (var wi = 0; wi < wkBtns.length; wi++) {
    wkBtns[wi].onclick = function() {
      var wkn = parseInt(this.getAttribute("data-wk"), 10);
      var idx = selWeeks.indexOf(wkn);
      if (idx >= 0) { selWeeks.splice(idx, 1); this.classList.remove("on"); }
      else { selWeeks.push(wkn); this.classList.add("on"); }
    };
  }
  window._schedForm = {
    getColor: function() { return selColor; },
    getWeeks: function() { return selWeeks.slice().sort(function(a, b) { return a - b; }); }
  };
}
function saveScheduleCourse() {
  var d = loadSchedule();
  var name = document.getElementById("sfName").value.trim();
  if (!name) { showToast("请输入课程名称"); return; }
  var loc = document.getElementById("sfLoc").value.trim();
  var teacher = document.getElementById("sfTeacher").value.trim();
  var day = parseInt(document.getElementById("sfDay").value, 10);
  var start = parseInt(document.getElementById("sfStart").value, 10);
  var end = parseInt(document.getElementById("sfEnd").value, 10);
  // 一次课至少两节：单节自动向后扩一节
  var ppd = getPeriodsPerDay(d);
  var adjusted = false;
  if (end < start + 1) { end = start + 1; adjusted = true; }
  if (end > ppd) { end = ppd; start = Math.max(1, ppd - 1); adjusted = true; }
  var weeks = window._schedForm ? window._schedForm.getWeeks() : allWeeks();
  if (!weeks.length) { showToast("请至少选择一个上课周次"); return; }
  var color = window._schedForm ? window._schedForm.getColor() : 0;
  var course = { day: day, start: start, end: end, name: name, loc: loc, teacher: teacher, color: color, weeks: weeks, semId: d.currentSem };
  if (_schedEditRef) {
    if (_schedEditRef.realIdx >= 0 && _schedEditRef.realIdx < d.courses.length) d.courses[_schedEditRef.realIdx] = course;
  } else {
    d.courses.push(course);
  }
  saveSchedule(d);
  _schedEditRef = null;
  var ov = document.getElementById("scheduleFormOverlay");
  if (ov) ov.remove();
  renderScheduleView();
  showToast(adjusted ? "课程至少两节，已自动调整" : "课程表已更新");
}
function adjustSchedPeriods() {
  var s = document.getElementById("sfStart");
  var e = document.getElementById("sfEnd");
  if (!s || !e) return;
  var sv = parseInt(s.value, 10);
  var ev = parseInt(e.value, 10);
  if (ev <= sv) {
    var ppd = getPeriodsPerDay(loadSchedule());
    var nv = Math.min(sv + 1, ppd);
    if (nv > sv) e.value = nv;
  }
}
function deleteScheduleCourse() {
  if (!_schedEditRef) return;
  var d = loadSchedule();
  if (_schedEditRef.realIdx >= 0 && _schedEditRef.realIdx < d.courses.length) d.courses.splice(_schedEditRef.realIdx, 1);
  saveSchedule(d);
  _schedEditRef = null;
  var ov = document.getElementById("scheduleFormOverlay");
  if (ov) ov.remove();
  renderScheduleView();
  showToast("已删除");
}

// ===== 导入课表 =====
function openScheduleImport() {
  var overlay = document.createElement("div");
  overlay.id = "scheduleImportOverlay";
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:600;display:flex;align-items:center;justify-content:center;padding:16px";
  var box = document.createElement("div");
  box.style.cssText = "position:relative;background:var(--card-bg);border-radius:18px;padding:18px;max-width:360px;width:100%;max-height:84vh;overflow-y:auto;box-sizing:border-box";
  box.innerHTML =
    '<button class="modal-close" onclick="document.getElementById(\'scheduleImportOverlay\').remove()">✕</button>' +
    '<p style="font-size:16px;font-weight:700;color:var(--text);margin:0 0 8px">导入/导出课表</p>' +
    '<div style="font-size:12px;font-weight:700;color:var(--text);margin:4px 0 6px">① 文本导入</div>' +
    '<button class="ss-save" style="width:100%;padding:9px;font-size:13px;margin-bottom:10px" onclick="document.getElementById(\'impPdfInput\').click()">📄 上传 PDF 提取文字</button>' +
    '<input type="file" id="impPdfInput" accept=".pdf,application/pdf" style="display:none" />' +
    '<textarea id="impText" placeholder="第1-8周 周一 第1-2节 国际法 A教201 张三&#10;第3,5,7周 周二 第5节 刑法 B305 李四&#10;周三 第3-4节 民法 C201 王五&#10;格式:周次(可省) 星期 第X-Y节 课程名 地点 教师;节次写单节会自动扩为两节" style="width:100%;box-sizing:border-box;height:120px;padding:10px;border:1px solid var(--card-border);border-radius:10px;background:var(--input-bg);color:var(--text);font-size:13px;font-family:inherit;outline:none;resize:vertical"></textarea>' +
    '<div id="impResult" style="font-size:11px;color:var(--text2);margin:8px 0;min-height:14px"></div>' +
    '<div style="display:flex;gap:8px;margin-bottom:12px">' +
    '<button class="sf-save" onclick="importScheduleText()">追加导入</button>' +
    '<button class="sf-cancel" onclick="document.getElementById(\'scheduleImportOverlay\').remove()">取消</button>' +
    '</div>' +
    '<div style="border-top:1px solid var(--card-border);padding-top:10px">' +
    '<div style="font-size:12px;font-weight:700;color:var(--text);margin-bottom:6px">② JSON 备份文件（覆盖当前学期）</div>' +
    '<div style="display:flex;gap:8px">' +
    '<button class="sf-save" onclick="document.getElementById(\'impJsonInput\').click()">导入 .json</button>' +
    '<button class="sf-cancel" onclick="exportScheduleJson()">导出 JSON</button>' +
    '</div>' +
    '<input type="file" id="impJsonInput" accept=".json" style="display:none" />' +
    '</div>' +
    '<div style="border-top:1px solid var(--card-border);padding-top:10px;margin-top:10px">' +
    '<div style="font-size:12px;font-weight:700;color:var(--text);margin-bottom:6px">③ 分享码（Base64 口令，覆盖当前学期）</div>' +
    '<textarea id="impShareCode" placeholder="粘贴分享码…" style="width:100%;box-sizing:border-box;height:64px;padding:10px;border:1px solid var(--card-border);border-radius:10px;background:var(--input-bg);color:var(--text);font-size:13px;font-family:inherit;outline:none;resize:vertical;margin-bottom:8px"></textarea>' +
    '<div style="display:flex;gap:8px">' +
    '<button class="sf-save" onclick="importScheduleShareCode()">导入分享码</button>' +
    '<button class="sf-cancel" onclick="exportScheduleShareCode()">生成分享码</button>' +
    '</div>' +
    '</div>';
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  var inp = document.getElementById("impPdfInput");
  if (inp) inp.onchange = function() { extractPdfText(this); };
  var jinp = document.getElementById("impJsonInput");
  if (jinp) jinp.onchange = function() { importScheduleJsonFile(this); };
}

function parseWeekSpec(line) {
  var m = line.match(/^第?\s*(\d{1,2})\s*[-~至到]\s*(\d{1,2})\s*周/);
  if (m) {
    var w = [];
    for (var i = parseInt(m[1], 10); i <= parseInt(m[2], 10); i++) if (i <= 20) w.push(i);
    return { weeks: w, rest: line.slice(m[0].length) };
  }
  var m2 = line.match(/^第?\s*(\d{1,2}(?:\s*[、,，]\s*\d{1,2})*)\s*周/);
  if (m2) {
    var w2 = [];
    m2[1].split(/[、,，]/).forEach(function(s) { var n = parseInt(s.replace(/\s/g, ""), 10); if (n <= 20) w2.push(n); });
    return { weeks: w2, rest: line.slice(m2[0].length) };
  }
  var m3 = line.match(/^第?\s*(\d{1,2})\s*周/);
  if (m3) {
    var n3 = parseInt(m3[1], 10);
    return { weeks: n3 <= 20 ? [n3] : allWeeks(), rest: line.slice(m3[0].length) };
  }
  return null;
}

function parseScheduleText(text) {
  var DAYMAP = { "周一": 0, "星期一": 0, "礼拜一": 0, "周二": 1, "星期二": 1, "礼拜二": 1, "周三": 2, "星期三": 2, "礼拜三": 2, "周四": 3, "星期四": 3, "礼拜四": 3, "周五": 4, "星期五": 4, "礼拜五": 4, "周六": 5, "星期六": 5, "礼拜六": 5, "周日": 6, "星期天": 6, "星期日": 6, "礼拜天": 6 };
  var dayKeys = Object.keys(DAYMAP).sort(function(a, b) { return b.length - a.length; });
  var out = [];
  var lines = text.split(/\r?\n/);
  for (var li = 0; li < lines.length; li++) {
    var line = lines[li].replace(/\s+/g, " ").trim();
    if (!line) continue;
    var weeks = allWeeks();
    var ws = parseWeekSpec(line);
    if (ws) { weeks = ws.weeks; line = ws.rest; }
    var day = -1;
    for (var dk = 0; dk < dayKeys.length; dk++) {
      var k = dayKeys[dk];
      var pos = line.indexOf(k);
      if (pos >= 0) { day = DAYMAP[k]; line = line.slice(0, pos) + line.slice(pos + k.length); break; }
    }
    if (day < 0) continue;
    var pm = line.match(/(?:第)?(\d{1,2})\s*[-~至到]+\s*(\d{1,2})\s*节?/);
    var start, end;
    if (pm) { start = parseInt(pm[1], 10); end = parseInt(pm[2], 10); line = line.replace(/(?:第)?\d{1,2}\s*[-~至到]+\s*\d{1,2}\s*节?/, " "); }
    else {
      pm = line.match(/(?:第)?(\d{1,2})\s*节?/);
      if (!pm) continue;
      start = end = parseInt(pm[1], 10);
      line = line.replace(/(?:第)?\d{1,2}\s*节?/, " ");
    }
    var ppd = getPeriodsPerDay(loadSchedule());
    start = Math.max(1, Math.min(ppd, start));
    end = Math.max(start, Math.min(ppd, end));
    // 一次课至少两节：单节自动向后扩一节
    if (end < start + 1) {
      end = start + 1;
      if (end > ppd) { end = ppd; start = Math.max(1, ppd - 1); }
    }
    line = line.replace(/[，,、;；]\s*$/, "").trim();
    if (!line) continue;
    var parts = line.split(/\s+/);
    var loc = "", teacher = "";
    if (parts.length >= 3) { teacher = parts.pop(); loc = parts.pop(); }
    else if (parts.length === 2) { loc = parts.pop(); }
    var name = parts.join(" ").trim();
    if (!name) { name = loc; loc = ""; }
    if (name.length > 20) name = name.slice(0, 20);
    if (loc.length > 12) loc = loc.slice(0, 12);
    if (teacher.length > 12) teacher = teacher.slice(0, 12);
    out.push({ day: day, start: start, end: end, name: name, loc: loc, teacher: teacher, color: (out.length + Math.floor(Math.random() * 3)) % SCHEDULE_COLORS.length, weeks: weeks });
  }
  return out;
}

function importScheduleText() {
  var ta = document.getElementById("impText");
  var text = ta ? ta.value : "";
  var courses = parseScheduleText(text);
  var res = document.getElementById("impResult");
  if (!courses.length) {
    if (res) res.textContent = "未识别到有效课程，请检查格式：周一 第1-2节 课程名 地点";
    return;
  }
  var d = loadSchedule();
  d.courses = d.courses.concat(courses);
  saveSchedule(d);
  if (res) res.textContent = "✅ 成功导入 " + courses.length + " 门课程";
  renderScheduleView();
  showToast("已导入 " + courses.length + " 门课程");
}

function extractPdfText(input) {
  var file = input.files[0];
  if (!file) return;
  var res = document.getElementById("impResult");
  if (res) res.textContent = "正在读取 PDF…";
  var load = function() {
    doExtractPdf(file, res);
  };
  if (!window.pdfjsLib) {
    var s = document.createElement("script");
    s.src = "https://cdn.bootcdn.net/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    s.onload = function() {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.bootcdn.net/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      load();
    };
    s.onerror = function() { if (res) res.textContent = "PDF 解析组件加载失败，请手动粘贴文字"; };
    document.head.appendChild(s);
  } else {
    load();
  }
}
function doExtractPdf(file, res) {
  var fr = new FileReader();
  fr.onload = function() {
    try {
      var arr = new Uint8Array(fr.result);
      window.pdfjsLib.getDocument({ data: arr }).promise.then(function(pdf) {
        var ps = [];
        for (var p = 1; p <= pdf.numPages; p++) ps.push(pdf.getPage(p).then(function(pg) { return pg.getTextContent().then(function(tc) { return tc.items.map(function(it) { return it.str; }).join(" "); }); }));
        Promise.all(ps).then(function(texts) {
          var ta = document.getElementById("impText");
          if (ta) ta.value = texts.join("\n");
          if (res) res.textContent = "已提取 PDF 文字，请检查调整后点【解析并导入】";
        });
      }).catch(function() { if (res) res.textContent = "PDF 解析失败（扫描件需文字版 PDF）"; });
    } catch (e) { if (res) res.textContent = "PDF 读取失败：" + e.message; }
  };
  fr.readAsArrayBuffer(file);
}

function redeemVipCode() {
  var input = document.getElementById("redeemCodeInput");
  if (!input) { showToast("兑换功能加载中，请稍后再试"); return; }
  var code = (input.value || "").trim();
  var msgEl = document.getElementById("redeemMsg");
  if (!code) {
    if (msgEl) msgEl.textContent = "请输入兑换码";
    return;
  }
  if (code === "0815") {
    setVip(true);
    updateProfileUI();
    if (msgEl) msgEl.textContent = "";
    showToast("兑换成功！永久VIP已激活");
    input.value = "";
  } else if (code === "999") {
    addPoints(100, "兑换码999");
    updateProfileUI();
    if (msgEl) msgEl.textContent = "";
    showToast("兑换成功！");
    input.value = "";
  } else {
    if (msgEl) msgEl.textContent = "兑换码无效";
    showToast("兑换码无效");
  }
}

// Bind redeem button after DOM ready
function bindRedeemButton() {
  var btn = document.getElementById("redeemBtn");
  if (btn) btn.onclick = redeemVipCode;
  // Also bind enter key on input
  var input = document.getElementById("redeemCodeInput");
  if (input) input.onkeydown = function(e) { if (e.key === "Enter") redeemVipCode(); };
}
setTimeout(bindRedeemButton, 500);

function doVipPay(plan) {
  showToast("感谢支持！VIP功能即将上线");
  var overlay = document.getElementById("avatarPickOverlay");
  if (!overlay) {
    // Find any overlay and remove
    var overlays = document.querySelectorAll('[id]');
    for (var i = 0; i < overlays.length; i++) {
      if (overlays[i].style.position === "fixed" && overlays[i].style.zIndex === "500") {
        overlays[i].remove();
      }
    }
  }
  // Give some points as reward
  addPoints(plan === "year" ? 500 : 100, "VIP充值");
}

// Run on about page load


function $(s){return document.querySelector(s)}

// ============================================================
// LAW DATABASE
// ============================================================
var LAWS = [
  { name:"中华人民共和国民法典", file:"civil-code-2020.docx", date:"2021-01-01", cat:"民事", icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>', desc:"7编1260条 · 总则·物权·合同·人格权·婚姻家庭·继承·侵权" },
  { name:"中华人民共和国刑法", file:"criminal-law-2020.docx", date:"2021-03-01", cat:"刑事", icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>', desc:"452条 — 总则+分则，含修正案(十一)" },
  { name:"中华人民共和国民事诉讼法", file:"civil-procedure-law-2023.docx", date:"2024-01-01", cat:"程序", icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>', desc:"306条 — 含2023年修正案" },
  { name:"中华人民共和国劳动合同法", file:"labor-contract-law-2012.docx", date:"2013-07-01", cat:"社会", icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>', desc:"98条 — 劳动合同订立、履行、解除" },
  { name:"中华人民共和国安全生产法", file:"work-safety-law-2021.docx", date:"2021-09-01", cat:"行政", icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>', desc:"119条 — 2021修正版" },
  { name:"中华人民共和国治安管理处罚法", file:"public-security-law-2025.docx", date:"2026-01-01", cat:"行政", icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>', desc:"119条 — 2025修订版" },
  { name:"中华人民共和国危险化学品安全法", file:"hazardous-chemicals-safety-law-2025.docx", date:"2026-01-01", cat:"行政", icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>', desc:"新法 — 2025年通过" }
];

function showDatabase() {
  hideAllViews();
  document.getElementById("dbView").classList.add("show");
  recordLastStudy("dbView");
  renderDatabase();
}

function renderDatabase(filter) {
  var q = (filter || "").toLowerCase();
  var filtered = LAWS.filter(function(l) {
    return !q || l.name.indexOf(q) !== -1 || l.cat.indexOf(q) !== -1 || l.desc.indexOf(q) !== -1;
  });
  var cats = {};
  filtered.forEach(function(l) {
    if (!cats[l.cat]) cats[l.cat] = [];
    cats[l.cat].push(l);
  });

  var h = "";
  var catNames = { "民事":'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:3px"><path d="M12 3 L12 21"/><path d="M5 3 L5 21"/><path d="M19 3 L19 21"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg>民事法律', "刑事":'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-3px;margin-right:3px"><path d="M12 2 L12 22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>刑事法律', "程序":'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-3px;margin-right:3px"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>程序法律', "社会":'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-3px;margin-right:3px"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>社会法律', "行政":'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-3px;margin-right:3px"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>行政法律' };
  Object.keys(cats).forEach(function(cat) {
    h += '<div class="db-category">' + (catNames[cat] || cat) + '</div>';
    cats[cat].forEach(function(law) {
      h += '<div class="law-card">' +
        '<div class="law-icon" onclick="previewLaw(\'' + escAttr(law.file) + '\',\'' + escAttr(law.name) + '\')">' + law.icon + '</div>' +
        '<div class="law-info" onclick="previewLaw(\'' + escAttr(law.file) + '\',\'' + escAttr(law.name) + '\')"><div class="law-name">' + escHtml(law.name) + '</div>' +
        '<div class="law-meta"><span>生效：' + law.date + '</span><span>' + law.desc + '</span></div></div>' +
        '<button class="law-view-btn" onclick="event.stopPropagation();openLawReader(\'' + escAttr(law.file) + '\',\'' + escAttr(law.name) + '\')">查看</button>' +
        '<a class="law-dl" href="laws/' + encodeURI(law.file) + '" download onclick="event.stopPropagation()">下载</a>' +
        '</div>';
    });
  });

  if (!h) h = '<div style="text-align:center;padding:40px;color:var(--text2)">未找到匹配的法律法规</div>';
  document.getElementById("dbContent").innerHTML = h;
}

function filterLaws() {
  renderDatabase(document.getElementById("dbSearch").value);
}

function previewLaw(file, name) {
  document.getElementById("lawModalTitle").textContent = name;
  document.getElementById("lawModalMeta").textContent = "正在加载预览引擎…";
  document.getElementById("lawModalText").textContent = "⏳ 正在加载文档预览…";
  document.getElementById("lawModalDownload").onclick = function() {
    var a = document.createElement("a");
    a.href = "laws/" + encodeURI(file);
    a.download = file;
    a.click();
  };
  document.getElementById("lawModal").classList.remove("hide");

  function doPreview() {
    fetch("laws/" + encodeURI(file)).then(function(r) {
      document.getElementById("lawModalMeta").textContent = "正在下载文档…";
      return r.arrayBuffer();
    }).then(function(buf) {
      document.getElementById("lawModalMeta").textContent = "正在解析文本…";
      return mammoth.extractRawText({ arrayBuffer: buf });
    }).then(function(result) {
      var text = (result.value || "").trim();
      if (!text) throw new Error("empty");
      var maxLen = 30000;
      var truncated = text.length > maxLen;
      document.getElementById("lawModalText").textContent = text.substring(0, maxLen);
      document.getElementById("lawModalMeta").textContent = "全文预览" + (truncated ? "（前30000字，共约" + Math.round(text.length/1000) + "千字）" : "") + " · 点击下方按钮下载完整文档";
    }).catch(function() {
      document.getElementById("lawModalText").textContent = "无法在线预览此 .docx 文件。请点击下方「下载全文」按钮，下载后用 Word 或 WPS 打开查阅。";
      document.getElementById("lawModalMeta").textContent = file;
    });
  }

  if (typeof mammoth !== "undefined") {
    doPreview();
  } else {
    loadScript("https://cdn.bootcdn.net/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js", function(err) {
      if (err) {
        document.getElementById("lawModalText").textContent = "预览引擎加载失败。请点击下方「下载全文」按钮下载后查阅。";
        document.getElementById("lawModalMeta").textContent = file;
        return;
      }
      doPreview();
    });
  }
}

function closeLawModal() {
  document.getElementById("lawModal").classList.add("hide");
}
// Close law modal on overlay click
document.getElementById("lawModal").addEventListener("click", function(e) {
  if (e.target === this) closeLawModal();
});

// ============================================================
// LAW READER — full text with search
// ============================================================
var lawReaderText = "";
var lawReaderName = "";
var lawMatchNodes = [];
var lawVoiceSpeaker = null;
var isLawVoicePlaying = false;
var lawVoiceSpeed = 1;
var lawVoiceText = "";

// 法条阅读器可视化：按「第X章」分节、「第X条」分卡渲染，替代纯文本
function renderLawVisual() {
  var text = lawReaderText;
  if (!text) return;
  var lines = text.split("\n").map(function(s) { return s.trim(); }).filter(Boolean);
  var CH = /^第[一二三四五六七八九十百千零\d]+章/;
  var ART = /^(第[一二三四五六七八九十百千零\d]+条)[\s:：]*(.*)/;
  var h = "", plainBuf = [], i, j, artIdx = 0;
  function flushPlain() {
    if (plainBuf.length) {
      h += '<div class="lr-para">' + escHtml(plainBuf.join("\n")).replace(/\n/g, "<br>") + '</div>';
      plainBuf = [];
    }
  }
  for (i = 0; i < lines.length; i++) {
    var ln = lines[i];
    if (CH.test(ln)) {
      flushPlain();
      h += '<div class="lr-chapter">' + escHtml(ln) + '</div>';
    } else {
      var m = ART.exec(ln);
      if (m) {
        flushPlain();
        var body = m[2];
        for (j = i + 1; j < lines.length; j++) {
          if (CH.test(lines[j]) || ART.test(lines[j])) break;
          body += lines[j];
        }
        i = j - 1;
        h += '<div class="lr-article" id="lrArt' + artIdx + '"><span class="lr-art-num">' + escHtml(m[1]) + '</span><span class="lr-art-text">' + escHtml(body) + '</span></div>';
        artIdx++;
      } else {
        plainBuf.push(ln);
      }
    }
  }
  flushPlain();
  document.getElementById("lrContent").innerHTML = h;
}

function openLawReader(file, name, keyword) {
  lawReaderName = name; lawReaderText = "";
  document.getElementById("lrTitle").textContent = name;
  document.getElementById("lrContent").textContent = "正在加载全文…";
  document.getElementById("lrInfo").textContent = "";
  document.getElementById("lrNav").innerHTML = "";
  document.getElementById("lrSearch").value = keyword || "";
  hideAllViews();
  document.getElementById("lawReaderView").classList.add("show");

  function doLoad() {
    fetch("laws/" + encodeURI(file)).then(function(r) { return r.arrayBuffer(); }).then(function(buf) {
      return mammoth.extractRawText({ arrayBuffer: buf });
    }).then(function(result) {
      lawReaderText = (result.value || "").trim();
      if (!lawReaderText) throw new Error("empty");
      renderLawVisual();
      document.getElementById("lrInfo").textContent = "全文共约 " + Math.round(lawReaderText.length/1000) + " 千字";
      // 初始化语音朗读
      initLawVoiceSpeaker();
      lawVoiceText = lawReaderText;
      updateVoiceUI("准备就绪");
      // 从首页搜索进入时，自动定位到关键词命中的条文
      if (keyword) { try { searchInLaw(); } catch(e2) {} }
    }).catch(function() {
      document.getElementById("lrContent").textContent = "无法加载文本。请下载 .docx 文件后用 Word 查阅。";
      document.getElementById("lrInfo").textContent = "";
    });
  }

  if (typeof mammoth !== "undefined") { doLoad(); }
  else {
    loadScript("https://cdn.bootcdn.net/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js", function(err) {
      if (err) { document.getElementById("lrContent").textContent = "预览引擎加载失败，请下载后查阅。"; return; }
      doLoad();
    });
  }
}

function closeLawReader() {
  stopLawVoice();
  document.getElementById("lawReaderView").classList.remove("show");
  showDatabase();
}

// 【语音朗读函数】
function initLawVoiceSpeaker() {
  if (!window.speechSynthesis) return false;
  lawVoiceSpeaker = window.speechSynthesis;
  return true;
}

function toggleLawVoice() {
  if (!lawVoiceText) return;
  if (isLawVoicePlaying) {
    lawVoiceSpeaker.pause();
    isLawVoicePlaying = false;
    updateVoiceUI("暂停");
  } else {
    if (lawVoiceSpeaker.paused) {
      lawVoiceSpeaker.resume();
    } else {
      speakLawText(lawVoiceText);
    }
    isLawVoicePlaying = true;
    updateVoiceUI("播放中...");
  }
}

function stopLawVoice() {
  if (lawVoiceSpeaker) {
    lawVoiceSpeaker.cancel();
    isLawVoicePlaying = false;
    updateVoiceUI("已停止");
  }
}

function speakLawText(text) {
  stopLawVoice();
  var utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = lawVoiceSpeed;
  utterance.lang = "zh-CN";

  utterance.onstart = function() {
    isLawVoicePlaying = true;
    updateVoiceUI("播放中...");
  };

  utterance.onend = function() {
    isLawVoicePlaying = false;
    updateVoiceUI("已完成");
  };

  utterance.onerror = function(e) {
    updateVoiceUI("出错：" + (e.error || "未知错误"));
  };

  lawVoiceSpeaker.speak(utterance);
}

function setLawVoiceSpeed(speed) {
  lawVoiceSpeed = parseFloat(speed);
  if (isLawVoicePlaying) {
    stopLawVoice();
    speakLawText(lawVoiceText);
  }
}

function updateVoiceUI(status) {
  var infoEl = document.getElementById("voiceInfo");
  if (infoEl) infoEl.textContent = status;
  var playBtn = document.getElementById("voicePlayBtn");
  if (playBtn) {
    playBtn.textContent = isLawVoicePlaying ? "⏸ 暂停" : "▶ 朗读";
  }
}

function searchInLaw() {
  var q = document.getElementById("lrSearch").value.trim();
  if (!q || !lawReaderText) { renderLawVisual(); document.getElementById("lrInfo").textContent = ""; document.getElementById("lrNav").innerHTML = ""; return; }
  lawMatchNodes = [];
  var arts = document.querySelectorAll("#lrContent .lr-article");
  for (var i = 0; i < arts.length; i++) {
    var te = arts[i].querySelector(".lr-art-text");
    if (te && te.textContent.indexOf(q) !== -1) lawMatchNodes.push(arts[i]);
  }
  document.getElementById("lrNav").innerHTML = "";
  if (lawMatchNodes.length === 0) {
    document.getElementById("lrInfo").textContent = "未找到包含「" + q + "」的条文";
    return;
  }
  document.getElementById("lrInfo").textContent = "找到 " + lawMatchNodes.length + " 处匹配";
  var navHtml = "";
  for (var k = 0; k < Math.min(lawMatchNodes.length, 20); k++) {
    navHtml += '<button onclick="jumpToArt(' + k + ')" id="lrNavBtn' + k + '">第' + (k+1) + '处</button>';
  }
  document.getElementById("lrNav").innerHTML = navHtml;
  jumpToArt(0);
}

function jumpToArt(k) {
  if (!lawMatchNodes || !lawMatchNodes[k]) return;
  var q = document.getElementById("lrSearch").value.trim();
  var art = lawMatchNodes[k];
  var textEl = art.querySelector(".lr-art-text");
  if (q && textEl) {
    var re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ")", "gi");
    textEl.innerHTML = textEl.textContent.replace(re, '<span class="highlight">$1</span>');
  }
  try { art.scrollIntoView({ behavior: "smooth", block: "center" }); } catch(e2) { art.scrollIntoView(); }
  document.querySelectorAll("#lrNav button").forEach(function(b) { b.classList.remove("active"); });
  var btn = document.getElementById("lrNavBtn" + k);
  if (btn) btn.classList.add("active");
}

// ============================================================
// SETTINGS
// ============================================================
function showSettings() {
  hideAllViews();
  document.getElementById("settingsView").classList.add("show");
  applyQuoteAutoState();
  applyNicknameState();
  bindRedeemButton();
  setBtnGroup("themePrefGroup", themePref);
  applyFontPrefs();
  renderRemindStates();
  renderPhoneBind();
}

// ============================================================
// ABOUT
// ============================================================
function showAbout() {
  hideAllViews();
  document.getElementById("aboutView").classList.add("show");loadApiConfig();
  renderChangelog();
}

// ============================================================
// SCREEN MANAGEMENT
// ============================================================
function hideAllViews() {
  ["homeScreen","chatView","dbView","aboutView","settingsView","quizView","docView","caseView","caseDetail","learnCenterView","dailyCaseView","mootCourtView","personaView","mapView","lawFirmView","materialsView","notebookView","plazaView","lotteryView","skinView","badgeView","noteDetailView","profileView","pointsView","scheduleView","scheduleSettingsView","scheduleAppearanceView","videoView","clockView","storyView","calcView","flashView","debateView","juristView"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) { el.classList.remove("show"); el.style.display = "none"; }
  });
  window.scrollTo(0, 0);
  // 新界面默认滚到最顶端（聊天保留阅读位置）
  var scs = document.querySelectorAll(".about-body,.points-body,.video-body,.learn-body,.quiz-body,.clock-body,.db-body,.doc-body,.case-body,.notebook-body,.schedule-scroll,.lr-body,.plaza-body,.lottery-body,.note-detail-body,.screen,.case-detail");
  for (var si = 0; si < scs.length; si++) scs[si].scrollTop = 0;
}

var _welcomePlayed = false;
function goHome() {
  hideAllViews();
  _fromPlaza = false;
  var home = document.getElementById("homeScreen");
  home.style.display = "";
  home.classList.add("show");
  applyHomeBg();
  renderHomeCards();
  renderHomeAvatar();
  if (!_welcomePlayed) {
    var el = document.getElementById("typewriter");
    if (el) { el.innerHTML = ""; initWelcome(); }
  }
}

function goBackFromPlaza() {
  if (_fromPlaza) {
    showPlaza();
  } else {
    goHome();
  }
}

function enterChat() {
  hideAllViews();
  document.getElementById("chatView").classList.add("show");
  updateOptUI();
  renderAllMessages();
}

// ============================================================
// THEME（跟随系统 / 浅色 / 深色）
// ============================================================
var themePref = "auto";
try { themePref = localStorage.getItem("seawhy-lex-theme-pref") || (userTheme === "dark" ? "dark" : "auto"); } catch(e) {}
var _sysDarkMq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

function resolveTheme() {
  if (themePref === "auto") return (_sysDarkMq && _sysDarkMq.matches) ? "dark" : "light";
  return themePref;
}
function applyTheme() {
  userTheme = resolveTheme();
  document.body.classList.toggle("dark", userTheme === "dark");
  var hl = document.getElementById("hlTheme");
  if (hl) hl.href = userTheme === "dark"
    ? "https://cdn.bootcdn.net/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
    : "https://cdn.bootcdn.net/ajax/libs/highlight.js/11.9.0/styles/atom-one-light.min.css";
  setBtnGroup("themePrefGroup", themePref);
}
function setThemePref(pref) {
  themePref = pref;
  try { localStorage.setItem("seawhy-lex-theme-pref", pref); } catch(e) {}
  applyTheme();
  showToast(pref === "auto" ? "外观：跟随系统" : (pref === "dark" ? "外观：深色模式" : "外观：浅色模式"));
}
function setTheme(theme, btn) {
  setThemePref(theme);
  if (btn && btn.parentElement) {
    var btns = btn.parentElement.querySelectorAll(".s-btn");
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
    btn.classList.add("active");
  }
}
if (_sysDarkMq && _sysDarkMq.addEventListener) {
  _sysDarkMq.addEventListener("change", function() { if (themePref === "auto") applyTheme(); });
}

// ============================================================
// 字体大小 / 行间距（阅读舒适度）
// ============================================================
var FONT_SCALE_KEY = "seawhy-lex-font-scale";
var LINE_HEIGHT_KEY = "seawhy-lex-line-height";
function getFontScale() { try { return parseFloat(localStorage.getItem(FONT_SCALE_KEY)) || 1; } catch(e) { return 1; } }
function getLineHeight() {
  var v = NaN;
  try { v = parseFloat(localStorage.getItem(LINE_HEIGHT_KEY)); } catch(e) {}
  if (isNaN(v)) {
    var legacy = null;
    try { legacy = localStorage.getItem(LINE_HEIGHT_KEY); } catch(e2) {}
    v = legacy === "wide" ? 2 : 1.75;
  }
  return Math.max(1.4, Math.min(2.2, v));
}
function applyFontPrefs() {
  var s = getFontScale();
  document.body.style.zoom = (s === 1 || !s) ? "" : s;
  var lh = getLineHeight();
  document.body.style.setProperty("--rd-lh", lh);
  var sl = document.getElementById("fontScaleSlider");
  if (sl) sl.value = Math.round(s * 100);
  var sv = document.getElementById("fontScaleVal");
  if (sv) sv.textContent = Math.round(s * 100) + "%";
  var ll = document.getElementById("lineHeightSlider");
  if (ll) ll.value = Math.round(lh * 100);
  var lv = document.getElementById("lineHeightVal");
  if (lv) lv.textContent = lh.toFixed(2);
}
function setFontScale(v) {
  try { localStorage.setItem(FONT_SCALE_KEY, String(v)); } catch(e) {}
  applyFontPrefs();
}
function setLineHeight(v) {
  var n = Math.max(1.4, Math.min(2.2, parseFloat(v) || 1.75));
  try { localStorage.setItem(LINE_HEIGHT_KEY, String(n)); } catch(e) {}
  applyFontPrefs();
}

// ============================================================
// 通知提醒（每日打卡 / 学习计划）
// ============================================================
var REMIND_KEY = "seawhy-lex-remind";
function loadRemind() {
  try {
    var r = JSON.parse(localStorage.getItem(REMIND_KEY) || "null");
    if (r && typeof r === "object") return { checkin: !!r.checkin, plan: !!r.plan, time: r.time || "20:00", fired: r.fired || {} };
  } catch(e) {}
  return { checkin: false, plan: false, time: "20:00", fired: {} };
}
function saveRemind(r) { try { localStorage.setItem(REMIND_KEY, JSON.stringify(r)); } catch(e) {} }
function renderRemindStates() {
  var r = loadRemind();
  var ci = document.getElementById("remindCheckinState");
  var pi = document.getElementById("remindPlanState");
  if (ci) ci.classList.toggle("on", r.checkin);
  if (pi) pi.classList.toggle("on", r.plan);
  var ti = document.getElementById("remindTimeInput");
  if (ti) ti.value = r.time;
}
function toggleRemind(type) {
  var r = loadRemind();
  r[type] = !r[type];
  if (r.checkin || r.plan) ensureNotifyPermission();
  saveRemind(r);
  renderRemindStates();
  showToast(r[type] ? "提醒已开启" : "提醒已关闭");
}
function setRemindTime(t) {
  var r = loadRemind();
  r.time = t || "20:00";
  saveRemind(r);
  showToast("提醒时间已设为 " + r.time);
}
function ensureNotifyPermission() {
  try {
    if (!("Notification" in window)) { showToast("当前环境不支持系统通知，将使用应用内提醒"); return; }
    if (Notification.permission === "default") Notification.requestPermission();
  } catch(e) {}
}
function notifyUser(title, body) {
  try {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body: body });
      return;
    }
  } catch(e) {}
  showToast(title + " · " + body);
}
function _remindCheck() {
  var r = loadRemind();
  if (!r.checkin && !r.plan) return;
  var now = new Date();
  var hm = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2);
  if (hm < r.time) return;
  var today = todayStr();
  if (r.fired[today] === r.time) return;
  r.fired[today] = r.time;
  var fk = Object.keys(r.fired);
  if (fk.length > 30) { fk.sort(); delete r.fired[fk[0]]; }
  saveRemind(r);
  if (r.checkin) {
    var c = loadCheckin();
    if (!c.days[today]) notifyUser("SeaWhy Lex · 打卡提醒", "今天还没打卡哦，坚持第 " + ((c.count || 0) + 1) + " 天！");
  }
  if (r.plan) {
    var o = loadTodos();
    var pending = 0;
    for (var i = 0; i < o.items.length; i++) if (!o.items[i].done) pending++;
    if (pending > 0) notifyUser("SeaWhy Lex · 学习计划提醒", "今日还有 " + pending + " 项待办未完成，加油！");
  }
}
setInterval(_remindCheck, 60000);

// ============================================================
// 账号与安全（手机绑定 / 注销）
// ============================================================
var _smsCode = null, _smsPhone = "";
function renderPhoneBind() {
  var p = loadProfile();
  var bound = p.phone || "";
  var row = document.getElementById("phoneBoundRow");
  var form = document.getElementById("phoneBindForm");
  if (!row || !form) return;
  row.style.display = bound ? "flex" : "none";
  form.style.display = bound ? "none" : "block";
  if (bound) document.getElementById("phoneBoundText").textContent = "已绑定 " + bound.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
}
function sendPhoneCode() {
  var ph = (document.getElementById("phoneInput").value || "").trim();
  if (!/^1\d{10}$/.test(ph)) { showToast("请输入正确的 11 位手机号"); return; }
  _smsPhone = ph;
  _smsCode = String(Math.floor(1000 + Math.random() * 9000));
  showToast("验证码已发送（演示环境验证码：" + _smsCode + "）");
  var btn = document.getElementById("smsSendBtn");
  if (!btn) return;
  var sec = 60;
  btn.disabled = true;
  btn.textContent = sec + "s 后重发";
  var timer = setInterval(function() {
    sec--;
    if (sec <= 0) { clearInterval(timer); btn.textContent = "发送验证码"; btn.disabled = false; }
    else btn.textContent = sec + "s 后重发";
  }, 1000);
}
function confirmBindPhone() {
  var ph = (document.getElementById("phoneInput").value || "").trim();
  var code = (document.getElementById("smsCodeInput").value || "").trim();
  if (!/^1\d{10}$/.test(ph)) { showToast("请输入正确的 11 位手机号"); return; }
  if (!_smsCode || ph !== _smsPhone || code !== _smsCode) { showToast("验证码错误或已过期"); return; }
  var p = loadProfile();
  p.phone = ph;
  saveProfile(p);
  _smsCode = null;
  showToast("手机号绑定成功 🎉");
  renderPhoneBind();
}
function unbindPhone() {
  if (!confirm("确定解绑已绑定的手机号吗？")) return;
  var p = loadProfile();
  delete p.phone;
  saveProfile(p);
  showToast("已解绑手机号");
  renderPhoneBind();
}
function deleteAccount() {
  if (!confirm("注销后将不可恢复地清空本机全部数据（积分、等级、笔记、错题本、课表等），确定继续吗？")) return;
  if (!confirm("再次确认：真的要注销账号并清除全部数据吗？此操作无法撤销！")) return;
  try {
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
    keys.forEach(function(k) { if (k.indexOf("seawhy-") === 0 || k === "ai-points") localStorage.removeItem(k); });
  } catch(e) {}
  showToast("账号已注销，数据已清空");
  setTimeout(function() { location.reload(); }, 600);
}

// ============================================================
// 满级后称号系统（消除等级天花板挫败感）
// ============================================================
var TITLES = [
  { name: "律政新秀", min: 0 },
  { name: "法学先锋", min: 15000 },
  { name: "法学精英", min: 25000 },
  { name: "年度学霸", min: 40000 },
  { name: "法考战神", min: 60000 },
  { name: "永恒传奇", min: 100000 }
];
function getTitleInfo(totalPoints) {
  totalPoints = totalPoints || 0;
  var idx = 0;
  for (var i = 0; i < TITLES.length; i++) if (totalPoints >= TITLES[i].min) idx = i;
  var info = { index: idx, name: TITLES[idx].name };
  if (idx < TITLES.length - 1) {
    info.next = TITLES[idx + 1].name;
    info.nextMin = TITLES[idx + 1].min;
    info.need = TITLES[idx + 1].min - TITLES[idx].min;
    info.have = totalPoints - TITLES[idx].min;
    info.progress = Math.min(100, Math.round(info.have / info.need * 100));
  } else { info.next = null; info.progress = 100; }
  return info;
}
// ===== 用户 ID 与 VIP 靓号 =====
function ensureProfileId(p) {
  if (!p.id) {
    p.id = String(10000 + Math.floor(Math.random() * 90000));
    p.idVip = false;
    saveProfile(p);
  }
  return p;
}
function isPrettyId(id) {
  if (/([0-9])\1\1/.test(id)) return true;   // 三连号
  if (id === id.split("").reverse().join("")) return true; // 回文
  if (/(0123|1234|2345|3456|4567|5678|6789)/.test(id)) return true; // 顺子
  if (/([0-9][0-9])\1/.test(id)) return true; // ABAB
  return false;
}
function rollPrettyId() {
  var p = ensureProfileId(loadProfile());
  if (!isVip()) { showToast("开通 VIP 可选择专属靓号"); return; }
  var opts = [], guard = 0;
  while (opts.length < 3 && guard < 800) {
    guard++;
    var id = String(10000 + Math.floor(Math.random() * 90000));
    if (id === p.id || opts.indexOf(id) >= 0 || !isPrettyId(id)) continue;
    opts.push(id);
  }
  var area = document.getElementById("prettyOptions");
  if (!area) return;
  if (!opts.length) { showToast("暂时没有合适的靓号，稍后再试"); return; }
  var h = "";
  for (var i = 0; i < opts.length; i++) {
    h += '<button class="ph-id-opt" onclick="applyPrettyId(\'' + opts[i] + '\')">' + opts[i] + '</button>';
  }
  h += '<button class="ph-id-opt cancel" onclick="document.getElementById(\'prettyOptions\').style.display=\'none\'">取消</button>';
  area.innerHTML = h;
  area.style.display = "flex";
}
function applyPrettyId(id) {
  var p = loadProfile();
  p.id = id;
  p.idVip = true;
  saveProfile(p);
  updateProfileUI();
  showToast("已换用靓号 " + id);
}
function renderTitleChip() {
  var chip = document.getElementById("profileTitleChip");
  var nameEl = document.getElementById("profileTitleName");
  if (!chip || !nameEl) return;
  var p = loadProfile();
  var total = p.totalPoints || 0;
  // 只在达到最高等级后展示称号，避免与等级系统混淆
  if ((getLevelInfo(total).index) < LEVELS.length - 1) { chip.style.display = "none"; return; }
  var stars = Math.max(0, Math.floor((total - 100000) / 10000));
  var icEl = document.getElementById("profileTitleIc");
  if (icEl) icEl.innerHTML = stIcon("award", 11);
  nameEl.innerHTML = escHtml(getTitleInfo(total).name) + (stars > 0 ? '<span class="chip-stars">' + stIcon("star", 10) + '×' + stars + '</span>' : "");
  chip.style.display = "inline-flex";
}

// ============================================================
// VIP 特权卡片
// ============================================================
function renderVipCard() {
  var vip = isVip();
  var st = document.getElementById("vipCardState");
  if (st) {
    var remain = vip ? getVipRemainDays() : "";
    st.textContent = vip ? (remain === "永久" ? "永久 VIP" : "VIP · 剩余 " + remain + " 天") : "未开通";
    st.classList.toggle("on", vip);
  }
  var vi = function(paths) {
    return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>';
  };
  var perks = [
    { ic: vi('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'), txt: "题目解析无限查看", on: true },
    { ic: vi('<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'), txt: "笔记本免费创建", on: true },
    { ic: vi('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>'), txt: "学习积分双倍", on: true },
    { ic: vi('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/>'), txt: "打卡积分翻倍", on: true },
    { ic: vi('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'), txt: "更多 AI 咨询次数", on: true },
    { ic: vi('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'), txt: "专属靓号 ID", on: true }
  ];
  var list = document.getElementById("vipCardList");
  if (list) {
    var h = "";
    for (var i = 0; i < perks.length; i++) {
      h += '<div class="vc-item' + (perks[i].on ? "" : " off") + '">' + perks[i].ic + '<span>' + perks[i].txt + '</span></div>';
    }
    list.innerHTML = h;
  }
  var tip = document.getElementById("vipCardTip");
  if (tip) tip.textContent = vip ? "感谢支持，以上特权均已生效" : "兑换码 0815 可开通永久 VIP";
  var btn = document.getElementById("vipCardBtn");
  if (btn) btn.textContent = vip ? "续费 / 管理" : "立即开通";
}

// ============================================================
// 首页全局智能搜索（法条全文 + 案例库 + 案号识别）
// ============================================================
var _lawTextCache = null;
var _gsTimer = null;
function loadAllLawTexts() {
  if (_lawTextCache) return _lawTextCache;
  var jobs = LAWS.map(function(l) {
    var txtFile = l.file.replace(/\.docx$/, ".txt");
    return fetch("laws/" + encodeURI(txtFile))
      .then(function(r) { return r.ok ? r.text() : ""; })
      .then(function(t) { return { name: l.name, file: l.file, text: t || "" }; })
      .catch(function() { return { name: l.name, file: l.file, text: "" }; });
  });
  _lawTextCache = Promise.all(jobs);
  return _lawTextCache;
}
function onGlobalSearchInput() {
  clearTimeout(_gsTimer);
  _gsTimer = setTimeout(runGlobalSearch, 350);
}
function runGlobalSearch() {
  var input = document.getElementById("globalSearchInput");
  var box = document.getElementById("globalSearchResults");
  if (!input || !box) return;
  var q = input.value.trim();
  box.innerHTML = "";
  if (q.length < 2) return;
  box.innerHTML = '<div class="gs-results"><div class="gs-empty">🔍 正在检索法条与案例…</div></div>';
  var isCaseNo = /20\d{2}/.test(q) && /号/.test(q);
  Promise.all([searchLawsByText(q), searchCasesByText(q)]).then(function(res) {
    // 输入已变化则丢弃过期结果
    var cur = document.getElementById("globalSearchInput");
    if (cur && cur.value.trim() !== q) return;
    renderGlobalResults(q, res[0], res[1], isCaseNo);
  });
}
function searchLawsByText(q) {
  return loadAllLawTexts().then(function(laws) {
    var hits = [];
    for (var i = 0; i < laws.length && hits.length < 10; i++) {
      var law = laws[i];
      if (!law.text) continue;
      var arts = law.text.match(/第[零一二三四五六七八九十百千0-9]+条[\s\S]*?(?=第[零一二三四五六七八九十百千0-9]+条|$)/g) || [];
      var count = 0;
      for (var j = 0; j < arts.length && count < 3; j++) {
        var art = arts[j].trim();
        if (art.indexOf(q) !== -1) { count++; hits.push({ law: law.name, file: law.file, snippet: art }); }
      }
    }
    return hits;
  }).catch(function() { return []; });
}
function searchCasesByText(q) {
  return new Promise(function(resolve) {
    var hits = [];
    try {
      if (typeof CASE_DATA !== "undefined") {
        for (var i = 0; i < CASE_DATA.length && hits.length < 6; i++) {
          var cat = CASE_DATA[i];
          for (var j = 0; j < cat.cases.length && hits.length < 6; j++) {
            var c = cat.cases[j];
            if (((c.t || "") + (c.f || "")).indexOf(q) !== -1) hits.push({ cat: i, idx: j, title: c.t || "", snippet: (c.f || "").slice(0, 80) });
          }
        }
      }
    } catch(e) {}
    resolve(hits);
  });
}
function _gsHighlight(s, q) {
  var i = s.indexOf(q);
  if (i === -1) return escHtml(s);
  return escHtml(s.slice(0, i)) + "<mark>" + escHtml(q) + "</mark>" + escHtml(s.slice(i + q.length));
}
function renderGlobalResults(q, lawHits, caseHits, isCaseNo) {
  var box = document.getElementById("globalSearchResults");
  if (!box) return;
  var html = '<div class="gs-results">';
  if (!lawHits.length && !caseHits.length) {
    html += '<div class="gs-empty">未找到与「' + escHtml(q) + '」匹配的法条或案例'
      + (isCaseNo ? '<br><span style="font-size:10px">案号检索暂未收录裁判文书全文，可尝试当事人 / 案由关键词</span>' : '') + '</div>';
  } else {
    if (lawHits.length) {
      html += '<div class="gs-group">⚖️ 法条 · ' + lawHits.length + ' 条</div>';
      for (var i = 0; i < lawHits.length; i++) {
        var h = lawHits[i];
        var snip = h.snippet.replace(/\s+/g, " ");
        if (snip.length > 66) {
          var pos = snip.indexOf(q);
          var start = Math.max(0, (pos === -1 ? 0 : pos) - 22);
          snip = (start > 0 ? "…" : "") + snip.substr(start, 66) + "…";
        }
        html += '<div class="gs-item" onclick="openLawFromSearch(\'' + escAttr(h.file) + '\',\'' + escAttr(h.law) + '\',\'' + escAttr(q) + '\')"><b>' + _gsHighlight(h.law, q) + '</b><span class="gs-sub">' + _gsHighlight(snip, q) + '</span></div>';
      }
    }
    if (caseHits.length) {
      html += '<div class="gs-group">📚 案例 · ' + caseHits.length + ' 个</div>';
      for (var k = 0; k < caseHits.length; k++) {
        var ch = caseHits[k];
        var title = (ch.title || "").replace(/^案例[一二三四五六七八九十\d]+[\s:：]*/, "").replace(/[:：]\s*$/, "");
        html += '<div class="gs-item" onclick="openCaseFromSearch(' + ch.cat + ',' + ch.idx + ')"><b>' + _gsHighlight(title, q) + '</b><span class="gs-sub">' + _gsHighlight((ch.snippet || "").replace(/\s+/g, " "), q) + '</span></div>';
      }
    }
  }
  html += '</div>';
  box.innerHTML = html;
}
function _clearGlobalSearch() {
  var box = document.getElementById("globalSearchResults");
  if (box) box.innerHTML = "";
  var input = document.getElementById("globalSearchInput");
  if (input) input.value = "";
}
function openLawFromSearch(file, name, kw) {
  _clearGlobalSearch();
  openLawReader(file, name, kw);
}
function openCaseFromSearch(cat, idx) {
  _clearGlobalSearch();
  showCaseDatabase();
  currentCaseCat = cat;
  renderCaseCategories();
  renderCaseList();
  openCaseDetail(idx);
}

// ============================================================
// 本周学习报告（近 7 天：时长柱状图 / 做题 / 正确率 / 消灭错题）
// ============================================================
function recordAnswerStat(isCorrect) {
  try {
    var stats = loadLearnStats();
    var today = getTodayStr();
    if (!stats.days[today]) stats.days[today] = { min: 0, q: 0, sec: 0 };
    stats.days[today].a = (stats.days[today].a || 0) + 1;
    if (isCorrect) stats.days[today].c = (stats.days[today].c || 0) + 1;
    saveLearnStats(stats);
  } catch(e) {}
}
function renderWeekReport() {
  var chart = document.getElementById("wrChart");
  var statsEl = document.getElementById("wrStats");
  if (!chart || !statsEl) return;
  var stats = loadLearnStats();
  var days = ["日", "一", "二", "三", "四", "五", "六"];
  var cols = [];
  var week = { min: 0, q: 0, c: 0, a: 0, m: 0 };
  var maxMin = 1;
  for (var i = 6; i >= 0; i--) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    var ds = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    var day = stats.days[ds] || {};
    var sec = day.sec || (day.min || 0) * 60;
    var min = Math.floor(sec / 60);
    week.min += min;
    week.q += (day.q || 0);
    week.c += (day.c || 0);
    week.a += (day.a || 0);
    week.m += (day.m || 0);
    if (min > maxMin) maxMin = min;
    cols.push({ ds: ds, day: days[d.getDay()], min: min, today: i === 0 });
  }
  var h = "";
  for (var j = 0; j < cols.length; j++) {
    var c = cols[j];
    var barH = c.min > 0 ? Math.max(8, Math.round(c.min / maxMin * 78)) : 3;
    h += '<div class="wr-col' + (c.today ? " today" : "") + '" title="' + c.ds + ' 学习 ' + c.min + ' 分钟">'
      + (c.min > 0 ? '<span class="wr-val">' + c.min + '</span>' : '')
      + '<div class="wr-bar" style="height:' + barH + '%"></div>'
      + '<span class="wr-day">' + c.day + '</span></div>';
  }
  chart.innerHTML = h;
  var rate = week.a > 0 ? Math.round(week.c / week.a * 100) + "%" : "—";
  statsEl.innerHTML = '<div class="wr-stat"><div class="ws-num">' + week.min + '</div><div class="ws-lab">学习·分钟</div></div>'
    + '<div class="wr-stat"><div class="ws-num">' + week.q + '</div><div class="ws-lab">做题·道</div></div>'
    + '<div class="wr-stat"><div class="ws-num">' + rate + '</div><div class="ws-lab">正确率</div></div>'
    + '<div class="wr-stat"><div class="ws-num">' + week.m + '</div><div class="ws-lab">消灭错题</div></div>';
}

// ============================================================
// 一键继续学习（回到上次学习的模块）
// ============================================================
var LAST_STUDY_KEY = "seawhy-lex-last-study";
var STUDY_ENTRIES = {
  quizView: { label: "题库", go: function() { showQuizModule(); } },
  dbView: { label: "法典库", go: function() { showDatabase(); } },
  caseView: { label: "案例库", go: function() { showCaseDatabase(); } },
  docView: { label: "法律文书", go: function() { showDocGen(); } },
  materialsView: { label: "我的资料", go: function() { showMaterials(); } },
  notebookView: { label: "笔记本", go: function() { showNotebook(); } },
  videoView: { label: "视频课程", go: function() { showVideoCenter(); } },
  clockView: { label: "学习时钟", go: function() { showClockView(); } }
};
function recordLastStudy(viewId) {
  if (!STUDY_ENTRIES[viewId]) return;
  try { localStorage.setItem(LAST_STUDY_KEY, JSON.stringify({ view: viewId, ts: Date.now() })); } catch(e) {}
}
function continueLastStudy() {
  var ls = null;
  try { ls = JSON.parse(localStorage.getItem(LAST_STUDY_KEY) || "null"); } catch(e) {}
  if (ls && STUDY_ENTRIES[ls.view]) { STUDY_ENTRIES[ls.view].go(); return; }
  showToast("还没有学习记录，先从题库开始吧");
  showQuizModule();
}
function renderContinueFab() {
  var fab = document.getElementById("continueFab");
  if (!fab) return;
  var ls = null;
  try { ls = JSON.parse(localStorage.getItem(LAST_STUDY_KEY) || "null"); } catch(e) {}
  var e = ls && STUDY_ENTRIES[ls.view] ? STUDY_ENTRIES[ls.view] : null;
  if (e) {
    fab.classList.add("show");
    var ft = document.getElementById("continueFabTxt");
    if (ft) ft.textContent = "继续学习 · " + e.label;
  } else {
    fab.classList.remove("show");
  }
}

// ============================================================
// SYSTEM PROMPT — 法学优化
// ============================================================
function buildSystemPrompt() {
  var base = [
    "你是SeaWhy Lex，法学AI助手(网站v3.1.0，由曹春杨设计)。回答要专业简洁。SeaWhy意为「海中为什么」——像鲸鱼在信息海洋中深潜，寻找法律问题背后的Why。",
    "",
    "【核心原则】",
    "F1不引用不存在或已废止的法条。F2讨论所有可能罪名不默认最轻。F3量刑给区间不给点估计。",
    "F4穿透法理追问为什么。F5验证用户前提是否成立。F6告诉用户下一步：证据/策略/文书。",
    "F7计算写清每步。F8考虑多因一果。F9引入比较法。F10以法学深度回答，实务标注咨询律师。",
    "",
    "【格式】Markdown结构。法条引用：《XX法》第X条。争议标[争议]。不确定标[置信度]。以延伸建议收尾。用中文。"
  ].join("\n");

  var mods = [];
  if (options.deep) mods.push("【深度模式】请进行多层次穿透式分析，追问三层「为什么」。");
  if (options.multi) mods.push("【多视角】从原告、被告、法官、立法者、学者五个视角分别分析。");
  if (options.practical) mods.push("【实务】提供证据收集、诉讼策略、文书要点、类案检索方向。");
  if (options.compare) mods.push("【比较法】引入德国法、日本法、英美法等相关素材。");
  if (mods.length > 0) base += "\n\n【当前增强模式】\n" + mods.join("\n");
  return base;
}

// ============================================================
// CHAT STATE
// ============================================================
var messages = [];
var streaming = false;
var abortController = null;
var chatSessionId = 0;
var MSG_KEY = "seawhy-lex-msgs";
try { var m = localStorage.getItem(MSG_KEY); if (m) { var p = JSON.parse(m); if (Array.isArray(p)) messages = p; } } catch(e) {}
function persist() { try { var c = messages.map(function(m){return {role:m.role, content:m.content, _time:m._time}}); localStorage.setItem(MSG_KEY, JSON.stringify(c)); } catch(e) {} }

// ============================================================
// CHAT RENDER
// ============================================================
var dom = {};
function bindDom() {
  dom.messages = $("#messages"); dom.chatArea = $("#chatArea"); dom.userInput = $("#userInput");
  dom.btnSend = $("#btnSend"); dom.typing = $("#typing"); dom.inputBar = $("#inputBar");
}

function getTimeStr() { var d = new Date(); return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
function fmtTime(ts) { var d = new Date(ts); return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }

function renderAllMessages() {
  if (!dom.messages) bindDom();
  dom.messages.innerHTML = "";
  if (messages.length === 0) {
    dom.messages.innerHTML = '<div class="welcome"><div class="wicon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 L12 21"/><path d="M5 3 L5 21"/><path d="M19 3 L19 21"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg></div><h2>SeaWhy Lex 法律咨询</h2><p class="welcome-model-desc">专为法学生打造的AI学习助手<br>深度分析 · 法条精准 · 多视角论证</p>' +
      '<div class="capability-row"><span class="capability-chip highlight">案例分析</span><span class="capability-chip">法条检索</span><span class="capability-chip">论文辅导</span><span class="capability-chip">量刑参考</span><span class="capability-chip">实务指导</span><span class="capability-chip">比较法研究</span></div>' +
      '<div class="section-label">试试这些</div><div class="quick-prompts" id="quickPrompts">' +
      '<button class="quick-btn" onclick="sendMsg(\'分析民间借贷利息计算的法律规则：列出有效法条、LPR四倍规则演变、完整计算示例、标注争议点\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:3px"><path d="M12 3 L12 21"/><path d="M5 3 L5 21"/><path d="M19 3 L19 21"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>民间借贷利息计算</button>' +
      '<button class="quick-btn" onclick="sendMsg(\'请分析正当防卫的认定要件，包括刑法第20条三款结构、时间判断标准学说争议、特殊防卫适用条件，并引入比较法视角\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-2px;margin-right:3px"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>正当防卫认定分析</button>' +
      '<button class="quick-btn" onclick="sendMsg(\'请给出一个系统化的法学生案例分析框架，包括审查步骤、相关法条、常见陷阱和思维方法，涵盖刑事、民事、行政三类案件的异同\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-2px;margin-right:3px"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>案例分析框架</button>' +
      '<button class="quick-btn" onclick="sendMsg(\'请设计一篇关于人工智能法律责任的法学论文大纲，包括问题提出、文献综述、核心论点、章节结构和推荐参考文献\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-2px;margin-right:3px"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>论文大纲思路</button>' +
      '</div></div>';
    dom.inputBar.style.display = ""; dom.typing.style.display = "none";
    return;
  }

  dom.inputBar.style.display = "";
  var h = "";
  for (var i = 0; i < messages.length; i++) {
    var msg = messages[i], role = msg.role === "assistant" ? "ai" : "user";
    var avatar = role === "user" ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 L12 21"/><path d="M5 3 L5 21"/><path d="M19 3 L19 21"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg>';
    h += '<div class="msg ' + role + ' show no-avatar"><div class="msg-avatar">' + avatar + '</div>' +
      '<div class="msg-body"><div class="msg-content">' + renderMD(msg.content) + '</div>' +
      (msg._time ? '<div class="msg-time">' + fmtTime(msg._time) + '</div>' : '') +
      '<div class="msg-actions"><button class="btn-copy" onclick="copyMsg(this)">复制</button></div></div></div>';
  }
  dom.messages.innerHTML = h;
  hlAll(); scrollBottom();
}

function renderMsg(role, content) {
  var w = dom.messages.querySelector(".welcome"); if (w) { w.remove(); dom.inputBar.style.display = ""; }
  var avatar = role === "user" ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 L12 21"/><path d="M5 3 L5 21"/><path d="M19 3 L19 21"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg>';
  var div = document.createElement("div"); div.className = "msg " + role + " no-avatar";
  div.innerHTML = '<div class="msg-avatar">' + avatar + '</div><div class="msg-body">' +
    '<div class="msg-content">' + renderMD(content) + '</div>' +
    '<div class="msg-time">' + getTimeStr() + '</div>' +
    '<div class="msg-actions"><button class="btn-copy" onclick="copyMsg(this)">复制</button></div></div>';
  dom.messages.appendChild(div); hlAll(); scrollBottom();
  requestAnimationFrame(function() { requestAnimationFrame(function() { div.classList.add("show"); }); });
}

function renderMD(text) {
  if (typeof marked === "undefined") return escHtml(text);
  try { return marked.parse(text, { breaks: true, gfm: true }); } catch(e) { return escHtml(text); }
}

function hlAll() { if (typeof hljs !== "undefined") document.querySelectorAll("pre code").forEach(function(b) { hljs.highlightElement(b); }); }
function scrollBottom() { requestAnimationFrame(function() { if (dom.chatArea) dom.chatArea.scrollTop = dom.chatArea.scrollHeight; }); }

function copyMsg(btn) {
  var t = btn.closest(".msg").querySelector(".msg-content").textContent;
  navigator.clipboard.writeText(t).then(function() { btn.textContent = "已复制"; setTimeout(function() { btn.textContent = "复制"; }, 1500); }).catch(function() {});
}

function showError(msg) {
  var d = document.createElement("div"); d.className = "error"; d.textContent = "⚠️ " + msg;
  dom.messages.appendChild(d); scrollBottom();
}

// ============================================================
// API
// ============================================================
function sendMsg(text) {
  if (streaming) return;
  text = text.trim(); if (!text) return;
  if (!SETTINGS.apiKey) { showError('API配置错误，请先前往关于我们中完成配置'); return; }

  // v3.5.0：AI 咨询扣积分（VIP 免费），不足则拦截；去掉原来的对话奖励
  if (!isVip()) {
    var _cp = loadProfile();
    if ((_cp.points || 0) < 2) {
      showToast("积分不足：AI 咨询每次需 2 积分（VIP 免费）");
      return;
    }
    addPoints(-2, "AI咨询");
  }

  var sessionId = ++chatSessionId;
  streaming = true; dom.btnSend.disabled = true; dom.btnSend.classList.add("loading"); dom.typing.style.display = "flex"; scrollBottom();

  messages.push({ role: "user", content: text, _time: Date.now() });
  renderMsg("user", text); persist();

  var sysP = buildSystemPrompt();
  var apiMsgs = [{ role: "system", content: sysP }];
  for (var i = 0; i < messages.length; i++) {
    apiMsgs.push({ role: messages[i].role === "assistant" ? "assistant" : "user", content: messages[i].content });
  }

  var msgDiv = document.createElement("div"); msgDiv.className = "msg ai no-avatar";
  var contentDiv = document.createElement("div"); contentDiv.className = "msg-content"; contentDiv.textContent = " ";
  msgDiv.innerHTML = '<div class="msg-avatar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 L12 21"/><path d="M5 3 L5 21"/><path d="M19 3 L19 21"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg></div><div class="msg-body"></div>';
  msgDiv.querySelector(".msg-body").appendChild(contentDiv);
  dom.messages.appendChild(msgDiv); scrollBottom(); dom.typing.style.display = "none";
  requestAnimationFrame(function() { requestAnimationFrame(function() { msgDiv.classList.add("show"); }); });

  var fullContent = "", resolved = false;
  abortController = new AbortController(); var signal = abortController.signal;

  fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + SETTINGS.apiKey },
    body: JSON.stringify({ model: SETTINGS.model, messages: apiMsgs, stream: true, temperature: 0.2, max_tokens: 4096 }),
    signal: signal
  }).then(function(resp) {
    if (!resp.ok) return resp.text().then(function(t) { throw new Error("API " + resp.status + ": " + t.slice(0, 300)); });
    var reader = resp.body.getReader(), decoder = new TextDecoder(), buf = "";
    function pump() {
      if (resolved || chatSessionId !== sessionId) return;
      reader.read().then(function(result) {
        if (resolved || chatSessionId !== sessionId) return;
        if (result.done) {
          resolved = true; abortController = null;
          messages.push({ role: "assistant", content: fullContent || "（空响应）", _time: Date.now() }); persist();
          contentDiv.innerHTML = renderMD(fullContent || "（空响应）"); hlAll();
          var mt = document.createElement("div"); mt.className = "msg-time"; mt.textContent = getTimeStr();
          var act = document.createElement("div"); act.className = "msg-actions"; act.innerHTML = '<button class="btn-copy" onclick="copyMsg(this)">复制</button>';
          msgDiv.querySelector(".msg-body").appendChild(mt); msgDiv.querySelector(".msg-body").appendChild(act);
          streaming = false; dom.btnSend.disabled = false; dom.btnSend.classList.remove("loading"); return;
        }
        buf += decoder.decode(result.value, { stream: true });
        var lines = buf.split("\n"); buf = lines.pop() || "";
        for (var i = 0; i < lines.length; i++) {
          var s = lines[i].trim(); if (!s.startsWith("data:")) continue;
          var data = s.slice(5).trim(); if (data === "[DONE]") continue;
          try { var p = JSON.parse(data), d = (p.choices || [{}])[0].delta; if (!d) continue; var t = d.content || ""; if (t) { fullContent += t; contentDiv.textContent = fullContent; scrollBottom(); } } catch(e) {}
        }
        pump();
      }).catch(function(e) {
        if (resolved || chatSessionId !== sessionId) return; resolved = true; abortController = null;
        if (fullContent) { messages.push({ role: "assistant", content: fullContent, _time: Date.now() }); persist(); contentDiv.innerHTML = renderMD(fullContent); hlAll(); }
        else if (!(e && e.name === "AbortError")) { showError(e.message); msgDiv.remove(); }
        streaming = false; dom.btnSend.disabled = false; dom.btnSend.classList.remove("loading"); dom.typing.style.display = "none";
      });
    }
    pump();
  }).catch(function(e) {
    if (resolved || chatSessionId !== sessionId) return; resolved = true; abortController = null;
    if (fullContent) { messages.push({ role: "assistant", content: fullContent, _time: Date.now() }); persist(); contentDiv.innerHTML = renderMD(fullContent); hlAll(); }
    else if (!(e && e.name === "AbortError")) { showError(e.message); msgDiv.remove(); }
    streaming = false; dom.btnSend.disabled = false; dom.btnSend.classList.remove("loading"); dom.typing.style.display = "none";
  });
}

// ============================================================
// SETTINGS & OPTIONS
// ============================================================
function toggleSettings() {
  var drop = document.getElementById("settingsDrop");
  if (!drop.classList.contains("show")) { updateOptUI(); }
  drop.classList.toggle("show");
  setTimeout(function() {
    document.addEventListener("click", function close(e) {
      if (!e.target.closest("#btnSettings") && !e.target.closest("#settingsDrop")) { drop.classList.remove("show"); document.removeEventListener("click", close); }
    });
  }, 10);
}

// ============================================================
// HELP MODAL
// ============================================================
function showHelp() { document.getElementById("helpModal").classList.remove("hide"); }
function closeHelp() { document.getElementById("helpModal").classList.add("hide"); }
document.getElementById("helpModal").addEventListener("click", function(e) {
  if (e.target === this) closeHelp();
});

function toggleOptBtn(key, id) {
  options[key] = !options[key];
  try { localStorage.setItem("seawhy-lex-opts", JSON.stringify(options)); } catch(e) {}
  updateOptUI();
  showToast((options[key] ? "✓ " : "✗ ") + document.getElementById(id).textContent.trim());
}

function updateOptUI() {
  Object.keys(options).forEach(function(k) {
    var tEl = document.getElementById("t" + k.charAt(0).toUpperCase() + k.slice(1));
    var sEl = document.getElementById("s" + k.charAt(0).toUpperCase() + k.slice(1));
    if (tEl) tEl.classList.toggle("on", options[k]);
    if (sEl) { sEl.classList.toggle("active", options[k]); }
    if (k === "quoteAuto") {
      if (sEl) sEl.textContent = options[k] ? "开启" : "关闭";
    }
  });
  // 输入法引擎(非布尔开关,单独处理)
  var ime = options.imeEngine === "builtin" ? "builtin" : "fcitx";
  var imeF = document.getElementById("sImeFcitx"), imeB = document.getElementById("sImeBuiltin");
  if (imeF) {
    imeF.classList.toggle("active", ime === "fcitx");
    imeF.disabled = !!(window.FCITX5 && window.FCITX5.state === "failed");
  }
  if (imeB) imeB.classList.toggle("active", ime === "builtin");
}

function clearHistory() {
  if (!messages.length) return;
  if (!confirm("确定清空当前对话记录吗？")) return;
  messages.length = 0; persist(); renderAllMessages();
  document.getElementById("settingsDrop").classList.remove("show");
}

// ============================================================
// TOAST
// ============================================================

// ============================================================
// CASE DATABASE
// ============================================================
var currentCaseCat = 0;
function showCaseDatabase(){hideAllViews();document.getElementById("caseView").classList.add("show");recordLastStudy("caseView");if(typeof CASE_DATA!=='undefined'&&CASE_DATA.length>0){currentCaseCat=0;renderCaseCategories();renderCaseList();}}
function renderCaseCategories(){var h='';for(var i=0;i<CASE_DATA.length;i++){h+='<button class="case-cat-btn'+(i===currentCaseCat?' active':'')+'" onclick="switchCaseCat('+i+')">'+escHtml(CASE_DATA[i].name)+'</button>';}document.getElementById("caseCats").innerHTML=h;}
function switchCaseCat(idx){currentCaseCat=idx;renderCaseCategories();renderCaseList();document.getElementById("caseList").scrollTop=0;}
function renderCaseList(){var cat=CASE_DATA[currentCaseCat];var h='';for(var i=0;i<cat.cases.length;i++){var c=cat.cases[i];var t=c.t.replace(/^案例[一二三四五六七八九十\d]+[\s:：]*/,'').replace(/[:：]\s*$/,'');var ex=(c.f||'').replace(/\s+/g,' ').slice(0,50);if((c.f||'').replace(/\s+/g,' ').length>50)ex+='…';h+='<div class="case-card" onclick="openCaseDetail('+i+')"><div class="case-num">'+(i+1)+'</div><div class="case-info"><div class="case-title">'+escHtml(t)+'</div><div class="case-sub">'+escHtml(ex)+'</div></div><div class="case-arrow">›</div></div>';}document.getElementById("caseList").innerHTML=h;}
function caseParas(s){var parts=s.split(/\n+/).map(function(x){return x.trim();}).filter(Boolean);return parts.map(function(p){return '<p>'+escHtml(p)+'</p>';}).join('');}
function openCaseDetail(idx){var c=CASE_DATA[currentCaseCat].cases[idx];var t=c.t.replace(/^案例[一二三四五六七八九十\d]+[\s:：]*/,'').replace(/[:：]\s*$/,'');document.getElementById("cdTitle").textContent=t;var h='';h+='<div class="cd-head"><span class="cd-cat">'+escHtml(CASE_DATA[currentCaseCat].name)+'</span><div class="cd-t">'+escHtml(t)+'</div></div>';if(c.f)h+='<div class="cd-section card"><h5><span>📋</span> 基本案情</h5>'+caseParas(c.f)+'</div>';if(c.p)h+='<div class="cd-section card"><h5><span>⚖️</span> 裁判 / 处理</h5>'+caseParas(c.p)+'</div>';if(c.s)h+='<div class="cd-section card"><h5><span>💡</span> 典型意义</h5>'+caseParas(c.s)+'</div>';document.getElementById("cdContent").innerHTML=h;document.getElementById("caseDetail").classList.add("show");document.getElementById("caseDetail").scrollTop=0;}
function closeCaseDetail(){document.getElementById("caseDetail").classList.remove("show");}


function saveApiConfig() {
  var key = document.getElementById("apiKeyInput").value.trim();
  var model = document.getElementById("apiModelSelect").value;
  if (!key) { showToast("请输入API Key"); return; }
  if (!key.startsWith("sk-")) { showToast("API Key格式不正确，应以sk-开头"); return; }
  var config = { model: model };
  try { localStorage.setItem("seawhy-lex-config", JSON.stringify(config)); sessionStorage.setItem("seawhy-lex-api-key", key); } catch(e) {}
  SETTINGS.apiKey = key;
  SETTINGS.model = model;
  showApiStatus();
  showToast("API配置已保存");
}
function loadApiConfig() {
  try {
    var s = JSON.parse(localStorage.getItem("seawhy-lex-config") || "{}");
    if (s.apiKey) { sessionStorage.setItem("seawhy-lex-api-key", s.apiKey); delete s.apiKey; localStorage.setItem("seawhy-lex-config", JSON.stringify(s)); }
    var sessionKey = sessionStorage.getItem("seawhy-lex-api-key") || "";
    if (sessionKey) document.getElementById("apiKeyInput").value = sessionKey;
    document.getElementById("apiModelSelect").value = s.model || "deepseek-v4-flash";
    SETTINGS.apiKey = sessionKey;
    SETTINGS.model = s.model || "deepseek-v4-flash";
  } catch(e) {}
  showApiStatus();
}
function clearApiConfig(){document.getElementById("apiKeyInput").value="";try{localStorage.removeItem("seawhy-lex-config");sessionStorage.removeItem("seawhy-lex-api-key")}catch(e){}SETTINGS.apiKey="";SETTINGS.model="deepseek-v4-flash";showApiStatus();showToast("API配置已清空");}
function showApiStatus() {
  var el = document.getElementById("apiStatus");
  if (SETTINGS.apiKey) {
    el.innerHTML = '<span class="api-status set">已配置</span> ' + SETTINGS.model;
  } else {
    el.innerHTML = '<span class="api-status unset">未配置</span> 请设置API Key以启用AI问答';
  }
}

function showComingSoon(feature) {
  showToast(feature + ' — 开发中，敬请期待');
}
function showToast(msg) {
  var t = document.getElementById("toast");
  t.textContent = msg; t.style.opacity = "1";
  clearTimeout(window._toastT);
  window._toastT = setTimeout(function() { t.style.opacity = "0"; }, 2000);
}

function enhanceAccessibility(root) {
  var scope = root && root.querySelectorAll ? root : document;
  scope.querySelectorAll("input,select,textarea").forEach(function(el) {
    if (!el.getAttribute("aria-label") && !el.labels.length && el.placeholder) el.setAttribute("aria-label", el.placeholder);
  });
  scope.querySelectorAll("img:not([alt])").forEach(function(img) { img.alt = ""; });
  scope.querySelectorAll("[onclick]:not(button):not(a):not(input):not(select):not(textarea)").forEach(function(el) {
    if (!el.hasAttribute("role")) el.setAttribute("role", "button");
    if (!el.hasAttribute("tabindex")) el.tabIndex = 0;
    if (!el.dataset.keyboardBound) {
      el.dataset.keyboardBound = "1";
      el.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); el.click(); }
      });
    }
  });
  scope.querySelectorAll('.modal-overlay,.modal,.overlay,[id$="Ovl"]').forEach(function(el) {
    if (!el.getAttribute("role")) el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
  });
}

document.addEventListener("DOMContentLoaded", function() {
  enhanceAccessibility(document);
  new MutationObserver(function(records) {
    records.forEach(function(record) { record.addedNodes.forEach(function(node) { if (node.nodeType === 1) enhanceAccessibility(node); }); });
  }).observe(document.body, {childList:true, subtree:true});
});
document.addEventListener("keydown", function(event) {
  if (event.key !== "Escape") return;
  var visible = Array.prototype.slice.call(document.querySelectorAll('.modal-overlay.show,.modal.show,.overlay.show,[id$="Ovl"]')).pop();
  if (!visible) return;
  var close = visible.querySelector('[aria-label*="关闭"],.modal-close,.close-btn');
  if (close) close.click(); else if (visible.id && /Ovl$/.test(visible.id)) visible.remove();
});

// ============================================================
// EVENTS
// ============================================================
function bindEvents() {
  bindDom();
  dom.btnSend.addEventListener("click", function() { var t = dom.userInput.value.trim(); if (!t || streaming) return; dom.userInput.value = ""; dom.userInput.style.height = "auto"; sendMsg(t); });
  dom.userInput.addEventListener("keydown", function(e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); var t = dom.userInput.value.trim(); if (!t || streaming) return; dom.userInput.value = ""; dom.userInput.style.height = "auto"; sendMsg(t); } });
  dom.userInput.addEventListener("input", function() { this.style.height = "auto"; this.style.height = Math.min(this.scrollHeight, 110) + "px"; });
  dom.messages.addEventListener("click", function(e) { var btn = e.target.closest(".btn-copy"); if (btn) copyMsg(btn); });
}

// ============================================================
// UTILS
// ============================================================
function escAttr(s) { return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function escHtml(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
function loadScript(url, cb) { var s = document.createElement("script"); s.src = url; s.onload = function() { cb(null); }; s.onerror = function() { cb(new Error("load failed")); }; document.head.appendChild(s); }

// ============================================================
// 内置键盘 IME（拼音/英文/数字，输入框只读，避免 iOS 原生键盘导致整页滚动）
// ============================================================
var IME = { lang: "cn", layout: "abc", py: "", target: null, shift: false, open: false };
var IME_WORD_KEYS = null, IME_PREFIX = null;
function imeInitWords() {
  try { IME_WORD_KEYS = Object.keys(IME_WORDS).sort(); } catch (e) {}
  IME_PREFIX = {};
  for (var k in IME_DATA) { for (var i = 1; i <= k.length; i++) IME_PREFIX[k.slice(0, i)] = 1; }
  // 词键前缀也纳入：支持跨音节续拼（如 nihao -> 你好）
  for (var w in IME_WORDS) { for (var j = 1; j <= w.length; j++) IME_PREFIX[w.slice(0, j)] = 1; }
}
function imeLeadingSyl(py) {
  for (var i = Math.min(py.length, 7); i >= 1; i--) { var s = py.slice(0, i); if (IME_DATA[s]) return s; }
  return "";
}
function imeWordCands(py, limit) {
  var res = [];
  if (!IME_WORD_KEYS) imeInitWords();
  var lo = 0, hi = IME_WORD_KEYS.length;
  while (lo < hi) { var mid = (lo + hi) >> 1; if (IME_WORD_KEYS[mid] < py) lo = mid + 1; else hi = mid; }
  for (var i = lo; i < IME_WORD_KEYS.length && res.length < limit; i++) {
    var k = IME_WORD_KEYS[i];
    if (k.indexOf(py) !== 0) break;
    var ws = IME_WORDS[k].split("|");
    for (var j = 0; j < ws.length && res.length < limit; j++) res.push(ws[j]);
  }
  return res;
}
function imeCands() {
  var py = IME.py, out = [];
  if (!py) return out;
  var seg = imeLeadingSyl(py);
  if (seg && seg.length === py.length) {
    var chars = IME_DATA[seg] || "";
    for (var i = 0; i < Math.min(9, chars.length); i++) out.push({ t: chars[i], w: false });
    var words = imeWordCands(py, 3);
    for (var j = 0; j < words.length; j++) out.push({ t: words[j], w: true });
  } else if (seg) {
    var chars2 = IME_DATA[seg] || "";
    for (var i2 = 0; i2 < Math.min(4, chars2.length); i2++) out.push({ t: chars2[i2], w: false });
    var words2 = imeWordCands(py, 5);
    for (var j2 = 0; j2 < words2.length; j2++) out.push({ t: words2[j2], w: true });
  }
  return out;
}
function imeRefresh() {
  var candEl = document.getElementById("imeCands");
  var pyEl = document.getElementById("imePy");
  if (!candEl || !pyEl) return;
  candEl.innerHTML = "";
  if (IME.lang === "cn" && IME.py) {
    var cands = imeCands();
    for (var i = 0; i < cands.length; i++) {
      (function (item) {
        var b = document.createElement("button");
        b.className = "ime-cand" + (item.w ? " wd" : "");
        b.textContent = item.t;
        b.addEventListener("click", function () { imePick(item.t); });
        candEl.appendChild(b);
      })(cands[i]);
    }
    pyEl.textContent = IME.py;
    pyEl.className = "ime-py";
  } else {
    pyEl.textContent = IME.layout === "123" ? "数字" : (IME.lang === "cn" ? "拼音" : "英文");
    pyEl.className = "ime-py empty";
  }
}
function imePick(t) {
  var el = IME.target;
  try { if (el) { el.focus(); var p = (typeof el.selectionStart === "number") ? el.selectionStart : (el.value || "").length; imeSetCaret(p); } } catch (e) {}
  imeInsert(t);
  IME.py = "";
  imeRefresh();
}
function imeLetter(ch) {
  if (IME.lang === "en") { imeInsert(IME.shift ? ch.toUpperCase() : ch); IME.shift = false; imeRenderKeys(); return; }
  if (IME.layout === "123") { imeInsert(ch); return; }
  var next = IME.py + ch;
  if (IME_PREFIX[next] || IME_DATA[next]) { IME.py = next; }
  else {
    // 边界：先提交当前最佳候选（完整词 > 音节首字），再以 ch 开启新音节
    var t = imeTopCandidate();
    if (t) imeInsert(t);
    IME.py = ch;
  }
  imeRefresh();
}
function imeBack() {
  if (IME.lang === "cn" && IME.py) { IME.py = IME.py.slice(0, -1); imeRefresh(); return; }
  imeDelete();
}
function imeDelete() {
  var el = IME.target; if (!el) return;
  var v = el.value || "", p = (typeof el.selectionStart === "number") ? el.selectionStart : v.length;
  if (p <= 0) return;
  el.value = v.slice(0, p - 1) + v.slice(p);
  imeSetCaret(p - 1);
  imeAfterEdit();
}
function imeInsert(s) {
  var el = IME.target; if (!el) return;
  var v = el.value || "", p = (typeof el.selectionStart === "number") ? el.selectionStart : v.length;
  if (p == null || p < 0) p = v.length;
  var nv = v.slice(0, p) + s + v.slice(p);
  // textarea 无 maxlength 时默认 -1(=不限)，必须用 >=0 判断才是真实限制
  var max = (typeof el.maxLength === "number" && el.maxLength >= 0) ? el.maxLength : 0;
  if (max && nv.length > max) nv = nv.slice(0, max);
  el.value = nv;
  imeSetCaret(Math.min(p + s.length, nv.length));
  imeAfterEdit();
}
function imeTopCandidate() {
  // 完整词键优先（如 nihao -> 你好），否则取候选第一
  if (IME_WORDS && IME_WORDS[IME.py]) { var w0 = IME_WORDS[IME.py].split("|")[0]; if (w0) return w0; }
  var c = imeCands();
  return c.length ? c[0].t : "";
}
function imeSetCaret(p) {
  var el = IME.target;
  try { if (el && el.setSelectionRange) el.setSelectionRange(p, p); } catch (e) {}
}
function imeAfterEdit() {
  var el = IME.target;
  if (!el) return;
  try { el.dispatchEvent(new Event("input", { bubbles: true })); } catch (e) {}
}
function imeSpace() {
  if (IME.lang === "cn" && IME.py) {
    var t = imeTopCandidate();
    if (t) { imePick(t); return; }
  }
  imeInsert(" ");
}
function imeEnter() {
  var el = IME.target;
  if (!el) return;
  // 先提交拼音组合（第一次回车提交候选，不发送）
  if (IME.lang === "cn" && IME.py) {
    var t = imeTopCandidate();
    if (t) imeInsert(t);
    IME.py = ""; imeRefresh();
    if (!t) return;
  }
  if (el.id === "userInput") {
    var t = el.value.trim();
    if (t && !streaming) {
      el.value = ""; el.style.height = "auto";
      try { el.dispatchEvent(new Event("input", { bubbles: true })); } catch (e) {}
      sendMsg(t);
    }
    return;
  }
  if (el.tagName === "TEXTAREA") { imeInsert("\n"); return; }
  if (el.id === "todoInput") {
    try { el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true })); } catch (e) {}
    return;
  }
  imeDone();
}
function imeDone() {
  IME.py = ""; IME.open = false;
  var el = IME.target; IME.target = null;
  var ime = document.getElementById("ime");
  if (ime) ime.classList.remove("show");
  if (el && el.blur) el.blur();
  syncKbdOffset();
}
function imeOpenFor(el) {
  if (!el) return;
  if (options.kbdMode === "system") return;
  IME.target = el; IME.open = true;
  try { el.setAttribute("readonly", "readonly"); } catch (e) {}
  // 数字类输入框自动切到 123 键盘层
  if (el.inputMode === "numeric" || el.inputMode === "decimal" || el.type === "number") {
    IME.layout = "123"; IME.py = ""; IME.shift = false;
  }
  var ime = document.getElementById("ime");
  if (ime) ime.classList.add("show");
  imeRenderKeys(); imeUpdateTools(); imeRefresh();
  try { el.focus(); } catch (e) {}
  imeSetCaret((el.value || "").length);
  __watchKbd(ime);
  requestAnimationFrame(syncKbdOffset);
}
// 内置 #ime / fcitx5 键盘均为 position:fixed overlay,不会缩小 visualViewport,
// 原生键盘适配(visualViewport resize)对它们无效 -> 主动测高,用 marginBottom 抬升聊天输入框
var __kbdRO = null, __kbdEl = null;
function syncKbdOffset() {
  var bar = document.getElementById("inputBar");
  if (!bar) return;
  var h = 0;
  var ime = document.getElementById("ime");
  if (ime && ime.classList.contains("show")) {
    var r = ime.getBoundingClientRect();
    if (r.height > h) h = r.height;
  }
  var fc = document.getElementById("fcitx-virtual-keyboard");
  if (fc && getComputedStyle(fc).display !== "none") {
    var r2 = fc.getBoundingClientRect();
    if (r2.height > 4 && r2.height > h) h = r2.height;
  }
  bar.style.marginBottom = h > 0 ? h + "px" : "";
}
function __watchKbd(el) {
  if (!el) return;
  if (el !== __kbdEl) {
    __kbdEl = el;
    if (__kbdRO) { try { __kbdRO.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver !== "undefined") {
      __kbdRO = new ResizeObserver(function () { syncKbdOffset(); });
      __kbdRO.observe(el);
    }
  }
  syncKbdOffset();
}
// fcitx5 虚拟键盘 DOM 由 fcitx5-bridge.js 动态插入 -> 监听其出现并跟踪尺寸变化
(function () {
  if (typeof MutationObserver === "undefined") return;
  new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      for (var j = 0; j < muts[i].addedNodes.length; j++) {
        var n = muts[i].addedNodes[j];
        if (n && n.id === "fcitx-virtual-keyboard") { __watchKbd(n); return; }
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
  var ex = document.getElementById("fcitx-virtual-keyboard");
  if (ex) __watchKbd(ex);
})();
function imeSwitchLang() {
  IME.lang = IME.lang === "cn" ? "en" : "cn";
  IME.py = ""; IME.shift = false;
  imeRenderKeys(); imeRefresh(); imeUpdateTools();
}
function imeSwitchLayout() {
  IME.layout = IME.layout === "abc" ? "123" : "abc";
  IME.py = ""; IME.shift = false;
  imeRenderKeys(); imeRefresh(); imeUpdateTools();
}
function imeToggleShift() { IME.shift = !IME.shift; imeRenderKeys(); }
function imeUpdateTools() {
  var lb = document.getElementById("imeLangBtn"), lb2 = document.getElementById("imeLangBtn2");
  var ly = document.getElementById("imeLayoutBtn"), ly2 = document.getElementById("imeLayoutBtn2");
  var st = document.getElementById("imeState");
  if (lb) { lb.textContent = IME.lang === "cn" ? "中" : "英"; lb.className = "ime-tool on"; }
  if (lb2) lb2.textContent = IME.lang === "cn" ? "中" : "英";
  if (ly) { ly.textContent = IME.layout === "abc" ? "123" : "ABC"; ly.className = "ime-tool" + (IME.layout === "123" ? " on" : ""); }
  if (ly2) ly2.textContent = IME.layout === "abc" ? "123" : "ABC";
  if (st) st.textContent = IME.layout === "123" ? "数字键盘" : (IME.lang === "cn" ? "拼音输入" : "英文输入");
}
function imeRenderKeys() {
  var box = document.getElementById("imeKeys");
  if (!box) return;
  box.innerHTML = "";
  box.className = "ime-keys" + (IME.shift ? " shift-l" : "");
  function make(label, act, k, cls) {
    var b = document.createElement("button");
    b.className = "ime-key" + (cls ? " " + cls : "");
    b.textContent = label;
    b.setAttribute("data-act", act);
    if (act === "letter") b.setAttribute("data-k", k);
    box.appendChild(b);
  }
  if (IME.layout === "123") {
    ["1","2","3","4","5","6","7","8","9","0"].forEach(function (k) { make(k, "letter", k); });
    ["-","/",":",";","(",")","¥","@","\"","'"].forEach(function (k) { make(k, "letter", k); });
    [".",",","?","!","…","·"].forEach(function (k) { make(k, "letter", k); });
    make("←", "left", null, "fn");
    make("→", "right", null, "fn");
    make("⌫", "back", null, "fn");
  } else {
    "qwertyuiop".split("").forEach(function (k) { make(IME.shift && IME.lang === "en" ? k.toUpperCase() : k, "letter", k); });
    "asdfghjkl".split("").forEach(function (k) { make(IME.shift && IME.lang === "en" ? k.toUpperCase() : k, "letter", k); });
    if (IME.lang === "en") make("⇧", "shift", null, "fn" + (IME.shift ? " on" : ""));
    "zxcvbnm".split("").forEach(function (k) { make(IME.shift && IME.lang === "en" ? k.toUpperCase() : k, "letter", k); });
    if (IME.lang === "en") make("⌫", "back", null, "fn");
    else make("中英", "lang", null, "fn");
  }
}
function imeAct(key) {
  var a = key.getAttribute("data-act");
  if (a === "letter") imeLetter(key.getAttribute("data-k"));
  else if (a === "back") imeBack();
  else if (a === "enter") imeEnter();
  else if (a === "space") imeSpace();
  else if (a === "shift") imeToggleShift();
  else if (a === "lang") imeSwitchLang();
  else if (a === "layout") imeSwitchLayout();
  else if (a === "done") imeDone();
  else if (a === "left") imeMoveCaret(-1);
  else if (a === "right") imeMoveCaret(1);
}
function imeCopy() {
  var el = IME.target;
  if (!el) { showToast("请先点选输入框"); return; }
  var v = el.value || "";
  var s = (typeof el.selectionStart === "number") ? el.selectionStart : 0;
  var e2 = (typeof el.selectionEnd === "number") ? el.selectionEnd : 0;
  var text = (e2 > s) ? v.slice(s, e2) : v;
  if (!text) { showToast("没有可复制的内容"); return; }
  var done = function() { showToast((e2 > s ? "已复制选中内容" : "已复制全部内容") + "（" + text.length + " 字）"); };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function() { imeCopyFallback(text); done(); });
  } else { imeCopyFallback(text); done(); }
}
function imeCopyFallback(text) {
  var t = document.createElement("textarea");
  t.value = text;
  t.style.cssText = "position:fixed;left:-999px;top:-999px";
  document.body.appendChild(t);
  t.select();
  try { document.execCommand("copy"); } catch (e) {}
  t.remove();
}
function imePaste() {
  var el = IME.target;
  if (!el) { showToast("请先点选输入框"); return; }
  if (!navigator.clipboard || !navigator.clipboard.readText) { showToast("当前环境不支持粘贴"); return; }
  navigator.clipboard.readText().then(function(t) {
    if (!t) { showToast("剪贴板是空的"); return; }
    imeInsertText(t);
    showToast("已粘贴 " + t.length + " 字");
  }).catch(function() { showToast("粘贴未授权：可在系统键盘里长按粘贴"); });
}
function imeInsertText(t) {
  var el = IME.target;
  if (!el) return;
  var v = el.value || "";
  var s = (typeof el.selectionStart === "number") ? el.selectionStart : v.length;
  var e2 = (typeof el.selectionEnd === "number") ? el.selectionEnd : s;
  el.value = v.slice(0, s) + t + v.slice(e2);
  try { el.selectionStart = el.selectionEnd = s + t.length; } catch (err) {}
  try { el.dispatchEvent(new Event("input", { bubbles: true })); } catch (err) {}
}
function imeMoveCaret(dir) {
  // 拼音组合中不移动光标（候选交由候选条处理）
  if (IME.lang === "cn" && IME.py) return;
  var el = IME.target;
  if (!el) return;
  var v = el.value || "";
  var p = (typeof el.selectionStart === "number") ? el.selectionStart : v.length;
  p += dir;
  if (p < 0) p = 0;
  if (p > v.length) p = v.length;
  imeSetCaret(p);
}
var _imeBeepCtx = null;
function imeHaptic() {
  try { if (navigator.vibrate) { navigator.vibrate(12); return; } } catch (e) {}
  // iOS 无震动 API：极低声点击音兜底
  try {
    _imeBeepCtx = _imeBeepCtx || new (window.AudioContext || window.webkitAudioContext)();
    var o = _imeBeepCtx.createOscillator(), g = _imeBeepCtx.createGain();
    o.connect(g); g.connect(_imeBeepCtx.destination);
    o.frequency.value = 1000;
    var t0 = _imeBeepCtx.currentTime;
    g.gain.setValueAtTime(0.02, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.03);
    o.start(t0); o.stop(t0 + 0.04);
  } catch (e) {}
}
(function imeBind() {
  var ime = document.getElementById("ime");
  if (!ime) return;
  imeInitWords();
  // 指针按下即触发，并阻止取焦(保持输入框光标)
  ime.addEventListener("pointerdown", function (e) {
    if (e.target.closest(".ime-cands")) return; // 候选条可横向滚动
    e.preventDefault();
    imeHaptic(); // 触感：安卓震动 / iOS 提示音
    var key = e.target.closest(".ime-key");
    if (key) { imeAct(key); return; }
    var tool = e.target.closest(".ime-tool");
    if (tool) {
      var a = tool.getAttribute("data-act");
      if (a === "done") imeDone(); else if (a === "lang") imeSwitchLang(); else if (a === "layout") imeSwitchLayout();
      else if (a === "copy") imeCopy(); else if (a === "paste") imePaste();
    }
  });
  // 任意文本输入框聚焦 -> 打开内置键盘（只读，避免原生键盘）
  document.addEventListener("focusin", function (e) {
    var el = e.target;
    if (!el || !el.tagName) return;
    // 系统键盘模式: 不接管输入框
    if (options.kbdMode === "system") {
      var wasRO = el.hasAttribute && el.hasAttribute("readonly");
      try { el.removeAttribute("readonly"); } catch (e2) {}
      // iOS: 聚焦时才解除只读的输入框, 需要一次 blur+focus 才会唤起原生键盘
      if (wasRO && !el._sysRefocused) {
        el._sysRefocused = true;
        setTimeout(function() {
          try { if (document.activeElement === el) { el.blur(); el.focus(); } } catch (e3) {}
        }, 0);
      }
      return;
    }
    // fcitx5 已接管(就绪且处于 fcitx 模式):内置键盘不弹出,交由 fcitx 引擎/键盘处理
    if (window.FCITX5 && window.FCITX5.isActive()) return;
    var tag = el.tagName;
    var isText = tag === "TEXTAREA" || (tag === "INPUT" && (el.type === "text" || el.type === "search"));
    if (!isText) return;
    if (el.id === "apiKeyInput" || el.id === "redeemCodeInput") return;
    if (el.closest && el.closest(".mat-viewer")) return;
    imeOpenFor(el);
  });
  // 在点按发生前先置只读，杜绝 iOS 原生键盘
  document.addEventListener("touchstart", function (e) {
    var el = e.target;
    if (!el || !el.matches) return;
    if (options.kbdMode === "system") return;
    if (el.matches('input[type="text"], input[type="search"], textarea')) {
      if (el.id === "apiKeyInput" || el.id === "redeemCodeInput") return;
      if (el.closest && el.closest(".mat-viewer")) return;
      try { el.setAttribute("readonly", "readonly"); } catch (err) {}
    }
  }, { passive: true, capture: true });
})();

// ============================================================
// 键盘模式切换(内置键盘 / 系统键盘)
// ============================================================
function setKbdMode(mode) {
  options.kbdMode = mode === "system" ? "system" : "ime";
  try { localStorage.setItem("seawhy-lex-opts", JSON.stringify(options)); } catch(e) {}
  applyKbdMode();
  showToast(mode === "system" ? "已切换系统键盘（原生输入，支持系统复制粘贴/语音）" : "已切换内置键盘");
}
function applyKbdMode() {
  var system = options.kbdMode === "system";
  document.body.classList.toggle("kbd-system", system);
  if (system) {
    document.querySelectorAll('input[type="text"], input[type="search"], input[type="tel"], input[type="number"], input[type="password"], input[type="date"], textarea').forEach(function(el) { el.removeAttribute("readonly"); });
  } else {
    ["userInput","noteTitle","noteContent","noteTags","noteDetailTitleInput","noteDetailContentInput","noteDetailTagsInput","dbSearch","lrSearch","todoInput","globalSearchInput"].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.setAttribute("readonly", "readonly");
    });
  }
  if (system && typeof imeDone === "function" && IME.open) imeDone();
  try { if (window.FCITX5) window.FCITX5.configure(system ? "builtin" : (options.imeEngine || "fcitx")); } catch (e5) {}
  setBtnGroup("kbdModeGroup", options.kbdMode);
}

// ============================================================
// 输入法引擎切换(fcitx5 拼音 / 内置键盘)
// ============================================================
function setImeEngine(engine, btn) {
  options.imeEngine = engine === "builtin" ? "builtin" : "fcitx";
  try { localStorage.setItem("seawhy-lex-opts", JSON.stringify(options)); } catch(e) {}
  if (window.FCITX5) window.FCITX5.configure(options.imeEngine);
  updateOptUI();
  showToast(options.imeEngine === "fcitx" ? "✓ fcitx5 拼音引擎" : "✓ 内置键盘");
}

// ============================================================
// 律政人生（剧情式刷题）
// ============================================================
var STORY_KEY = "seawhy-lex-story";
var STORY_ATTR_MAX = { k: 40, r: 20, m: 20 };
// 纯色线性图标系统(替代表情)
function stIcon(name, sz) {
  sz = sz || 20;
  var P = {
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3 2.5.5 5 2.24 5 5a4 4 0 0 1-8 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 .5 2.5z"/><path d="M12 2c1 3 2.5 3.5 4 5s3 4 3 7a7 7 0 1 1-14 0c0-4 2-7 7-12z"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    play: '<polygon points="6 4 20 12 6 20 6 4"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
    scales: '<line x1="12" y1="3" x2="12" y2="21"/><path d="M8 21h8"/><path d="M5 7l7-4 7 4"/><path d="M5 7L2 13a3.5 3.5 0 0 0 6 0L5 7z"/><path d="M19 7l-3 6a3.5 3.5 0 0 0 6 0l-3-6z"/>',
    bank: '<path d="M3 21h18"/><path d="M4 18h16"/><path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="M3 8l9-5 9 5v3H3z"/>',
    city: '<path d="M3 21h18"/><path d="M5 21V7l7-4v18"/><path d="M12 9h7v12"/><path d="M15 12h.01M18 12h.01M15 16h.01M18 16h.01"/>',
    snow: '<line x1="12" y1="3" x2="12" y2="21"/><line x1="4.2" y1="7.5" x2="19.8" y2="16.5"/><line x1="19.8" y1="7.5" x2="4.2" y2="16.5"/>',
    coffee: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>',
    sun: '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
    rain: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="16" y1="19" x2="16" y2="21"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    hourglass: '<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22"/><path d="M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>',
    phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    sunrise: '<path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    waves: '<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13l1.5 8-5-3-5 3 1.5-8"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    checkc: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    xc: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    sparkles: '<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/><line x1="19" y1="17" x2="19" y2="21"/><line x1="17" y1="19" x2="21" y2="19"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v14"/>',
    map: '<polygon points="1 6 8 3 16 6 23 3 23 18 16 21 8 18 1 21"/><line x1="8" y1="3" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="21"/>',
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    chevdown: '<polyline points="6 9 12 15 18 9"/>'
  };
  return '<svg width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (P[name] || P.file) + '</svg>';
}
var ST_EMOJI_MAP = { "📖": "book", "📚": "book", "🤝": "users", "🔥": "flame", "⚖️": "scales", "⚖": "scales", "🏛️": "bank", "🏛": "bank", "🌆": "city", "🏙": "city", "🏙️": "city", "❄️": "snow", "❄": "snow", "☕": "coffee", "🌞": "sun", "🖥️": "monitor", "🖥": "monitor", "😮‍💨": "cloud", "🏢": "briefcase", "📋": "list", "🌧️": "rain", "✍️": "pen", "✍": "pen", "⏳": "hourglass", "📱": "phone", "🌅": "sunrise", "👨‍⚖️": "user", "🧭": "compass", "⚡": "zap", "🌊": "waves", "🎯": "target", "🏆": "award", "🌟": "star", "✅": "checkc", "💥": "xc", "🎉": "sparkles", "📜": "file", "🏫": "bank", "🌤": "sun", "🌤️": "sun", "📗": "book", "🕯": "flame", "🕯️": "flame" };
function stIconForEmoji(emoji, sz) {
  var k = String(emoji || "").replace(/\uFE0F/g, "");
  for (var key in ST_EMOJI_MAP) {
    if (key.replace(/\uFE0F/g, "") === k) return stIcon(ST_EMOJI_MAP[key], sz);
  }
  return stIcon("file", sz);
}
function loadStorySave() {
  try {
    var s = JSON.parse(localStorage.getItem(STORY_KEY) || "null");
    if (s && s.attr) {
      if (!s.cleared) s.cleared = {};
      if (!s.unlocked) s.unlocked = 1;
      if (!s.ending) s.ending = 0;
      // 旧版(8章索引存档)迁移为 12 章 id 存档
      if (!s.v || s.v < 2) {
        var OLD2NEW = ["ch1", "ch3", "ch5", "ch7", "ch8", "ch9", "ch11", "ch12"];
        var nc = {};
        for (var ok in s.cleared) if (s.cleared[ok] && OLD2NEW[ok]) nc[OLD2NEW[ok]] = true;
        s.cleared = nc;
        s.unlocked = Math.min(STORY_CH.length, s.unlocked || 1);
        s.v = 2;
        saveStorySave(s);
      }
      return s;
    }
  } catch(e) {}
  return { v: 2, unlocked: 1, cleared: {}, attr: { k: 4, r: 2, m: 5 }, ending: 0 };
}
function saveStorySave(s) { try { localStorage.setItem(STORY_KEY, JSON.stringify(s)); } catch(e) {} }
function storyAttrClamp(a) {
  a.k = Math.max(0, Math.min(40, a.k));
  a.r = Math.max(0, Math.min(20, a.r));
  a.m = Math.max(0, Math.min(20, a.m));
  return a;
}
// 章节: id 为存档稳定键; seq 顺序脚本: scene(乙游对话, dlg 为台词数组 [说话人,台词], "narr" 为旁白) / choice 抉择 / gate 关卡引索
var STORY_CH = [
  { id: "ch1", title: "第一章 · 法学院的新生", year: "大二 · 秋",
    seq: [
      { t: "scene", emoji: "🏫", bg: "classroom", loc: "法学院 · 民法总论课堂", dlg: [
        ["narr", "九月的阳光斜洒进阶梯教室，粉笔灰在光柱里缓缓浮动。开学第一课，民法总论。"],
        ["教授", "同学们，翻开民法典第一页之前，我先问一个问题——学法律，最先要学会的是什么？"],
        ["你", "（和周围人面面相觑）是……背法条吗？"],
        ["教授", "是问\"为什么\"。"], 
        ["教授", "法条会改，判例会变，只有追问为什么的习惯，能带你走完整个职业生涯。"],
        ["教授", "这位同学——就你了。请回答：民法调整的是什么关系？"]
      ] },
      { t: "gate", gi: 0 },
      { t: "scene", emoji: "🌆", bg: "campus", loc: "傍晚 · 操场", dlg: [
        ["narr", "下课铃响，傍晚的操场被夕阳染成橘色。"],
        ["学长", "同学！法学会招新，辩论队也在抢人——你这脑子不来，可惜了！"],
        ["你", "我看了看手里那本没读完的讲义，又看了看热闹的招新摊位。"],
        ["学长", "别犹豫啦。法律人，可不能只会读书。"]
      ] },
      { t: "choice", text: "今晚怎么过？", opts: [
        { t: "泡图书馆，把讲义啃完", fx: { k: 2 } },
        { t: "加入辩论队，多认识人", fx: { r: 2 } }
      ] },
      { t: "gate", gi: 1 }
    ],
    gates: [
      { sub: "民法·总则", diff: 1, n: 3, intro: "教授连问三个民法总论问题，答上来才算真正入门。", ic: "📖" },
      { sub: "宪法", diff: 1, n: 3, intro: "周末读书小组讨论宪法基础，轮到你作主题发言。", ic: "📖" }
    ],
    clear: { pts: 20, frag: 0, text: "第一学期在忙碌中过去。你在日记本扉页写下一行字：通过法考，成为一名真正的律师。" } },
  { id: "ch2", title: "第二章 · 辩论队的冬天", year: "大二 · 冬",
    seq: [
      { t: "scene", emoji: "❄️", bg: "clubroom", loc: "辩论队 · 训练室", dlg: [
        ["narr", "加入辩论队后的第一个冬天。窗外飘着雪，训练室的灯总是亮到很晚。"],
        ["队长", "下周一晨训，宪法基础卷，人人过关。挂科的——操场十圈，我陪着跑。"],
        ["你", "（呵出一口白气）这冬天，比案例还冷。"],
        ["队长", "冷？法庭上的法官，可不会给你哈气暖手的时间。"]
      ] },
      { t: "gate", gi: 0 },
      { t: "scene", emoji: "🤝", bg: "clubroom", loc: "训练室 · 傍晚", dlg: [
        ["新生队员", "学长……我可能不适合辩论队。我连法条都背不完。"],
        ["你", "我看着他通红的眼睛，想起刚入学时的自己。"]
      ] },
      { t: "choice", text: "面对想退出的新生，你——", opts: [
        { t: "拉着他一起加练，倾囊相授", fx: { r: 2 } },
        { t: "鼓励他留下，自己转身去刷题", fx: { k: 2 } }
      ] },
      { t: "gate", gi: 1 }
    ],
    gates: [
      { sub: "宪法", diff: 1, n: 3, intro: "晨训第一卷：宪法基础，热身开始。", ic: "❄️" },
      { sub: "刑法·总则", diff: 2, n: 3, intro: "年底队内考核：刑法案例循环赛，输了做俯卧撑。", ic: "❄️" }
    ],
    clear: { pts: 30, frag: 0, text: "那个冬天，你的口才和法条一样疯长。队长在总结会上说：\"明年模拟法庭，就看你们的了。\"" } },
  { id: "ch3", title: "第三章 · 模拟法庭前夜", year: "大二 · 春",
    seq: [
      { t: "scene", emoji: "⚖️", bg: "clubroom", loc: "模拟法庭备赛室", dlg: [
        ["narr", "校模拟法庭大赛临近。备赛室的灯、案卷、还有墙上的倒计时牌。"],
        ["学姐", "你是控方一辩。开篇陈述三十秒内，必须让审判长抬起头。"],
        ["你", "我把辩词改到第七版，还是觉得不够。"],
        ["队友", "差不多了吧？我连标点都背下来了。"],
        ["你", "再过一遍。程序上任何一个漏洞，都可能输掉整场比赛。"]
      ] },
      { t: "gate", gi: 0 },
      { t: "choice", text: "赛前一晚，你的选择？", opts: [
        { t: "熬夜把案卷再过三遍", fx: { k: 2 } },
        { t: "提早休息，养精蓄锐", fx: { m: 2 } }
      ] },
      { t: "gate", gi: 1 }
    ],
    gates: [
      { sub: "刑法·总则", diff: 1, n: 3, intro: "队友抽查：案件涉及的刑法总论知识，一个都不能含糊。", ic: "⚖️" },
      { sub: "刑事诉讼法", diff: 1, n: 3, intro: "指导学姐提醒：程序问题最容易翻车，再过一遍。", ic: "⚖️" }
    ],
    clear: { pts: 30, frag: 0, text: "比赛当天，你庭辩流畅、有条不紊，拿下最佳辩手提名。那张奖状，成了你法学生涯的第一件\"装备\"。" } },
  { id: "ch4", title: "第四章 · 决赛之巅", year: "大二 · 春末",
    seq: [
      { t: "scene", emoji: "🏛️", bg: "stage", loc: "市联合模拟法庭邀请赛", dlg: [
        ["narr", "市级邀请赛的聚光灯打在主席台上，台下坐满了各校的代表队。"],
        ["对方一辩", "久仰贵校名号。不过这次的赛题——恰好是我们研究了一个月的方向。"],
        ["你", "（他们有备而来。但我也有——一整个冬天的训练，和一屋子的队友。）"],
        ["学姐", "别被他们吓到。法庭上，准备充分的人才有底气。"]
      ] },
      { t: "gate", gi: 0 },
      { t: "choice", text: "决赛前夜收到对手队伍的交流邀请，你——", opts: [
        { t: "大方赴约，切磋交换思路", fx: { r: 2 } },
        { t: "婉言谢绝，闭关打磨辩词", fx: { k: 2 } }
      ] },
      { t: "gate", gi: 1 },
      { t: "scene", emoji: "🏆", bg: "stage", loc: "颁奖典礼", dlg: [
        ["narr", "掌声落下，亚军的奖杯在灯光下发亮。"],
        ["学姐", "虽败犹荣。明年——把冠军也一起带回来。"]
      ] }
    ],
    gates: [
      { sub: "刑事诉讼法", diff: 2, n: 3, intro: "决赛预案：法庭程序的每一处细节都可能决定胜负。", ic: "🏛️" },
      { sub: "刑法·分则", diff: 2, n: 3, intro: "决赛焦点：罪与非罪、此罪与彼罪的辨析。", ic: "🏛️" }
    ],
    clear: { pts: 40, frag: 10, text: "总决赛的赛评里，写满了对你的期待。虽败犹荣——判决书一样的评语，是给辩论人最高的褒奖。" } },
  { id: "ch5", title: "第五章 · 法考启动", year: "大三 · 秋",
    seq: [
      { t: "scene", emoji: "📚", bg: "classroom", loc: "宿舍 · 开学第一天", dlg: [
        ["narr", "大三开学第一天，你在日历上郑重圈下一个日期。"],
        ["你", "法考。从今天起，所有娱乐都给它让路。"],
        ["室友", "至于吗？才大三啊。"],
        ["你", "三百天，看起来很长，其实很短。我把手机里的游戏图标全拖进了文件夹。"]
      ] },
      { t: "gate", gi: 0 },
      { t: "scene", emoji: "☕", bg: "studynight", loc: "深夜 · 自习室", dlg: [
        ["narr", "深夜的自习室只剩你一个人。咖啡见底，错题本越来越厚。"],
        ["你", "民法分则……物权、担保、合同……我在每页讲义的角落写下进度百分比。"],
        ["你", "（笔尖沙沙作响）三百天，一天都不能浪费。"]
      ] },
      { t: "choice", text: "周末，室友喊你出去放松半天。", opts: [
        { t: "去！劳逸结合，回来更高效", fx: { m: 2 } },
        { t: "婉拒了，刷题要紧", fx: { k: 1 } }
      ] },
      { t: "gate", gi: 1 }
    ],
    gates: [
      { sub: "民法·分则", diff: 2, n: 3, intro: "第一轮：民法分则专项训练，物权与合同是重灾区。", ic: "📚" },
      { sub: "刑法·分则", diff: 2, n: 3, intro: "第二轮：刑法分则，罪名一个都不能漏。", ic: "📚" }
    ],
    clear: { pts: 40, frag: 0, text: "备考计划终于上了正轨。手机里多了一条备忘：\"距离法考还有 300 天。\"" } },
  { id: "ch6", title: "第六章 · 魔鬼集训营", year: "大三 · 夏",
    seq: [
      { t: "scene", emoji: "🌞", bg: "classroom", loc: "法考暑期集训营", dlg: [
        ["narr", "法考暑期集训营。清晨六点半，走廊里全是背书声。"],
        ["班主任", "同学们，欢迎来到\"魔鬼夏令营\"。两周后，你们会感谢现在拼命的自己。"],
        ["你", "有人在哭，有人在笑。我翻开第一份阶段测试卷。"]
      ] },
      { t: "gate", gi: 0 },
      { t: "choice", text: "集训营的两周，你选择——", opts: [
        { t: "和战友组队互相抽背", fx: { r: 2 } },
        { t: "一个人留在教室加练", fx: { k: 2 } }
      ] },
      { t: "gate", gi: 1 },
      { t: "scene", emoji: "📜", bg: "classroom", loc: "结营 · 结业榜前", dlg: [
        ["narr", "结营那天，结业榜前围满了人。"],
        ["你", "我在年级前列的位置找到了自己的名字。盛夏的热风里，法考的味道越来越近了。"]
      ] }
    ],
    gates: [
      { sub: null, diff: 2, n: 4, intro: "阶段测试 · 上：全科混考，查漏补缺。", ic: "🌞" },
      { sub: null, diff: 2, n: 3, intro: "阶段测试 · 下：错过的题，不许再错。", ic: "🌞" }
    ],
    clear: { pts: 45, frag: 10, text: "两周一晃而过。行李箱的滚轮声里，你带着更厚的笔记和更稳的心态，走向法考。" } },
  { id: "ch7", title: "第七章 · 客观题战场", year: "法考 · 首战",
    seq: [
      { t: "scene", emoji: "🖥️", bg: "examhall", loc: "考区 · 检录口", dlg: [
        ["narr", "客观题考试当天。检录、安检、落座。"],
        ["监考员", "考试开始。"],
        ["你", "屏幕亮起，第一题出现。深呼吸——这就是练习了三百天的战场。"]
      ] },
      { t: "gate", gi: 0 },
      { t: "scene", emoji: "😮‍💨", bg: "examhall", loc: "考场 · 中场休息", dlg: [
        ["narr", "中场休息，走廊里安静得能听见空调的风声。"],
        ["邻座考生", "（低声叹气）……好难。"],
        ["你", "我深吸一口气，把水杯里的水一口喝完。稳住——还有下半场。"]
      ] },
      { t: "gate", gi: 1 }
    ],
    gates: [
      { sub: null, diff: 2, n: 4, intro: "客观题 · 上半场，全科混考，保持节奏。", ic: "🖥️" },
      { sub: null, diff: 2, n: 4, intro: "客观题 · 下半场，顶住，胜利就在前面。", ic: "🖥️" }
    ],
    clear: { pts: 50, frag: 0, text: "走出考场，天色刚暗。你不敢对答案，只在心里默念：稳住，还有主观题。" } },
  { id: "ch8", title: "第八章 · 红圈实习", year: "大四 · 冬",
    seq: [
      { t: "scene", emoji: "🏢", bg: "firmday", loc: "红圈所 · 18 层", dlg: [
        ["narr", "红圈所十八层，落地窗外是整座城市。"],
        ["带教律师", "（把一摞卷宗放在你桌上）欢迎来到真实世界。这个案子，从今天起跟着你。"],
        ["你", "我翻开第一页——比想象中厚得多。"],
        ["带教律师", "别怕厚。每一页，都是你以后吃饭的本事。"]
      ] },
      { t: "gate", gi: 0 },
      { t: "scene", emoji: "📋", bg: "firmnight", loc: "深夜 · 工位", dlg: [
        ["narr", "深夜的工位：台灯、尽调报告、还有凉透的外卖。"],
        ["你", "原来一份尽调报告，要核对上千页材料。"],
        ["你", "（揉了揉眼睛）城市的灯火，成了我今晚的台灯。"]
      ] },
      { t: "choice", text: "深夜加班，你选择——", opts: [
        { t: "把今天踩的坑都记进工作笔记", fx: { k: 2 } },
        { t: "和同事吐槽十分钟，笑一笑减压", fx: { m: 2 } }
      ] },
      { t: "gate", gi: 1 }
    ],
    gates: [
      { sub: "民法·分则", diff: 2, n: 3, intro: "带教律师突然发问：合同审查的要点是什么？", ic: "🏢" },
      { sub: "刑事诉讼法", diff: 2, n: 3, intro: "刑案团队借调你核对证据，程序意识不能少。", ic: "🏢" }
    ],
    clear: { pts: 40, frag: 0, text: "实习结束那天，带教律师难得地点了点头：\"基本功还行。\"这句话让你高兴了一整晚。" } },
  { id: "ch9", title: "第九章 · 第一位客户", year: "转正候补期",
    seq: [
      { t: "scene", emoji: "🤝", bg: "meeting", loc: "律所 · 会议室", dlg: [
        ["narr", "转正候补期的第一场正式会见。"],
        ["当事人", "（声音发颤）律师，我儿子他……他真的是被冤枉的。求你们，帮帮他。"],
        ["你", "我第一次以\"律师\"的身份坐在会议桌前，忽然理解了这两个字的重量。"],
        ["你", "您放心，我们会认真研究案卷的每一个细节。"]
      ] },
      { t: "choice", text: "会见结束后，你做了什么？", opts: [
        { t: "连夜整理会见纪要发给带教律师", fx: { k: 1, r: 1 } },
        { t: "陪当事人多聊半小时，安抚情绪", fx: { m: 1, r: 1 } }
      ] },
      { t: "gate", gi: 0 }
    ],
    gates: [
      { sub: "刑法·分则", diff: 2, n: 3, intro: "当事人问到的罪名问题，一个字都不能答错——这是别人的身家自由。", ic: "🤝" }
    ],
    clear: { pts: 50, frag: 15, text: "当事人临走前连声道谢。你忽然明白：法条背得再熟，落到实处才是本事。" } },
  { id: "ch10", title: "第十章 · 律所风波", year: "执业前夜",
    seq: [
      { t: "scene", emoji: "🌧️", bg: "firmnight", loc: "律所 · 走廊尽头的会议室", dlg: [
        ["narr", "临近转正，所里突然接了一起棘手的刑案。全组连夜作战。"],
        ["合伙人", "证据整理的核心位置——交给新来的。他看向你：没时间等你成长，直接上。"],
        ["你", "明白。"],
        ["合伙人", "好。法律这行，就要这份干脆。"]
      ] },
      { t: "gate", gi: 0 },
      { t: "choice", text: "案件攻坚的深夜，你——", opts: [
        { t: "主动请缨外出调取关键证据", fx: { r: 1, m: 1 } },
        { t: "留守所里通宵完成检索报告", fx: { k: 2 } }
      ] },
      { t: "gate", gi: 1 }
    ],
    gates: [
      { sub: "刑事诉讼法", diff: 2, n: 3, intro: "证据链梳理：程序正义容不得半点马虎。", ic: "🌧️" },
      { sub: "刑法·分则", diff: 3, n: 2, intro: "案件定性讨论会：合伙人的圈子里没有侥幸。", ic: "🌧️" }
    ],
    clear: { pts: 55, frag: 15, text: "风波平息，案件尘埃落定。合伙人在群里 @了你：\"这批年轻人，靠得住。\"" } },
  { id: "ch11", title: "第十一章 · 主观题决战", year: "法考 · 终战",
    seq: [
      { t: "scene", emoji: "✍️", bg: "examhall", loc: "主观题考场", dlg: [
        ["narr", "主观题考试当天。四个小时，一整道大案例分析，键盘敲击声连成一片。"],
        ["你", "手指在键盘上飞，脑子在法条里跑。三百天的积累，全部押在这一场。"]
      ] },
      { t: "choice", text: "开考前的最后几分钟，你——", opts: [
        { t: "把高频考点再默写一遍", fx: { k: 2 } },
        { t: "听一段轻音乐，放平心态", fx: { m: 2 } }
      ] },
      { t: "gate", gi: 0 },
      { t: "scene", emoji: "⏳", bg: "examhall", loc: "考场 · 倒计时 40 分钟", dlg: [
        ["你", "（还剩四十分钟……）我扫了一眼未答题的数量，手心微微出汗。"],
        ["narr", "深呼吸。把会的全部写上——这就是三百天积累的意义。"]
      ] },
      { t: "choice", text: "下半场开始前，你——", opts: [
        { t: "快速过一遍易错点", fx: { k: 1 } },
        { t: "闭眼深呼吸，放空自己", fx: { m: 1 } }
      ] },
      { t: "gate", gi: 1 }
    ],
    gates: [
      { sub: null, diff: 3, n: 4, intro: "主观题 · 案例大题，逐句分析，法言法语。", ic: "✍️" },
      { sub: null, diff: 3, n: 3, intro: "最后的关键考点，一锤定音。", ic: "✍️" }
    ],
    clear: { pts: 60, frag: 0, text: "交卷铃响。你瘫在椅子上仰头看着天花板——无论结果如何，你已拼尽全力。" } },
  { id: "ch12", title: "第十二章 · 金榜题名", year: "成绩公布之夜",
    seq: [
      { t: "scene", emoji: "📱", bg: "firmnight", loc: "深夜 · 出租屋", dlg: [
        ["narr", "成绩公布那天夜里，出租屋里静得能听见心跳。"],
        ["你", "（刷新……再刷新……）"],
        ["你", "\"通过\"两个字跳出来的瞬间，眼泪毫无预兆地掉了下来。"],
        ["narr", "三百多个日夜的等待，在这一刻，有了回音。"]
      ] },
      { t: "choice", text: "出分之夜，你先——", opts: [
        { t: "给师父打电话报喜道谢", fx: { r: 2 } },
        { t: "独自写下这三百天的复盘", fx: { k: 2 } }
      ] },
      { t: "gate", gi: 0 },
      { t: "scene", emoji: "🌅", bg: "rooftop", loc: "天台 · 黎明前", dlg: [
        ["narr", "天台，黎明前。"],
        ["你", "等 Offer 的一周格外漫长。课堂、赛场、考场、律所……这一路的画面，像放电影一样闪过。"],
        ["你", "而下一站，是一家红圈所。真正的律师生涯，开始了。"]
      ] },
      { t: "gate", gi: 1 }
    ],
    gates: [
      { sub: null, diff: 3, n: 4, intro: "入职培训终考：合伙人亲自出题，综合能力考验。", ic: "🌅" },
      { sub: null, diff: 3, n: 4, intro: "培训附加题：展现你的体系化思维。", ic: "🌅" }
    ],
    clear: { pts: 60, frag: 20, text: "Offer 邮件在深夜抵达。你以为故事到此为止——不，律师的传奇，此刻才刚刚开始。" } },
  { id: "ch13", title: "第十三章 · 第一案", year: "执业第一年",
    seq: [
      { t: "scene", emoji: "💼", bg: "firmday", loc: "律所 · 独立工位", dlg: [
        ["带教律师", "拿到执业证了？恭喜。他把一份卷宗推到你面前：民间借贷纠纷，整个案子交给你。"],
        ["你", "我？我愣了一下：当事人……只跟我对接？"],
        ["带教律师", "对。从今天起，这案子是你的。律师这条路，总要自己走出第一步。"]
      ] },
      { t: "choice", text: "第一次独立办案，你决定——", opts: [
        { t: "去现场走访，眼见为实", fx: { m: 1, r: 1 } },
        { t: "闭关研究类案判例", fx: { k: 2 } }
      ] },
      { t: "gate", gi: 0 }
    ],
    gates: [
      { sub: "民法·分则", diff: 3, n: 3, intro: "借贷纠纷的核心争点，证据与时效缺一不可。", ic: "💼" },
      { sub: "民法·总则", diff: 2, n: 3, intro: "代理意见成稿前，总则基础再过一遍。", ic: "💼" }
    ],
    clear: { pts: 60, frag: 10, text: "调解书签收那天，当事人送来一面锦旗。你把它挂在工位上——第一案的分量，比任何积分都重。" } },
  { id: "ch14", title: "第十四章 · 初次出庭", year: "执业第一年 · 春",
    seq: [
      { t: "scene", emoji: "👨‍⚖️", bg: "court", loc: "区人民法院 · 第三法庭", dlg: [
        ["narr", "区人民法院第三法庭。法槌敲响的瞬间，你想起大学模拟法庭的那个下午——这一次，是真的。"],
        ["审判长", "现在进行法庭调查。请原告代理人陈述。"],
        ["你", "我站起身。声音比自己预想的要稳。"]
      ] },
      { t: "gate", gi: 0 },
      { t: "choice", text: "休庭间隙，对方律师递来名片示好，你——", opts: [
        { t: "接下名片，同行也是朋友", fx: { r: 2 } },
        { t: "婉拒后逐句复盘庭审发言", fx: { k: 2 } }
      ] },
      { t: "gate", gi: 1 },
      { t: "scene", emoji: "🌤️", bg: "court", loc: "法院 · 门口", dlg: [
        ["narr", "判决支持了你的主要诉请。"],
        ["你", "走出法院大门，阳光很好。我给师父发了条消息：\"赢了。\""]
      ] }
    ],
    gates: [
      { sub: "民法·分则", diff: 3, n: 3, intro: "法庭辩论环节：争议焦点的攻防。", ic: "👨‍⚖️" },
      { sub: "刑事诉讼法", diff: 2, n: 3, intro: "旁听席上刑庭在开审，程序细节顺便复习。", ic: "👨‍⚖️" }
    ],
    clear: { pts: 70, frag: 0, text: "第一次独立出庭的胜利，比任何模拟都踏实。你在执业日志上写下：第一页，已翻过。" } },
  { id: "ch15", title: "第十五章 · 专业方向", year: "执业第二年",
    seq: [
      { t: "scene", emoji: "🧭", bg: "meeting", loc: "律所 · 主任办公室", dlg: [
        ["主任", "万金油律师，走不远。他把三张卡片摆在你面前：刑事辩护、资本市场、争议解决。"],
        ["主任", "选一个方向，扎下去。五年后，让别人提起这个领域就想到你。"],
        ["你", "我看着三张卡片，想起这一路的每一步。"]
      ] },
      { t: "choice", text: "你的专业方向是？", opts: [
        { t: "刑事辩护——为自由辩护", fx: { m: 2 } },
        { t: "资本市场——与规则共舞", fx: { k: 2 } },
        { t: "争议解决——在对抗中求衡", fx: { r: 2 } }
      ] },
      { t: "gate", gi: 0 },
      { t: "scene", emoji: "📗", bg: "firmday", loc: "工位 · 专业专著", dlg: [
        ["narr", "你把办公桌上的书，全部换成了专业领域的专著。"],
        ["你", "从\"都会一点\"，到\"一行最精\"。这是律师的分水岭。"]
      ] }
    ],
    gates: [
      { sub: null, diff: 3, n: 3, intro: "专业化第一考：前沿实务问题研究。", ic: "🧭" }
    ],
    clear: { pts: 60, frag: 15, text: "方向定了，路就清晰了。行业活动上，开始有人主动向你咨询专业问题。" } },
  { id: "ch16", title: "第十六章 · 大案来了", year: "执业第三年",
    seq: [
      { t: "scene", emoji: "⚡", bg: "meeting", loc: "律所 · 大案作战室", dlg: [
        ["narr", "一起社会瞩目的重大刑案，团队连夜作战。"],
        ["合伙人", "白板上的争议焦点，每一个都足以写进职业生涯。他看向你：敢不敢接？"],
        ["你", "敢。"],
        ["合伙人", "好。作战室钥匙给你——这案子，拼的是细节。"]
      ] },
      { t: "gate", gi: 0 },
      { t: "choice", text: "媒体围堵律所门口，你——", opts: [
        { t: "接受采访，做一次法治科普", fx: { r: 1, m: 1 } },
        { t: "拒绝曝光，闭关打磨辩词", fx: { k: 2 } }
      ] },
      { t: "gate", gi: 1 }
    ],
    gates: [
      { sub: "刑法·分则", diff: 3, n: 3, intro: "指控逻辑的每一环，都要找到辩护的支点。", ic: "⚡" },
      { sub: "刑事诉讼法", diff: 3, n: 3, intro: "非法证据排除——程序辩护的胜负手。", ic: "⚡" }
    ],
    clear: { pts: 80, frag: 0, text: "判决落槌，辩护意见被大面积采纳。走出法院时，你觉得肩上的律徽又沉了几分。" } },
  { id: "ch17", title: "第十七章 · 风浪与坚守", year: "执业第五年",
    seq: [
      { t: "scene", emoji: "🌊", bg: "firmnight", loc: "律所 · 深夜", dlg: [
        ["narr", "行业风波骤起。流言、压力、质疑，一起涌来。"],
        ["同行", "（叹息）这行越来越难了。要不……转行吧？"],
        ["你", "深夜的办公室，我在心里问自己：当初为什么选这条路？"]
      ] },
      { t: "gate", gi: 0 },
      { t: "choice", text: "面对质疑，你的回应是——", opts: [
        { t: "正面发声，硬刚到底", fx: { m: 2 } },
        { t: "从长计议，用案子说话", fx: { k: 1, r: 1 } }
      ] },
      { t: "gate", gi: 1 },
      { t: "scene", emoji: "🕯️", bg: "firmnight", loc: "办公室 · 笔记本前", dlg: [
        ["narr", "风波过去，留下来的都是真金。"],
        ["你", "我在笔记本上写下一行字：法律人的一生，就是不断选择坚守的一生。"]
      ] }
    ],
    gates: [
      { sub: "宪法", diff: 3, n: 3, intro: "风浪之中，回到法律人的原点——宪法与基本权利。", ic: "🌊" },
      { sub: null, diff: 3, n: 3, intro: "综合实战：把这一路的积累全部摆上桌面。", ic: "🌊" }
    ],
    clear: { pts: 80, frag: 20, text: "潮水退去，你的名字反而更响亮了。坚守，本身就是最有力量的回答。" } },
  { id: "ch18", title: "第十八章 · 律政巅峰", year: "多年以后",
    seq: [
      { t: "scene", emoji: "🏙️", bg: "meeting", loc: "律所 · 合伙人会议室", dlg: [
        ["narr", "晋升合伙人答辩日。台下坐着当初领你入门的师父，和一群像当年的你一样的年轻律师。"],
        ["主持人", "下面，有请最后一位候选人进行述职。"],
        ["你", "我深吸一口气，站了起来。"]
      ] },
      { t: "choice", text: "答辩开场，你决定——", opts: [
        { t: "从成长故事讲起，以情动人", fx: { m: 2 } },
        { t: "从专业成就讲起，以理服人", fx: { k: 2 } }
      ] },
      { t: "gate", gi: 0 },
      { t: "scene", emoji: "🎯", bg: "meeting", loc: "答辩 · 最后陈述", dlg: [
        ["你", "我在白板上画下这一路的路线图：课堂、赛场、考场、法庭。"],
        ["你", "画完最后一个箭头，我停顿了一下。"],
        ["你", "「这，就是我理解的法律人。」台下，掌声响起。"]
      ] },
      { t: "gate", gi: 1 }
    ],
    gates: [
      { sub: null, diff: 3, n: 4, intro: "晋升答辩 · 专业卷：十八年功力的总检验。", ic: "🏙️" },
      { sub: null, diff: 3, n: 4, intro: "晋升答辩 · 综合卷：知识、人脉与心态的终极答卷。", ic: "🏙️" }
    ],
    clear: { pts: 150, frag: 50, text: "" }
  }
];
// 结局判定(18 章成长曲线)
function storyEndingOf(a) {
  if (a.k >= 36 && a.r >= 10 && a.m >= 14) return { lv: "S", title: "律政巅峰 · 知名大律师", ic: "🏙️", text: "晋升合伙人的表决全票通过。你站在律所落地窗前俯瞰城市——当年那个在阶梯教室被点名提问的新生，如今成了别人口中\"要去成为\"的那种律师。" };
  if (a.k >= 24) return { lv: "A", title: "王牌主办律师", ic: "🏛️", text: "你成了所里的王牌主办律师，案卷越摞越高，名字开始出现在行业榜单上。巅峰还有一步之遥——继续积累，终会抵达。" };
  return { lv: "B", title: "稳健执业律师", ic: "💼", text: "你是一名稳健执业的律师，当事人信任你，同行敬你三分。别急——知识与人脉还在积累，把前面的章节重刷一遍，巅峰的门始终开着。（提升属性后重刷终章可改写结局）" };
}

var _st = null; // 章内运行状态
var _storyMapMode = "map"; // 地图 / 列表
var STORY_MAP_NODES = [
  { x: 22, y: 94 }, { x: 50, y: 94 }, { x: 78, y: 94 },
  { x: 78, y: 77 }, { x: 50, y: 77 }, { x: 22, y: 77 },
  { x: 22, y: 60 }, { x: 50, y: 60 }, { x: 78, y: 60 },
  { x: 78, y: 43 }, { x: 50, y: 43 }, { x: 22, y: 43 },
  { x: 22, y: 26 }, { x: 50, y: 26 }, { x: 78, y: 26 },
  { x: 78, y: 9 }, { x: 50, y: 9 }, { x: 22, y: 9 }
];
function showStory() {
  hideAllViews();
  document.getElementById("storyView").classList.add("show");
  renderStoryMap();
}
function storyBack() {
  if (_st) {
    if (!confirm("退出将丢弃本章本次的闯关进度，确定退出吗？")) return;
    _st = null;
    renderStoryMap();
    return;
  }
  showLearningCenter();
}
function storyAttrBar(v, max, color) {
  return '<div class="sa-bar"><div class="sa-fill" style="width:' + Math.min(100, Math.round(v / max * 100)) + '%;background:' + color + '"></div></div>';
}
function renderStoryMap() {
  var s = loadStorySave();
  s.attr = storyAttrClamp(s.attr);
  var ending = s.ending ? storyEndingOf(s.attr) : null;
  var doneCount = Object.keys(s.cleared).length;
  var h = '<div class="st-hero">'
    + '<div class="st-hero-badge">Lv.' + (s.unlocked > STORY_CH.length ? "MAX" : s.unlocked) + '</div>'
    + '<div class="st-hero-title">律政人生</div>'
    + '<div class="st-hero-sub">从法学院到红圈所 · 剧情进度 ' + doneCount + '/' + STORY_CH.length + '</div>'
    + '<div class="st-hero-attrs">'
    + '<div class="st-ha"><div class="st-ha-top"><span class="st-ha-ic">' + stIcon("book", 13) + '</span><span class="st-ha-name">知识</span></div><div class="st-ha-mid"><span class="st-ha-val">' + s.attr.k + '</span></div><div class="st-ha-bar"><i style="width:' + Math.min(100, Math.round(s.attr.k / STORY_ATTR_MAX.k * 100)) + '%"></i></div></div>'
    + '<div class="st-ha"><div class="st-ha-top"><span class="st-ha-ic">' + stIcon("users", 13) + '</span><span class="st-ha-name">人脉</span></div><div class="st-ha-mid"><span class="st-ha-val">' + s.attr.r + '</span></div><div class="st-ha-bar"><i style="width:' + Math.min(100, Math.round(s.attr.r / STORY_ATTR_MAX.r * 100)) + '%"></i></div></div>'
    + '<div class="st-ha"><div class="st-ha-top"><span class="st-ha-ic">' + stIcon("flame", 13) + '</span><span class="st-ha-name">心态</span></div><div class="st-ha-mid"><span class="st-ha-val">' + s.attr.m + '</span></div><div class="st-ha-bar"><i style="width:' + Math.min(100, Math.round(s.attr.m / STORY_ATTR_MAX.m * 100)) + '%"></i></div></div>'
    + '</div></div>';
  if (ending) {
    h += '<div class="st-ending" onclick="renderStoryEnding()"><span class="se-ic">' + stIcon(ending.ic, 26) + '</span><div><div class="se-title">已达成结局 · ' + escHtml(ending.title) + '</div><div class="se-sub">点击查看 · 提升属性可改写</div></div><span class="sc-state">›</span></div>';
  }
  if (_storyMapMode === "map") {
    // 闯关地图: 背景插画 + 蜿蜒虚线路径 + 章节节点
    var pts = STORY_MAP_NODES.map(function(n) { return n.x + "," + n.y; }).join(" ");
    h += '<div class="st-map"><img class="st-map-bg" src="images/story/map-bg.webp" />'
      + '<svg class="st-map-path" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M' + pts.replace(/ /g, " L ") + '" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="3" stroke-dasharray="1 3" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>';
    for (var ni = 0; ni < STORY_MAP_NODES.length; ni++) {
      var n = STORY_MAP_NODES[ni];
      var cc = STORY_CH[ni];
      var ncleared = !!s.cleared[ni];
      var nunlocked = ni + 1 <= s.unlocked;
      var ncls = "st-node" + (ncleared ? " done" : "") + (nunlocked && ni + 1 === s.unlocked && !ncleared ? " cur" : "");
      if (!nunlocked) ncls += " locked";
      var ninner = ncleared ? stIcon("check", 15) : (nunlocked ? (ni + 1 === s.unlocked && !ncleared ? stIcon("play", 13) : String(ni + 1)) : stIcon("lock", 12));
      h += '<div class="' + ncls + '" style="left:' + n.x + '%;top:' + n.y + '%" ' + (nunlocked ? 'onclick="storyStartChapter(' + ni + ')"' : 'onclick="showToast(\'先完成前面的章节吧\')"') + '>'
        + '<div class="st-node-circle">' + ninner + '</div>'
        + '<div class="st-node-label">' + escHtml(cc.title.replace(/^第[^章]+章 · /, "")) + '</div>'
        + '</div>';
    }
    h += '</div>';
  } else {
    h += '<div class="st-chgrid">';
    for (var i = 0; i < STORY_CH.length; i++) {
      var c = STORY_CH[i];
      var cleared = !!s.cleared[c.id];
      var unlocked = i + 1 <= s.unlocked;
      var cls = "st-tile" + (cleared ? " done" : "") + (unlocked && i + 1 === s.unlocked && !cleared ? " cur" : "");
      if (!unlocked) cls += " locked";
      var state = cleared ? stIcon("check", 11) : (unlocked ? (i + 1 === s.unlocked && !cleared ? stIcon("play", 10) : "·") : stIcon("lock", 10));
      h += '<div class="' + cls + '" ' + (unlocked ? 'onclick="storyStartChapter(' + i + ')"' : '') + '>'
        + '<div class="st-tile-num">' + (cleared ? stIcon("check", 12) : i + 1) + '</div>'
        + '<div class="st-tile-name">' + escHtml(c.title.replace(/^第[^章]+章 · /, "")) + '</div>'
        + '<div class="st-tile-state">' + state + '</div></div>';
    }
    h += '</div>';
  }
  h += '<div class="st-mode-toggle"><button class="smt-btn' + (_storyMapMode === "map" ? " on" : "") + '" onclick="_storyMapMode=\'map\';renderStoryMap()">' + stIcon("map", 13) + ' 地图</button><button class="smt-btn' + (_storyMapMode === "list" ? " on" : "") + '" onclick="_storyMapMode=\'list\';renderStoryMap()">' + stIcon("list", 13) + ' 列表</button></div>'
    + '<button class="st-reset" onclick="storyReset()">重置剧情存档</button>';
  document.getElementById("storyBody").innerHTML = h;
  document.getElementById("storyBody").classList.toggle("map-fit", _storyMapMode === "map");
}
function storyReset() {
  if (!confirm("重置后将清空《律政人生》的全部进度（章节/属性/结局），题库等其他数据不受影响。确定重置？")) return;
  saveStorySave({ unlocked: 1, cleared: {}, attr: { k: 4, r: 2, m: 5 }, ending: 0 });
  renderStoryMap();
  showToast("剧情存档已重置");
}
function storyStartChapter(ci) {
  var s = loadStorySave();
  if (ci + 1 > s.unlocked) return;
  _st = { ch: ci, seqIdx: 0, gates: {}, retryUsed: {}, pendingGate: null };
  storyAdvance();
}
function storyAdvance() {
  var c = STORY_CH[_st.ch];
  if (_st.seqIdx >= c.seq.length) { storyChapterClear(); return; }
  var item = c.seq[_st.seqIdx];
  if (item.t === "scene") renderStoryScene(item);
  else if (item.t === "choice") renderStoryChoice(item);
  else if (item.t === "gate") storyStartGate(item.gi);
}
function storyRenderShell(inner) {
  var sb = document.getElementById("storyBody");
  sb.classList.remove("map-fit");
  sb.innerHTML = '<div class="st-vwrap">' + inner + '</div>';
  document.getElementById("storyBody").scrollTop = 0;
}
// 乙游式对话界面: 打字机 + 说话人名牌 + 点击推进
function renderStoryScene(item) {
  var me = (loadProfile().nickname || "你");
  var lines = item.dlg.map(function(l) { return [l[0] === "你" ? me : l[0], l[1]]; });
  _st.dlg = { lines: lines, li: 0, timer: null };
  storyRenderShell('<div class="st-vn" id="stVn" onclick="storyDlgTap()">'
    + '<div class="st-vn-bg"><img src="' + (item.bg ? 'images/story/bg-' + item.bg + '.webp' : 'images/story/map-bg.webp') + '" /><div class="st-vn-tint"></div></div>'
    + '<div class="st-vn-head"><span class="st-vn-loc">' + escHtml(item.loc || "") + '</span><span class="st-vn-emoji">' + stIconForEmoji(item.emoji, 34) + '</span></div>'
    + '<div class="st-dlgbox"><div class="st-dlg-name" id="stDlgName"></div><div class="st-dlg-text" id="stDlgText"></div><div class="st-dlg-next" id="stDlgNext">' + stIcon("chevdown", 13) + '</div></div>'
    + '</div>');
  storyDlgType();
}
function storyDlgTap() {
  var d = _st && _st.dlg;
  if (!d) return;
  if (d.timer) {
    clearInterval(d.timer); d.timer = null;
    var tEl = document.getElementById("stDlgText");
    if (tEl) tEl.textContent = d.lines[d.li][1];
    var nx = document.getElementById("stDlgNext");
    if (nx) nx.style.visibility = "visible";
    return;
  }
  d.li++;
  if (d.li >= d.lines.length) { storyNext(); return; }
  storyDlgType();
}
function storyDlgType() {
  var d = _st.dlg;
  var line = d.lines[d.li];
  var who = line[0], text = line[1];
  var nameEl = document.getElementById("stDlgName");
  var textEl = document.getElementById("stDlgText");
  if (!nameEl || !textEl) return;
  if (who === "narr") {
    nameEl.style.display = "none";
    textEl.classList.add("narr");
  } else {
    nameEl.style.display = "inline-block";
    nameEl.textContent = who;
    textEl.classList.remove("narr");
  }
  textEl.textContent = "";
  var nx = document.getElementById("stDlgNext");
  if (nx) nx.style.visibility = "hidden";
  var ci = 0;
  d.timer = setInterval(function() {
    ci++;
    if (textEl) textEl.textContent = text.slice(0, ci);
    if (ci >= text.length) {
      clearInterval(d.timer);
      if (_st && _st.dlg) _st.dlg.timer = null;
      var nx2 = document.getElementById("stDlgNext");
      if (nx2) nx2.style.visibility = "visible";
    }
  }, 32);
}
function renderStoryChoice(item) {
  var h = '<div class="st-scene"><div class="st-loc">人生抉择</div><div class="st-emoji-wrap">' + stIcon("compass", 28) + '</div><div class="st-text">' + escHtml(item.text) + '</div></div><div class="st-choices">';
  for (var i = 0; i < item.opts.length; i++) {
    h += '<button class="st-choice" onclick="storyPickChoice(' + i + ')"><span class="sc-pfx">' + ["A", "B", "C"][i] + '</span><span>' + escHtml(item.opts[i].t) + '</span><span class="sc-arrow">›</span></button>';
  }
  h += '</div>';
  storyRenderShell(h);
}
function storyPickChoice(oi) {
  var c = STORY_CH[_st.ch];
  var item = null;
  for (var i = c.seq.length - 1; i >= 0; i--) if (c.seq[i].t === "choice") { item = c.seq[i]; break; }
  if (!item) return;
  var fx = item.opts[oi].fx;
  var s = loadStorySave();
  var parts = [];
  if (fx.k) { s.attr.k += fx.k; parts.push("知识+" + fx.k); }
  if (fx.r) { s.attr.r += fx.r; parts.push("人脉+" + fx.r); }
  if (fx.m) { s.attr.m += fx.m; parts.push("心态+" + fx.m); }
  storyAttrClamp(s.attr);
  saveStorySave(s);
  showToast(parts.join(" · "));
  storyNext();
}
function storyNext() {
  if (_st.dlg && _st.dlg.timer) { clearInterval(_st.dlg.timer); _st.dlg.timer = null; }
  _st.seqIdx++;
  storyAdvance();
}
// ===== 剧情题目关卡 =====
function storyStartGate(gi) {
  var c = STORY_CH[_st.ch];
  var g = c.gates[gi];
  storyRenderShell('<div class="st-gate-intro"><div class="sgi-circle">' + stIconForEmoji(g.ic, 34) + '</div><p>' + escHtml(g.intro) + '</p><div class="sgi-meta"><span class="sgi-chip">' + g.n + ' 道题</span><span class="sgi-chip">' + escHtml(g.sub || "全科混合") + '</span>' + (g.diff ? '<span class="sgi-chip">难度 ' + g.diff + '</span>' : '') + '</div><button class="st-btn" onclick="storyBeginGate(' + gi + ')">开始作答</button></div>');
}
function storyBeginGate(gi) {
  var c = STORY_CH[_st.ch];
  var g = c.gates[gi];
  var pool = [];
  if (g.sub && QUIZ_DATA[g.sub]) pool = QUIZ_DATA[g.sub].slice();
  if (!pool.length) { for (var k in QUIZ_DATA) pool = pool.concat(QUIZ_DATA[k]); }
  var filtered = pool.filter(function(q) { return g.diff ? q.diff === g.diff : true; });
  if (filtered.length >= g.n) pool = filtered;
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  _st.gates[gi] = { qs: pool.slice(0, g.n), qi: 0, correct: 0, sel: [], answered: false };
  renderStoryGate(gi);
}
function renderStoryGate(gi) {
  var gs = _st.gates[gi];
  var q = gs.qs[gs.qi];
  var labels = ["A", "B", "C", "D", "E", "F"];
  var h = '<div class="st-qcard"><div class="st-qprog"><i style="width:' + Math.round(gs.qi / gs.qs.length * 100) + '%"></i></div><div class="st-qmeta"><span>第 ' + (gs.qi + 1) + ' 题 / 共 ' + gs.qs.length + ' 题</span><span>已答对 ' + gs.correct + '</span></div>'
    + (q.case ? '<div class="st-qcase"><b>📋 案例分析</b>' + escHtml(q.case) + '</div>' : '')
    + '<div class="st-qtext">' + (q.multi ? "[多选] " : "") + escHtml(q.q) + '</div><div id="stOpts">';
  for (var i = 0; i < q.opts.length; i++) {
    h += '<div class="st-opt" id="stopt' + i + '" onclick="storyToggleOpt(' + gi + ',' + i + ')"><span class="so-prefix">' + labels[i] + '</span><span>' + escHtml(q.opts[i]) + '</span></div>';
  }
  h += '</div><div id="stExpWrap"></div>';
  h += q.multi
    ? '<button class="st-btn" id="stSubmit" onclick="storySubmit(' + gi + ')">提交答案</button>'
    : '<button class="st-btn" id="stNext" style="display:none" onclick="storyGateNext(' + gi + ')">' + (gs.qi === gs.qs.length - 1 ? "完成关卡" : "下一题") + '</button>';
  h += '</div>';
  storyRenderShell(h);
}
function storyToggleOpt(gi, oi) {
  var gs = _st.gates[gi];
  var q = gs.qs[gs.qi];
  if (gs.answered) return;
  if (q.multi) {
    var idx = gs.sel.indexOf(oi);
    if (idx >= 0) gs.sel.splice(idx, 1); else gs.sel.push(oi);
    var el = document.getElementById("stopt" + oi);
    if (el) el.classList.toggle("sel", gs.sel.indexOf(oi) >= 0);
  } else {
    gs.sel = [oi];
    storySubmit(gi);
  }
}
function storySubmit(gi) {
  var gs = _st.gates[gi];
  var q = gs.qs[gs.qi];
  if (gs.answered) return;
  if (!gs.sel.length) { showToast("请先选择答案"); return; }
  gs.answered = true;
  var ans = q.ans;
  var isMulti = !!q.multi;
  var ok;
  if (isMulti) {
    var norm = function(v) { return (Array.isArray(v) ? v.slice().sort() : [v]).join("|"); };
    ok = norm(gs.sel) === norm(ans);
  } else {
    ok = String(gs.sel[0]) === String(Array.isArray(ans) ? ans[0] : ans);
  }
  if (ok) gs.correct++;
  recordStudyTime(0, 1);
  recordAnswerStat(ok);
  if (ok) { addPoints(vipRate(1), "剧情闯关"); maybeDropJurist(q); }
  else addToWrongBook(q, isMulti ? gs.sel.slice() : gs.sel[0]);
  var ansArr = Array.isArray(ans) ? ans : [ans];
  for (var i = 0; i < q.opts.length; i++) {
    var el = document.getElementById("stopt" + i);
    if (!el) continue;
    el.classList.add("disabled");
    el.onclick = null;
    if (ansArr.indexOf(i) >= 0) el.classList.add("correct");
    else if (gs.sel.indexOf(i) >= 0) el.classList.add("wrong");
  }
  var expHtml = '<div class="st-exp">' + (ok ? '<b style="color:#27ae60">回答正确</b>' : '<b style="color:#e74c3c">回答错误</b>（正确答案：' + ansArr.map(function(a) { return ["A","B","C","D","E","F"][a] || a; }).join("、") + '）') + (q.exp ? '<br>' + escHtml(q.exp) : '') + '</div>';
  var wrap = document.getElementById("stExpWrap");
  if (wrap) wrap.innerHTML = expHtml;
  var next = document.getElementById("stNext");
  if (next) { next.style.display = "block"; next.textContent = gs.qi === gs.qs.length - 1 ? "完成关卡" : "下一题"; }
  var sub = document.getElementById("stSubmit");
  if (sub) sub.style.display = "none";
}
function storyGateNext(gi) {
  var gs = _st.gates[gi];
  if (!gs.answered) return;
  gs.answered = false;
  gs.sel = [];
  gs.qi++;
  if (gs.qi >= gs.qs.length) storyGateFinish(gi);
  else renderStoryGate(gi);
}
function storyGateFinish(gi) {
  var gs = _st.gates[gi];
  var n = gs.qs.length;
  var passNeed = Math.ceil(n * 2 / 3);
  var s = loadStorySave();
  var grade, delta = { k: 0, m: 0 }, ic, msg, retryable = false;
  if (gs.correct === n) {
    grade = "perfect"; delta = { k: 2, m: 1 };
    ic = "🌟"; msg = "完美通关！所有考点尽在掌握。";
  } else if (gs.correct >= passNeed) {
    grade = "pass"; delta = { k: 1 };
    ic = "✅"; msg = "顺利通过，稳扎稳打。";
  } else {
    grade = "fail"; delta = { m: -1 };
    ic = "💥"; msg = "遭遇挫折——没关系，挫折也是成长的一部分。";
    if (s.attr.k >= 16 && !_st.retryUsed[gi]) retryable = true;
  }
  _st.pendingGate = { gi: gi, grade: grade, delta: delta, retryable: retryable };
  var h = '<div class="st-banner g-' + grade + '"><div class="sb-ic">' + stIcon(grade === "perfect" ? "star" : grade === "pass" ? "checkc" : "xc", 30) + '</div>'
    + '<h3>' + (grade === "perfect" ? "完美通过" : grade === "pass" ? "顺利通过" : "遭遇挫折") + '</h3>'
    + '<p>' + escHtml(msg) + '<br>答对 ' + gs.correct + ' / ' + n + ' 题</p>'
    + '<div class="st-deltas">'
    + (delta.k ? '<span class="st-delta ' + (delta.k > 0 ? "up" : "down") + '">知识 ' + (delta.k > 0 ? "+" : "") + delta.k + '</span>' : '')
    + (delta.m ? '<span class="st-delta ' + (delta.m > 0 ? "up" : "down") + '">心态 ' + (delta.m > 0 ? "+" : "") + delta.m + '</span>' : '')
    + '</div>';
  if (retryable) {
    h += '<p style="font-size:11px"><b>学霸光环</b>发动：知识储备足够，可以重考这一次。</p>'
      + '<button class="st-btn" style="margin-bottom:8px" onclick="storyRetryGate()">重考本关</button>'
      + '<button class="st-btn ghost" onclick="storyApplyGate()">不重考，继续剧情</button>';
  } else {
    h += '<button class="st-btn" onclick="storyApplyGate()">继续剧情</button>';
  }
  h += '</div>';
  storyRenderShell(h);
}
function storyApplyGate() {
  var pg = _st.pendingGate;
  if (!pg) { storyNext(); return; }
  var s = loadStorySave();
  s.attr.k += pg.delta.k || 0;
  s.attr.m += pg.delta.m || 0;
  storyAttrClamp(s.attr);
  saveStorySave(s);
  _st.pendingGate = null;
  storyNext();
}
function storyRetryGate() {
  var pg = _st.pendingGate;
  if (!pg) return;
  _st.retryUsed[pg.gi] = true;
  if (pg.delta.m < 0) { var s = loadStorySave(); s.attr.m -= pg.delta.m; storyAttrClamp(s.attr); saveStorySave(s); }
  _st.pendingGate = null;
  storyStartGate(pg.gi);
}
// ===== 章节结算 =====
function storyChapterClear() {
  var ci = _st.ch;
  var c = STORY_CH[ci];
  var s = loadStorySave();
  var first = !s.cleared[c.id];
  var rewardTxt = "";
  if (first) {
    s.cleared[c.id] = true;
    s.unlocked = Math.max(s.unlocked, Math.min(STORY_CH.length, ci + 2));
    addPoints(c.clear.pts, "律政人生 · " + c.title);
    rewardTxt = '<div class="st-deltas"><span class="st-delta up">积分 +' + c.clear.pts + '</span>'
      + (c.clear.frag ? '<span class="st-delta up">皮肤碎片 +' + c.clear.frag + '</span>' : '') + '</div>';
    if (c.clear.frag) {
      var p = loadProfile();
      p.skinFragments = (p.skinFragments || 0) + c.clear.frag;
      saveProfile(p);
    }
  }
  var h = '<div class="st-banner g-perfect"><div class="sb-ic">' + stIcon("award", 30) + '</div><h3>' + escHtml(c.title) + ' · 通关</h3>'
    + '<p>' + escHtml(c.clear.text) + '</p>' + rewardTxt;
  if (ci === STORY_CH.length - 1) {
    var e = storyEndingOf(s.attr);
    s.ending = e.lv === "S" ? 3 : e.lv === "A" ? 2 : 1;
    saveStorySave(s);
    playWinChime();
    h += '<button class="st-btn" onclick="renderStoryEnding()">查看你的结局</button>'
      + '<button class="st-btn ghost" style="margin-top:8px" onclick="renderStoryMap()">返回章节地图</button>';
  } else {
    saveStorySave(s);
    playWinChime();
    h += '<button class="st-btn" onclick="storyStartChapter(' + (ci + 1) + ')">进入下一章</button>'
      + '<button class="st-btn ghost" style="margin-top:8px" onclick="renderStoryMap()">返回章节地图</button>';
  }
  h += '</div>';
  storyRenderShell(h);
}
function renderStoryEnding() {
  var s = loadStorySave();
  var e = storyEndingOf(s.attr);
  var theme = e.lv === "S" ? "g-perfect" : e.lv === "A" ? "g-pass" : "g-fail";
  storyRenderShell('<div class="st-banner ' + theme + '"><div class="sb-ic">' + stIcon(e.ic, 30) + '</div>'
    + '<h3>' + e.lv + ' 级结局 · ' + escHtml(e.title) + '</h3>'
    + '<p>' + escHtml(e.text) + '</p>'
    + '<div class="st-deltas"><span class="st-delta up">知识 ' + s.attr.k + '</span><span class="st-delta up">人脉 ' + s.attr.r + '</span><span class="st-delta up">心态 ' + s.attr.m + '</span></div>'
    + '<button class="st-btn" onclick="renderStoryMap()">返回章节地图</button></div>');
}

// ============================================================
// 法律计算器
// ============================================================
var CALC_TYPES = [
  { key: "loan", name: "借贷利息" },
  { key: "labor", name: "劳动补偿" },
  { key: "fee", name: "诉讼费" },
  { key: "sentence", name: "刑期折抵" },
  { key: "limit", name: "诉讼时效" }
];
var _calcCur = "loan";
function showCalc() {
  hideAllViews();
  document.getElementById("calcView").classList.add("show");
  renderCalc();
}
function renderCalc() {
  var h = '<div class="calc-types">';
  for (var i = 0; i < CALC_TYPES.length; i++) {
    h += '<button class="calc-type' + (_calcCur === CALC_TYPES[i].key ? " on" : "") + '" onclick="_calcCur=\'' + CALC_TYPES[i].key + '\';renderCalc()">' + CALC_TYPES[i].name + '</button>';
  }
  h += '</div><div id="calcForm"></div><div id="calcResult"></div>';
  document.querySelector("#calcView .tool-body").innerHTML = h;
  var forms = {
    loan: '<div class="calc-card"><div class="cr-row"><div class="cr-label">借款本金（元）</div><input type="number" id="cLoanP" placeholder="如 100000" /></div><div class="cr-row"><div class="cr-label">年利率（%）</div><input type="number" id="cLoanR" placeholder="如 6" /></div><div class="cr-row"><div class="cr-label">借款天数</div><input type="number" id="cLoanD" placeholder="如 365" /></div><button class="st-btn" onclick="calcLoan()">计算利息</button></div>',
    labor: '<div class="calc-card"><div class="cr-row"><div class="cr-label">离职前 12 个月平均应发工资（元/月）</div><input type="number" id="cLabW" placeholder="如 8000" /></div><div class="cr-row"><div class="cr-label">工作年限</div><input type="number" id="cLabY" placeholder="年，如 3" /></div><div class="cr-row"><div class="cr-label">不足一年部分（月）</div><input type="number" id="cLabM" placeholder="月，如 7（没有填 0）" /></div><button class="st-btn" onclick="calcLabor()">计算经济补偿</button></div>',
    fee: '<div class="calc-card"><div class="cr-row"><div class="cr-label">诉讼标的额（元）</div><input type="number" id="cFeeV" placeholder="如 200000" /></div><div class="cr-row" style="display:flex;align-items:center;gap:8px"><input type="checkbox" id="cFeeS" style="width:16px;height:16px;accent-color:var(--accent)" /><span style="font-size:12px;color:var(--text2)">适用简易程序 / 调解结案（减半收取）</span></div><button class="st-btn" onclick="calcFee()">计算受理费</button></div>',
    sentence: '<div class="calc-card"><div class="cr-row"><div class="cr-label">判决前先行羁押天数</div><input type="number" id="cSenD" placeholder="如 120" /></div><button class="st-btn" onclick="calcSentence()">计算折抵</button></div>',
    limit: '<div class="calc-card"><div class="cr-row"><div class="cr-label">权利受到损害之日（起算日）</div><input type="date" id="cLimD" /></div><div class="cr-row"><div class="cr-label">诉讼时效期间（年）</div><input type="number" id="cLimY" value="3" /></div><button class="st-btn" onclick="calcLimit()">计算到期日</button></div>'
  };
  document.getElementById("calcForm").innerHTML = forms[_calcCur] || "";
  document.getElementById("calcResult").innerHTML = "";
}
function calcShow(rows, main, note) {
  var h = '<div class="calc-res">';
  for (var i = 0; i < rows.length; i++) h += '<div class="cres-row"><span>' + rows[i][0] + '</span><b>' + rows[i][1] + '</b></div>';
  h += (main ? '<div class="cres-row"><span><b>' + main[0] + '</b></span><span class="cres-main">' + main[1] + '</span></div>' : '');
  h += (note ? '<div class="calc-note">' + note + '</div>' : '') + '</div>';
  document.getElementById("calcResult").innerHTML = h;
}
function calcLoan() {
  var P = parseFloat(document.getElementById("cLoanP").value);
  var R = parseFloat(document.getElementById("cLoanR").value);
  var D = parseFloat(document.getElementById("cLoanD").value);
  if (!(P > 0) || !(R >= 0) || !(D > 0)) { showToast("请填写完整的本金、利率与天数"); return; }
  var interest = P * (R / 100) / 365 * D;
  calcShow([["借款本金", P.toFixed(2) + " 元"], ["年利率", R + "%"], ["借款天数", D + " 天"], ["利息（单利）", interest.toFixed(2) + " 元"]], ["本息合计", (P + interest).toFixed(2) + " 元"], "依据民间借贷司法解释，司法保护上限为合同成立时一年期 LPR 的四倍（超过部分法院不予支持）。");
}
function calcLabor() {
  var W = parseFloat(document.getElementById("cLabW").value);
  var Y = parseInt(document.getElementById("cLabY").value) || 0;
  var M = parseInt(document.getElementById("cLabM").value) || 0;
  if (!(W > 0) || Y < 0) { showToast("请填写工资与工作年限"); return; }
  var n = Y + (M >= 6 ? 1 : (M > 0 ? 0.5 : 0));
  if (n <= 0) { showToast("工作年限计算有误"); return; }
  calcShow([["月工资基准", W.toFixed(2) + " 元"], ["工作年限", Y + " 年 " + M + " 个月"], ["折算月数 N", n + " 个月"]], ["经济补偿金（N）", (n * W).toFixed(2) + " 元"], "违法解除为 2N = " + (n * 2 * W).toFixed(2) + " 元；未提前 30 日书面通知解除的，另加 1 个月代通知金（N+1 = " + ((n + 1) * W).toFixed(2) + " 元）。月工资高于当地社平工资三倍的，按三倍封顶且年限最高 12 年。");
}
function calcFee() {
  var V = parseFloat(document.getElementById("cFeeV").value);
  if (!(V > 0)) { showToast("请填写诉讼标的额"); return; }
  var t = [[10000, 0, 50], [100000, 0.025, -200], [200000, 0.02, 300], [500000, 0.015, 1300], [1000000, 0.01, 3800], [2000000, 0.009, 4800], [5000000, 0.008, 6800], [10000000, 0.007, 11800], [20000000, 0.006, 21800], [Infinity, 0.005, 41800]];
  var fee = 0;
  for (var i = 0; i < t.length; i++) {
    if (V <= t[i][0]) { fee = Math.round(V * t[i][1] + t[i][2]); break; }
  }
  var half = document.getElementById("cFeeS") && document.getElementById("cFeeS").checked;
  var final = half ? Math.round(fee / 2) : fee;
  calcShow([["诉讼标的额", V.toFixed(2) + " 元"], ["财产案件受理费（全额）", fee + " 元"]], ["应预交受理费", final + " 元" + (half ? "（已减半）" : "")], "速算公式：不超过 1 万元 50 元；1-10 万 ×2.5%-200；10-20 万 ×2%+300；以此类推。调解结案或撤诉减半。");
}
function calcSentence() {
  var D = parseFloat(document.getElementById("cSenD").value);
  if (!(D > 0)) { showToast("请填写羁押天数"); return; }
  calcShow([["先行羁押", D + " 日"], ["判处管制的，折抵刑期", (D * 2) + " 日"], ["判处拘役或有期徒刑的，折抵刑期", D + " 日"]], null, "依据刑法第 41 条、第 44 条、第 47 条：判决执行以前先行羁押的，羁押一日折抵管制二日，折抵拘役、有期徒刑一日。");
}
function calcLimit() {
  var D = document.getElementById("cLimD").value;
  var Y = parseFloat(document.getElementById("cLimY").value) || 3;
  if (!D) { showToast("请选择起算日期"); return; }
  var start = new Date(D);
  var due = new Date(start);
  due.setFullYear(due.getFullYear() + Y);
  var today = new Date();
  var left = Math.ceil((due - today) / 86400000);
  calcShow([["起算之日", D], ["时效期间", Y + " 年"], ["到期之日", due.getFullYear() + "-" + ("0" + (due.getMonth() + 1)).slice(-2) + "-" + ("0" + due.getDate()).slice(-2)]], [left >= 0 ? "距离届满还有" : "已超过", Math.abs(left) + " 天"], "依据民法典第 188 条，普通诉讼时效期间为三年，自权利人知道或者应当知道权利受到损害以及义务人之日起计算。");

}

// ============================================================
// 法条记忆闪卡（艾宾浩斯间隔复习）
// ============================================================
var FLASH_KEY = "seawhy-lex-flash";
var FLASH_CARDS = [
  { id: "m1", cat: "民法", no: "民法典第 2 条", hint: "民法的调整对象", text: "民法调整平等主体的自然人、法人和非法人组织之间的人身关系和财产关系。" },
  { id: "m2", cat: "民法", no: "民法典第 13 条", hint: "自然人民事权利能力的起止", text: "自然人从出生时起到死亡时止，具有民事权利能力，依法享有民事权利，承担民事义务。" },
  { id: "m3", cat: "民法", no: "民法典第 17 条", hint: "完全民事行为能力人的年龄", text: "十八周岁以上的自然人为成年人。成年人为完全民事行为能力人，可以独立实施民事法律行为。" },
  { id: "m4", cat: "民法", no: "民法典第 19 条", hint: "八周岁以上未成年人的行为能力", text: "八周岁以上的未成年人为限制民事行为能力人，实施民事法律行为由其法定代理人代理或者经其法定代理人同意、追认；但是，可以独立实施纯获利益的民事法律行为或者与其年龄、智力相适应的民事法律行为。" },
  { id: "m5", cat: "民法", no: "民法典第 20 条", hint: "不满八周岁的行为能力", text: "不满八周岁的未成年人为无民事行为能力人，由其法定代理人代理实施民事法律行为。" },
  { id: "m6", cat: "民法", no: "民法典第 26 条", hint: "父母子女之间的义务", text: "父母对未成年子女负有抚养、教育和保护的义务。成年子女对父母负有赡养、扶助和保护的义务。" },
  { id: "m7", cat: "民法", no: "民法典第 27 条", hint: "未成年人的第一顺位监护人", text: "父母是未成年子女的监护人。未成年人的父母已经死亡或者没有监护能力的，由祖父母、外祖父母，兄、姐等按顺序担任监护人。" },
  { id: "m8", cat: "民法", no: "民法典第 143 条", hint: "民事法律行为有效的三个条件", text: "具备下列条件的民事法律行为有效：（一）行为人具有相应的民事行为能力；（二）意思表示真实；（三）不违反法律、行政法规的强制性规定，不违背公序良俗。" },
  { id: "m9", cat: "民法", no: "民法典第 188 条", hint: "普通诉讼时效期间", text: "向人民法院请求保护民事权利的诉讼时效期间为三年。诉讼时效期间自权利人知道或者应当知道权利受到损害以及义务人之日起计算。" },
  { id: "m10", cat: "民法", no: "民法典第 16 条", hint: "胎儿的民事权利能力", text: "涉及遗产继承、接受赠与等胎儿利益保护的，胎儿视为具有民事权利能力。但是胎儿娩出时为死体的，其民事权利能力自始不存在。" },
  { id: "m11", cat: "民法", no: "民法典第 184 条", hint: "紧急救助致受助人受损", text: "因自愿实施紧急救助行为造成受助人损害的，救助人不承担民事责任。" },
  { id: "m12", cat: "民法", no: "民法典第 181 条", hint: "民法上的正当防卫", text: "因正当防卫造成损害的，不承担民事责任。正当防卫超过必要的限度，造成不应有的损害的，正当防卫人应当承担适当的民事责任。" },
  { id: "m13", cat: "民法", no: "民法典第 1165 条", hint: "侵权责任的一般归责原则", text: "行为人因过错侵害他人民事权益造成损害的，应当承担侵权责任。法律规定推定行为人有过错，其不能证明自己没有过错的，应当承担侵权责任。" },
  { id: "m14", cat: "民法", no: "民法典第 1176 条", hint: "自甘风险规则", text: "自愿参加具有一定风险的文体活动，因其他参加者的行为受到损害的，受害人不得请求其他参加者承担侵权责任；但是，其他参加者对损害的发生有故意或者重大过失的除外。" },
  { id: "m15", cat: "民法", no: "民法典第 1254 条", hint: "高空抛物的责任", text: "禁止从建筑物中抛掷物品。从建筑物中抛掷物品或者从建筑物上坠落的物品造成他人损害的，由侵权人依法承担侵权责任；经调查难以确定具体侵权人的，除能够证明自己不是侵权人的外，由可能加害的建筑物使用人给予补偿。" },
  { id: "m16", cat: "民法", no: "民法典第 577 条", hint: "违约责任的方式", text: "当事人一方不履行合同义务或者履行合同义务不符合约定的，应当承担继续履行、采取补救措施或者赔偿损失等违约责任。" },
  { id: "m17", cat: "民法", no: "民法典第 585 条", hint: "违约金过高或过低的调整", text: "约定的违约金低于造成的损失的，人民法院或者仲裁机构可以根据当事人的请求予以增加；约定的违约金过分高于造成的损失的，可以请求适当予以减少。" },
  { id: "m18", cat: "民法", no: "民法典第 563 条", hint: "法定解除权情形之一", text: "因不可抗力致使不能实现合同目的；在履行期限届满前，当事人一方明确表示或者以自己的行为表明不履行主要债务等情形，当事人可以解除合同。" },
  { id: "c1", cat: "刑法", no: "刑法第 13 条", hint: "犯罪概念与但书", text: "一切危害社会的行为，依照法律应当受刑罚处罚的，都是犯罪，但是情节显著轻微危害不大的，不认为是犯罪。" },
  { id: "c2", cat: "刑法", no: "刑法第 14 条", hint: "故意犯罪的定义", text: "明知自己的行为会发生危害社会的结果，并且希望或者放任这种结果发生，因而构成犯罪的，是故意犯罪。故意犯罪，应当负刑事责任。" },
  { id: "c3", cat: "刑法", no: "刑法第 15 条", hint: "过失犯罪的定义", text: "应当预见自己的行为可能发生危害社会的结果，因为疏忽大意而没有预见，或者已经预见而轻信能够避免，以致发生这种结果的，是过失犯罪。过失犯罪，法律有规定的才负刑事责任。" },
  { id: "c4", cat: "刑法", no: "刑法第 17 条", hint: "刑事责任年龄（修正案十一）", text: "已满十六周岁的人犯罪，应当负刑事责任。已满十四周岁不满十六周岁的人，犯故意杀人、故意伤害致人重伤或者死亡、强奸、抢劫、贩卖毒品、放火、爆炸、投放危险物质罪的，应当负刑事责任。已满十二周岁不满十四周岁的人，犯故意杀人、故意伤害罪，致人死亡或者以特别残忍手段致人重伤造成严重残疾，情节恶劣，经最高人民检察院核准追诉的，应当负刑事责任。" },
  { id: "c5", cat: "刑法", no: "刑法第 18 条", hint: "精神病人的刑事责任", text: "精神病人在不能辨认或者不能控制自己行为的时候造成危害结果，经法定程序鉴定确认的，不负刑事责任，但是应当责令他的家属或者监护人严加看管和医疗；在必要的时候，由政府强制医疗。间歇性的精神病人在精神正常的时候犯罪，应当负刑事责任。" },
  { id: "c6", cat: "刑法", no: "刑法第 20 条", hint: "正当防卫的构成", text: "为了使国家、公共利益、本人或者他人的人身、财产和其他权利免受正在进行的不法侵害，而采取的制止不法侵害的行为，对不法侵害人造成损害的，属于正当防卫，不负刑事责任。防卫明显超过必要限度造成重大损害的，应当负刑事责任，但是应当减轻或者免除处罚。" },
  { id: "c7", cat: "刑法", no: "刑法第 20 条第 3 款", hint: "特殊防卫（无限防卫权）", text: "对正在进行行凶、杀人、抢劫、强奸、绑架以及其他严重危及人身安全的暴力犯罪，采取防卫行为，造成不法侵害人伤亡的，不属于防卫过当，不负刑事责任。" },
  { id: "c8", cat: "刑法", no: "刑法第 21 条", hint: "紧急避险", text: "为了使国家、公共利益、本人或者他人的人身、财产和其他权利免受正在发生的危险，不得已采取的紧急避险行为，造成损害的，不负刑事责任。紧急避险超过必要限度造成不应有的损害的，应当负刑事责任，但是应当减轻或者免除处罚。" },
  { id: "c9", cat: "刑法", no: "刑法第 23 条", hint: "犯罪未遂的处罚原则", text: "已经着手实行犯罪，由于犯罪分子意志以外的原因而未得逞的，是犯罪未遂。对于未遂犯，可以比照既遂犯从轻或者减轻处罚。" },
  { id: "c10", cat: "刑法", no: "刑法第 25 条", hint: "共同犯罪的定义", text: "共同犯罪是指二人以上共同故意犯罪。二人以上共同过失犯罪，不以共同犯罪论处；应当负刑事责任的，按照他们所犯的罪分别处罚。" },
  { id: "c11", cat: "刑法", no: "刑法第 65 条", hint: "一般累犯的构成", text: "被判处有期徒刑以上刑罚的犯罪分子，刑罚执行完毕或者赦免以后，在五年以内再犯应当判处有期徒刑以上刑罚之罪的，是累犯，应当从重处罚，但是过失犯罪和不满十八周岁的人犯罪的除外。" },
  { id: "c12", cat: "刑法", no: "刑法第 67 条", hint: "自首的处罚原则", text: "犯罪以后自动投案，如实供述自己的罪行的，是自首。对于自首的犯罪分子，可以从轻或者减轻处罚。其中，犯罪较轻的，可以免除处罚。" },
  { id: "x1", cat: "宪法", no: "宪法第 1 条", hint: "我国的国体", text: "中华人民共和国是工人阶级领导的、以工农联盟为基础的人民民主专政的社会主义国家。社会主义制度是中华人民共和国的根本制度。" },
  { id: "x2", cat: "宪法", no: "宪法第 2 条", hint: "权力属于人民", text: "中华人民共和国的一切权力属于人民。人民行使国家权力的机关是全国人民代表大会和地方各级人民代表大会。" },
  { id: "x3", cat: "宪法", no: "宪法第 33 条", hint: "平等权与人权条款", text: "中华人民共和国公民在法律面前一律平等。国家尊重和保障人权。任何公民享有宪法和法律规定的权利，同时必须履行宪法和法律规定的义务。" },
  { id: "x4", cat: "宪法", no: "宪法第 34 条", hint: "选举权与被选举权", text: "中华人民共和国年满十八周岁的公民，不分民族、种族、性别、职业、家庭出身、宗教信仰、教育程度、财产状况、居住期限，都有选举权和被选举权；但是依照法律被剥夺政治权利的人除外。" },
  { id: "x5", cat: "宪法", no: "宪法第 35 条", hint: "六大政治自由", text: "中华人民共和国公民有言论、出版、集会、结社、游行、示威的自由。" },
  { id: "x6", cat: "宪法", no: "宪法第 37 条", hint: "人身自由", text: "中华人民共和国公民的人身自由不受侵犯。任何公民，非经人民检察院批准或者决定或者人民法院决定，并由公安机关执行，不受逮捕。禁止非法拘禁和以其他方法非法剥夺或者限制公民的人身自由。" },
  { id: "x7", cat: "宪法", no: "宪法第 38 条", hint: "人格尊严", text: "中华人民共和国公民的人格尊严不受侵犯。禁止用任何方法对公民进行侮辱、诽谤和诬告陷害。" },
  { id: "x8", cat: "宪法", no: "宪法第 40 条", hint: "通信自由与通信秘密", text: "中华人民共和国公民的通信自由和通信秘密受法律的保护。除因国家安全或者追查刑事犯罪的需要，由公安机关或者检察机关依照法律规定的程序对通信进行检查外，任何组织或者个人不得以任何理由侵犯公民的通信自由和通信秘密。" },
  { id: "x9", cat: "宪法", no: "宪法第 42 条", hint: "劳动的权利与义务", text: "中华人民共和国公民有劳动的权利和义务。国家通过各种途径，创造劳动就业条件，加强劳动保护，改善劳动条件，并在发展生产的基础上，提高劳动报酬和福利待遇。" },
  { id: "x10", cat: "宪法", no: "宪法第 46 条", hint: "受教育的权利与义务", text: "中华人民共和国公民有受教育的权利和义务。国家培养青年、少年、儿童在品德、智力、体质等方面全面发展。" },
  { id: "x11", cat: "宪法", no: "宪法第 51 条", hint: "行使自由和权利的界限", text: "中华人民共和国公民在行使自由和权利的时候，不得损害国家的、社会的、集体的利益和其他公民的合法的自由和权利。" },
  { id: "x12", cat: "宪法", no: "宪法第 57 条", hint: "最高国家权力机关", text: "中华人民共和国全国人民代表大会是最高国家权力机关。它的常设机关是全国人民代表大会常务委员会。" }
];
function loadFlashProg() {
  try { var s = JSON.parse(localStorage.getItem(FLASH_KEY) || "null"); if (s && s.prog) return s; } catch(e) {}
  return { prog: {} };
}
function saveFlashProg(s) { try { localStorage.setItem(FLASH_KEY, JSON.stringify(s)); } catch(e) {} }
function todayFlashStr() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function showFlash() {
  hideAllViews();
  document.getElementById("flashView").classList.add("show");
  renderFlashHome();
}
function renderFlashHome() {
  var s = loadFlashProg();
  var today = todayFlashStr();
  var due = [], learned = 0;
  for (var i = 0; i < FLASH_CARDS.length; i++) {
    var c = FLASH_CARDS[i];
    var pr = s.prog[c.id];
    if (pr && pr.due) { learned++; if (pr.due <= today) due.push(c); }
    else due.push(c);
  }
  var h = '<div class="flash-stats">'
    + '<div class="fs-box"><div class="fs-num">' + FLASH_CARDS.length + '</div><div class="fs-lab">卡牌总数</div></div>'
    + '<div class="fs-box"><div class="fs-num">' + learned + '</div><div class="fs-lab">已学</div></div>'
    + '<div class="fs-box"><div class="fs-num" style="color:var(--accent)">' + due.length + '</div><div class="fs-lab">今日待复习</div></div>'
    + '</div>';
  if (!due.length) {
    h += '<div class="st-banner g-pass"><div class="sb-ic">' + stIcon("checkc", 30) + '</div><h3>今日已全部复习完毕</h3><p>按照记忆曲线，明天再来复习吧。坚持闪卡，法条刻进脑子。</p><button class="st-btn" onclick="renderFlashHome()">刷新</button></div>';
  } else {
    h += '<div class="fl-card" id="flCard" onclick="flashReveal()"></div><div class="fl-btns" id="flBtns" style="display:none">'
      + '<button class="fl-btn no" onclick="flashGrade(0)">不认识</button>'
      + '<button class="fl-btn mid" onclick="flashGrade(1)">模糊</button>'
      + '<button class="fl-btn yes" onclick="flashGrade(2)">记住了</button>'
      + '</div>';
  }
  document.getElementById("flashBody").innerHTML = h;
  if (due.length) {
    _flCard = due[0];
    renderFlashFace(_flCard, false);
  }
}
var _flCard = null, _flShown = false;
function renderFlashFace(card, shown) {
  var el = document.getElementById("flCard");
  if (!el) return;
  _flShown = shown;
  var h = '<div class="fl-no">' + escHtml(card.no) + '</div><div class="fl-hint">' + escHtml(card.hint) + '</div>';
  if (shown) h += '<div class="fl-text">' + escHtml(card.text) + '</div><div class="fl-tap">点击卡片可收起</div>';
  else h += '<div class="fl-tap">点击卡片查看法条原文</div>';
  el.innerHTML = h;
  var btns = document.getElementById("flBtns");
  if (btns) btns.style.display = shown ? "flex" : "none";
}
function flashReveal() { if (_flCard) renderFlashFace(_flCard, !_flShown); }
function flashGrade(g) {
  if (!_flCard) return;
  var s = loadFlashProg();
  var pr = s.prog[_flCard.id] || { ivl: 0 };
  if (g === 0) pr.ivl = 1;
  else if (g === 1) pr.ivl = Math.max(1, Math.round(pr.ivl * 1.2));
  else pr.ivl = Math.max(1, Math.round((pr.ivl || 1) * 2.3));
  var d = new Date();
  d.setDate(d.getDate() + pr.ivl);
  pr.due = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  s.prog[_flCard.id] = pr;
  saveFlashProg(s);
  showToast(g === 2 ? "记住了，" + pr.ivl + " 天后再见" : g === 1 ? "有点模糊，明天再来" : "明天重点复习这张");
  renderFlashHome();
}

// ============================================================
// 法考倒计时
// ============================================================
var COUNTDOWN_KEY = "seawhy-lex-countdown";
function getExamDate() {
  try {
    var d = JSON.parse(localStorage.getItem(COUNTDOWN_KEY) || "null");
    if (d && d.date) return d.date;
  } catch(e) {}
  var now = new Date();
  var y = now.getFullYear();
  var exam = new Date(y, 8, 20); // 9 月 20 日（客观题通常在 9 月第三个周末附近）
  if (exam < now) exam = new Date(y + 1, 8, 20);
  return exam.getFullYear() + "-" + ("0" + (exam.getMonth() + 1)).slice(-2) + "-" + ("0" + exam.getDate()).slice(-2);
}
function renderExamCd() {
  var el = document.getElementById("examCd");
  if (!el) return;
  var dstr = getExamDate();
  var due = new Date(dstr + "T09:00:00");
  var left = Math.ceil((due - new Date()) / 86400000);
  el.innerHTML = '<div class="ecd-ic">' + stIcon("hourglass", 20) + '</div>'
    + '<div class="ecd-main"><div class="ecd-num">' + Math.max(0, left) + ' 天</div><div class="ecd-lab">距法考客观题（' + dstr + '）· 点击修改日期</div></div>';
}
function editExamDate() {
  var dstr = getExamDate();
  var ov = document.createElement("div");
  ov.id = "examDateOvl";
  ov.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:900;display:flex;align-items:center;justify-content:center";
  ov.innerHTML = '<div style="background:var(--card-bg);border-radius:16px;padding:20px;width:300px;max-width:88vw">'
    + '<div style="font-size:15px;font-weight:800;color:var(--text);margin-bottom:12px">设置法考日期</div>'
    + '<input type="date" id="examDateInput" value="' + dstr + '" style="width:100%;padding:10px;border:1.5px solid var(--card-border);border-radius:10px;background:var(--input-bg);color:var(--text);font-family:inherit;margin-bottom:14px;box-sizing:border-box" />'
    + '<div style="display:flex;gap:8px"><button id="examDateOk" style="flex:1;padding:10px;border:none;border-radius:10px;background:var(--accent);color:#fff;font-size:13px;font-weight:700;font-family:inherit">保存</button>'
    + '<button id="examDateNo" style="flex:1;padding:10px;border:1px solid var(--card-border);border-radius:10px;background:var(--input-bg);color:var(--text);font-size:13px;font-family:inherit">取消</button></div></div>';
  document.body.appendChild(ov);
  ov.querySelector("#examDateOk").onclick = function() {
    var v = ov.querySelector("#examDateInput").value;
    if (v) { try { localStorage.setItem(COUNTDOWN_KEY, JSON.stringify({ date: v })); } catch(e) {} }
    ov.remove();
    renderExamCd();
    showToast("法考日期已更新");
  };
  ov.querySelector("#examDateNo").onclick = function() { ov.remove(); };
}

// ============================================================
// AI 通用助手
// ============================================================
function aiComplete(system, user, cb) {
  var cfg = {};
  try { cfg = JSON.parse(localStorage.getItem("seawhy-lex-config") || "{}"); } catch(e) {}
  var key = SETTINGS.apiKey || sessionStorage.getItem("seawhy-lex-api-key");
  if (!key) { cb("未配置 AI API Key。请到「AI 咨询」的设置中完成配置后重试。"); return; }
  fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
    body: JSON.stringify({ model: cfg.model || "deepseek-chat", messages: [{ role: "system", content: system }, { role: "user", content: user }], stream: false, temperature: 0.4, max_tokens: 2500 })
  }).then(function(r) {
    if (!r.ok) return r.text().then(function(t) { throw new Error("API " + r.status + ": " + t.slice(0, 200)); });
    return r.json();
  }).then(function(j) { cb(null, j.choices[0].message.content); })
    .catch(function(e) { cb(e.message || "AI 调用失败"); });
}
function aiOverlay(title) {
  var ov = document.createElement("div");
  ov.id = "aiResultOvl";
  ov.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:900;display:flex;align-items:center;justify-content:center;padding:18px";
  ov.innerHTML = '<div style="background:var(--card-bg);border-radius:18px;padding:18px 16px;max-width:420px;width:100%;max-height:82vh;display:flex;flex-direction:column">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><div style="font-size:15px;font-weight:800;color:var(--text)">' + escHtml(title) + '</div><button class="ai-ovl-close" style="border:none;background:var(--input-bg);color:var(--text2);border-radius:8px;width:26px;height:26px;cursor:pointer">✕</button></div>'
    + '<div class="ai-text" style="flex:1;overflow-y:auto;font-size:13px;line-height:1.9;color:var(--text);white-space:pre-wrap">AI 正在思考中……</div>'
    + '</div>';
  document.body.appendChild(ov);
  ov.querySelector(".ai-ovl-close").onclick = function() { ov.remove(); };
  return ov;
}

// AI 薄弱点诊断
function showAiDiag() {
  var wb = wrongBook || [];
  if (!wb.length) { showToast("错题本还是空的，先去做几组题再来诊断"); return; }
  var bySub = {};
  for (var i = 0; i < wb.length; i++) {
    var sub = wb[i]._subject || "未分类";
    if (!bySub[sub]) bySub[sub] = [];
    bySub[sub].push((wb[i].q || "").slice(0, 60));
  }
  var statLines = [];
  for (var k in bySub) statLines.push("- " + k + "：" + bySub[k].length + " 道错题");
  var sample = [];
  var subs = Object.keys(bySub);
  for (var j = 0; j < subs.length; j++) {
    sample.push("【" + subs[j] + "】错题示例：" + bySub[subs[j]].slice(0, 3).join(" / "));
  }
  var ov = aiOverlay("AI 薄弱点诊断");
  var user = "我是备考法考的学生。以下是我的错题本统计：\n" + statLines.join("\n") + "\n\n" + sample.join("\n") + "\n\n请作为法考教练输出诊断报告，包含：1. 薄弱科目排序及理由；2. 每个薄弱科目最需要补的知识点方向；3. 未来一周的复习建议。全中文，400 字以内，直接给结论，不要客套。";
  aiComplete("你是资深法考辅导教练，擅长根据错题数据精准诊断薄弱点并给出可执行的复习建议。语气专业直接。", user, function(err, text) {
    var box = ov.querySelector(".ai-text");
    if (!box) return;
    box.textContent = err ? ("诊断失败：" + err) : text;
  });
}

// AI 智能出题
function startAiQuizSetup() {
  var subs = ["全科混合"];
  for (var k in QUIZ_DATA) if (QUIZ_DATA.hasOwnProperty(k) && QUIZ_DATA[k].length) subs.push(k);
  var ov = document.createElement("div");
  ov.id = "aiQuizOvl";
  ov.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:900;display:flex;align-items:center;justify-content:center;padding:18px";
  var subBtns = "";
  for (var i = 0; i < subs.length; i++) subBtns += '<button class="aiq-sub' + (i === 0 ? " on" : "") + '" data-v="' + escAttr(subs[i]) + '">' + escHtml(subs[i]) + '</button>';
  ov.innerHTML = '<div style="background:var(--card-bg);border-radius:18px;padding:18px 16px;max-width:420px;width:100%;max-height:82vh;overflow-y:auto">'
    + '<div style="font-size:15px;font-weight:800;color:var(--text);margin-bottom:12px">AI 智能出题</div>'
    + '<div class="sf-label" style="margin-bottom:6px">题目范围</div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">' + subBtns + '</div>'
    + '<div class="sf-label" style="margin-bottom:6px">难度</div><div style="display:flex;gap:6px;margin-bottom:12px">'
    + '<button class="aiq-diff on" data-v="1" style="flex:1;padding:7px 0">基础</button><button class="aiq-diff" data-v="2" style="flex:1;padding:7px 0">进阶</button><button class="aiq-diff" data-v="3" style="flex:1;padding:7px 0">法考实战</button></div>'
    + '<div class="sf-label" style="margin-bottom:6px">数量</div><div style="display:flex;gap:6px;margin-bottom:16px">'
    + '<button class="aiq-n" data-v="3">3 题</button><button class="aiq-n on" data-v="5">5 题</button><button class="aiq-n" data-v="8">8 题</button></div>'
    + '<button id="aiqGo" class="st-btn" style="margin-bottom:8px">生成并开始作答</button>'
    + '<button class="st-btn ghost" onclick="document.getElementById(\'aiQuizOvl\').remove()">取消</button>'
    + '<div style="font-size:10px;color:var(--text2);margin-top:10px;line-height:1.6">题目由 AI 生成，仅供练习参考；答错的题同样进入错题本。需要已配置 AI API。</div></div>';
  document.body.appendChild(ov);
  var state = { sub: subs[0], diff: 1, n: 5 };
  ov.querySelectorAll(".aiq-sub").forEach(function(b) {
    b.style.cssText = "border:1.5px solid var(--card-border);background:var(--input-bg);color:var(--text2);border-radius:9px;padding:6px 10px;font-size:11.5px;cursor:pointer;font-family:inherit" + (b.classList.contains("on") ? ";border-color:var(--accent);color:var(--accent);font-weight:700" : "");
    b.onclick = function() { ov.querySelectorAll(".aiq-sub").forEach(function(x) { x.classList.remove("on"); x.style.borderColor = ""; x.style.color = ""; }); b.classList.add("on"); b.style.borderColor = "var(--accent)"; b.style.color = "var(--accent)"; state.sub = b.getAttribute("data-v"); };
  });
  ov.querySelectorAll(".aiq-diff").forEach(function(b) {
    b.style.cssText = "border:1.5px solid var(--card-border);background:var(--input-bg);color:var(--text2);border-radius:9px;cursor:pointer;font-family:inherit" + (b.classList.contains("on") ? ";border-color:var(--accent);color:var(--accent);font-weight:700" : "");
    b.onclick = function() { ov.querySelectorAll(".aiq-diff").forEach(function(x) { x.classList.remove("on"); x.style.borderColor = ""; x.style.color = ""; }); b.classList.add("on"); b.style.borderColor = "var(--accent)"; b.style.color = "var(--accent)"; state.diff = +b.getAttribute("data-v"); };
  });
  ov.querySelectorAll(".aiq-n").forEach(function(b) {
    b.style.cssText = "flex:1;border:1.5px solid var(--card-border);background:var(--input-bg);color:var(--text2);border-radius:9px;padding:7px 0;cursor:pointer;font-family:inherit" + (b.classList.contains("on") ? ";border-color:var(--accent);color:var(--accent);font-weight:700" : "");
    b.onclick = function() { ov.querySelectorAll(".aiq-n").forEach(function(x) { x.classList.remove("on"); x.style.borderColor = ""; x.style.color = ""; }); b.classList.add("on"); b.style.borderColor = "var(--accent)"; b.style.color = "var(--accent)"; state.n = +b.getAttribute("data-v"); };
  });
  ov.querySelector("#aiqGo").onclick = function() {
    var btn = this;
    btn.disabled = true; btn.textContent = "AI 正在命题……";
    var diffName = state.diff === 3 ? "法考实战难度" : state.diff === 2 ? "中等难度" : "基础难度";
    var sys = "你是法考命题专家。只输出一个 JSON 数组，不要输出任何解释、不要代码块标记。";
    var user = "请围绕「" + state.sub + "」命制 " + state.n + " 道" + diffName + "的选择题。要求：题干严谨、四个选项、只有一个正确答案、附简短解析。输出 JSON 数组格式：[{\"q\":\"题干\",\"opts\":[\"A\",\"B\",\"C\",\"D\"],\"ans\":0,\"exp\":\"解析\",\"multi\":false}]，其中 ans 是正确选项的下标（从 0 开始）。";
    aiComplete(sys, user, function(err, text) {
      if (err) { btn.disabled = false; btn.textContent = "生成并开始作答"; showToast("生成失败：" + err.slice(0, 60)); return; }
      var clean = text.replace(/```json|```/g, "").trim();
      var mStart = clean.indexOf("["), mEnd = clean.lastIndexOf("]");
      if (mStart < 0 || mEnd < 0) { btn.disabled = false; btn.textContent = "生成并开始作答"; showToast("AI 返回格式异常，请重试"); return; }
      var qs;
      try { qs = JSON.parse(clean.slice(mStart, mEnd + 1)); } catch(e2) { btn.disabled = false; btn.textContent = "生成并开始作答"; showToast("解析失败，请重试"); return; }
      var ok = [];
      for (var i = 0; i < qs.length && ok.length < state.n; i++) {
        var q = qs[i];
        if (!q || !q.q || !Array.isArray(q.opts) || q.opts.length < 2) continue;
        if (typeof q.ans !== "number" || q.ans < 0 || q.ans >= q.opts.length) continue;
        ok.push({ q: q.q, opts: q.opts, ans: q.ans, exp: q.exp || "", multi: !!q.multi, diff: state.diff, _subject: "AI 出题" });
      }
      if (!ok.length) { btn.disabled = false; btn.textContent = "生成并开始作答"; showToast("生成的题目无效，请重试"); return; }
      ov.remove();
      playAiQuiz(ok);
    });
  };
}
function playAiQuiz(qs) {
  hideAllViews();
  document.getElementById("quizView").classList.add("show");
  stopExamTimer();
  QUIZ_STATE.mode = "practice";
  QUIZ_STATE.questions = qs;
  QUIZ_STATE.answers = {};
  QUIZ_STATE.answered = {};
  QUIZ_STATE.correct = {};
  QUIZ_STATE.currentIndex = 0;
  QUIZ_STATE.subject = "AI 出题";
  QUIZ_STATE.subjectHasChapters = false;
  QUIZ_STATE._examSubmitted = false;
  setQuizScreen("quiz");
  document.getElementById("quizPlayTitle").textContent = "AI 智能出题";
  document.getElementById("quizSubtitle").textContent = "AI 生成 · " + qs.length + " 题 · 答错自动进错题本";
  var t = document.getElementById("quizTimer");
  if (t) t.style.display = "none";
  renderQuizStats();
  renderQuizPage();
}

// ============================================================
// 辩论陪练
// ============================================================
var DEB_TOPICS = [
  { key: "fangwei", name: "正当防卫之辩", field: "刑法", caseText: "张三之母长期遭受李四等四人侮辱、拘禁。某晚李四等人再次闯入张三家中实施不法侵害，张三持刀反抗，致一人重伤、一人死亡。", sides: ["辩方立场：张三构成正当防卫，不负刑事责任", "控方立场：张三防卫明显过当，构成故意伤害罪"] },
  { key: "gaokong", name: "高空抛物之辩", field: "侵权责任", caseText: "某小区一行人被高空坠物砸伤，经调查无法确定具体侵权人。物业主张已尽管理义务，监控也无法锁定抛物楼层。", sides: ["原告方：物业与可能加害的建筑物使用人应承担赔偿责任", "被告方：物业已尽安全保障义务，不应担责"] },
  { key: "weiyue", name: "违约金之辩", field: "合同法", caseText: "合同约定违约金为合同价款的 30%，违约方违约给守约方造成的实际损失仅为价款的 8%。守约方起诉主张全额违约金。", sides: ["守约方：违约金是双方真实意思表示，应全额支持", "违约方：违约金过分高于实际损失，应依法调减"] }
];
var _deb = null;
function showDebate() {
  hideAllViews();
  document.getElementById("debateView").classList.add("show");
  var h = '<div style="text-align:center;padding:6px 0 14px"><div style="font-size:15px;font-weight:800;color:var(--text)">模拟法庭 · 辩论陪练</div><div style="font-size:11px;color:var(--text2);margin-top:4px">选择一个案例，AI 将扮演你的对手律师</div></div>';
  for (var i = 0; i < DEB_TOPICS.length; i++) {
    var t = DEB_TOPICS[i];
    h += '<div class="deb-topic" onclick="startDebate(' + i + ')"><div class="dt-name">' + escHtml(t.name) + '</div><div class="dt-field">' + escHtml(t.field) + '</div><div class="dt-case">' + escHtml(t.caseText.slice(0, 60)) + '……</div></div>';
  }
  h += '<div class="pm-note" style="margin-top:8px">需要已配置 AI API。你将扮演一方，AI 扮演对手律师，共 3 轮对抗。</div>';
  document.getElementById("debateBody").innerHTML = h;
}
function startDebate(ti) {
  var t = DEB_TOPICS[ti];
  _deb = { topic: t, round: 0, mySide: t.sides[0], aiSide: t.sides[1], log: [] };
  renderDebate();
  debAiTurn("请发表开篇立论。");
}
function renderDebate() {
  var t = _deb.topic;
  var h = '<div class="deb-case"><div class="dt-name">' + escHtml(t.name) + '</div><div class="dt-case">' + escHtml(t.caseText) + '</div><div class="deb-side">你方：' + escHtml(_deb.mySide) + '</div></div><div class="deb-log" id="debLog">';
  for (var i = 0; i < _deb.log.length; i++) {
    var m = _deb.log[i];
    h += '<div class="deb-msg ' + m.who + '"><div class="deb-who">' + (m.who === "ai" ? escHtml(_deb.aiSide.split("：")[0]) + "（AI）" : "你") + '</div><div class="deb-text">' + escHtml(m.text) + '</div></div>';
  }
  if (_deb.thinking) h += '<div class="deb-msg ai"><div class="deb-who">AI</div><div class="deb-text">思考中……</div></div>';
  h += '</div>';
  if (_deb.round >= 3) {
    h += '<button class="st-btn" onclick="debEval()">请求 AI 点评</button><button class="st-btn ghost" style="margin-top:8px" onclick="showDebate()">换一个案例</button>';
  } else {
    h += '<div class="deb-input"><input type="text" id="debInput" placeholder="发表你的观点……" /><button onclick="debSend()">发送</button></div>';
    h += '<div style="text-align:center;font-size:10px;color:var(--text2);margin-top:6px">剩余对抗轮数：' + (3 - _deb.round) + '</div>';
  }
  var body = document.getElementById("debateBody");
  body.innerHTML = h;
  body.scrollTop = body.scrollHeight;
  var inp = document.getElementById("debInput");
  if (inp) inp.onkeydown = function(e) { if (e.key === "Enter") debSend(); };
}
function debSend() {
  var inp = document.getElementById("debInput");
  var v = inp ? inp.value.trim() : "";
  if (!v) { showToast("先输入你的观点"); return; }
  _deb.log.push({ who: "me", text: v });
  _deb.round++;
  renderDebate();
  debAiTurn(v);
}
function debAiTurn(userArg) {
  _deb.thinking = true;
  renderDebate();
  var sys = "你是模拟法庭对抗训练中的对方律师（资深出庭律师）。案例：" + _deb.topic.caseText + "。你的立场：" + _deb.aiSide + "。对方（用户）的立场：" + _deb.mySide + "。规则：每轮回应不超过 150 字；从事实、法律适用、逻辑三个层面反驳对方；语气专业、克制但锋利；不要复述案例。当前是第 " + (_deb.round) + " 轮对抗。";
  var user = userArg ? ("对方观点：" + userArg + "\n请反驳。") : "请发表开篇立论。";
  aiComplete(sys, user, function(err, text) {
    _deb.thinking = false;
    if (err) text = "（AI 出错：" + err + "）";
    _deb.log.push({ who: "ai", text: text });
    renderDebate();
  });
}
function debEval() {
  var ov = aiOverlay("AI 辩论点评");
  var transcript = _deb.log.map(function(m) { return (m.who === "ai" ? "对手律师" : "你") + "：" + m.text; }).join("\n\n");
  aiComplete("你是模拟法庭的评委。根据以下辩论记录，从法律适用、论证逻辑、表达三个维度点评用户的表现，给出 1-10 分的评分与改进建议。全中文 300 字以内，直接给结论。", "案例：" + _deb.topic.caseText + "\n\n辩论记录：\n" + transcript, function(err, text) {
    var box = ov.querySelector(".ai-text");
    if (box) box.textContent = err ? ("点评失败：" + err) : text;
  });
}

// ============================================================
// 法学家卡片收集
// ============================================================
var JURISTS = [
  { key: "wangzejian", name: "王泽鉴", field: "民法学", era: "当代", desc: "民法教义学与判例研究的集大成者，著《民法学说与判例研究》，深刻影响两岸民法教义学。" },
  { key: "zhangmingkai", name: "张明楷", field: "刑法学", era: "当代", desc: "以\"刑法解释学\"著称，主张实质解释论，著《刑法学》影响一代法考生。" },
  { key: "jiangping", name: "江平", field: "民商法学", era: "1930-2023", desc: "中国民商法的主要奠基人之一，参与《合同法》《物权法》《民法典》多部立法。" },
  { key: "gaomingxuan", name: "高铭暄", field: "刑法学", era: "1928-", desc: "新中国刑法学的主要奠基者，唯一全程参与 1979/1997 刑法制定的学者。" },
  { key: "shangkuan", name: "史尚宽", field: "民法学", era: "1898-1970", desc: "完成《民法全书》六册的民法学泰斗，中国第一部民法全书作者。" },
  { key: "zhou_nan", name: "周枏", field: "罗马法学", era: "1908-2004", desc: "《罗马法原论》作者，把罗马法研究带回中国的传奇学者。" },
  { key: "lianghuixing", name: "梁慧星", field: "民法学", era: "当代", desc: "《民法总论》作者，民法典编纂的重要建言者。" },
  { key: "yingsonnian", name: "应松年", field: "行政法学", era: "当代", desc: "中国行政法学的开拓者之一，参与《行政处罚法》《行政诉讼法》立法。" },
  { key: "suishengxian", name: "沈宗灵", field: "法理学", era: "1923-2013", desc: "法理学与比较法学的代表性学者，著《现代西方法理学》。" },
  { key: "chaoxinmin", name: "陈光中", field: "刑事诉讼法学", era: "当代", desc: "刑诉法学泰斗，主张\"程序公正与实体公正并重\"。" }
];
function showJurists() {
  hideAllViews();
  document.getElementById("juristView").classList.add("show");
  var p = ensureProfileId(loadProfile());
  var owned = p.juristsOwned || [];
  var h = '<div style="text-align:center;padding:4px 0 14px"><div style="font-size:15px;font-weight:800;color:var(--text)">法学家图鉴</div><div style="font-size:11px;color:var(--text2);margin-top:4px">答对难度 3 的题目有概率掉落卡牌 · 已收集 <b style="color:var(--accent)">' + owned.length + '/' + JURISTS.length + '</b></div></div><div class="jr-grid">';
  for (var i = 0; i < JURISTS.length; i++) {
    var j = JURISTS[i];
    var has = owned.indexOf(j.key) >= 0;
    h += '<div class="jr-card' + (has ? " owned" : " locked") + '"><div class="jr-ava">' + escHtml(j.name.charAt(0)) + '</div><div class="jr-name">' + escHtml(j.name) + '</div><div class="jr-field">' + escHtml(j.field) + ' · ' + escHtml(j.era) + '</div><div class="jr-desc">' + escHtml(has ? j.desc : "答对难度 3 的题目，有机会收集这张卡牌。") + '</div></div>';
  }
  h += '</div>';
  document.getElementById("juristBody").innerHTML = h;
}
function maybeDropJurist(q) {
  try {
    if (!q || q.diff !== 3) return;
    if (Math.random() > 0.06) return;
    var p = ensureProfileId(loadProfile());
    if (!p.juristsOwned) p.juristsOwned = [];
    var un = [];
    for (var i = 0; i < JURISTS.length; i++) if (p.juristsOwned.indexOf(JURISTS[i].key) < 0) un.push(JURISTS[i]);
    if (!un.length) return;
    var j = un[Math.floor(Math.random() * un.length)];
    p.juristsOwned.push(j.key);
    saveProfile(p);
    showToast("收集法学家卡：「" + j.name + "」");
  } catch(e) {}
}

// ============================================================
// 海报（学习周报 / 律政人生成就）
// ============================================================
function posterModal(dataUrl) {
  var ov = document.createElement("div");
  ov.id = "posterOvl";
  ov.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:910;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;gap:12px";
  ov.innerHTML = '<img src="' + dataUrl + '" style="max-width:100%;max-height:72vh;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.5)" />'
    + '<div style="display:flex;gap:10px"><a download="seawhy-lex-poster.png" href="' + dataUrl + '" style="text-decoration:none;background:var(--accent);color:#fff;border-radius:12px;padding:10px 24px;font-size:13px;font-weight:700">保存图片</a>'
    + '<button onclick="document.getElementById(\'posterOvl\').remove()" style="background:rgba(255,255,255,.15);border:none;color:#fff;border-radius:12px;padding:10px 24px;font-size:13px;cursor:pointer">关闭</button></div>';
  document.body.appendChild(ov);
}
function _posterBase(ctx, W, H, title, sub) {
  var g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#2b5f9e");
  g.addColorStop(0.55, "#22315e");
  g.addColorStop(1, "#141a30");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(255,255,255,.9)";
  ctx.font = "800 40px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, W / 2, 110);
  ctx.font = "500 22px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,.6)";
  ctx.fillText(sub, W / 2, 152);
}
function _posterTile(ctx, x, y, w, h, num, lab) {
  ctx.fillStyle = "rgba(255,255,255,.12)";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "#fff";
  ctx.font = "800 42px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(num, x + w / 2, y + h / 2 + 4);
  ctx.font = "400 20px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,.65)";
  ctx.fillText(lab, x + w / 2, y + h / 2 + 38);
}
function shareWeekPoster() {
  var stats = loadLearnStats();
  var bars = [], totalMin = 0, totalQ = 0;
  var dayNames = ["日", "一", "二", "三", "四", "五", "六"];
  var maxMin = 1;
  for (var i = 6; i >= 0; i--) {
    var d = new Date(); d.setDate(d.getDate() - i);
    var ds = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    var day = stats.days[ds] || {};
    var min = Math.floor((day.sec || (day.min || 0) * 60) / 60);
    totalMin += min; totalQ += (day.q || 0);
    if (min > maxMin) maxMin = min;
    bars.push({ lab: dayNames[d.getDay()], min: min });
  }
  var streak = getStreak(stats);
  var W = 750, H = 1050;
  var cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  var ctx = cv.getContext("2d");
  _posterBase(ctx, W, H, "学习周报", "SeaWhy Lex · 近 7 天学习记录");
  var tw = 150, gap = 30, sx = (W - tw * 4 - gap * 3) / 2;
  _posterTile(ctx, sx, 220, tw, 130, totalMin + "", "学习分钟");
  _posterTile(ctx, sx + (tw + gap), 220, tw, 130, totalQ + "", "做题数");
  _posterTile(ctx, sx + (tw + gap) * 2, 220, tw, 130, streak + "", "连续天数");
  _posterTile(ctx, sx + (tw + gap) * 3, 220, tw, 130, Math.max(0, Object.keys(loadCheckin().days).length) + "", "累计打卡");
  var chartY = 430, chartH = 260;
  var bw = 52, bg2 = (W - bw * 7 - 60 * 2) / 6;
  for (var b = 0; b < bars.length; b++) {
    var x = 30 + b * (bw + bg2);
    var bh = bars[b].min > 0 ? Math.max(12, bars[b].min / maxMin * chartH) : 6;
    ctx.fillStyle = b === 6 ? "#f7b733" : "rgba(255,255,255,.55)";
    ctx.fillRect(x, chartY + chartH - bh, bw, bh);
    ctx.fillStyle = "rgba(255,255,255,.75)";
    ctx.font = "400 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(bars[b].lab, x + bw / 2, chartY + chartH + 34);
    if (bars[b].min > 0) ctx.fillText(bars[b].min + "分", x + bw / 2, chartY + chartH - bh - 10);
  }
  ctx.fillStyle = "rgba(255,255,255,.55)";
  ctx.font = "400 22px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("每天进步一点点，法律梦更近一点点", W / 2, H - 120);
  ctx.fillText("SeaWhy Lex · 法学生的 AI 学习伙伴", W / 2, H - 80);
  posterModal(cv.toDataURL("image/png"));
}
function showStoryPoster() {
  var s = loadStorySave();
  s.attr = storyAttrClamp(s.attr);
  var e = storyEndingOf(s.attr);
  var doneCount = Object.keys(s.cleared).length;
  var W = 750, H = 1050;
  var cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  var ctx = cv.getContext("2d");
  _posterBase(ctx, W, H, "律政人生 · 成就档案", "从法学院到红圈所 · 剧情进度 " + doneCount + "/18");
  ctx.fillStyle = "rgba(255,255,255,.12)";
  ctx.fillRect(75, 200, W - 150, 150);
  ctx.fillStyle = "#fff";
  ctx.font = "800 44px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(e.lv + " 级结局 · " + e.title, W / 2, 275);
  ctx.font = "400 22px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,.65)";
  ctx.fillText("知识 " + s.attr.k + "    人脉 " + s.attr.r + "    心态 " + s.attr.m, W / 2, 320);
  var attrs = [["知识", s.attr.k, STORY_ATTR_MAX.k, "#5dade2"], ["人脉", s.attr.r, STORY_ATTR_MAX.r, "#58d68d"], ["心态", s.attr.m, STORY_ATTR_MAX.m, "#f7b733"]];
  for (var a = 0; a < attrs.length; a++) {
    var y = 440 + a * 90;
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,.85)";
    ctx.font = "600 24px sans-serif";
    ctx.fillText(attrs[a][0], 110, y);
    ctx.fillStyle = "rgba(255,255,255,.15)";
    ctx.fillRect(210, y - 22, W - 210 - 130, 26);
    ctx.fillStyle = attrs[a][3];
    ctx.fillRect(210, y - 22, Math.min(1, attrs[a][1] / attrs[a][2]) * (W - 210 - 130), 26);
    ctx.fillStyle = "#fff";
    ctx.font = "800 26px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(attrs[a][1] + "", W - 100, y);
  }
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,.55)";
  ctx.font = "400 22px sans-serif";
  ctx.fillText("SeaWhy Lex · 律政人生", W / 2, H - 80);
  posterModal(cv.toDataURL("image/png"));
}

// ============================================================
// INIT
// ============================================================
(function init() {
  applyTheme();
  applyFontPrefs();
  applyKbdMode();
  bindEvents();
  renderAllMessages();
  renderDatabase();
  // fcitx5 引擎:按保存的模式接管/保持内置;状态变化时刷新设置 UI(如加载失败禁用 fcitx5 按钮)
  if (window.FCITX5) {
    window.FCITX5.configure(options.imeEngine || "fcitx");
    window.FCITX5.onState(function () { try { updateOptUI(); } catch(e) {} });
  }
  // 内置键盘：静态输入框预置只读（真正输入交给 IME，避免 iOS 原生键盘整页滚动）
  (function imeInitStatic() {
    if (options.kbdMode === "system") return;
    var ids = ["userInput","noteTitle","noteContent","noteTags","noteDetailTitleInput","noteDetailContentInput","noteDetailTagsInput","dbSearch","lrSearch","todoInput","globalSearchInput"];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && el.tagName) { try { el.setAttribute("readonly", "readonly"); } catch (e) {} }
    }
  })();
  // Register service worker for offline/PWA support
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(function(registration) {
      registration.addEventListener("updatefound", function() { showToast("正在更新离线资源"); });
    }).catch(function() { showToast("离线功能暂不可用"); });
  }
  // Show install prompt for PWA
  window.addEventListener("beforeinstallprompt", function(e) {
    e.preventDefault();
    window._installPrompt = e;
    var banner = document.createElement("div");
    banner.id = "installBanner";
    banner.style.cssText = "position:fixed;top:0;left:0;right:0;background:var(--accent);color:#fff;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;z-index:500;font-size:13px;font-weight:600;gap:8px;padding-top:calc(12px + env(safe-area-inset-top,0px))";
    banner.innerHTML = '<span>📲 安装 SeaWhy Lex 到桌面</span><span style="display:flex;gap:6px;flex-shrink:0"><button onclick="installApp()" style="background:#fff;color:var(--accent);border:none;padding:6px 14px;border-radius:14px;font-weight:700;cursor:pointer;font-size:12px;font-family:inherit">安装</button><button onclick="this.parentElement.parentElement.remove()" style="background:transparent;border:none;color:#fff;cursor:pointer;font-size:16px;padding:2px 6px;font-family:inherit">×</button></span>';
    document.body.prepend(banner);
  });
})();

// ===== 教务系统一键导入（hash 桥接）：tools/swun-import.js 提取后以 #kbcx=<encodeURIComponent(文本)> 跳转，这里预填导入弹层 =====
(function lexHashImport() {
  var m = location.hash.match(/[#&]kbcx=([\s\S]*)/);
  if (!m) return;
  var text;
  try { text = decodeURIComponent(m[1]); } catch (e) { return; }
  if (history.replaceState) {
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
  }
  setTimeout(function() {
    try {
      openScheduleImport();
      var ta = document.getElementById("impText");
      if (ta) {
        ta.value = text;
        var res = document.getElementById("impResult");
        if (res) res.textContent = "✅ 已从教务系统载入课表数据，确认无误后点【追加导入】";
      }
    } catch (e) {}
  }, 400);
})();
function installApp() {
  if (window._installPrompt) {
    window._installPrompt.prompt();
    window._installPrompt.userChoice.then(function(r) {
      var b = document.getElementById("installBanner");
      if (b) b.remove();
      window._installPrompt = null;
    });
  }
}

// ============================================================
// QUIZ / STUDY QUESTION BANK
// ============================================================


var QUIZ_STATE = {
  mode: "practice",
  subject: "全部",
  chapter: "",
  screen: "subjects", // "subjects" | "chapters" | "quiz"
  subjectHasChapters: false,
  diff: 0, // 0=全部, 1=简单, 2=中等, 3=困难
  examCount: 0,
  currentIndex: 0,
  questions: [],
  answers: {},
  answered: {},
  correct: {},
  timerMode: "countup",
  timerStart: 0,
  timerLimit: 0,
  timerInterval: null
};

// 考试设置（多选来源 + 题数 + 计时方式 + 每题时长）
var EXAM_SETUP = { subjects: ["全部"], count: 10, timing: "countup", secPerQ: 60, diff: 0 };

var QUIZ_PAGE_SIZE = 1; // 一页显示一道题

// ============================================================
// LEARNING CENTER
// ============================================================
var LEARN_STATS_KEY = "seawhy-lex-learn-stats";

function getTodayStr() {
  var d = new Date();
  return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
}

// ===== 学习时钟(番茄钟) =====
var CLOCK_KEY = "seawhy-lex-clock";
var _clockTimer = null;
function loadClock() {
  var def = { focusMin: 25, restMin: 5, mode: "focus", running: false, endAt: 0, doneToday: 0, remainSec: 0 };
  try {
    var c = JSON.parse(localStorage.getItem(CLOCK_KEY) || "null");
    if (c && typeof c === "object") {
      for (var k in def) if (typeof c[k] === "undefined") c[k] = def[k];
      return c;
    }
  } catch(e) {}
  return def;
}
function saveClock(c) { try { localStorage.setItem(CLOCK_KEY, JSON.stringify(c)); } catch(e) {} }
function clockLeftSec(c) {
  if (c.running && c.endAt) return Math.max(0, Math.round((c.endAt - Date.now()) / 1000));
  // 暂停中：从上次暂停时的剩余时间继续，而不是重置为整段时长
  if (!c.running && typeof c.remainSec === "number" && c.remainSec > 0) return c.remainSec;
  return (c.mode === "focus" ? c.focusMin : c.restMin) * 60;
}
function clockRender() {
  var c = loadClock();
  var el = document.getElementById("clockTime");
  if (el) {
    var s = clockLeftSec(c);
    el.textContent = (s < 600 ? "0" : "") + Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60);
  }
  var mode = document.getElementById("clockMode");
  if (mode) mode.textContent = c.mode === "focus" ? "专注" : "休息";
  var tog = document.getElementById("clockToggle");
  if (tog) tog.textContent = c.running ? "暂停" : ((!c.running && typeof c.remainSec === "number" && c.remainSec > 0) ? "继续" : "开始");
  var done = document.getElementById("clockDone");
  if (done) done.textContent = "今日 " + (c.doneToday || 0) + " 番茄";
  var fm = document.getElementById("clockFocusMin"), rm = document.getElementById("clockRestMin");
  var run = !!c.running;
  if (fm) { fm.value = c.focusMin; fm.disabled = run; }
  if (rm) { rm.value = c.restMin; rm.disabled = run; }
  var fv = document.getElementById("clockFocusVal");
  if (fv) fv.textContent = c.focusMin;
  var rv = document.getElementById("clockRestVal");
  if (rv) rv.textContent = c.restMin;
}
function toggleClockCard() {
  var card = document.getElementById("learnClockCard");
  if (!card) return;
  card.classList.toggle("open");
  var fold = document.getElementById("clockFold");
  if (fold) fold.textContent = card.classList.contains("open") ? "▴" : "▾";
  clockRender();
}
function clockToggle() {
  var c = loadClock();
  if (c.running) {
    // 暂停：记住剩余秒数，下次开始从剩余时间继续
    c.remainSec = clockLeftSec(c);
    c.running = false; c.endAt = 0;
    saveClock(c);
    clockRender();
    return;
  }
  c.running = true;
  var remain = (typeof c.remainSec === "number" && c.remainSec > 0) ? c.remainSec : clockLeftSec(c);
  c.endAt = Date.now() + remain * 1000;
  c.remainSec = 0;
  saveClock(c);
  clockRender();
}
function clockReset() {
  var c = loadClock();
  c.running = false; c.endAt = 0; c.remainSec = 0;
  saveClock(c);
  clockRender();
}
function clockSkip() {
  var c = loadClock();
  c.running = false; c.endAt = 0;
  clockComplete(c, true);
}
function clockSetDur() {
  var c = loadClock();
  var fm = parseInt(document.getElementById("clockFocusMin").value, 10);
  var rm = parseInt(document.getElementById("clockRestMin").value, 10);
  if (fm >= 1 && fm <= 120) c.focusMin = fm;
  if (rm >= 1 && rm <= 60) c.restMin = rm;
  // 调整时长后放弃暂停残留的剩余时间，按新时长开始
  c.remainSec = 0;
  saveClock(c);
  clockRender();
}
function clockComplete(c, skip) {
  var msg;
  if (c.mode === "focus") {
    c.doneToday = (c.doneToday || 0) + 1;
    msg = skip ? "已跳过专注" : "专注完成！休息一下";
  } else {
    msg = skip ? "已跳过休息" : "休息结束，开始专注吧";
  }
  c.mode = c.mode === "focus" ? "rest" : "focus";
  c.running = false; c.endAt = 0; c.remainSec = 0;
  saveClock(c);
  if (!skip) clockNotify();
  clockRender();
  showToast(msg);
}
function clockNotify() {
  try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch(e) {}
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880; g.gain.value = 0.2;
    o.start();
    setTimeout(function() { try { o.stop(); ctx.close(); } catch(e) {} }, 500);
  } catch(e) {}
}
function clockTick() {
  var c = loadClock();
  if (c.running && c.endAt && Date.now() >= c.endAt) clockComplete(c, false);
  else clockRender();
}
function clockStartLoop() {
  if (_clockTimer) return;
  _clockTimer = setInterval(clockTick, 1000);
}

function loadLearnStats() {
  try {
    var s = JSON.parse(localStorage.getItem(LEARN_STATS_KEY) || "{}");
    if (!s.days) s.days = {};
    if (!s.totalMin) s.totalMin = 0;
    if (!s.totalQ) s.totalQ = 0;
    // 旧数据迁移：历史分钟数换算为秒，保证学习时长与积分不间断
    if (!s.totalSec) s.totalSec = (s.totalMin || 0) * 60;
    return s;
  } catch(e) { return { days: {}, totalMin: 0, totalQ: 0, totalSec: 0 }; }
}

function saveLearnStats(stats) {
  try { localStorage.setItem(LEARN_STATS_KEY, JSON.stringify(stats)); } catch(e) {}
}

// ===== 学习时长：实时计时（仅统计处于学习界面且应用可见的时间） =====
var STUDY_VIEWS = ["quizView","chatView","docView","dbView","caseView","learnCenterView","materialsView","notebookView","clockView","storyView"];
var _studyOn = false;
var _studySegStart = 0;
var _studySegSec = 0;

function _isStudyView() {
  for (var i = 0; i < STUDY_VIEWS.length; i++) {
    var el = document.getElementById(STUDY_VIEWS[i]);
    if (el && el.classList.contains("show")) return true;
  }
  return false;
}
function _studyWrite() {
  if (_studySegSec <= 0) return;
  var stats = loadLearnStats();
  var today = getTodayStr();
  if (!stats.days[today]) stats.days[today] = { min: 0, q: 0, sec: 0 };
  stats.days[today].sec = (stats.days[today].sec || 0) + _studySegSec;
  var prevTot = stats.totalSec || 0;
  stats.totalSec = (stats.totalSec || 0) + _studySegSec;
  saveLearnStats(stats);
  // 每 5 分钟真实学习 +1 积分（VIP +2）
  var blocks = Math.floor(stats.totalSec / 300) - Math.floor(prevTot / 300);
  if (blocks > 0) awardPoints(vipRate(blocks), "学习奖励");
  _studySegSec = 0;
}
function studyTrackStart() {
  if (_studyOn) return;
  _studyOn = true;
  _studySegStart = Date.now();
}
function studyTrackStop() {
  if (!_studyOn) return;
  _studySegSec += Math.floor((Date.now() - _studySegStart) / 1000);
  _studyOn = false;
  _studyWrite();
}
function _studyHeartbeat() {
  if (!_studyOn) {
    if (_isStudyView() && document.visibilityState === "visible") studyTrackStart();
    return;
  }
  if (!_isStudyView() || document.visibilityState !== "visible") { studyTrackStop(); return; }
  _studySegSec += Math.floor((Date.now() - _studySegStart) / 1000);
  _studySegStart = Date.now();
  _studyWrite();
}
setInterval(_studyHeartbeat, 30000);
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") studyTrackStop();
  else if (_isStudyView()) studyTrackStart();
});
window.addEventListener("pagehide", studyTrackStop);
window.addEventListener("beforeunload", studyTrackStop);

// 记录做题数量（学习时长由上方实时计时器统计，答题不再虚增时长）
function recordStudyTime(minutes, questions) {
  var stats = loadLearnStats();
  var today = getTodayStr();
  if (!stats.days[today]) stats.days[today] = { min: 0, q: 0, sec: 0 };
  stats.days[today].q = (stats.days[today].q || 0) + (questions || 0);
  stats.totalQ = (stats.totalQ || 0) + (questions || 0);
  saveLearnStats(stats);
}

function getStreak(stats) {
  var streak = 0;
  var d = new Date();
  for (var i = 0; i < 365; i++) {
    var ds = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    if (stats.days[ds] && ((stats.days[ds].sec || 0) > 0 || (stats.days[ds].min || 0) > 0)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else if (i === 0) {
      d.setDate(d.getDate() - 1);
      continue;
    } else {
      break;
    }
  }
  return streak;
}

function showLearningCenter() {
  hideAllViews();
  var el = document.getElementById("learnCenterView");
  el.style.display = "";
  el.classList.add("show");
  updateLearnDashboard();
}
function showClockView() {
  hideAllViews();
  var el = document.getElementById("clockView");
  el.style.display = "";
  el.classList.add("show");
  recordLastStudy("clockView");
  clockRender();
}

function updateLearnDashboard() {
  clockRender(); // 学习时钟同步显示
  renderExamCd(); // 法考倒计时
  renderWeekReport(); // 本周学习报告
  renderContinueFab(); // 一键继续学习悬浮按钮
  renderDailyCaseEntry();
  renderLawFirmEntry();
  var stats = loadLearnStats();
  var today = getTodayStr();
  var todayData = stats.days[today] || {};
  var streak = getStreak(stats);

  var dNow = new Date();
  var dateEl = document.getElementById("learnTodayDate");
  if (dateEl) dateEl.textContent = (dNow.getMonth() + 1) + "." + dNow.getDate();

  // 学习时长：优先秒级实时记录，兼容旧版分钟数据
  var sec = todayData.sec || ((todayData.min || 0) * 60);
  var min = Math.floor(sec / 60);
  var q = todayData.q || 0;
  var elMin = document.getElementById("learnTodayMin");
  if (elMin) elMin.textContent = min;
  var elQ = document.getElementById("learnTodayQ");
  if (elQ) elQ.textContent = q;
  var elStreak = document.getElementById("learnStreak");
  if (elStreak) elStreak.textContent = streak;

  // 智能文案 + 今日目标进度（目标 30 分钟）
  var goal = 30;
  var smartEl = document.getElementById("learnSmart");
  var emojiEl = document.getElementById("learnSmartEmoji");
  var smartTxt, emoji;
  if (min >= goal) {
    smartTxt = "今日学习 " + min + " 分钟，已完成目标 🎉" + (streak > 1 ? " · 连续 " + streak + " 天" : "");
    emoji = "🏆";
  } else if (min > 0) {
    smartTxt = "已学习 " + min + " 分钟，再学 " + (goal - min) + " 分钟达标";
    emoji = "🔥";
  } else if (q > 0) {
    smartTxt = "今日做了 " + q + " 道题，加油";
    emoji = "📝";
  } else {
    smartTxt = "从题库开始，积累学习时长吧";
    emoji = "📖";
  }
  if (smartEl) smartEl.textContent = smartTxt;
  if (emojiEl) emojiEl.textContent = emoji;
  var gFill = document.getElementById("learnGoalFill");
  var gTxt = document.getElementById("learnGoalTxt");
  var gPct = Math.max(0, Math.min(100, Math.round(sec / (goal * 60) * 100)));
  if (gFill) gFill.style.width = gPct + "%";
  if (gTxt) gTxt.textContent = min + "/" + goal + " 分钟";

  var weekBar = document.getElementById("learnWeekBar");
  if (weekBar) {
    var days = ["日","一","二","三","四","五","六"];
    var html = "";
    for (var i = 6; i >= 0; i--) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      var ds = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
      var day = stats.days[ds];
      var hasData = day && ((day.sec || 0) > 0 || (day.min || 0) > 0);
      var cls = "learn-week-dot";
      if (i === 0) cls += " today";
      else if (hasData) cls += " active";
      html += '<div class="' + cls + '" title="' + ds + '">' + days[d.getDay()] + '</div>';
    }
    weekBar.innerHTML = html;
  }
}

function showQuizModule() {
  hideAllViews();
  document.getElementById("quizView").classList.add("show");
  recordLastStudy("quizView");
  stopExamTimer();
  var qte = document.getElementById("quizTimer");
  if (qte) qte.style.display = "none";
  setQuizScreen("menu");
  var wbc = document.getElementById("wbCount");
  if (wbc) wbc.textContent = wrongBook.length;
}

// 主菜单三个入口
function enterPractice() {
  QUIZ_STATE.mode = "practice";
  QUIZ_STATE.subject = "全部";
  QUIZ_STATE.chapter = "";
  showQuizSubjects();
}

function enterExam() {
  QUIZ_STATE.mode = "exam";
  EXAM_SETUP.subjects = ["全部"];
  EXAM_SETUP.chapters = {};
  showExamSetupScreen();
}

// ============================================================
// 我的资料：上传 PDF / Word / TXT 文档并查看
// ============================================================
var MATERIALS_DB = "seawhy-lex-materials";
var MATERIALS_STORE = "docs";
var MATERIALS_META = "seawhy-lex-materials-meta";
var _matViewerOpen = false;

function loadMaterialsMeta() {
  try { return JSON.parse(localStorage.getItem(MATERIALS_META) || "[]"); } catch(e) { return []; }
}
function saveMaterialsMeta(list) { try { localStorage.setItem(MATERIALS_META, JSON.stringify(list)); } catch(e) {} }
function openMaterialsDB() {
  return new Promise(function(resolve, reject) {
    if (typeof indexedDB === "undefined") { reject(new Error("no-idb")); return; }
    var req = indexedDB.open(MATERIALS_DB, 1);
    req.onupgradeneeded = function(e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains(MATERIALS_STORE)) db.createObjectStore(MATERIALS_STORE);
    };
    req.onsuccess = function() { resolve(req.result); };
    req.onerror = function() { reject(req.error); };
  });
}
function idbPut(id, blob) {
  return openMaterialsDB().then(function(db) {
    return new Promise(function(resolve, reject) {
      var tx = db.transaction(MATERIALS_STORE, "readwrite");
      tx.objectStore(MATERIALS_STORE).put(blob, id);
      tx.oncomplete = function() { db.close(); resolve(); };
      tx.onerror = function() { db.close(); reject(tx.error); };
    });
  });
}
function idbGet(id) {
  return openMaterialsDB().then(function(db) {
    return new Promise(function(resolve, reject) {
      var tx = db.transaction(MATERIALS_STORE, "readonly");
      var req = tx.objectStore(MATERIALS_STORE).get(id);
      req.onsuccess = function() { db.close(); resolve(req.result); };
      req.onerror = function() { db.close(); reject(req.error); };
    });
  });
}
function idbDel(id) {
  return openMaterialsDB().then(function(db) {
    return new Promise(function(resolve, reject) {
      var tx = db.transaction(MATERIALS_STORE, "readwrite");
      tx.objectStore(MATERIALS_STORE).delete(id);
      tx.oncomplete = function() { db.close(); resolve(); };
      tx.onerror = function() { db.close(); reject(tx.error); };
    });
  });
}
function matFileType(name) {
  var ext = (name.split(".").pop() || "").toLowerCase();
  if (ext === "pdf") return "pdf";
  if (ext === "docx") return "doc";
  if (ext === "txt") return "txt";
  return null;
}
function fmtFileSize(bytes) {
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + " MB";
  if (bytes >= 1024) return Math.round(bytes / 1024) + " KB";
  return bytes + " B";
}
function showMaterials() {
  hideAllViews();
  document.getElementById("materialsView").classList.add("show");
  recordLastStudy("materialsView");
  renderMaterials();
}
function closeMaterials() { showLearningCenter(); }
function renderMaterials() {
  var list = loadMaterialsMeta();
  var el = document.getElementById("matList");
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<div class="mat-empty"><div class="me-icon">📂</div>还没有上传任何资料<br><button class="me-btn" onclick="uploadMaterial()">上传文档</button></div>';
    return;
  }
  var h = "";
  for (var i = 0; i < list.length; i++) {
    var m = list[i];
    var label = m.type === "pdf" ? "PDF" : m.type === "doc" ? "DOC" : "TXT";
    h += '<div class="mat-item" onclick="openMaterial(\'' + m.id + '\')">' +
      '<div class="mat-ic ' + m.type + '">' + label + '</div>' +
      '<div class="mat-info"><div class="mat-name">' + escapeHtml(m.name) + '</div>' +
      '<div class="mat-meta">' + fmtFileSize(m.size) + ' · ' + m.date + '</div></div>' +
      '<button class="mat-del" onclick="event.stopPropagation();deleteMaterial(\'' + m.id + '\')" title="删除"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="vertical-align:-2px"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>' +
      '</div>';
  }
  el.innerHTML = h;
}
function uploadMaterial() {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".pdf,.docx,.txt";
  input.onchange = function() {
    var f = input.files && input.files[0];
    if (!f) return;
    var type = matFileType(f.name);
    if (!type) { showToast("仅支持 PDF / .docx / .txt 文件"); return; }
    if (f.size > 30 * 1024 * 1024) { showToast("文件过大，请上传 30MB 以内的文件"); return; }
    var id = "m" + Date.now() + "_" + Math.floor(Math.random() * 1e6);
    idbPut(id, f).then(function() {
      var list = loadMaterialsMeta();
      var d = new Date();
      list.unshift({
        id: id, name: f.name, type: type, size: f.size,
        date: d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate()
      });
      saveMaterialsMeta(list);
      renderMaterials();
      showToast("已上传 " + f.name);
    }).catch(function() {
      showToast("上传失败，浏览器存储空间不足或不可用");
    });
  };
  input.click();
}
function deleteMaterial(id) {
  var list = loadMaterialsMeta();
  var m = list.filter(function(x) { return x.id === id; })[0];
  if (!m) return;
  if (!confirm("确定删除「" + m.name + "」吗？")) return;
  idbDel(id).catch(function() {});
  saveMaterialsMeta(list.filter(function(x) { return x.id !== id; }));
  renderMaterials();
  showToast("已删除");
}
function openMaterial(id) {
  var list = loadMaterialsMeta();
  var m = list.filter(function(x) { return x.id === id; })[0];
  if (!m) { showToast("文档不存在"); return; }
  showToast("正在打开…");
  idbGet(id).then(function(blob) {
    if (!blob) { showToast("文档内容读取失败"); return; }
    if (m.type === "pdf") {
      showMaterialViewer('<iframe src="' + URL.createObjectURL(blob) + '"></iframe>');
    } else if (m.type === "txt") {
      blob.text().then(function(text) {
        showMaterialViewer('<pre>' + escapeHtml(text) + '</pre>');
      });
    } else if (m.type === "doc") {
      showMaterialViewer('<div class="mv-loading">正在解析 Word 文档…</div>');
      function doParse() {
        blob.arrayBuffer().then(function(buf) {
          return mammoth.convertToHtml({ arrayBuffer: buf });
        }).then(function(result) {
          setMaterialViewerContent('<div class="mv-rich">' + (result.value || "") + '</div>');
        }).catch(function() {
          setMaterialViewerContent('<div class="mv-loading">解析失败：请确认文件为 .docx 格式（.doc 需先另存为 .docx）</div>');
        });
      }
      if (typeof mammoth !== "undefined") { doParse(); }
      else {
        loadScript("https://cdn.bootcdn.net/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js", function(err) {
          if (err) { setMaterialViewerContent('<div class="mv-loading">解析引擎加载失败，请下载后用 Word 查阅</div>'); return; }
          doParse();
        });
      }
    }
  }).catch(function() { showToast("文档读取失败"); });
}
function showMaterialViewer(html) {
  _matViewerOpen = true;
  var v = document.getElementById("matViewer");
  if (!v) {
    v = document.createElement("div");
    v.id = "matViewer";
    v.className = "mat-viewer";
    v.innerHTML = '<div class="wx-nav"><button class="back" onclick="closeMaterialViewer()" aria-label="返回"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg></button><span class="title">资料预览</span></div><div class="mv-body"></div>';
    document.body.appendChild(v);
  }
  v.classList.add("show");
  v.querySelector(".mv-body").innerHTML = html;
}
function setMaterialViewerContent(html) {
  var v = document.getElementById("matViewer");
  if (v) v.querySelector(".mv-body").innerHTML = html;
}
function closeMaterialViewer() {
  var v = document.getElementById("matViewer");
  if (v) {
    var f = v.querySelector("iframe");
    if (f && f.src) URL.revokeObjectURL(f.src);
    v.classList.remove("show");
    v.querySelector(".mv-body").innerHTML = "";
  }
  _matViewerOpen = false;
}

var _fromPlaza = false;
function showPlaza() {
  hideAllViews();
  _fromPlaza = true;
  var el = document.getElementById("plazaView");
  el.style.display = "";
  el.classList.add("show");
}

function showProfile() {
  hideAllViews();
  document.getElementById("profileView").classList.add("show");
  var psc = document.querySelector("#profileView .about-body");
  if (psc) psc.scrollTop = 0;
  updateProfileUI();
  // 等布局完成后把徽章滚动到当前等级
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { scrollLevelToCurrent(); });
  });
}

// ============================================================
// NOTEBOOK
// ============================================================
var NOTEBOOK_KEY = "seawhy-lex-notebook";
var currentEditIndex = -1; // -1 = new note, >= 0 = editing existing

function loadNotes() {
  try { return JSON.parse(localStorage.getItem(NOTEBOOK_KEY) || "[]"); } catch(e) { return []; }
}

function saveNotes(notes) {
  try { localStorage.setItem(NOTEBOOK_KEY, JSON.stringify(notes)); } catch(e) {}
}

function showNotebook() {
  hideAllViews();
  var el = document.getElementById("notebookView");
  el.style.display = "";
  el.classList.add("show");
  recordLastStudy("notebookView");
  clearEditor();
  renderNotes();
}

function clearEditor() {
  currentEditIndex = -1;
  var t = document.getElementById("noteTitle");
  var c = document.getElementById("noteContent");
  var g = document.getElementById("noteTags");
  if (t) t.value = "";
  if (c) c.value = "";
  if (g) g.value = "";
}

function startNewNote() {
  clearEditor();
  document.getElementById("noteTitle").focus();
}

function saveCurrentNote() {
  var titleEl = document.getElementById("noteTitle");
  var contentEl = document.getElementById("noteContent");
  var tagsEl = document.getElementById("noteTags");
  var title = (titleEl.value || "").trim();
  var cnt = (contentEl.value || "").trim();
  if (!title && !cnt) {
    showToast("请输入标题或内容");
    return;
  }
  if (!title) title = "无标题";
  var tagsStr = (tagsEl.value || "").trim();
  var tags = tagsStr ? tagsStr.split(",").map(function(t){ return t.trim(); }).filter(Boolean) : [];
  var nowStr = getTodayStr() + " " + ("0" + new Date().getHours()).slice(-2) + ":" + ("0" + new Date().getMinutes()).slice(-2);
  var notes = loadNotes();
  if (currentEditIndex >= 0 && currentEditIndex < notes.length) {
    notes[currentEditIndex].title = title;
    notes[currentEditIndex].content = cnt;
    notes[currentEditIndex].tags = tags;
    notes[currentEditIndex].date = nowStr + " (已编辑)";
    showToast("笔记已更新");
  } else {
    // 新建笔记：非VIP 每篇扣 5 积分（可用额度抵扣），VIP 免费
    var p = loadProfile();
    if (!isVip()) {
      var fee = 5;
      if ((p.noteCredits || 0) > 0) {
        p.noteCredits--;
        saveProfile(p);
      } else if ((p.points || 0) < fee) {
        showToast("积分不足，创建笔记需 5 积分（VIP 免费）");
        return;
      } else {
        addPoints(-fee, "创建笔记");
      }
    }
    notes.push({
      title: title,
      content: cnt,
      tags: tags,
      date: nowStr
    });
    var nb = oneTimeBonus("note", 5, "首次创建笔记");
    showToast("笔记已保存");
  }
  saveNotes(notes);
  clearEditor();
  renderNotes();
}

function editNote(index) {
  var notes = loadNotes();
  if (index < 0 || index >= notes.length) return;
  var n = notes[index];
  currentEditIndex = index;
  hideAllViews();
  var el = document.getElementById("noteDetailView");
  el.style.display = "";
  el.classList.add("show");
  document.getElementById("noteDetailTitle").textContent = n.title || "笔记";
  // Fill edit fields
  document.getElementById("noteDetailTitleInput").value = n.title || "";
  document.getElementById("noteDetailContentInput").value = n.content || "";
  document.getElementById("noteDetailTagsInput").value = (n.tags || []).join(",");
  // Render read mode
  document.getElementById("ndReadTitle").textContent = n.title || "无标题";
  document.getElementById("ndReadMeta").textContent = n.date || "";
  var tagsHtml = (n.tags || []).map(function(t){ return '<span class="note-tag">' + escHtml(t) + '</span>'; }).join("");
  document.getElementById("ndReadTags").innerHTML = tagsHtml;
  document.getElementById("ndReadContent").textContent = n.content || "";
  // Start in read mode
  setNoteMode("read");
}

var _noteMode = "read";
function setNoteMode(mode) {
  _noteMode = mode;
  document.getElementById("noteDetailReadMode").style.display = mode === "read" ? "block" : "none";
  document.getElementById("noteDetailEditMode").style.display = mode === "edit" ? "block" : "none";
  var btn = document.getElementById("btnNoteMode");
  if (btn) {
    btn.innerHTML = mode === "read"
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    btn.title = mode === "read" ? "编辑" : "阅读";
  }
}

function toggleNoteMode() {
  setNoteMode(_noteMode === "read" ? "edit" : "read");
}

function saveNoteDetail() {
  var notes = loadNotes();
  if (currentEditIndex < 0 || currentEditIndex >= notes.length) return;
  var title = document.getElementById("noteDetailTitleInput").value.trim() || "无标题";
  var cnt = document.getElementById("noteDetailContentInput").value;
  var tagsStr = document.getElementById("noteDetailTagsInput").value.trim();
  var tags = tagsStr ? tagsStr.split(",").map(function(t){ return t.trim(); }).filter(Boolean) : [];
  var nowStr = getTodayStr() + " " + ("0" + new Date().getHours()).slice(-2) + ":" + ("0" + new Date().getMinutes()).slice(-2);
  notes[currentEditIndex].title = title;
  notes[currentEditIndex].content = cnt;
  notes[currentEditIndex].tags = tags;
  notes[currentEditIndex].date = nowStr + " (已编辑)";
  saveNotes(notes);
  // Update read mode display
  document.getElementById("noteDetailTitle").textContent = title;
  document.getElementById("ndReadTitle").textContent = title;
  document.getElementById("ndReadMeta").textContent = nowStr + " (已编辑)";
  document.getElementById("ndReadTags").innerHTML = tags.map(function(t){ return '<span class="note-tag">' + escHtml(t) + '</span>'; }).join("");
  document.getElementById("ndReadContent").textContent = cnt;
  setNoteMode("read");
  showToast("笔记已更新");
}

function deleteNoteDetail() {
  var notes = loadNotes();
  if (currentEditIndex < 0 || currentEditIndex >= notes.length) return;
  if (confirm("确定要删除这条笔记吗？")) {
    notes.splice(currentEditIndex, 1);
    saveNotes(notes);
    showToast("笔记已删除");
    document.getElementById("noteDetailView").classList.remove("show");
    document.getElementById("noteDetailView").style.display = "none";
    showNotebook();
  }
}

function closeNoteDetail() {
  document.getElementById("noteDetailView").classList.remove("show");
  document.getElementById("noteDetailView").style.display = "none";
  showNotebook();
}

function renderNotes() {
  var notes = loadNotes();
  var el = document.getElementById("notebookList");
  if (!el) return;
  if (notes.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:44px 20px;color:var(--text2)"><div style="margin-bottom:12px;opacity:.3"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg></div><p style="font-size:16px;font-weight:600;color:var(--text);margin-bottom:8px">暂无笔记</p><p style="font-size:13px;line-height:1.5;color:var(--text2);margin-bottom:16px">点击右下角 + 开始记录你的学习心得</p><button class="quiz-btn primary" style="padding:10px 24px" onclick="startNewNote()">新建笔记</button></div>';
    return;
  }
  var html = "";
  for (var i = notes.length - 1; i >= 0; i--) {
    var n = notes[i];
    var preview = n.content ? n.content.substring(0, 100) : "";
    html += '<div class="note-card" onclick="editNote(' + i + ')" style="cursor:pointer">' +
      '<div style="display:flex;justify-content:space-between;align-items:center">' +
      '<div class="note-date">' + (n.date || "") + '</div>' +
      '<button onclick="event.stopPropagation();deleteNote(' + i + ')" style="background:none;border:none;color:var(--text2);cursor:pointer;font-size:14px;padding:4px 8px;display:inline-flex;align-items:center" title="删除"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>' +
      '</div>' +
      '<div class="note-title">' + escHtml(n.title || "无标题") + '</div>' +
      '<div class="note-preview">' + escHtml(preview) + (n.content && n.content.length > 100 ? "..." : "") + '</div>' +
      (n.tags && n.tags.length > 0 ? '<div class="note-tags">' + n.tags.map(function(t){ return '<span class="note-tag">' + escHtml(t) + '</span>'; }).join("") + '</div>' : "") +
      '</div>';
  }
  el.innerHTML = html;
}

function deleteNote(index) {
  var notes = loadNotes();
  if (index < 0 || index >= notes.length) return;
  if (confirm("确定要删除这条笔记吗？")) {
    notes.splice(index, 1);
    saveNotes(notes);
    if (currentEditIndex === index) clearEditor();
    else if (currentEditIndex > index) currentEditIndex--;
    renderNotes();
    showToast("笔记已删除");
  }
}

function clearAllNotes() {
  if (confirm("确定要清空所有笔记吗？此操作不可恢复。")) {
    saveNotes([]);
    clearEditor();
    renderNotes();
    showToast("笔记已清空");
  }
}


function getQuizIcon(subject) {
  var map = {
    "全部": '<path d="M3 3h8v8H3z"/><path d="M13 3h8v8h-8z"/><path d="M3 13h8v8H3z"/><path d="M13 13h8v8h-8z"/>',
    "刑法·总则": '<path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z"/><path d="M9 11.5l2 2 4-4"/>',
    "刑法·分则": '<path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z"/><path d="M9 11.5l2 2 4-4"/>',
    "民法·总则": '<path d="M12 3v18"/><path d="M5 7h14"/><path d="M8 6.5L5.5 13h13L15 6.5z"/>',
    "民法·分则": '<path d="M12 3v18"/><path d="M5 7h14"/><path d="M8 6.5L5.5 13h13L15 6.5z"/>',
    "宪法": '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/>',
    "国际公法": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 3.5 5.7 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.7-3.5-9s1-6.5 3.5-9z"/>'
  };
  return map[subject] || map["宪法"];
}

function getQuizChapters(subject) {
  var arr = QUIZ_DATA[subject] || [];
  var seen = [];
  for (var i = 0; i < arr.length; i++) {
    var c = arr[i].chapter;
    if (c && seen.indexOf(c) === -1) seen.push(c);
  }
  seen.sort(function (a, b) { return chapterNum(a) - chapterNum(b); });
  return seen;
}

// 提取「第X章」的 X 数字（中文数字→阿拉伯数字），用于章节按教材顺序排序
function chapterNum(name) {
  var m = /^第(.+?)章/.exec(name || "");
  if (!m) return 99;
  var s = m[1];
  if (s === "十") return 10;
  var map = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  if (s.length === 1) return map[s] || 0;
  if (s.charAt(0) === "十") return 10 + (map[s.charAt(1)] || 0);
  return 0;
}

function subjectHasChapters(subject) {
  return getQuizChapters(subject).length > 0;
}

function setQuizScreen(screen) {
  QUIZ_STATE.screen = screen;
  var screens = { menu: "quizMenuScreen", subjects: "quizSubjectScreen", chapters: "quizChapterScreen", examsetup: "quizExamSetupScreen", examhistory: "quizExamHistoryScreen", quiz: "quizPlayArea" };
  for (var k in screens) {
    var el = document.getElementById(screens[k]);
    if (el) el.style.display = (k === screen) ? "" : "none";
  }
}

// ===== 题库难度筛选（全部/简单/中等/困难）=====
var QUIZ_DIFF_OPTS = [
  { v: 0, label: "全部" },
  { v: 1, label: "简单" },
  { v: 2, label: "中等" },
  { v: 3, label: "困难" }
];

function quizMatchesDiff(q) {
  return QUIZ_STATE.diff === 0 || (q.diff === QUIZ_STATE.diff);
}

function countQuizQuestions(arr) {
  var c = 0;
  for (var i = 0; i < arr.length; i++) if (quizMatchesDiff(arr[i])) c++;
  return c;
}

function renderDiffFilter(id) {
  var h = "";
  for (var i = 0; i < QUIZ_DIFF_OPTS.length; i++) {
    var o = QUIZ_DIFF_OPTS[i];
    h += '<button class="' + (QUIZ_STATE.diff === o.v ? 'active' : '') + '" onclick="selectDiff(' + o.v + ')">' + o.label + '</button>';
  }
  var el = document.getElementById(id);
  if (el) el.innerHTML = h;
}

function selectDiff(v) {
  QUIZ_STATE.diff = v;
  if (QUIZ_STATE.screen === "chapters") showQuizChapters();
  else showQuizSubjects();
}

function showQuizSubjects() {
  setQuizScreen("subjects");
  renderDiffFilter("quizDiffFilter");
  var subjects = [];
  var totalAll = 0;
  for (var k in QUIZ_DATA) {
    if (QUIZ_DATA.hasOwnProperty(k) && QUIZ_DATA[k].length > 0) {
      subjects.push(k);
      totalAll += countQuizQuestions(QUIZ_DATA[k]);
    }
  }
  var h = '<div class="quiz-subject-card" onclick="selectQuizSubject(\'全部\')">' +
    '<div class="qsc-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + getQuizIcon("全部") + '</svg></div>' +
    '<div class="qsc-name">全部</div>' +
    '<div class="qsc-count">' + totalAll + ' 题</div></div>';
  for (var i = 0; i < subjects.length; i++) {
    var s = subjects[i];
    var cnt = countQuizQuestions(QUIZ_DATA[s]);
    var tag = subjectHasChapters(s) ? ' <span class="qsc-tag">' + getQuizChapters(s).length + '章</span>' : '';
    h += '<div class="quiz-subject-card" onclick="selectQuizSubject(\'' + escAttr(s) + '\')">' +
      '<div class="qsc-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + getQuizIcon(s) + '</svg></div>' +
      '<div class="qsc-name">' + escHtml(s) + '</div>' +
      '<div class="qsc-count">' + cnt + ' 题' + tag + '</div></div>';
  }
  document.getElementById("quizSubjectGrid").innerHTML = h;
}

function showQuizChapters() {
  setQuizScreen("chapters");
  renderDiffFilter("quizChapterDiffFilter");
  document.getElementById("quizChapterTitle").textContent = QUIZ_STATE.subject;
  var chapters = getQuizChapters(QUIZ_STATE.subject);
  document.getElementById("quizChapterSub").textContent = QUIZ_STATE.subject + " · 共 " + chapters.length + " 个章节";
  var chIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>';
  var h = '<div class="quiz-chapter-card" onclick="selectQuizChapter(\'\')">' +
    '<div class="qcc-left"><div class="qcc-icon">' + chIcon + '</div><div class="qcc-name">全部章节</div></div>' +
    '<div class="qcc-count">' + countQuizQuestions(QUIZ_DATA[QUIZ_STATE.subject]) + ' 题</div></div>';
  for (var i = 0; i < chapters.length; i++) {
    var c = chapters[i];
    var cnt = 0;
    var arr = QUIZ_DATA[QUIZ_STATE.subject];
    for (var j = 0; j < arr.length; j++) { if (arr[j].chapter === c && quizMatchesDiff(arr[j])) cnt++; }
    h += '<div class="quiz-chapter-card" onclick="selectQuizChapter(\'' + escAttr(c) + '\')">' +
      '<div class="qcc-left"><div class="qcc-icon">' + chIcon + '</div><div class="qcc-name">' + escHtml(c) + '</div></div>' +
      '<div class="qcc-count">' + cnt + ' 题 <span class="qcc-arrow">›</span></div></div>';
  }
  document.getElementById("quizChapterGrid").innerHTML = h;
}

function selectQuizSubject(subject) {
  QUIZ_STATE.subject = subject;
  QUIZ_STATE.chapter = "";
  QUIZ_STATE.subjectHasChapters = subjectHasChapters(subject);
  if (QUIZ_STATE.subjectHasChapters) {
    showQuizChapters();
  } else {
    startQuizPlay();
  }
}

function selectQuizChapter(chapter) {
  QUIZ_STATE.chapter = chapter;
  startQuizPlay();
}

function startQuizPlay() {
  stopExamTimer();
  var qte = document.getElementById("quizTimer");
  if (qte) qte.style.display = "none";
  setQuizScreen("quiz");
  document.getElementById("quizPlayTitle").textContent = QUIZ_STATE.subject;
  document.getElementById("quizSubtitle").textContent = QUIZ_STATE.chapter
    ? QUIZ_STATE.subject + " · " + QUIZ_STATE.chapter
    : (QUIZ_STATE.subject === "全部" ? "全部科目 · 随机练习" : QUIZ_STATE.subject + " · 全部章节");
  filterQuizQuestions();
}

function quizBack() {
  stopExamTimer();
  var qte = document.getElementById("quizTimer");
  if (qte) qte.style.display = "none";
  if (wrongBookMode) {
    wrongBookMode = false;
    var btn = document.getElementById("btnWrongBook");
    if (btn) btn.classList.remove("active");
    showQuizModule();
    return;
  }
  if (QUIZ_STATE.screen === "quiz") {
    if (QUIZ_STATE.mode === "exam") showExamSetupScreen();
    else if (QUIZ_STATE.chapter || QUIZ_STATE.subjectHasChapters) showQuizChapters();
    else showQuizSubjects();
  } else if (QUIZ_STATE.screen === "chapters") {
    showQuizSubjects();
  } else if (QUIZ_STATE.screen === "examhistory") {
    showExamSetupScreen();
  } else if (QUIZ_STATE.screen === "examsetup") {
    showQuizModule();
  } else if (QUIZ_STATE.screen === "subjects") {
    showQuizModule();
  } else if (QUIZ_STATE.screen === "menu") {
    showLearningCenter();
  } else {
    showLearningCenter();
  }
}

var PRACTICE_DONE_KEY = "seawhy-lex-practice-done";
function loadPracticeDone() {
  try { return JSON.parse(localStorage.getItem(PRACTICE_DONE_KEY) || "[]"); } catch(e) { return []; }
}
function savePracticeDone(p) { try { localStorage.setItem(PRACTICE_DONE_KEY, JSON.stringify(p)); } catch(e) {} }
function recordPracticeDone(q, answer, isCorrect) {
  var rec = loadPracticeDone();
  // 去重
  for (var i = 0; i < rec.length; i++) if (rec[i].q === q.q) { rec.splice(i, 1); break; }
  rec.push({ q: q.q, answer: answer, correct: isCorrect });
  if (rec.length > 200) rec = rec.slice(-200);
  savePracticeDone(rec);
}

// 洗选项 + 均匀分布正确答案位置
function shuffleQuestionOptions(list) {
  var ansCounts = [0,0,0,0,0,0]; // track correct answer positions
  for (var qi = 0; qi < list.length; qi++) {
    var q = list[qi];
    var n = (q.opts && q.opts.length) || 0;
    if (n === 0) continue;
    // Create shuffle indices
    var indices = [];
    for (var oi = 0; oi < n; oi++) indices.push(oi);
    // Fisher-Yates shuffle
    for (var si = n - 1; si > 0; si--) {
      var sj = Math.floor(Math.random() * (si + 1));
      var stmp = indices[si]; indices[si] = indices[sj]; indices[sj] = stmp;
    }
    var shuffledOpts = [];
    for (var oi = 0; oi < n; oi++) {
      shuffledOpts.push(q.opts[indices[oi]]);
    }
    if (q.multi) {
      // 多选：只打乱，记录正确答案的新位置数组
      q._shuffledOpts = shuffledOpts;
      var ansOrig = Array.isArray(q.ans) ? q.ans : [q.ans];
      q._shuffledAns = ansOrig.map(function(a) { return indices.indexOf(a); });
    } else {
      // 单选：均匀分布正确答案位置
      var maxPos = Math.min(n, 4);
      var minCount = ansCounts[0], bestPos = 0;
      for (var pi = 1; pi < maxPos; pi++) {
        if (ansCounts[pi] < minCount) { minCount = ansCounts[pi]; bestPos = pi; }
      }
      var ansOrigIdx = indices.indexOf(q.ans);
      if (ansOrigIdx >= 0 && bestPos < n) {
        var swapTmp = indices[bestPos];
        indices[bestPos] = indices[ansOrigIdx];
        indices[ansOrigIdx] = swapTmp;
      }
      var shuffledOpts2 = [];
      for (var oi2 = 0; oi2 < n; oi2++) shuffledOpts2.push(q.opts[indices[oi2]]);
      q._shuffledOpts = shuffledOpts2;
      q._shuffledAns = bestPos < n ? bestPos : (ansOrigIdx >= 0 ? ansOrigIdx : q.ans);
      if (ansOrigIdx < 0) q._shuffledAns = q.ans;
      ansCounts[q._shuffledAns] = (ansCounts[q._shuffledAns] || 0) + 1;
    }
  }
}

function filterQuizQuestions(noReshuffle) {
  var all = [];
  if (QUIZ_STATE.subject === "全部") {
    for (var k in QUIZ_DATA) {
      if (QUIZ_DATA.hasOwnProperty(k)) {
        for (var i = 0; i < QUIZ_DATA[k].length; i++) {
          var q = QUIZ_DATA[k][i];
          if (!quizMatchesDiff(q)) continue;
          q._subject = k;
          q._chapter = q.chapter || "";
          all.push(q);
        }
      }
    }
  } else {
    var arr = QUIZ_DATA[QUIZ_STATE.subject] || [];
    for (var i = 0; i < arr.length; i++) {
      var q = arr[i];
      if (QUIZ_STATE.chapter && q.chapter !== QUIZ_STATE.chapter) continue;
      if (!quizMatchesDiff(q)) continue;
      q._subject = QUIZ_STATE.subject;
      q._chapter = q.chapter || "";
      all.push(q);
    }
  }
  // 练习模式：已做过的题保留记录，排到最后面并标记为已答
  var doneMap = {};
  if (QUIZ_STATE.mode === "practice") {
    var rec = loadPracticeDone();
    for (var ri = 0; ri < rec.length; ri++) doneMap[rec[ri].q] = rec[ri];
  }
  if (QUIZ_STATE.mode === "practice" && !noReshuffle) {
    var notDone = [], doneList = [];
    for (var ai = 0; ai < all.length; ai++) {
      if (doneMap[all[ai].q]) doneList.push(all[ai]); else notDone.push(all[ai]);
    }
    // 洗乱未做过的题
    for (var i = notDone.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = notDone[i]; notDone[i] = notDone[j]; notDone[j] = tmp;
    }
    all = notDone.concat(doneList);
  } else if (!noReshuffle) {
    for (var i = all.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = all[i]; all[i] = all[j]; all[j] = tmp;
    }
  }
  // 洗选项：只有每次进入题目集时洗一次；noReshuffle（切换场景）保持顺序不变
  if (noReshuffle) {
    var needOpts = [];
    for (var qi3 = 0; qi3 < all.length; qi3++) {
      if (all[qi3].opts && all[qi3].opts.length && all[qi3]._shuffledOpts === undefined) needOpts.push(all[qi3]);
    }
    if (needOpts.length) shuffleQuestionOptions(needOpts);
  } else {
    shuffleQuestionOptions(all);
  }
  // 考试模式：按设定题数截取
  if (QUIZ_STATE.mode === "exam" && QUIZ_STATE.examCount > 0 && all.length > QUIZ_STATE.examCount) {
    all = all.slice(0, QUIZ_STATE.examCount);
  }
  QUIZ_STATE.questions = all;
  QUIZ_STATE.currentIndex = 0;
  QUIZ_STATE.answers = {};
  QUIZ_STATE.answered = {};
  QUIZ_STATE.correct = {};
  QUIZ_STATE._examSubmitted = false;
  // 练习模式：恢复已做过的题目状态
  if (QUIZ_STATE.mode === "practice" && !noReshuffle) {
    var rec2 = loadPracticeDone();
    for (var qi2 = 0; qi2 < all.length; qi2++) {
      var qq = all[qi2];
      for (var r2 = 0; r2 < rec2.length; r2++) {
        if (rec2[r2].q === qq.q) {
          QUIZ_STATE.answers[qi2] = rec2[r2].answer;
          QUIZ_STATE.answered[qi2] = true;
          QUIZ_STATE.correct[qi2] = rec2[r2].correct;
          break;
        }
      }
    }
  }
  renderQuizStats();
  renderQuizPage();
}

// ===== 考试记录 =====
var EXAM_HISTORY_KEY = "seawhy-lex-exam-history";
function loadExamHistory() {
  try { var h = JSON.parse(localStorage.getItem(EXAM_HISTORY_KEY) || "[]"); return Array.isArray(h) ? h : []; } catch(e) { return []; }
}
function saveExamHistory(h) { try { localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(h)); } catch(e) {} }
function recordExamResult(rec) {
  var h = loadExamHistory();
  h.unshift(rec);
  if (h.length > 50) h = h.slice(0, 50);
  saveExamHistory(h);
}
function fmtExamDate(ts) {
  var d = new Date(ts);
  return (d.getMonth() + 1) + "." + ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
}
function examRateClass(rate) { return rate >= 80 ? " good" : rate >= 60 ? " mid" : " bad"; }
function showExamHistory() {
  setQuizScreen("examhistory");
  renderExamHistory();
}
function renderExamHistory() {
  var listEl = document.getElementById("examHistoryList");
  var sumEl = document.getElementById("examHistorySummary");
  if (!listEl) return;
  var list = loadExamHistory();
  if (!list.length) {
    if (sumEl) sumEl.innerHTML = "";
    listEl.innerHTML = '<div class="quiz-empty" style="text-align:center;padding:40px 20px;color:var(--text2);font-size:13px">还没有考试记录，回上一页参加第一次考试吧</div>';
    return;
  }
  var sumCorrect = 0, sumTotal = 0, bestRate = 0;
  for (var i = 0; i < list.length; i++) {
    sumCorrect += list[i].correct;
    sumTotal += list[i].total;
    if (list[i].total > 0) {
      var r = Math.round(list[i].correct / list[i].total * 100);
      if (r > bestRate) bestRate = r;
    }
  }
  var avgRate = sumTotal > 0 ? Math.round(sumCorrect / sumTotal * 100) : 0;
  if (sumEl) {
    sumEl.innerHTML = '<div class="exam-hist-sum">'
      + '<div class="wr-stat"><div class="ws-num">' + list.length + '</div><div class="ws-lab">考试次数</div></div>'
      + '<div class="wr-stat"><div class="ws-num">' + avgRate + '%</div><div class="ws-lab">平均正确率</div></div>'
      + '<div class="wr-stat"><div class="ws-num">' + bestRate + '%</div><div class="ws-lab">最佳成绩</div></div>'
      + '</div>';
  }
  var h = "";
  for (var j = 0; j < list.length; j++) {
    var rec = list[j];
    var rate = rec.total > 0 ? Math.round(rec.correct / rec.total * 100) : 0;
    var dur = rec.durationSec ? fmtClock(rec.durationSec) : "--:--";
    var timingTxt = rec.timing === "countdown" ? "倒计时" : "计时";
    h += '<div class="exam-rec' + examRateClass(rate) + '">'
      + '<div class="er-score">' + rate + '%</div>'
      + '<div class="er-info"><div class="er-line1">' + escHtml(rec.subject || "全部") + ' · ' + rec.total + ' 题</div>'
      + '<div class="er-line2">' + fmtExamDate(rec.ts) + ' · 答对 ' + rec.correct + '/' + rec.total + ' · 用时 ' + dur + ' · ' + timingTxt + '</div></div>'
      + '</div>';
  }
  listEl.innerHTML = h;
}

function submitExam() {
  stopExamTimer();
  QUIZ_STATE._examSubmitted = true;
  var total = QUIZ_STATE.questions.length;
  // 交卷时对尚未锁定的题目统一判分（考试模式交卷前可更改答案）
  for (var gi = 0; gi < total; gi++) {
    if (QUIZ_STATE.answered[gi]) continue;
    var sel = QUIZ_STATE.answers[gi];
    if (sel === undefined || (Array.isArray(sel) && sel.length === 0)) continue; // 未作答
    var q = QUIZ_STATE.questions[gi];
    var ans = q._shuffledAns !== undefined ? q._shuffledAns : q.ans;
    var isCorr = answerSetsEqual(sel, ans);
    QUIZ_STATE.answered[gi] = true;
    QUIZ_STATE.correct[gi] = isCorr;
    recordAnswerStat(isCorr);
    if (isCorr) maybeDropJurist(q);
    if (!isCorr) addToWrongBook(q, sel);
    else if (wrongBookMode && q._wbIdx !== undefined) removeFromWrongBook(q.q);
    recordStudyTime(0, 1);
  }
  var correct = 0;
  for (var k in QUIZ_STATE.correct) if (QUIZ_STATE.correct[k]) correct++;
  if (correct > 0 && !wrongBookMode) awardPoints(vipRate(correct), "考试得分");
  // 写入考试记录（倒计时自动交卷同样覆盖）
  if (QUIZ_STATE.mode === "exam") {
    recordExamResult({
      ts: Date.now(),
      subject: QUIZ_STATE.subject || "全部",
      total: total,
      answered: Object.keys(QUIZ_STATE.answered).length,
      correct: correct,
      durationSec: QUIZ_STATE.timerStart ? Math.floor((Date.now() - QUIZ_STATE.timerStart) / 1000) : 0,
      timing: QUIZ_STATE.timerMode || EXAM_SETUP.timing || "countup"
    });
  }
  renderQuizPage();
}

// ===== 考试设置界面（多选来源 + 题数横拉条 + 计时方式）=====
function getQuizSubjectList() {
  var subs = [];
  for (var k in QUIZ_DATA) {
    if (QUIZ_DATA.hasOwnProperty(k) && QUIZ_DATA[k].length > 0) subs.push(k);
  }
  return subs;
}

function showExamSetupScreen() {
  if (!EXAM_SETUP.subjects || !EXAM_SETUP.subjects.length) EXAM_SETUP.subjects = ["全部"];
  if (EXAM_SETUP.chapters === undefined) EXAM_SETUP.chapters = {};
  if (EXAM_SETUP.count < 3) EXAM_SETUP.count = 3;
  if (EXAM_SETUP.count > 50) EXAM_SETUP.count = 50;
  renderExamSources();
  var cnt = document.getElementById("esCount");
  if (cnt) cnt.value = EXAM_SETUP.count;
  var cntVal = document.getElementById("esCountVal");
  if (cntVal) cntVal.textContent = EXAM_SETUP.count + " 题";
  if (EXAM_SETUP.secPerQ < 30) EXAM_SETUP.secPerQ = 30;
  if (EXAM_SETUP.secPerQ > 180) EXAM_SETUP.secPerQ = 180;
  var sec = document.getElementById("esSec");
  if (sec) sec.value = EXAM_SETUP.secPerQ;
  var secVal = document.getElementById("esSecVal");
  if (secVal) secVal.textContent = EXAM_SETUP.secPerQ + " 秒";
  setExamTiming(EXAM_SETUP.timing, true);
  // 难度偏好状态
  if (EXAM_SETUP.diff === undefined) EXAM_SETUP.diff = 0;
  for (var d = 0; d <= 3; d++) {
    var db = document.getElementById("esDiff" + d);
    if (db) db.classList.toggle("active", d === EXAM_SETUP.diff);
  }
  setQuizScreen("examsetup");
}

function setExamDiff(v) {
  EXAM_SETUP.diff = v;
  for (var d = 0; d <= 3; d++) {
    var b = document.getElementById("esDiff" + d);
    if (b) b.classList.toggle("active", d === v);
  }
}

function renderExamSources() {
  var subs = getQuizSubjectList();
  var h = '<div class="es-src' + (EXAM_SETUP.subjects.indexOf("全部") >= 0 ? ' active' : '') + '" onclick="toggleExamSource(\'全部\')">全部</div>';
  for (var i = 0; i < subs.length; i++) {
    var s = subs[i];
    h += '<div class="es-src' + (EXAM_SETUP.subjects.indexOf(s) >= 0 ? ' active' : '') + '" onclick="toggleExamSource(\'' + escAttr(s) + '\')">' + escHtml(s) + '</div>';
  }
  var el = document.getElementById("esSources");
  if (el) el.innerHTML = h;
  renderExamChapters();
}

function toggleExamSource(s) {
  var arr = EXAM_SETUP.subjects;
  var idx = arr.indexOf(s);
  if (s === "全部") {
    EXAM_SETUP.subjects = idx >= 0 ? [] : ["全部"];
  } else {
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(s);
    var ai = arr.indexOf("全部");
    if (ai >= 0) arr.splice(ai, 1); // 选了具体科目就取消"全部"
    if (!arr.length) EXAM_SETUP.subjects = ["全部"]; // 全取消时回到全部
  }
  renderExamSources();
}

// 按科目渲染章节选择（可具体到章节）
function renderExamChapters() {
  var wrap = document.getElementById("esChaptersWrap");
  if (!wrap) return;
  var subs = EXAM_SETUP.subjects.filter(function (s) {
    return s !== "全部" && subjectHasChapters(s);
  });
  var h = "";
  for (var i = 0; i < subs.length; i++) {
    var s = subs[i];
    var chapters = getQuizChapters(s);
    var sel = (EXAM_SETUP.chapters || {})[s] || [];
    h += '<div class="es-label">' + escHtml(s) + ' 章节</div>';
    h += '<div class="es-chips">';
    h += '<div class="es-src' + (sel.length ? "" : " active") + '" onclick="toggleExamChapter(\'' + escAttr(s) + '\',\'__all__\')">全部章节</div>';
    for (var j = 0; j < chapters.length; j++) {
      var c = chapters[j];
      h += '<div class="es-src' + (sel.indexOf(c) >= 0 ? " active" : "") + '" onclick="toggleExamChapter(\'' + escAttr(s) + '\',\'' + escAttr(c) + '\')">' + escHtml(c) + '</div>';
    }
    h += '</div>';
  }
  wrap.innerHTML = h;
}

function toggleExamChapter(subject, chapter) {
  if (!EXAM_SETUP.chapters) EXAM_SETUP.chapters = {};
  var sel = EXAM_SETUP.chapters[subject] || [];
  if (chapter === "__all__") {
    delete EXAM_SETUP.chapters[subject];
  } else {
    var idx = sel.indexOf(chapter);
    if (idx >= 0) sel.splice(idx, 1);
    else sel.push(chapter);
    if (sel.length) EXAM_SETUP.chapters[subject] = sel;
    else delete EXAM_SETUP.chapters[subject];
  }
  renderExamChapters();
}

function setExamTiming(t, silent) {
  EXAM_SETUP.timing = t;
  var up = document.getElementById("esTimingUp");
  var down = document.getElementById("esTimingDown");
  if (up) up.classList.toggle("active", t === "countup");
  if (down) down.classList.toggle("active", t === "countdown");
  var tip = document.getElementById("esTimingTip");
  if (tip) tip.textContent = t === "countdown" ? "倒计时模式：每题时长可调，时间到自动交卷" : "计时模式：不限时，仅记录用时";
  // 倒计时模式才显示每题时长滑条
  var secL = document.getElementById("esSecLabel");
  var sec = document.getElementById("esSec");
  if (secL) secL.style.display = t === "countdown" ? "" : "none";
  if (sec) sec.style.display = t === "countdown" ? "" : "none";
}

function startExamFromSetup() {
  var srcs = EXAM_SETUP.subjects;
  if (!srcs || !srcs.length) { showToast("请至少选择一个题目来源"); return; }
  var count = EXAM_SETUP.count || 10;
  if (count < 3) count = 3;
  if (count > 50) count = 50;
  var isAll = srcs.indexOf("全部") >= 0;
  var srcNames = isAll ? getQuizSubjectList() : srcs;
  var chapters = EXAM_SETUP.chapters || {};
  // 难度混合：选中的难度为主要难度（约 60%），其余难度也会出现（约 40%）
  var primary = [], others = [];
  for (var si = 0; si < srcNames.length; si++) {
    var sName = srcNames[si];
    var arr = QUIZ_DATA[sName] || [];
    var chList = chapters[sName] || [];
    var hasChFilter = chList.length > 0;
    for (var i = 0; i < arr.length; i++) {
      var q = arr[i];
      if (hasChFilter && chList.indexOf(q.chapter || "") < 0) continue;
      q._subject = sName;
      q._chapter = q.chapter || "";
      if (EXAM_SETUP.diff && q.diff === EXAM_SETUP.diff) primary.push(q);
      else others.push(q);
    }
  }
  // 洗乱题目
  for (var pi = primary.length - 1; pi > 0; pi--) {
    var pj = Math.floor(Math.random() * (pi + 1));
    var pt = primary[pi]; primary[pi] = primary[pj]; primary[pj] = pt;
  }
  for (var oi = others.length - 1; oi > 0; oi--) {
    var oj = Math.floor(Math.random() * (oi + 1));
    var ot = others[oi]; others[oi] = others[oj]; others[oj] = ot;
  }
  var all;
  if (EXAM_SETUP.diff) {
    var pCnt = Math.min(primary.length, Math.round(count * 0.6));
    var oCnt = Math.min(others.length, count - pCnt);
    all = primary.slice(0, pCnt).concat(others.slice(0, oCnt));
    if (all.length < count) {
      var need = count - all.length;
      var moreP = primary.slice(pCnt, pCnt + need);
      var moreO = others.slice(oCnt, oCnt + (need - moreP.length));
      all = all.concat(moreP, moreO);
    }
  } else {
    all = others;
  }
  if (!all.length) { showToast("所选科目暂无题目"); return; }
  if (all.length > count) all = all.slice(0, count);
  shuffleQuestionOptions(all);
  QUIZ_STATE.mode = "exam";
  QUIZ_STATE.subject = isAll ? "全部" : srcs.join("、");
  QUIZ_STATE.chapter = "";
  QUIZ_STATE.subjectHasChapters = false;
  QUIZ_STATE.examCount = count;
  QUIZ_STATE.questions = all;
  QUIZ_STATE.currentIndex = 0;
  QUIZ_STATE.answers = {};
  QUIZ_STATE.answered = {};
  QUIZ_STATE.correct = {};
  QUIZ_STATE._examSubmitted = false;
  setQuizScreen("quiz");
  document.getElementById("quizPlayTitle").textContent = "考试模式";
  var spqTxt = EXAM_SETUP.timing === "countdown" ? ("倒计时 · 每题 " + (EXAM_SETUP.secPerQ || 60) + " 秒") : "计时";
  var diffTxt = EXAM_SETUP.diff ? ("以" + (EXAM_SETUP.diff === 3 ? "困难" : EXAM_SETUP.diff === 2 ? "中等" : "简单") + "为主") : "全部难度";
  document.getElementById("quizSubtitle").textContent = QUIZ_STATE.subject + " · " + count + " 题 · " + spqTxt + " · " + diffTxt;
  startExamTimer();
  renderQuizStats();
  renderQuizPage();
}

// ===== 考试计时 =====
function startExamTimer() {
  stopExamTimer();
  QUIZ_STATE.timerMode = EXAM_SETUP.timing;
  QUIZ_STATE.timerStart = Date.now();
  // 倒计时总时长 = 题数 × 每题时长（30s-3min）
  var spq = EXAM_SETUP.secPerQ || 60;
  if (spq < 30) spq = 30; if (spq > 180) spq = 180;
  QUIZ_STATE.timerLimit = QUIZ_STATE.timerMode === "countdown" ? Math.max(60, QUIZ_STATE.questions.length * spq) : 0;
  var el = document.getElementById("quizTimer");
  if (el) { el.style.display = ""; el.classList.remove("danger"); el.classList.remove("warn"); el.classList.remove("countdown"); el.classList.remove("countup"); }
  QUIZ_STATE.timerInterval = setInterval(updateExamTimer, 500);
  updateExamTimer();
}

function stopExamTimer() {
  if (QUIZ_STATE.timerInterval) { clearInterval(QUIZ_STATE.timerInterval); QUIZ_STATE.timerInterval = null; }
}

function fmtClock(s) {
  var m = Math.floor(s / 60);
  var sec = s % 60;
  return (m < 10 ? "0" : "") + m + ":" + (sec < 10 ? "0" : "") + sec;
}

function updateExamTimer() {
  var el = document.getElementById("quizTimer");
  if (!el) return;
  var elapsed = Math.floor((Date.now() - QUIZ_STATE.timerStart) / 1000);
  var solidClock = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="vertical-align:-2px"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.59 4.05 2.3-.99 1.73L11 13.4V7h2v5.59z"/></svg>';
  if (QUIZ_STATE.timerMode === "countdown") {
    var remain = Math.max(0, QUIZ_STATE.timerLimit - elapsed);
    if (remain <= 0 && !QUIZ_STATE._examSubmitted) {
      stopExamTimer();
      el.innerHTML = solidClock + "时间到，已自动交卷";
      if (QUIZ_STATE.mode === "exam") submitExam();
      return;
    }
    el.innerHTML = solidClock + "剩余 " + fmtClock(remain);
    el.classList.add("countdown");
    el.classList.remove("countup");
    el.classList.toggle("danger", remain <= 120);
    el.classList.toggle("warn", remain > 120 && remain <= 300);
  } else {
    el.innerHTML = solidClock + "用时 " + fmtClock(elapsed);
    el.classList.add("countup");
    el.classList.remove("countdown");
    el.classList.remove("danger");
    el.classList.remove("warn");
  }
}

// 已答数：考试交卷前数“有非空选择”的题(单选存数值/多选存数组)，其余状态数 answered
function quizAnsweredCount() {
  if (QUIZ_STATE.mode === "exam" && !QUIZ_STATE._examSubmitted) {
    var qs = QUIZ_STATE.questions || [];
    var n = 0;
    for (var i = 0; i < qs.length; i++) {
      var a = QUIZ_STATE.answers[i];
      if (qs[i] && qs[i].multi) { if (Array.isArray(a) && a.length > 0) n++; }
      else if (a !== undefined && a !== null && a !== "") n++;
    }
    return n;
  }
  return Object.keys(QUIZ_STATE.answered).length;
}
function renderQuizStats() {
  var total = QUIZ_STATE.questions.length;
  var answered = quizAnsweredCount();
  var correct = 0;
  for (var k in QUIZ_STATE.correct) { if (QUIZ_STATE.correct[k]) correct++; }
  var h = '<div class="quiz-stat"><div class="qs-num">' + total + '</div><div class="qs-label">总题数</div></div>';
  h += '<div class="quiz-stat"><div class="qs-num">' + answered + '</div><div class="qs-label">已答</div></div>';
  // 考试交卷前不显示正确数/正确率（避免泄露答案）
  var examHidden = QUIZ_STATE.mode === "exam" && !QUIZ_STATE._examSubmitted;
  if (!examHidden) {
    h += '<div class="quiz-stat"><div class="qs-num">' + correct + '</div><div class="qs-label">正确</div></div>';
    if (answered > 0) {
      h += '<div class="quiz-stat"><div class="qs-num">' + Math.round(correct/answered*100) + '%</div><div class="qs-label">正确率</div></div>';
    }
  }
  document.getElementById("quizStats").innerHTML = h;
  var pct = total > 0 ? Math.round(answered / total * 100) : 0;
  document.getElementById("quizProgressFill").style.width = pct + "%";
  // Update wrong book count
  var wbc = document.getElementById("wbCount");
  if (wbc) wbc.textContent = wrongBook.length;
}

function renderQuizPage() {
  var total = QUIZ_STATE.questions.length;
  if (total === 0) {
    document.getElementById("quizContent").innerHTML = '<div class="quiz-empty"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><p>该科目暂无题目，请选择其他科目</p></div>';
    var nb0 = document.getElementById("quizNavbar");
    if (nb0) nb0.style.display = "none";
    return;
  }

  var startIdx = QUIZ_STATE.currentIndex;
  var endIdx = Math.min(startIdx + QUIZ_PAGE_SIZE, total);
  var h = "";

  for (var i = startIdx; i < endIdx; i++) {
    var q = QUIZ_STATE.questions[i];
    var globalIdx = i;
    var isAnswered = QUIZ_STATE.answered[globalIdx];
    var isCorrect = QUIZ_STATE.correct[globalIdx];
    var selected = QUIZ_STATE.answers[globalIdx];
    var examLocked = QUIZ_STATE.mode === "exam" && !QUIZ_STATE._examSubmitted; // 交卷前不透露对错

    var cardClass = "";
    // 考试交卷前不显示正误红绿框
    if (!examLocked && isAnswered && isCorrect) cardClass = " correct";
    if (!examLocked && isAnswered && !isCorrect) cardClass = " wrong";

    h += '<div class="quiz-card' + cardClass + '" id="quizCard' + globalIdx + '">';
    var diffHtml = "";
    if (q.diff) diffHtml = '<span class="q-diff d' + q.diff + '">' + (q.diff === 3 ? "困难" : q.diff === 2 ? "中等" : "简单") + '</span>';
    if (q.multi) diffHtml += '<span class="q-diff multi">多选</span>';
    if (q.type === "case") diffHtml += '<span class="q-diff case">案例分析</span>';
    h += '<div class="quiz-q-num">#' + (globalIdx + 1) + ' · ' + escHtml(q._subject || "") + (q._chapter ? ' · ' + escHtml(q._chapter) : '') + (QUIZ_STATE.mode === "exam" ? ' · 考试模式' : '') + diffHtml + '</div>';
    if (q.type === "case" && q.case) h += '<div class="quiz-case">' + escHtml(q.case) + '</div>';
    h += '<div class="quiz-q-text">' + escHtml(q.q) + '</div>';

    if (q.opts && q.opts.length > 0) {
      h += '<div class="quiz-options">';
      var labels = ["A","B","C","D","E","F"];
      var showResult = QUIZ_STATE.mode === "exam" && QUIZ_STATE._examSubmitted;
      for (var j = 0; j < q.opts.length; j++) {
        var optClass = "";
        var revealOpt = isAnswered || showResult; // 交卷后未答题也标出正确答案
        if (revealOpt) optClass += " disabled";
        var selArr = Array.isArray(selected) ? selected : (selected === undefined ? [] : [selected]);
        var ansArr = Array.isArray(q._shuffledAns) ? q._shuffledAns : (q._shuffledAns !== undefined ? [q._shuffledAns] : (Array.isArray(q.ans) ? q.ans : [q.ans]));
        var isSel = selArr.indexOf(j) >= 0;
        var isAns = ansArr.indexOf(j) >= 0;
        if (revealOpt && !examLocked && isSel && isAns) optClass += " correct-answer";
        if (revealOpt && !examLocked && isSel && !isAns) optClass += " wrong-answer";
        if (revealOpt && !examLocked && !isSel && isAns) optClass += " correct-answer";
        if (isSel) optClass += " selected";
        h += '<div class="quiz-opt' + optClass + '" onclick="selectAnswer(' + globalIdx + ',' + j + ')" id="opt' + globalIdx + '_' + j + '">';
        h += '<span class="quiz-opt-prefix">' + labels[j] + '.</span>';
        h += '<span>' + escHtml(q._shuffledOpts ? q._shuffledOpts[j] : q.opts[j]) + '</span>';
        h += '<span class="quiz-opt-status">' + (isSel && isAns ? '✓' : isSel && !isAns ? '✕' : '') + '</span>';
        if (q.multi) h += '<span style="margin-left:auto;font-size:12px;opacity:.5">' + (isSel ? '✓' : '') + '</span>';
        h += '</div>';
      }
      h += '</div>';
    }

    var showExplain = (isAnswered && !examLocked) || (QUIZ_STATE.mode === "exam" && QUIZ_STATE._examSubmitted);
    h += '<div class="quiz-explain' + (showExplain ? ' show' : '') + '" id="explain' + globalIdx + '">';
    if (showExplain) {
      var chk = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="vertical-align:-3px;margin-right:2px"><polyline points="20 6 9 17 4 12"/></svg>';
      var crs = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="vertical-align:-3px;margin-right:2px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      var ansLabel = "";
      if (q.opts) {
        var aArr = Array.isArray(q._shuffledAns) ? q._shuffledAns : (q._shuffledAns !== undefined ? [q._shuffledAns] : (Array.isArray(q.ans) ? q.ans : [q.ans]));
        ansLabel = aArr.map(function(ai) { return ["A","B","C","D","E","F"][ai] + '. ' + (q._shuffledOpts ? q._shuffledOpts[ai] : q.opts[ai]); }).join('；');
      }
      h += (isCorrect ? chk + '<strong>回答正确！</strong>' : crs + '<strong>回答错误</strong>（正确答案：' + ansLabel + '）');
      if (q.exp) {
        if (canViewQuizExplanation()) {
          var bk = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-2px;margin-right:3px"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>';
          h += '<br><br>' + bk + escHtml(q.exp);
        } else {
          var remain = getQuizUnlockRemain();
          h += '<div class="quiz-lock-gate"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-2px;margin-right:4px"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>查看解析需开通 VIP（无限查看）或积分解锁' +
            (remain > 0 ? '（已解锁剩余 ' + remain + ' 小时）' : '') +
            '<button class="quiz-btn primary" onclick="openPointsPanel()" style="margin-top:8px;display:block">去解锁</button></div>';
        }
      }
    }
    h += '</div>';

    // 考试模式交卷前可自由勾选/更改，不显示“提交答案”锁定；练习模式保留提交
    if (!isAnswered && q.multi && QUIZ_STATE.mode !== "exam") {
      h += '<div class="quiz-actions"><button class="quiz-btn primary" onclick="submitAnswer(' + globalIdx + ')">提交答案</button></div>';
    }

    h += '</div>';
  }

  if (total > QUIZ_PAGE_SIZE) {
    h += '<div class="quiz-pagination">';
    var totalPages = Math.ceil(total / QUIZ_PAGE_SIZE);
    var curPage = Math.floor(QUIZ_STATE.currentIndex / QUIZ_PAGE_SIZE);
    if (totalPages <= 12) {
      for (var p = 0; p < totalPages; p++) {
        var dotClass = "quiz-page-dot";
        if (p === curPage) dotClass += " current";
        h += '<div class="' + dotClass + '" onclick="goToQuizPage(' + (p * QUIZ_PAGE_SIZE) + ')" style="cursor:pointer;width:10px;height:10px"></div>';
      }
    } else {
      h += '<span class="quiz-page-counter">第 ' + (curPage + 1) + ' / ' + totalPages + ' 题</span>';
    }
    h += '</div>';
  }

  var refSVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="vertical-align:-2px;margin-right:3px"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>';

  var answered = quizAnsweredCount();
  if (QUIZ_STATE.mode === "exam" && !QUIZ_STATE._examSubmitted && total > 0) {
    h += '<div class="quiz-result"><div class="qr-label">' + (answered < total ? '已答 ' + answered + '/' + total + ' 题' : '已完成全部题目') + '，点击交卷查看成绩与解析</div>' +
      '<button class="quiz-btn primary" onclick="submitExam()">交卷查看成绩</button></div>';
  } else if ((answered >= total || QUIZ_STATE._examSubmitted) && total > 0) {
    var correctCount = 0;
    for (var k in QUIZ_STATE.correct) { if (QUIZ_STATE.correct[k]) correctCount++; }
    var pct = correctCount/total;
    var starSVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-4px;margin-right:3px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    var thumbSVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-4px;margin-right:3px"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>';
    var booksSVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-4px;margin-right:3px"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="11" r="1.5" fill="currentColor"/></svg>';
    h += '<div class="quiz-result"><div class="qr-score">' + correctCount + '/' + total + '</div>';
    h += '<div class="qr-label">' + (pct >= 0.8 ? starSVG + '太棒了！你掌握了扎实的法律知识！' : pct >= 0.6 ? thumbSVG + '不错！继续加油！' : booksSVG + '还需努力，多看看法条和解析吧！') + '</div>';
    var restartOnclick = QUIZ_STATE.mode === "exam" ? 'showExamSetupScreen()' : 'filterQuizQuestions()';
    h += '<button class="quiz-btn primary" onclick="' + restartOnclick + '">' + refSVG + '重新开始</button></div>';
  }

  if (wrongBookMode) {
    h += '<div class="quiz-actions" style="justify-content:center;margin-top:10px"><button class="quiz-btn secondary" onclick="clearWrongBook()">清空错题本</button></div>';
  }

  document.getElementById("quizContent").innerHTML = h;
  renderQuizStats();
  // 固定底部导航：上一页/下一页
  var navbar = document.getElementById("quizNavbar");
  var prevBtn = document.getElementById("quizPrevBtn");
  var nextBtn = document.getElementById("quizNextBtn");
  var multi = total > QUIZ_PAGE_SIZE;
  if (navbar) navbar.style.display = multi ? "flex" : "none";
  // 导航栏隐藏时去掉底部 90px 留白
  var qBody = document.querySelector("#quizView .quiz-body");
  if (qBody) qBody.classList.toggle("has-nav", multi);
  if (prevBtn) prevBtn.disabled = !multi || startIdx <= 0;
  if (nextBtn) nextBtn.disabled = !multi || endIdx >= total;
}

function selectAnswer(qIdx, optIdx) {
  if (QUIZ_STATE._examSubmitted) return; // 交卷后不可再作答
  if (QUIZ_STATE.answered[qIdx]) return;
  var qs = QUIZ_STATE.questions[qIdx];
  if (qs.multi) {
    // 多选：点击切换勾选，需手动提交
    var selArr = QUIZ_STATE.answers[qIdx];
    if (!Array.isArray(selArr)) selArr = [];
    var fi = selArr.indexOf(optIdx);
    if (fi >= 0) selArr.splice(fi, 1); else selArr.push(optIdx);
    QUIZ_STATE.answers[qIdx] = selArr;
    renderQuizPage();
  } else {
    // 单选题：练习模式选择即提交；考试模式交卷前可更改，不锁定
    QUIZ_STATE.answers[qIdx] = optIdx;
    if (QUIZ_STATE.mode === "exam" && !QUIZ_STATE._examSubmitted) {
      renderQuizPage();
    } else {
      submitAnswer(qIdx);
    }
  }
}

function answerSetsEqual(a, b) {
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    return a.every(function(x) { return b.indexOf(x) >= 0; });
  }
  return a === b;
}

function submitAnswer(qIdx) {
  if (QUIZ_STATE._examSubmitted) return; // 交卷后不可再作答
  if (QUIZ_STATE.answered[qIdx]) return;
  var sel = QUIZ_STATE.answers[qIdx];
  if (sel === undefined || (Array.isArray(sel) && sel.length === 0)) {
    showToast("请先选择选项");
    return;
  }
  var q = QUIZ_STATE.questions[qIdx];
  var ans = q._shuffledAns !== undefined ? q._shuffledAns : q.ans;
  var isCorrect = answerSetsEqual(sel, ans);
  if (isCorrect) maybeDropJurist(q);
  QUIZ_STATE.answered[qIdx] = true;
  QUIZ_STATE.correct[qIdx] = isCorrect;
  recordAnswerStat(isCorrect);
  if (QUIZ_STATE.mode === "practice" && !wrongBookMode) recordPracticeDone(q, sel, isCorrect);
  if (!isCorrect) { addToWrongBook(q, sel); }
  else if (wrongBookMode && q._wbIdx !== undefined) { removeFromWrongBook(q.q); }
  recordStudyTime(0, 1);
  if (isCorrect && !wrongBookMode) awardPoints(vipRate(1), "答对");
  renderQuizPage();
  if (QUIZ_STATE.mode !== "exam") {
    setTimeout(function() {
      var el = document.getElementById("explain" + qIdx);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }
}

// ===== 错题本 =====
var WRONG_BOOK_KEY = "seawhy-lex-wrong-book";
var wrongBook = [];
var wrongBookMode = false;

try { var wb = localStorage.getItem(WRONG_BOOK_KEY); if (wb) { var p = JSON.parse(wb); if (Array.isArray(p)) wrongBook = p; } } catch(e) {}

function saveWrongBook() { try { localStorage.setItem(WRONG_BOOK_KEY, JSON.stringify(wrongBook)); } catch(e) {} }

function addToWrongBook(q, userAns) {
  // Dedup by question text
  for (var i = 0; i < wrongBook.length; i++) {
    if (wrongBook[i].q === q.q) {
      wrongBook[i]._time = Date.now();
      wrongBook[i]._userAns = userAns;
      saveWrongBook();
      return;
    }
  }
  wrongBook.push({
    q: q.q, opts: q.opts, ans: q.ans, exp: q.exp,
    _subject: q._subject || "",
    _userAns: userAns,
    _time: Date.now(),
    multi: q.multi ? true : false
  });
  saveWrongBook();
}

function removeFromWrongBook(qText) {
  wrongBook = wrongBook.filter(function(w) { return w.q !== qText; });
  saveWrongBook();
  // 错题被消灭：计入本周学习报告
  try {
    var stats = loadLearnStats();
    var today = getTodayStr();
    if (!stats.days[today]) stats.days[today] = { min: 0, q: 0, sec: 0 };
    stats.days[today].m = (stats.days[today].m || 0) + 1;
    saveLearnStats(stats);
  } catch(e) {}
}

function clearWrongBook() {
  if (!wrongBook.length) return;
  if (!confirm("确定清空所有错题记录吗？此操作不可恢复。")) return;
  wrongBook = [];
  saveWrongBook();
  if (wrongBookMode) { showWrongBook(); }
  showToast("错题本已清空");
}

function showWrongBook() {
  QUIZ_STATE.mode = "practice"; // 错题本复习按练习模式展示答案
  wrongBookMode = true;
  setQuizScreen("quiz");
  document.getElementById("quizPlayTitle").textContent = "错题本";
  if (wrongBook.length === 0) {
    document.getElementById("quizContent").innerHTML = '<div class="quiz-wrongbook-empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><p style="font-size:15px;font-weight:600;margin-bottom:6px">暂无错题</p><p style="font-size:12px;color:var(--text2)">完成练习或考试，答错的题目会记录在这里</p><button class="quiz-btn primary" style="margin-top:14px;padding:10px 24px" onclick="goBackFromQuizEmpty()">开始练习</button></div>';
    document.getElementById("quizSubtitle").textContent = "错题本 · 暂无记录";
    renderQuizStats();
    return;
  }
  document.getElementById("quizSubtitle").textContent = "错题本 · 共 " + wrongBook.length + " 道错题";

  // Build questions from wrong book
  QUIZ_STATE.questions = wrongBook.map(function(w, i) {
    return { q: w.q, opts: w.opts, ans: w.ans, exp: w.exp, _subject: w._subject || "错题", _wbIdx: i };
  });
  QUIZ_STATE.currentIndex = 0;
  QUIZ_STATE.answers = {};
  QUIZ_STATE.answered = {};
  QUIZ_STATE.correct = {};
  renderQuizStats();
  renderQuizPage();
}

function retryWrongBook() {
  wrongBookMode = true;
  showWrongBook();
}

function goBackFromQuizEmpty() {
  wrongBookMode = false;
  QUIZ_STATE.mode = "practice";
  setQuizScreen("menu");
  document.getElementById("quizSubtitle").textContent = "法考真题 · 章节练习 · 错题回顾";
  renderQuizStats();
}

function removeWrongAfterCorrect(qText) {
  removeFromWrongBook(qText);
  if (wrongBook.length === 0) {
    wrongBookMode = false;
    document.getElementById("btnWrongBook") && document.getElementById("btnWrongBook").classList.remove("active");
  }
}

function prevQuizPage() {
  QUIZ_STATE.currentIndex = Math.max(0, QUIZ_STATE.currentIndex - QUIZ_PAGE_SIZE);
  renderQuizPage();
}

function nextQuizPage() {
  var total = QUIZ_STATE.questions.length;
  QUIZ_STATE.currentIndex = Math.min(total - 1, QUIZ_STATE.currentIndex + QUIZ_PAGE_SIZE);
  renderQuizPage();
}

function goToQuizPage(idx) {
  QUIZ_STATE.currentIndex = idx;
  renderQuizPage();
}


// ============================================================
// DOCUMENT GENERATION
// ============================================================
var DOC_TYPES = [
  { id:"purchase", name:"买卖合同", icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>', desc:"货物买卖 · 设备采购 · 商品销售", fields:[
    {key:"buyer",label:"买方（甲方）",placeholder:"公司/个人全称",type:"text"},
    {key:"seller",label:"卖方（乙方）",placeholder:"公司/个人全称",type:"text"},
    {key:"goods",label:"标的物",placeholder:"货物名称、规格、型号",type:"text"},
    {key:"quantity",label:"数量",placeholder:"如：100件",type:"text"},
    {key:"price",label:"单价",placeholder:"如：500元/件",type:"text"},
    {key:"total",label:"总价",placeholder:"如：50000元",type:"text"},
    {key:"delivery",label:"交货地点与日期",placeholder:"如：北京市朝阳区XX路，2026年7月1日前",type:"text"},
    {key:"payment",label:"付款方式",placeholder:"如：货到验收合格后30日内付全款",type:"text"},
    {key:"breach",label:"违约责任",placeholder:"如：逾期每日按总价0.1%支付违约金",type:"text"},
    {key:"extra",label:"其他约定（选填）",placeholder:"如：争议由甲方所在地法院管辖",type:"textarea"}
  ]},
  { id:"loan", name:"借款合同", icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>', desc:"个人借贷 · 企业拆借 · 抵押借款", fields:[
    {key:"lender",label:"出借人（甲方）",placeholder:"全称",type:"text"},
    {key:"borrower",label:"借款人（乙方）",placeholder:"全称",type:"text"},
    {key:"amount",label:"借款金额",placeholder:"如：人民币壹拾万元整（¥100,000）",type:"text"},
    {key:"rate",label:"年利率",placeholder:"如：合同成立时一年期LPR的4倍以内",type:"text"},
    {key:"term",label:"借款期限",placeholder:"如：自2026年7月1日至2027年6月30日",type:"text"},
    {key:"method",label:"还款方式",placeholder:"如：到期一次性还本付息 / 按月等额本息",type:"text"},
    {key:"guarantee",label:"担保方式（选填）",placeholder:"如：保证人XXX / 房产抵押",type:"text"},
    {key:"extra",label:"其他约定（选填）",placeholder:"",type:"textarea"}
  ]},
  { id:"employment", name:"劳动合同", icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>', desc:"固定期限 · 无固定期限 · 试用期", fields:[
    {key:"employer",label:"用人单位（甲方）",placeholder:"公司全称",type:"text"},
    {key:"employee",label:"劳动者（乙方）",placeholder:"姓名",type:"text"},
    {key:"position",label:"工作岗位",placeholder:"如：软件工程师",type:"text"},
    {key:"salary",label:"工资待遇",placeholder:"如：月薪8000元 + 绩效",type:"text"},
    {key:"term",label:"合同期限",placeholder:"如：3年，试用期3个月",type:"text"},
    {key:"location",label:"工作地点",placeholder:"如：北京市海淀区",type:"text"},
    {key:"hours",label:"工时制度",placeholder:"如：标准工时制 / 综合计算工时制",type:"text"},
    {key:"extra",label:"其他约定（选填）",placeholder:"如：保密协议、竞业限制等",type:"textarea"}
  ]},
  { id:"lease", name:"租赁合同", icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>', desc:"房屋租赁 · 设备租赁 · 车辆租赁", fields:[
    {key:"lessor",label:"出租人（甲方）",placeholder:"全称",type:"text"},
    {key:"lessee",label:"承租人（乙方）",placeholder:"全称",type:"text"},
    {key:"property",label:"租赁物",placeholder:"如：位于XX市XX区XX路XX号的房屋（面积XX㎡）",type:"text"},
    {key:"rent",label:"租金",placeholder:"如：每月3000元",type:"text"},
    {key:"term",label:"租期",placeholder:"如：自2026年7月1日至2027年6月30日",type:"text"},
    {key:"deposit",label:"押金（选填）",placeholder:"如：一个月租金",type:"text"},
    {key:"purpose",label:"租赁用途",placeholder:"如：居住 / 办公 / 经营",type:"text"},
    {key:"extra",label:"其他约定（选填）",placeholder:"如：不得转租、装修限制等",type:"textarea"}
  ]},
  { id:"complaint", name:"民事起诉状", icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="8"/><path d="M8 8h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8z"/><line x1="8" y1="19" x2="16" y2="19"/><line x1="12" y1="16" x2="12" y2="22"/></svg>', desc:"合同纠纷 · 侵权纠纷 · 婚姻家庭", fields:[
    {key:"plaintiff",label:"原告",placeholder:"姓名/名称、性别、出生日期、身份证号、住址、联系电话",type:"textarea"},
    {key:"defendant",label:"被告",placeholder:"姓名/名称、住址、联系电话",type:"textarea"},
    {key:"cause",label:"案由",placeholder:"如：买卖合同纠纷 / 民间借贷纠纷 / 离婚纠纷",type:"text"},
    {key:"claims",label:"诉讼请求",placeholder:"如：1.判令被告支付货款50000元及利息；2.诉讼费由被告承担",type:"textarea"},
    {key:"facts",label:"事实与理由",placeholder:"详细描述纠纷经过、关键时间节点、已发生的交涉情况",type:"textarea"},
    {key:"court",label:"管辖法院（选填）",placeholder:"如：北京市朝阳区人民法院",type:"text"}
  ]},
  { id:"answer", name:"民事答辩状", icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', desc:"应诉答辩 · 反驳主张 · 提出抗辩", fields:[
    {key:"respondent",label:"答辩人",placeholder:"姓名/名称、住址、联系电话",type:"textarea"},
    {key:"plaintiff2",label:"被答辩人（原告）",placeholder:"姓名/名称",type:"text"},
    {key:"cause",label:"案由",placeholder:"如：买卖合同纠纷",type:"text"},
    {key:"defense",label:"答辩意见",placeholder:"针对原告诉讼请求的逐一反驳意见及理由",type:"textarea"},
    {key:"facts",label:"事实与理由",placeholder:"详细说明对原告主张的异议及依据",type:"textarea"}
  ]},
  { id:"appeal", name:"上诉状", icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>', desc:"不服一审判决 · 二审程序", fields:[
    {key:"appellant",label:"上诉人",placeholder:"一审原告/被告，基本信息",type:"textarea"},
    {key:"appellee",label:"被上诉人",placeholder:"对方当事人信息",type:"textarea"},
    {key:"case_info",label:"原审案件信息",placeholder:"如：XX人民法院(2026)X民初XX号民事判决",type:"text"},
    {key:"appeal_claims",label:"上诉请求",placeholder:"如：1.撤销原判；2.改判驳回原告全部诉讼请求",type:"textarea"},
    {key:"grounds",label:"上诉理由",placeholder:"详细说明一审判决认定事实错误、适用法律不当等理由",type:"textarea"}
  ]},
  { id:"agency", name:"代理词", icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>', desc:"庭审陈述 · 代理意见 · 辩论要点", fields:[
    {key:"lawyer",label:"代理人",placeholder:"律师事务所名称 + 律师姓名",type:"text"},
    {key:"client",label:"被代理人",placeholder:"当事人姓名/名称（原告/被告）",type:"text"},
    {key:"case_info",label:"案件信息",placeholder:"如：XX诉XX买卖合同纠纷案",type:"text"},
    {key:"position",label:"代理立场",placeholder:"如：支持原告诉讼请求 / 驳回原告起诉",type:"text"},
    {key:"arguments",label:"主要论点",placeholder:"核心论证要点，每条一行",type:"textarea"},
    {key:"evidence",label:"证据清单（选填）",placeholder:"列出关键证据及其证明目的",type:"textarea"}
  ]}
];

var DOC_STATE = { selectedType: null, generating: false, result: "" };

function showDocGen() {
  hideAllViews();
  document.getElementById("docView").classList.add("show");
  recordLastStudy("docView");
  DOC_STATE = { selectedType: null, generating: false, result: "" };
  renderDocTypes();
  document.getElementById("docFormArea").innerHTML = "";
  document.getElementById("docResultArea").innerHTML = "";
}

function renderDocTypes() {
  var h = "";
  for (var i = 0; i < DOC_TYPES.length; i++) {
    var t = DOC_TYPES[i];
    var sel = DOC_STATE.selectedType && DOC_STATE.selectedType.id === t.id ? " selected" : "";
    h += '<div class="doc-type-card' + sel + '" onclick="selectDocType(\'' + t.id + '\')">';
    h += '<div class="dt-icon">' + t.icon + '</div>';
    h += '<div class="dt-name">' + t.name + '</div>';
    h += '<div class="dt-desc">' + t.desc + '</div>';
    h += '</div>';
  }
  document.getElementById("docTypeGrid").innerHTML = h;
}

function selectDocType(id) {
  var t = DOC_TYPES.find(function(d) { return d.id === id; });
  if (!t) return;
  DOC_STATE.selectedType = t;
  DOC_STATE.result = "";
  renderDocTypes();
  renderDocForm();
  document.getElementById("docResultArea").innerHTML = "";
  document.getElementById("docSubtitle").textContent = t.name + " · 填写关键信息后一键生成";
}

function renderDocForm() {
  var t = DOC_STATE.selectedType;
  if (!t) return;
  var h = '<div class="doc-form"><h3>' + t.icon + ' ' + t.name + '</h3>';
  for (var i = 0; i < t.fields.length; i++) {
    var f = t.fields[i];
    h += '<div class="doc-field"><label>' + f.label + '</label>';
    if (f.type === "textarea") {
      h += '<textarea id="docField_' + f.key + '" placeholder="' + escAttr(f.placeholder) + '" rows="3"></textarea>';
    } else {
      h += '<input type="text" id="docField_' + f.key + '" placeholder="' + escAttr(f.placeholder) + '" />';
    }
    h += '</div>';
  }
  h += '<div class="doc-btn-row"><button class="doc-btn primary" onclick="generateDoc()">🤖 AI 生成文书</button>';
  h += '<button class="doc-btn secondary" onclick="clearDocForm()">清空</button></div>';
  h += '</div>';
  document.getElementById("docFormArea").innerHTML = h;
}

function clearDocForm() {
  var t = DOC_STATE.selectedType;
  if (!t) return;
  for (var i = 0; i < t.fields.length; i++) {
    var el = document.getElementById("docField_" + t.fields[i].key);
    if (el) el.value = "";
  }
}


function renderDocResult() {
  var area = document.getElementById("docResultArea");
  if (!DOC_STATE.result) { area.innerHTML = ''; return; }
  area.innerHTML = '<div class="doc-result-content" style="max-height:none;background:var(--card-bg);box-shadow:none">' + renderMD(DOC_STATE.result) + '</div><div class="doc-actions" style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">' +
    '<button class="doc-btn secondary" style="flex:1;min-width:120px;justify-content:center" onclick="copyDocResult()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="vertical-align:-2px;margin-right:4px"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>复制全文</button>' +
    '<button class="doc-btn primary" style="flex:1;min-width:120px;justify-content:center" onclick="downloadDocResult()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="vertical-align:-2px;margin-right:4px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>下载 TXT</button>' +
    '</div>';
}
function downloadDocResult() {
  if (!DOC_STATE.result) return;
  var t = DOC_STATE.result;
  var name = (DOC_STATE.selectedType && DOC_STATE.selectedType.name) || "法律文书";
  var blob = new Blob([t], { type: "text/plain;charset=utf-8" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name + ".txt";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1000);
  showToast("正在下载...");
}
function copyDocResult() {
  if (!DOC_STATE.result) return;
  var t = document.createElement('textarea');
  t.value = DOC_STATE.result; t.style.position = 'fixed'; t.style.opacity = '0';
  document.body.appendChild(t); t.select();
  try { document.execCommand('copy'); showToast('已复制'); } catch(e) { showToast('复制失败'); }
  document.body.removeChild(t);
}

function generateDoc() {
  if (DOC_STATE.generating) return;
  var t = DOC_STATE.selectedType;
  if (!t) { showToast("请先选择文书类型"); return; }

  var fields = {};
  var hasContent = false;
  for (var i = 0; i < t.fields.length; i++) {
    var el = document.getElementById("docField_" + t.fields[i].key);
    var val = el ? el.value.trim() : "";
    fields[t.fields[i].key] = val;
    if (val) hasContent = true;
  }
  if (!hasContent) { showToast("请至少填写一项关键信息"); return; }

  var result = buildDocTemplate(t, fields);
  DOC_STATE.result = result;
  renderDocResult();
  document.getElementById("docResultArea").scrollIntoView({ behavior: "smooth" });
  // 积分：生成文书（每日限3次）
  if (dailyCount("doc") < 3) { dailyInc("doc"); awardPoints(vipRate(1), "生成文书"); }
}

function regenerateDoc() {
  DOC_STATE.result = "";
  generateDoc();
}

// ============================================================
// 每日案件推理：三步微型案例，奖励与学习完成度直接绑定
// ============================================================
var DAILY_CASE_KEY = "seawhy-lex-daily-case-v1";
var DAILY_CASES = [
  { title:"深夜的花盆", area:"侵权责任", fact:"深夜，一只花盆从某小区 12 楼坠落，砸伤正在经过的小周。警方无法确认具体抛掷人，但能确认花盆来自 12 楼东侧相邻住户使用的公共外窗区域。", steps:[
    { q:"第一步：本案首先应围绕什么法律关系展开？", options:["劳动争议","高空抛物、坠物损害责任","买卖合同纠纷","行政处罚"], answer:1, why:"本案属于物件脱落、坠落造成他人损害的侵权责任问题，应先审查高空抛物、坠物规则。" },
    { q:"第二步：无法查明具体侵权人时，可能承担补偿责任的是？", options:["小区所有住户","可能加害的建筑物使用人","物业公司当然全额赔偿","受害人自行承担"], answer:1, why:"在难以确定具体侵权人的情况下，可能加害的建筑物使用人可能依法给予补偿；具体范围仍须结合证据判断。" },
    { q:"第三步：物业服务企业的合理义务更接近哪一项？", options:["完全免责","采取必要安全保障措施并及时报告","代替住户承担全部赔偿","只在发生事故后张贴通知"], answer:1, why:"物业等建筑物管理人应采取必要的安全保障措施；未尽到义务的，可能依法承担相应责任。" }
  ]},
  { title:"被撤回的订金", area:"合同法", fact:"小林在二手平台看中一台相机，向卖家转了 500 元并备注“订金”。卖家随后以价格上涨为由拒绝交易。双方没有书面约定违约后如何处理。", steps:[
    { q:"第一步：判断“订金”法律效果时，最关键的材料是什么？", options:["转账金额大小","双方对款项性质和违约后果的明确约定","卖家是否后悔","平台粉丝数量"], answer:1, why:"定金罚则需要当事人对定金性质及相应法律效果有明确合意，不能仅凭备注机械认定。" },
    { q:"第二步：若无法证明存在定金合意，500 元通常更可能被认定为？", options:["赠与","预付款或订约款","行政罚款","保证金"], answer:1, why:"没有充分证据证明定金合意时，款项通常按预付款、订约款等性质处理，再依交易是否成立判断返还。" },
    { q:"第三步：小林保留聊天记录的主要价值是？", options:["证明双方意思表示与交易内容","替代法院裁判","自动获得双倍返还","让平台直接处罚卖家"], answer:0, why:"聊天记录可用于证明商品、价格、交付、款项性质等意思表示，是判断合同关系的重要证据。" }
  ]},
  { title:"借来的车", area:"侵权责任", fact:"小许将汽车借给朋友小陈使用，明知小陈刚拿到驾照且夜间视力较差。小陈夜间发生追尾，造成他人车辆损坏。", steps:[
    { q:"第一步：事故直接侵害他人财产的行为人是？", options:["小许","小陈","保险公司","车辆生产商"], answer:1, why:"小陈驾驶车辆发生追尾，是直接实施侵害行为的一方。" },
    { q:"第二步：小许是否可能承担责任，重点要看？", options:["车辆颜色","出借时是否存在过错","双方是否是朋友","事故发生的季节"], answer:1, why:"机动车所有人、管理人对损害发生有过错的，可能承担相应责任；本案需审查其明知风险仍出借的情形。" },
    { q:"第三步：处理此类案件，优先固定哪类证据？", options:["朋友圈截图","驾驶资格、借车沟通和事故责任认定","两人认识多久","车辆装饰照片"], answer:1, why:"驾驶资格、出借时的沟通记录和事故责任认定，直接关系到各方过错及责任范围。" }
  ]}
];

function dailyCaseIndex() {
  var base = Date.UTC(2026, 0, 1);
  return Math.abs(Math.floor((Date.now() - base) / 86400000)) % DAILY_CASES.length;
}
function loadDailyCaseState() {
  var today = getTodayStr();
  try {
    var state = JSON.parse(localStorage.getItem(DAILY_CASE_KEY) || "{}");
    if (state.date === today && Array.isArray(state.answers)) return state;
  } catch(e) {}
  return {date:today, answers:[], completed:false, rewarded:false};
}
function saveDailyCaseState(state) { try { localStorage.setItem(DAILY_CASE_KEY, JSON.stringify(state)); } catch(e) {} }
function showDailyCase() {
  hideAllViews();
  var view = document.getElementById("dailyCaseView");
  view.style.display = "";
  view.classList.add("show");
  recordLastStudy("dailyCaseView");
  renderDailyCase();
  var body = document.getElementById("dailyCaseBody");
  if (body) body.focus();
}
function renderDailyCaseEntry() {
  var meta = document.getElementById("dailyCaseEntryMeta");
  if (!meta) return;
  var state = loadDailyCaseState();
  meta.textContent = state.completed ? "今日已完成 · 可回看推理过程" : "3 个线索 · 约 3 分钟 · 完成得学习积分";
}
function renderDailyCase() {
  var body = document.getElementById("dailyCaseBody");
  if (!body) return;
  var data = DAILY_CASES[dailyCaseIndex()];
  var state = loadDailyCaseState();
  var current = Math.min(state.answers.length, data.steps.length);
  if (state.completed || current === data.steps.length) { renderDailyCaseResult(body, data, state); return; }
  var step = data.steps[current];
  var progress = "";
  for (var i=0;i<data.steps.length;i++) progress += '<span class="' + (i < current ? 'done' : '') + '"></span>';
  var letters = ["A","B","C","D"];
  var options = step.options.map(function(option, index) {
    return '<button class="dc-option" type="button" onclick="answerDailyCase(' + index + ')" aria-label="选项 ' + letters[index] + '：' + escHtml(option) + '"><span class="dc-letter">' + letters[index] + '</span><span>' + escHtml(option) + '</span></button>';
  }).join("");
  body.innerHTML = '<div class="dc-kicker"><i></i>今日案例 · ' + escHtml(data.area) + '</div><h1 class="dc-title">' + escHtml(data.title) + '</h1><p class="dc-subtitle">先读案情，再用三步梳理法律问题。答错也能继续，重点是理解推理路径。</p><div class="dc-progress" aria-label="第 ' + (current + 1) + ' 步，共 ' + data.steps.length + ' 步">' + progress + '</div><section class="dc-card"><h2>案情</h2><p>' + escHtml(data.fact) + '</p><div class="dc-hint"><span aria-hidden="true">提示</span><span>' + escHtml(step.q) + '</span></div><div class="dc-options">' + options + '</div></section>';
}
function answerDailyCase(choice) {
  var data = DAILY_CASES[dailyCaseIndex()];
  var state = loadDailyCaseState();
  var stepIndex = state.answers.length;
  var step = data.steps[stepIndex];
  if (!step || typeof state.answers[stepIndex] !== "undefined") return;
  state.answers.push(choice);
  saveDailyCaseState(state);
  var buttons = document.querySelectorAll(".dc-option");
  buttons.forEach(function(btn, idx) {
    btn.disabled = true;
    if (idx === step.answer) btn.classList.add("correct");
    else if (idx === choice) btn.classList.add("incorrect");
  });
  var correct = choice === step.answer;
  var card = document.querySelector(".dc-card");
  if (!card) return;
  var feedback = document.createElement("div");
  feedback.className = "dc-feedback";
  feedback.innerHTML = '<strong>' + (correct ? '判断正确' : '这一项不太准确') + '</strong>' + escHtml(step.why);
  card.appendChild(feedback);
  var next = document.createElement("button");
  next.className = "dc-next";
  next.type = "button";
  next.textContent = stepIndex === data.steps.length - 1 ? "查看今日复盘" : "继续下一步";
  next.onclick = function() { renderDailyCase(); };
  card.appendChild(next);
}
function renderDailyCaseResult(body, data, state) {
  var correct = 0;
  data.steps.forEach(function(step, i) { if (state.answers[i] === step.answer) correct++; });
  if (!state.completed) {
    state.completed = true;
    if (!state.rewarded) {
      var reward = correct === data.steps.length ? 8 : 4;
      awardPoints(vipRate(reward), "每日案件推理");
      recordStudyTime(0, data.steps.length);
      state.rewarded = true;
      state.reward = vipRate(reward);
      addPersonaXp("evidence", 1);
      addFirmReputation(2, "完成今日案件推理");
    }
    saveDailyCaseState(state);
  }
  body.innerHTML = '<div class="dc-kicker"><i></i>今日复盘</div><section class="dc-card dc-result"><div class="dc-score">' + correct + '/' + data.steps.length + '</div><h1 class="dc-title">' + (correct === data.steps.length ? '推理路径很完整' : '完成一次有效推理') + '</h1><p>你已完成「' + escHtml(data.title) + '」。' + (state.reward ? '本次获得 ' + state.reward + ' 学习积分。' : '今天的学习积分已发放。') + '</p><div class="dc-result-actions"><button class="dc-next" type="button" onclick="showLearningCenter()">回到学习中心</button><button class="dc-secondary" type="button" onclick="resetDailyCaseReview()">回看本题</button></div></section>';
  renderDailyCaseEntry();
}
function resetDailyCaseReview() {
  var state = loadDailyCaseState();
  state.answers = [];
  state.completed = false;
  saveDailyCaseState(state);
  renderDailyCase();
}

// ============================================================
// 模拟法庭：选择角色，完成开庭、质证、总结三回合
// ============================================================
var MOOT_COURT_KEY = "seawhy-lex-moot-court-v1";
var MOOT_STATE = {role:null, round:0, answers:[]};
var MOOT_ROLES = {
  plaintiff:{name:"原告代理人", desc:"围绕损害、因果关系和请求权组织主张", opponent:"被告代理人主张：现有证据不足以证明其应承担全部责任。", rounds:[
    {stage:"开庭陈述", question:"你的首要任务是什么？", options:["先概括争议焦点，并明确待证明的法律要件","直接要求法官支持全部请求，不说明理由","只描述个人感受，不关联案件事实"], answer:0, why:"有效开庭陈述应把事实、争点和法律要件连起来，让法官知道后续证据要证明什么。"},
    {stage:"证据质证", question:"面对对方的否认，最有力的回应是？", options:["追问关键证据来源，并说明它与待证事实的联系","重复自己的结论，不回应对方问题","要求对方立刻承认全部责任"], answer:0, why:"质证的重点是证据的真实性、关联性与证明力，而不是重复结论。"},
    {stage:"法庭总结", question:"总结陈词应当如何收束？", options:["按“事实—规则—结论”重申请求与理由","增加与本案无关的新事实","只强调对方态度不好"], answer:0, why:"好的总结要将已查明事实对应法律规则，再回到具体请求。"}
  ]},
  defendant:{name:"被告代理人", desc:"围绕事实争点、证据边界和责任范围展开答辩", opponent:"原告代理人主张：现有事实已经足以支持其全部赔偿请求。", rounds:[
    {stage:"开庭答辩", question:"第一回应更应聚焦于？", options:["区分已证明事实与尚待证明的要件","否认所有事实且不说明理由","只谈双方私交"], answer:0, why:"答辩不是笼统否认，而是准确指出对方尚未证明的关键事实或法律要件。"},
    {stage:"证据质证", question:"审查对方证据时，优先问什么？", options:["证据是否真实、相关，并足以证明待证事实","证据是否对自己不利","证人是否穿着正式"], answer:0, why:"真实性、关联性、合法性和证明力，是质证中可被检验的核心。"},
    {stage:"法庭总结", question:"一个稳妥的总结策略是？", options:["明确可承担与不可承担的责任边界，并对应证据说明","回避所有争点","重复质疑但不提出结论"], answer:0, why:"即使存在一定责任，也应围绕过错、因果关系和损失范围提出清晰的边界。"}
  ]},
  judge:{name:"审判长", desc:"主持争点整理、证据审查与裁判说理", opponent:"双方对事实和责任范围存在分歧，法庭需要先厘清可裁判的争点。", rounds:[
    {stage:"法庭调查", question:"主持庭审时最先要做什么？", options:["归纳双方无争议事实与核心争点","立即宣布结果","让双方同时陈述且不作引导"], answer:0, why:"先组织争点能让举证、质证和辩论围绕真正需要裁判的问题展开。"},
    {stage:"证据审查", question:"面对一项关键证据，应重点审查？", options:["来源、真实性、关联性和证明力","证据篇幅是否够长","提交人是否表达得激动"], answer:0, why:"裁判判断应建立在可核验的证据规则上，而非表达风格。"},
    {stage:"裁判说理", question:"形成裁判意见时，应遵循什么结构？", options:["确认事实、说明规则、逐项回应主要争点","只写最终结论","以一方的情绪替代法律分析"], answer:0, why:"清晰裁判说理需要让当事人看见事实认定与法律适用之间的路径。"}
  ]}
};
function loadMootCourtRecord() {
  try { return JSON.parse(localStorage.getItem(MOOT_COURT_KEY) || "{}"); } catch(e) { return {}; }
}
function saveMootCourtRecord(record) { try { localStorage.setItem(MOOT_COURT_KEY, JSON.stringify(record)); } catch(e) {} }
function showMootCourt() {
  hideAllViews();
  var view = document.getElementById("mootCourtView");
  view.style.display = "";
  view.classList.add("show");
  MOOT_STATE = {role:null, round:0, answers:[]};
  renderMootCourt();
  var body = document.getElementById("mootCourtBody");
  if (body) body.focus();
}
function courtIcon() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21h16"/><path d="M7 21V10l5-6 5 6v11"/><path d="M3 10h18"/><path d="M9 14h6M9 18h6"/></svg>';
}
function renderMootCourt() {
  var body = document.getElementById("mootCourtBody");
  if (!body) return;
  var caseData = DAILY_CASES[dailyCaseIndex()];
  if (!MOOT_STATE.role) {
    body.innerHTML = '<div class="mc-kicker"><i></i>3 回合 · 约 5 分钟</div><h1 class="mc-title">在同一案件中，换一个角度思考</h1><p class="mc-lead">选择你的庭审角色。每一回合都有明确的争点与即时复盘，不需要 API Key。</p><section class="mc-case"><strong>本次案情 · ' + escHtml(caseData.area) + '</strong>' + escHtml(caseData.fact) + '</section><div class="mc-roles">' + Object.keys(MOOT_ROLES).map(function(key) { var role=MOOT_ROLES[key]; return '<button type="button" class="mc-role" onclick="selectMootRole(\'' + key + '\')">' + courtIcon() + '<span><strong>' + role.name + '</strong><small>' + role.desc + '</small></span></button>'; }).join('') + '</div>';
    return;
  }
  var role = MOOT_ROLES[MOOT_STATE.role];
  if (MOOT_STATE.round >= role.rounds.length) { renderMootResult(body, role); return; }
  var round = role.rounds[MOOT_STATE.round];
  body.innerHTML = '<div class="mc-stage"><b>' + escHtml(round.stage) + ' · 第 ' + (MOOT_STATE.round + 1) + '/3 回合</b><span class="mc-role-pill">' + escHtml(role.name) + '</span></div><section class="mc-case"><strong>案情回顾 · ' + escHtml(caseData.title) + '</strong>' + escHtml(caseData.fact) + '</section><div class="mc-opponent"><strong>对方观点</strong><br>' + escHtml(role.opponent) + '</div><h1 class="mc-question">' + escHtml(round.question) + '</h1><div class="mc-options">' + round.options.map(function(option, index) { return '<button type="button" class="mc-option" onclick="answerMootRound(' + index + ')">' + escHtml(option) + '</button>'; }).join('') + '</div>';
}
function selectMootRole(role) { MOOT_STATE.role = role; MOOT_STATE.round = 0; MOOT_STATE.answers = []; renderMootCourt(); }
function answerMootRound(choice) {
  var role = MOOT_ROLES[MOOT_STATE.role];
  var round = role.rounds[MOOT_STATE.round];
  if (!round || typeof MOOT_STATE.answers[MOOT_STATE.round] !== "undefined") return;
  MOOT_STATE.answers.push(choice);
  document.querySelectorAll('.mc-option').forEach(function(button, index) { button.disabled=true; if(index===round.answer)button.classList.add('correct'); else if(index===choice)button.classList.add('incorrect'); });
  var feedback = document.createElement('div'); feedback.className='mc-feedback'; feedback.innerHTML='<strong>' + (choice===round.answer ? '这一轮处理得很好' : '可以再靠近证据与规则') + '</strong>' + escHtml(round.why);
  var next = document.createElement('button'); next.type='button'; next.className='mc-cta'; next.textContent = MOOT_STATE.round === 2 ? '查看庭审复盘' : '进入下一回合'; next.onclick=function(){MOOT_STATE.round++;renderMootCourt();};
  var body = document.getElementById('mootCourtBody'); body.appendChild(feedback); body.appendChild(next);
}
function renderMootResult(body, role) {
  var score = 0; role.rounds.forEach(function(round, index){if(MOOT_STATE.answers[index]===round.answer)score++;});
  var record = loadMootCourtRecord(), today=getTodayStr(), reward=0;
  if (record.date !== today || !record.rewarded) { reward = score===3 ? 6 : 3; awardPoints(vipRate(reward), '模拟法庭'); addPersonaXp(MOOT_STATE.role === 'judge' ? 'judgment' : (MOOT_STATE.role === 'defendant' ? 'procedure' : 'contract'), 1); addFirmReputation(3, "完成模拟法庭"); record={date:today,rewarded:true}; saveMootCourtRecord(record); recordStudyTime(0,3); }
  var label = score===3 ? '论证链条非常完整' : score===2 ? '你的庭审思路已具雏形' : '完成庭审，开始建立论证习惯';
  body.innerHTML='<section class="dc-card mc-result"><div class="mc-kicker" style="justify-content:center"><i></i>庭审复盘</div><div class="mc-score">' + score + '/3</div><h1 class="mc-title">' + label + '</h1><p class="mc-lead">你以「' + escHtml(role.name) + '」完成了三回合。' + (reward ? '本次获得 ' + vipRate(reward) + ' 学习积分。' : '今日模拟法庭积分已领取。') + '</p><div class="mc-rubric"><div><span>事实与争点</span><b>' + (MOOT_STATE.answers[0]===0?'清晰':'可加强') + '</b></div><div><span>证据与质证</span><b>' + (MOOT_STATE.answers[1]===0?'清晰':'可加强') + '</b></div><div><span>规则与结论</span><b>' + (MOOT_STATE.answers[2]===0?'清晰':'可加强') + '</b></div></div><button class="mc-cta" type="button" onclick="showLearningCenter()">回到学习中心</button><button class="dc-secondary" type="button" onclick="showMootCourt()" style="width:100%;margin-top:9px">换个角色再审一次</button></section>';
}

// 法律人格：由真实学习行为驱动的长期称号，不单独售卖或抽取。
var PERSONA_KEY = "seawhy-lex-persona-v1";
var PERSONAS = [
  {key:"evidence", name:"证据猎手", desc:"善于从事实中识别待证问题", levels:["见习记录员","线索分析师","证据猎手"]},
  {key:"contract", name:"合同侦探", desc:"重视意思表示与交易结构", levels:["条款观察者","交易分析师","合同侦探"]},
  {key:"procedure", name:"程序守望者", desc:"关注举证边界与权利保障", levels:["庭审学徒","程序协调员","程序守望者"]},
  {key:"judgment", name:"裁判思维者", desc:"用事实、规则与结论完成说理", levels:["裁判助理","说理研习者","裁判思维者"]}
];
function loadPersona() { try { return JSON.parse(localStorage.getItem(PERSONA_KEY) || "{}"); } catch(e) { return {}; } }
function addPersonaXp(key, amount) { var data=loadPersona(); data[key]=(data[key]||0)+(amount||1); try { localStorage.setItem(PERSONA_KEY,JSON.stringify(data)); } catch(e) {} }
function showPersonaRoutes() { hideAllViews(); var view=document.getElementById("personaView"); view.style.display="";view.classList.add("show");renderPersonaRoutes();var body=document.getElementById("personaBody");if(body)body.focus(); }
function renderPersonaRoutes() {
  var body=document.getElementById("personaBody"); if(!body)return; var data=loadPersona();
  body.innerHTML='<section class="persona-hero"><h1>你的法律人格</h1><p>每次完成案件推理或模拟法庭，都会沉淀到对应路线。累计 3 次可升级称号，并解锁成长奖励的展示资格。</p></section><div class="persona-grid">'+PERSONAS.map(function(persona){var xp=data[persona.key]||0;var level=Math.min(2,Math.floor(xp/3));var progress=(xp%3)/3*100;return '<section class="persona-card"><header><div><h2>'+escHtml(persona.name)+'</h2><p>'+escHtml(persona.desc)+'</p></div><span class="persona-rank">'+escHtml(persona.levels[level])+'</span></header><div class="persona-bar" aria-label="'+escHtml(persona.name)+'成长进度 '+xp+'"><i style="width:'+progress+'%"></i></div><div class="persona-meta"><span>'+xp+' 次学习沉淀</span><span>'+(level===2?'已达最高称号':'距下一等级 '+(3-xp%3)+' 次')+'</span></div></section>';}).join('')+'</div>';
}

function showKnowledgeMap(){hideAllViews();var v=document.getElementById('mapView');v.style.display='';v.classList.add('show');renderKnowledgeMap();var b=document.getElementById('mapBody');if(b)b.focus();}

// 我的律所：学习成果只用于解锁空间，不扣除学习积分。
var LAW_FIRM_KEY = "seawhy-lex-law-firm-v1";
var FIRM_ROOMS = [
  {key:"reception", name:"接待区", need:0, desc:"记录今天的学习节奏", action:"showLearningCenter()", actionLabel:"回到学习中心"},
  {key:"archive", name:"案例档案室", need:6, desc:"把案件推理沉淀为办案直觉", action:"showDailyCase()", actionLabel:"做今日推理"},
  {key:"court", name:"模拟法庭", need:14, desc:"在角色切换中练习庭审表达", action:"showMootCourt()", actionLabel:"进入庭审"},
  {key:"library", name:"研究图书室", need:24, desc:"用知识地图规划下一段学习", action:"showKnowledgeMap()", actionLabel:"查看地图"}
];
function loadLawFirm(){try{var data=JSON.parse(localStorage.getItem(LAW_FIRM_KEY)||"{\\\"reputation\\\":0,\\\"notes\\\":[]}");return Object.assign({reputation:0,notes:[],style:"classic",decor:"walnut"},data);}catch(e){return {reputation:0,notes:[],style:"classic",decor:"walnut"};}}
function saveLawFirm(data){try{localStorage.setItem(LAW_FIRM_KEY,JSON.stringify(data));}catch(e){}}
function addFirmReputation(amount, reason){var firm=loadLawFirm();firm.reputation=(firm.reputation||0)+amount;firm.notes=(firm.notes||[]).slice(-3);firm.notes.push({reason:reason,amount:amount,date:getTodayStr()});saveLawFirm(firm);}
function firmIcon(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M9 21v-6h6v6"/><path d="M8 11h.01M16 11h.01"/></svg>';}
function renderLawFirmEntry(){var el=document.getElementById("firmEntryMeta");if(!el)return;var rep=loadLawFirm().reputation||0;var unlocked=FIRM_ROOMS.filter(function(room){return rep>=room.need;}).length;el.textContent="律所声望 " + rep + " · 已启用 " + unlocked + "/" + FIRM_ROOMS.length + " 个空间";}
function showLawFirm(){hideAllViews();var view=document.getElementById("lawFirmView");view.style.display="";view.classList.add("show");renderLawFirm();var body=document.getElementById("firmBody");if(body)body.focus();}
function setFirmStyle(style){var firm=loadLawFirm();firm.style=style;saveLawFirm(firm);renderLawFirm();}
function setFirmDecor(decor){var firm=loadLawFirm();firm.decor=decor;saveLawFirm(firm);renderLawFirm();}
function firmAvatar(skinKey){var skin=SKINS.filter(function(item){return item.key===skinKey;})[0];if(skin&&skin.art)return '<div class="firm-avatar firm-skin-avatar"><img src="'+skin.art+'" alt="当前穿着：'+escHtml(skin.name)+'"></div>';return '<div class="firm-avatar" aria-hidden="true"><i class="fa-hair"></i><i class="fa-face"></i><i class="fa-body"></i><i class="fa-collar"></i><i class="fa-file"></i></div>';}
function firmRoomScene(room, open){return '<button type="button" class="game-room '+(open?'built':'locked')+'" '+(open?'onclick="'+room.action+'"':'disabled aria-disabled="true"')+'><span class="room-roof"></span><span class="room-window"></span><span class="room-window second"></span><span class="room-label"><b>'+room.name+'</b><small>'+ (open?room.actionLabel:'需 '+room.need+' 声望') +'</small></span><span class="room-status">'+(open?'已建成':'待建造')+'</span></button>';}
function wearFirmSkin(key){var p=loadProfile();if((p.skinsOwned||[]).indexOf(key)<0){showToast("这套时装尚未拥有");return;}p.activeSkin=key;saveProfile(p);renderLawFirm();showToast("小律已穿上「"+skinNameByKey(key)+"」");}
function firmWardrobe(profile){var owned=profile.skinsOwned||[],active=profile.activeSkin||"";if(!owned.length)return '<div class="firm-empty-wardrobe"><p>还没有从积分夺宝获得的时装。</p><button type="button" onclick="openSkinGallery()">前往积分夺宝衣橱</button></div>';return '<div class="firm-skin-rail">'+owned.map(function(key){var skin=SKINS.filter(function(item){return item.key===key;})[0];if(!skin)return "";return '<button type="button" class="firm-skin-card '+(active===key?'selected':'')+'" onclick="wearFirmSkin(\''+key+'\')" aria-pressed="'+(active===key)+'"><img src="'+skin.art+'" alt=""><span>'+escHtml(skin.name)+'</span><small>'+escHtml(skin.rarity)+(active===key?' · 穿戴中':'')+'</small></button>';}).join('')+'</div>'}
function renderLawFirm(){var body=document.getElementById("firmBody");if(!body)return;var firm=loadLawFirm(),profile=loadProfile(),rep=firm.reputation||0;var next=FIRM_ROOMS.filter(function(room){return rep<room.need;})[0];var level=Math.min(9,Math.floor(rep/5)+1);var toNext=5-(rep%5)||5;var helper=next?'下一项工程：'+next.name+'，还差 '+Math.max(0,next.need-rep)+' 声望。':'四个空间都已建成，继续培养你的专属律所。';body.innerHTML='<section class="firm-game '+firm.decor+'"><header class="game-top"><div><p>知行法律事务所</p><h1>律所等级 <b>Lv.'+level+'</b></h1></div><div class="game-currency" aria-label="律所声望 '+rep+'"><span>声望</span><strong>'+rep+'</strong></div></header><div class="game-progress"><span style="width:'+((rep%5)/5*100)+'%"></span><small>距下一级还需 '+toNext+' 声望</small></div><section class="firm-stage" aria-label="律所建造场景"><div class="stage-rooms">'+FIRM_ROOMS.map(function(room){return firmRoomScene(room,rep>=room.need);}).join('')+'</div><div class="stage-avatar">'+firmAvatar(profile.activeSkin)+'</div><div class="stage-bubble"><b>小律</b><span>'+helper+'</span></div></section></section><section class="game-task"><div><span class="task-icon" aria-hidden="true">'+firmIcon()+'</span><div><b>今日建设任务</b><p>完成案件推理或模拟法庭，带回律所声望。</p></div></div><button type="button" onclick="showDailyCase()">去完成</button></section><section class="game-panel"><div class="game-panel-head"><h2>积分夺宝衣橱</h2><button type="button" class="firm-link" onclick="openSkinGallery()">打开衣橱</button></div>'+firmWardrobe(profile)+'</section><section class="game-panel"><div class="game-panel-head"><h2>装修风格</h2><span>免费切换</span></div><div class="decor-row"><button type="button" class="decor '+(firm.decor==='walnut'?'selected':'')+'" onclick="setFirmDecor(\'walnut\')" aria-pressed="'+(firm.decor==='walnut')+'"><i></i>胡桃木</button><button type="button" class="decor '+(firm.decor==='mint'?'selected':'')+'" onclick="setFirmDecor(\'mint\')" aria-pressed="'+(firm.decor==='mint')+'"><i></i>薄荷绿</button><button type="button" class="decor '+(firm.decor==='night'?'selected':'')+'" onclick="setFirmDecor(\'night\')" aria-pressed="'+(firm.decor==='night')+'"><i></i>深夜蓝</button></div></section><p class="game-note">建造来自真实学习：案件推理 +2 声望，模拟法庭 +3 声望。声望只用于养成展示，不消耗学习积分。</p>';}
function renderKnowledgeMap(){var b=document.getElementById('mapBody');if(!b)return;var p=loadPersona(), stats=loadLearnStats(), q=stats.totalQ||0;var regions=[{n:'民法城',d:'合同、侵权与人格权益',x:(p.contract||0)+(p.evidence||0),go:'showDailyCase()'},{n:'刑法岛',d:'构成要件与责任判断',x:Math.floor(q/10),go:'showQuizModule()'},{n:'行政法庭',d:'公权力与救济路径',x:(p.procedure||0),go:'showMootCourt()'},{n:'诉讼法港',d:'证据、程序与裁判说理',x:(p.judgment||0)+(p.evidence||0),go:'showMootCourt()'}];b.innerHTML='<section class="map-hero"><h1>法律知识地图</h1><p>学习会点亮区域。完成案件推理、模拟法庭和题库练习后，回到这里查看你的探索路线。</p></section><div class="map-grid">'+regions.map(function(r){var on=r.x>0;return '<button class="map-card '+(on?'on':'')+'" type="button" onclick="'+r.go+'"><b>'+ (on?'已点亮':'待探索') +'</b><h2>'+r.n+'</h2><p>'+r.d+'</p><p style="margin-top:9px">探索值 '+r.x+' · 点击前往</p></button>';}).join('')+'</div>';}

