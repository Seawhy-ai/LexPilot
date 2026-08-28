// 渲染冒烟测试：静态服务 law.html + Edge 无头遍历新功能视图
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright-core");

const ROOT = path.join(__dirname, "..");
const PORT = 8935;
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".txt": "text/plain; charset=utf-8", ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".wasm": "application/wasm" };

function serve() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split("?")[0]);
      if (p === "/") p = "/standalone/law.html";
      const file = path.join(ROOT, p);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end("nf"); return;
      }
      res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
    });
    srv.listen(PORT, () => resolve(srv));
  });
}

(async () => {
  const srv = await serve();
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 414, height: 896 } });
  const errors = [];
  page.on("pageerror", (e) => {
    const stack = (e.stack || "").split("\n").filter((l) => l.includes("law.html")).slice(0, 2).join(" | ");
    errors.push("PAGEERROR: " + e.message + (stack ? " @ " + stack : ""));
  });
  page.on("console", (msg) => { if (msg.type() === "error") errors.push("CONSOLE: " + msg.text().slice(0, 200)); });

  const shot = (n) => page.screenshot({ path: path.join(__dirname, "shots", n + ".png") });
  fs.mkdirSync(path.join(__dirname, "shots"), { recursive: true });

  await page.goto("http://127.0.0.1:" + PORT + "/standalone/law.html", { waitUntil: "load" });
  await page.waitForTimeout(2500);

  // 跳过登录（若显示）
  const skip = await page.$("#loginScreen button");
  if (skip) { await page.evaluate(() => skipLogin()); await page.waitForTimeout(800); }
  await shot("01-home");

  // 1) 首页全局搜索（应用的 IME 会把输入框置 readonly，测试直接派发 input 事件）
  const gsType = (q) => page.evaluate((t) => {
    const el = document.getElementById("globalSearchInput");
    el.value = t;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, q);
  await gsType("所有权");
  await page.waitForTimeout(2000);
  const gsCount = await page.evaluate(() => document.querySelectorAll("#globalSearchResults .gs-item").length);
  console.log("搜索「所有权」命中条数:", gsCount);
  await shot("02-home-search");

  // 案号识别搜索
  await gsType("(2023)京01民终123号");
  await page.waitForTimeout(1800);
  await shot("03-home-search-caseno");
  await page.evaluate(() => { const el = document.getElementById("globalSearchResults"); if (el) el.innerHTML = ""; });

  // 2) 广场文书大卡
  await page.evaluate(() => showPlaza());
  await page.waitForTimeout(600);
  const heroVisible = await page.evaluate(() => !!document.querySelector(".doc-hero-card") && document.querySelector(".doc-hero-card").offsetParent !== null);
  console.log("广场文书大卡可见:", heroVisible);
  await shot("04-plaza");

  // 3) 学习中心：周报 + FAB
  await page.evaluate(() => { recordLastStudy("quizView"); showLearningCenter(); });
  await page.waitForTimeout(800);
  const weekBars = await page.evaluate(() => document.querySelectorAll("#wrChart .wr-col").length);
  const fabShown = await page.evaluate(() => document.getElementById("continueFab").classList.contains("show"));
  console.log("周报柱状图列数:", weekBars, "| FAB 显示:", fabShown);
  await shot("05-learn-center");

  // FAB 点击应跳题库
  await page.click("#continueFab");
  await page.waitForTimeout(600);
  const quizShown = await page.evaluate(() => document.getElementById("quizView").classList.contains("show"));
  console.log("FAB 跳转题库成功:", quizShown);
  await shot("06-quiz");

  // 4) 设置页新控件
  await page.evaluate(() => showSettings());
  await page.waitForTimeout(600);
  const settings = await page.evaluate(() => ({
    themeBtns: document.querySelectorAll("#themePrefGroup .app-btn").length,
    fontBtns: document.querySelectorAll("#fontScaleGroup .app-btn").length,
    remindToggles: !!document.getElementById("remindCheckinState"),
    phoneForm: !!document.getElementById("phoneInput"),
    timeInput: !!document.getElementById("remindTimeInput")
  }));
  console.log("设置页控件:", JSON.stringify(settings));
  await shot("07-settings");

  // 深色模式切换
  await page.evaluate(() => setThemePref("dark"));
  await page.waitForTimeout(400);
  const isDark = await page.evaluate(() => document.body.classList.contains("dark"));
  console.log("深色模式生效:", isDark);
  await shot("08-settings-dark");
  await page.evaluate(() => setThemePref("auto"));
  await page.waitForTimeout(300);

  // 字号调节
  await page.evaluate(() => setFontScale(1.15));
  await page.waitForTimeout(300);
  const zoom = await page.evaluate(() => document.body.style.zoom);
  console.log("字号 zoom:", zoom);
  await page.evaluate(() => setFontScale(1));

  // 5) 个人中心：称号 + VIP 卡 + 学习天数
  await page.evaluate(() => updateProfileUI());
  await page.evaluate(() => showProfile());
  await page.waitForTimeout(900);
  const prof = await page.evaluate(() => ({
    vipCard: !!document.querySelector("#vipCard .vc-item"),
    titleChipDisplay: document.getElementById("profileTitleChip").style.display,
    studyDays: document.getElementById("profileStudyDays").textContent
  }));
  console.log("个人中心:", JSON.stringify(prof));
  await shot("09-profile");

  // 满级称号逻辑
  const titleTest = await page.evaluate(() => {
    const old = loadProfile();
    const p = old; p.totalPoints = 12500; p.points = 12415; saveProfile(p);
    const ti = getTitleInfo(12500);
    updateProfileUI();
    const chip = document.getElementById("profileTitleChip").style.display;
    const chipName = document.getElementById("profileTitleName").textContent;
    const prog = document.getElementById("profileLevelProg").textContent;
    saveProfile(old); // 还原
    updateProfileUI();
    return { chip, chipName, prog, titleName: ti.name };
  });
  console.log("满级称号测试:", JSON.stringify(titleTest));
  await shot("10-profile-title");

  console.log(errors.length ? "\n❌ 运行时错误:\n" + errors.join("\n") : "\n✅ 无运行时错误");
  await browser.close();
  srv.close();
  process.exit(errors.length ? 1 : 0);
})().catch((e) => { console.error("TEST FAILED:", e.message); process.exit(2); });
