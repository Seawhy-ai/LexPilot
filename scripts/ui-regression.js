// UI 优化渲染回归测试 —— 离线 headless 浏览器快照 + 断言
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
const URL = "file:///" + path.resolve(__dirname, "standalone/law.html").replace(/\\/g, "/");
const OUT = path.join(__dirname, "_ui_shots");
if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true, force: true });
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
  page.on("pageerror", e => errors.push("pageerror: " + e.message + "\n    " + (e.stack ? e.stack.split("\n").slice(0, 3).join("\n    ") : "")));
  page.on("console", m => { if (m.type() === "error") errors.push("console: " + m.text()); });

  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(900);

  // ---------- 1. 聊天视图 ----------
  console.log("[chatView]");
  await page.evaluate(() => { hideAllViews(); document.getElementById("chatView").classList.add("show"); });
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(OUT, "01-chat.png") });
  check("输入框 .input-field-wrap 存在", await page.evaluate(() => !!document.querySelector(".input-field-wrap")));
  check("发送按钮 .btn-send 存在", await page.evaluate(() => !!document.querySelector(".btn-send")));

  // ---------- 2. 题库视图 ----------
  console.log("[quizView]");
  await page.evaluate(() => {
    hideAllViews();
    document.getElementById("quizView").classList.add("show");
    QUIZ_STATE.questions = [
      { q: "我国现行宪法是哪一年通过的？", opts: ["1954", "1978", "1982", "1999"], ans: [2], _shuffledOpts: ["1954", "1978", "1982", "1999"], _shuffledAns: [2], diff: 1, _subject: "测试", _chapter: "宪法" },
      { q: "下列关于法律效力层级正确的是？", opts: ["行政法规高于宪法", "地方性法规高于行政法规", "宪法具有最高法律效力", "规章高于法律"], ans: [2], _shuffledOpts: ["行政法规高于宪法", "地方性法规高于行政法规", "宪法具有最高法律效力", "规章高于法律"], _shuffledAns: [2], diff: 1, _subject: "测试", _chapter: "法理学" },
      { q: "下列属于民法基本原则的是？（多选）", opts: ["平等", "自愿", "诚实信用", "严格责任"], ans: [0, 1, 2], _shuffledOpts: ["平等", "自愿", "诚实信用", "严格责任"], _shuffledAns: [0, 1, 2], diff: 2, multi: true, _subject: "测试", _chapter: "民法" }
    ];
    QUIZ_STATE.answers = {}; QUIZ_STATE.answered = {}; QUIZ_STATE.correct = {}; QUIZ_STATE._examSubmitted = false;
    QUIZ_STATE.currentIndex = 0; QUIZ_STATE.mode = "practice";
    setQuizScreen("quiz");
    renderQuizPage();
  });
  await page.waitForTimeout(150);
  const q1 = await page.evaluate(() => ({
    opts: document.querySelectorAll(".quiz-opt").length,
    cards: document.querySelectorAll(".quiz-card").length,
    prefix: !!document.querySelector(".quiz-opt-prefix"),
    statusInDom: !!document.querySelector(".quiz-opt-status")
  }));
  check("每页渲染 1 题 (.quiz-card)", q1.cards === 1, "cards=" + q1.cards); // QUIZ_PAGE_SIZE=1
  check("选项 .quiz-opt 渲染 4 个", q1.opts === 4, "opts=" + q1.opts);
  check("选项前缀 .quiz-opt-prefix 存在", q1.prefix);
  check("状态标记 .quiz-opt-status 已注入", q1.statusInDom);
  // 第 1 题点击正确答案 (选项 C=1982, 索引 2)
  await page.evaluate(() => document.getElementById("opt0_2").click());
  await page.waitForTimeout(120);
  const q2 = await page.evaluate(() => document.querySelector("#opt0_2 .quiz-opt-status")?.textContent || "");
  check("答对 → 状态显示 ✓", q2 === "✓", "status='" + q2 + "'");
  check("答对 → 选项带 correct-answer", await page.evaluate(() => document.getElementById("opt0_2").className.includes("correct-answer")));
  // 下一页,第 2 题点击错误答案 (选项 A, 索引 0)
  await page.evaluate(() => nextQuizPage());
  await page.waitForTimeout(120);
  await page.evaluate(() => document.getElementById("opt1_0").click());
  await page.waitForTimeout(120);
  const q3 = await page.evaluate(() => document.querySelector("#opt1_0 .quiz-opt-status")?.textContent || "");
  check("答错 → 状态显示 ✕", q3 === "✕", "status='" + q3 + "'");
  check("答错 → 选项带 wrong-answer", await page.evaluate(() => document.getElementById("opt1_0").className.includes("wrong-answer")));
  await page.screenshot({ path: path.join(OUT, "02-quiz.png") });

  // ---------- 3. 考试倒计时 ----------
  console.log("[quizTimer]");
  await page.evaluate(() => {
    // 造 10 题 → 倒计时上限 10×60=600s
    var qs = [];
    for (var i = 0; i < 10; i++) qs.push({ q: "测试题 " + i, opts: ["A", "B", "C", "D"], ans: [0], _shuffledOpts: ["A", "B", "C", "D"], _shuffledAns: [0], diff: 1, _subject: "测试", _chapter: "" });
    QUIZ_STATE.questions = qs;
    QUIZ_STATE.mode = "exam"; QUIZ_STATE._examSubmitted = false; QUIZ_STATE.currentIndex = 0;
    QUIZ_STATE.answers = {}; QUIZ_STATE.answered = {}; QUIZ_STATE.correct = {};
    EXAM_SETUP.timing = "countdown"; EXAM_SETUP.secPerQ = 60;
    setQuizScreen("quiz");
    startExamTimer();
  });
  await page.waitForTimeout(150);
  const t1 = await page.evaluate(() => {
    var el = document.getElementById("quizTimer");
    return el ? { visible: el.offsetParent !== null, text: el.textContent.trim() } : null;
  });
  check("考试倒计时 .quiz-timer 显示", t1 && t1.visible, JSON.stringify(t1));
  // 回拨时钟：剩余约 300s → warn
  await page.evaluate(() => { QUIZ_STATE.timerStart = Date.now() - 300000; updateExamTimer(); });
  await page.waitForTimeout(80);
  const t2 = await page.evaluate(() => document.getElementById("quizTimer").className);
  check("剩余≈300s → .warn 高亮", t2.includes("warn"), "class=" + t2);
  // 回拨更多：剩余≤120s → danger
  await page.evaluate(() => { QUIZ_STATE.timerStart = Date.now() - 500000; updateExamTimer(); });
  await page.waitForTimeout(80);
  const t3 = await page.evaluate(() => document.getElementById("quizTimer").className);
  check("剩余≤120s → .danger 高亮", t3.includes("danger"), "class=" + t3);
  await page.evaluate(() => { stopExamTimer(); QUIZ_STATE.mode = "practice"; QUIZ_STATE.questions = []; });

  // ---------- 4. 笔记本视图 ----------
  console.log("[notebookView]");
  await page.evaluate(() => showNotebook());
  await page.waitForTimeout(150);
  const n1 = await page.evaluate(() => ({ fab: !!document.querySelector(".note-fab"), cards: document.querySelectorAll(".note-card").length }));
  check("FAB .note-fab 存在", n1.fab);
  check("空状态或笔记卡片渲染", n1.cards >= 0);
  await page.screenshot({ path: path.join(OUT, "03-notebook.png") });
  // 新建一条笔记后应出现卡片
  await page.evaluate(() => {
    var rec = loadNotes();
    if (!rec.length) { rec.push({ title: "回归测试笔记", content: "UI 优化验证", tag: "测试", time: Date.now(), id: "t" + Date.now() }); saveNotes(rec); }
    renderNotes();
  });
  await page.waitForTimeout(150);
  const n2 = await page.evaluate(() => document.querySelectorAll(".note-card").length);
  check("有笔记时渲染 .note-card", n2 >= 1, "cards=" + n2);
  await page.screenshot({ path: path.join(OUT, "03b-notebook-filled.png") });

  // ---------- 5. 文书视图 ----------
  console.log("[docView]");
  await page.evaluate(() => showDocGen());
  await page.waitForTimeout(150);
  const d1 = await page.evaluate(() => document.querySelectorAll(".doc-type-card").length);
  check("文书类型卡片 .doc-type-card 渲染", d1 > 0, "count=" + d1);
  await page.evaluate(() => { DOC_STATE.result = "测试文书内容：\n第一条 本测试文书用于验证操作按钮。"; renderDocResult(); });
  await page.waitForTimeout(120);
  const d2 = await page.evaluate(() => ({
    actions: document.querySelectorAll(".doc-actions .doc-btn").length,
    copy: !!document.querySelector('.doc-actions .doc-btn[onclick="copyDocResult()"]'),
    dl: !!document.querySelector('.doc-actions .doc-btn[onclick="downloadDocResult()"]')
  }));
  check("操作按钮组 .doc-actions 渲染", d2.actions >= 2, "count=" + d2.actions);
  check("复制全文按钮存在", d2.copy);
  check("下载 TXT 按钮存在", d2.dl);
  await page.screenshot({ path: path.join(OUT, "04-doc.png") });

  // ---------- 6. 案例视图 ----------
  console.log("[caseView]");
  await page.evaluate(() => showCaseDatabase());
  await page.waitForTimeout(150);
  const c1 = await page.evaluate(() => document.querySelectorAll(".case-card").length);
  check("案例列表 .case-card 渲染", c1 > 0, "count=" + c1);
  await page.evaluate(() => openCaseDetail(0));
  await page.waitForTimeout(150);
  const c2 = await page.evaluate(() => document.querySelectorAll(".cd-section.card").length);
  check("案例详情 .cd-section 渲染", c2 > 0, "count=" + c2);
  await page.screenshot({ path: path.join(OUT, "05-case.png") });

  // ---------- 7. 个人中心 ----------
  console.log("[profileView]");
  await page.evaluate(() => showProfile());
  await page.waitForTimeout(200);
  const p1 = await page.evaluate(() => ({
    card: !!document.querySelector(".profile-card"),
    avatar: !!document.querySelector(".ph-avatar"),
    psval: !!document.querySelector(".ps-val"),
    vip: !!document.querySelector(".vip-btn"),
    menu: document.querySelectorAll(".pm-item").length
  }));
  check("资料卡 .profile-card 存在", p1.card);
  check("头像 .ph-avatar 存在", p1.avatar);
  check("积分/学习天数 .ps-val 存在", p1.psval);
  check("VIP 按钮 .vip-btn 存在", p1.vip);
  check("菜单项 .pm-item 渲染", p1.menu > 0, "count=" + p1.menu);
  await page.screenshot({ path: path.join(OUT, "06-profile.png") });

  // ---------- 8. 设置视图 ----------
  console.log("[settingsView]");
  await page.evaluate(() => { hideAllViews(); document.getElementById("settingsView").classList.add("show"); });
  await page.waitForTimeout(150);
  const s1 = await page.evaluate(() => ({
    sections: document.querySelectorAll(".settings-section").length,
    titles: document.querySelectorAll(".settings-section-title").length,
    toggles: document.querySelectorAll(".pm-toggle").length
  }));
  check("分组 .settings-section ≥2", s1.sections >= 2, "count=" + s1.sections);
  check("分组标题 .settings-section-title ≥2", s1.titles >= 2, "count=" + s1.titles);
  check("开关 .pm-toggle 渲染", s1.toggles >= 2, "count=" + s1.toggles);
  await page.screenshot({ path: path.join(OUT, "07-settings.png") });

  // ---------- 9. 暗色模式冒烟 ----------
  console.log("[darkMode]");
  await page.evaluate(() => { document.body.classList.add("dark"); hideAllViews(); document.getElementById("chatView").classList.add("show"); });
  await page.waitForTimeout(120);
  const dm = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await page.screenshot({ path: path.join(OUT, "08-dark-chat.png") });
  check("暗色 body 背景已应用", dm !== "rgb(255, 255, 255)", "bg=" + dm);

  // ---------- 汇总 ----------
  console.log("\n==================== 结果 ====================");
  console.log("PASS " + pass + " / FAIL " + fail);
  if (errors.length) { console.log("\n[JS 错误捕获]"); errors.forEach(e => console.log("  " + e)); }
  else console.log("无 JS 运行时错误");
  console.log("截图目录: " + OUT);
  await browser.close();
  process.exit(fail === 0 && errors.length === 0 ? 0 : 1);
})().catch(e => { console.error("TEST CRASH:", e); process.exit(2); });
