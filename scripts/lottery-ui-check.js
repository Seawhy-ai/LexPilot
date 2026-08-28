// 积分夺宝 UI 改动回归验证 —— headless 断言 + 截图
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

  console.log("[lotteryView]");
  await page.evaluate(() => {
    try { localStorage.setItem("seawhy-lex-profile", JSON.stringify({ points: 99999, lotteryLuck: 330, soulCrystals: 3, skinFragments: 28, quizChallengeCount: 2, skinsOwned: [], badgesOwned: [] })); } catch (e) {}
    openLottery();
  });
  await page.waitForTimeout(250);
  check("lotteryView 已显示", await page.evaluate(() => document.getElementById("lotteryView").classList.contains("show")));

  // 资源区
  check("积分 hero 卡存在", await page.evaluate(() => !!document.querySelector(".lottery-stat.hero")));
  check("hero 卡含 💰 图标", await page.evaluate(() => (document.querySelector(".lottery-stat.hero .ls-ic") || {}).textContent === "💰"));
  check("幸运值卡 luck class", await page.evaluate(() => !!document.querySelector(".lottery-stat.luck")));
  check("水晶/碎片 sub 卡各一", await page.evaluate(() => document.querySelectorAll(".lottery-stat.sub").length === 2));
  check("near 态已应用(幸运330)", await page.evaluate(() => document.getElementById("lotLuckFill").classList.contains("near")));
  check("near 态未误触 full", await page.evaluate(() => !document.getElementById("lotLuckFill").classList.contains("full")));

  // 九宫格稀有度
  check("legend 格×2(👑+💎)", await page.evaluate(() => document.querySelectorAll(".lottery-cell.legend").length === 2));
  check("epic 格×2(🎨+🎖)", await page.evaluate(() => document.querySelectorAll(".lottery-cell.epic").length === 2));
  check("brave 格×2(📝+🧵)", await page.evaluate(() => document.querySelectorAll(".lottery-cell.brave").length === 2));
  check("common 格×2", await page.evaluate(() => document.querySelectorAll(".lottery-cell.common").length === 2));
  check("empty 格×1(💨)", await page.evaluate(() => document.querySelectorAll(".lottery-cell.empty").length === 1));
  check("无残留 crystal class", await page.evaluate(() => document.querySelectorAll(".lottery-cell.crystal").length === 0));
  check("概率 chip 彩色(legend 金)", await page.evaluate(() => {
    const el = document.querySelector(".lottery-cell.legend .lc-pct");
    return el && getComputedStyle(el).color === "rgb(247, 183, 51)";
  }));
  check("空奖格虚线边框", await page.evaluate(() => getComputedStyle(document.querySelector(".lottery-cell.empty")).borderStyle === "dashed"));

  // 按钮
  check("十连 primary 主推", await page.evaluate(() => document.getElementById("lotDraw10").classList.contains("primary")));
  check("十连含 省20 角标", await page.evaluate(() => !!document.getElementById("lotDraw10").querySelector(".ld-save")));
  check("单抽 ghost 弱化", await page.evaluate(() => document.getElementById("lotDraw1").classList.contains("ghost")));
  check("无残留 gold class", await page.evaluate(() => !document.getElementById("lotDraw10").classList.contains("gold")));

  // CTA
  check("CTA 主题色 class 齐全", await page.evaluate(() => ["c-challenge","c-skin","c-badge"].every(c => document.querySelector(".l-cta."+c))));

  await page.screenshot({ path: path.join(OUT, "lottery-light.png") });

  // 暗色模式
  await page.evaluate(() => { document.body.classList.add("dark"); });
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(OUT, "lottery-dark.png") });
  check("暗色氛围光层存在", await page.evaluate(() => {
    const v = document.getElementById("lotteryView");
    return getComputedStyle(v, "::before").backgroundImage.includes("radial-gradient");
  }));

  // 结果弹窗稀有度 class（直接调 showLotteryResult mock）
  await page.evaluate(() => {
    const m = document.createElement("div"); m.id="lotteryResultOverlay";
    document.body.appendChild(m);
  });
  const rclasses = await page.evaluate(() => {
    showLotteryResult([
      { key:"crystal", name:"法魂水晶", desc:"test", icon:"💎", pct:0.1, rare:true, dup:false },
      { key:"skin", name:"皮肤碎片", desc:"test", icon:"🧵", pct:18, rare:false, dup:false },
      { key:"points", name:"积分", desc:"test", icon:"🪙", pct:35, rare:false, dup:false }
    ]);
    const items = document.querySelectorAll("#lotteryResultOverlay .lr-item");
    return Array.from(items).map(i => i.className);
  });
  check("结果弹窗生成3条", rclasses.length === 3, "got " + rclasses.length);
  check("水晶项 r-legend", rclasses[0] && rclasses[0].includes("r-legend"), rclasses[0]);
  check("碎片项 r-brave", rclasses[1] && rclasses[1].includes("r-brave"), rclasses[1]);
  check("积分项 r-common", rclasses[2] && rclasses[2].includes("r-common"), rclasses[2]);
  check("水晶项同时 rare+jackpot", rclasses[0] && rclasses[0].includes("rare") && rclasses[0].includes("jackpot"), rclasses[0]);

  check("全程无 pageerror/console.error", realErrs().length === 0, errors.join(" ; "));
  await page.screenshot({ path: path.join(OUT, "lottery-result.png") });

  console.log("\n结果: " + pass + "/" + (pass + fail) + (fail ? "  失败: " + fails.join(", ") : ""));
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error("运行异常:", e); process.exit(2); });
