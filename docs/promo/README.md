# 🎬 SeaWhy Lex 宣传片

| 文件 | 说明 |
| --- | --- |
| `lexpilot-promo.mp4` | 正式宣传片(1920×1080, 30s, 30fps, H.264) |
| `lexpilot-promo-preview.gif` | 8 秒 GIF 预览 |
| `poster.jpg` | 封面图 |
| `promo.html` | **宣传片渲染器源码 V2**(双击即可在浏览器实时预览/播放) |
| `icon.png` | 宣传片使用的 App 图标素材 |

## 📱 V2 升级:手机 Mockup + 真实 App 截图

V2 在 V1 纯矢量卡片的基础上全面升级——画面中嵌入**真实 App 界面截图**(由 `appshots.js` 从 `standalone/law.html` 深色主题逐界面截取),以手机 Mockup 形式呈现:

- 开场:品牌 Logo + 手机自底部升起,展示首页(打卡 / 待办 / 课表)
- 标语:大字「让法律学习 更简单」+ 手机持续展示首页
- 功能巡礼:8 个功能各 2.25s,左侧功能卡(图标 / 名称 / 描述 / 标签)+ 右侧手机切换对应真实界面截图
- 总结:功能图标 2×4 汇聚成卡片墙 +「一站式法学生态」
- 收尾:Logo + 在线地址

## 分镜结构(30 秒)

| 时间 | 场景 | 内容 |
| --- | --- | --- |
| 0–3s | 封面 | 鲸鱼 Logo +「SeaWhy Lex · 法学生 AI 学习助手」+ 手机展示首页 |
| 3–5.5s | 核心标语 | 「让法律学习,更简单」 |
| 5.5–23.5s | 功能模块 | 8 张卡片 + 手机截图:AI 法律咨询 / 法典数据库 / 学习题库 / 学习规划 / 学习笔记 / 法律文书 / 案例分析 / 个人中心 |
| 23.5–26s | 总结 | 8 个功能图标汇聚 +「一站式法学生态」 |
| 26–30s | 收尾 | Logo +「免费 · 开源 · 即刻体验」+ 在线地址 |

## 如何重新渲染/修改

`promo.html` 是**确定性时间轴**渲染器:画面完全由时间 t(0–30s)决定。

- **改文案/配色**:编辑 `promo.html` 里的 `FEATURES` 数组、`C` 颜色对象、各场景 `draw*` 函数。
- **换截图**:先运行 `appshots.js`(见 `.promo/` 工作目录)从 `standalone/law.html` 截取各界面 PNG,输出到 `appshots/`;渲染器按 `appshots/*.png` 加载。
- **浏览器预览**:双击 `promo.html`(自动播放,点击画面暂停/继续;截图需与 `appshots/` 同目录)。
- **重新导出 mp4**:需要本机有 Chrome + Node + ffmpeg,参考 `render.js` 思路——
  1. 用本地 HTTP 服务打开 `promo.html?t=0&render=1`(避免 file:// 污染 canvas)
  2. Chrome headless CDP 逐帧 `setPromoTime(t)` + 截图
  3. `ffmpeg -framerate 30 -i f_%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18` 合成

> 渲染脚本(`render.js` / `appshots.js` / `test.js` / `ascii.js`)在 `.promo/` 目录,可自行参考复用。
