# 🎬 SeaWhy Lex 宣传片

| 文件 | 说明 |
| --- | --- |
| `lexpilot-promo.mp4` | 正式宣传片(1920×1080, 30s, 30fps, H.264) |
| `lexpilot-promo-preview.gif` | 8 秒 GIF 预览 |
| `poster.jpg` | 封面图(第 1 秒画面) |
| `promo.html` | **宣传片渲染器源码**(双击即可在浏览器实时预览/播放) |
| `icon.png` | 宣传片使用的 App 图标素材 |

## 分镜结构(30 秒)

| 时间 | 场景 | 内容 |
| --- | --- | --- |
| 0–3s | 封面 | 鲸鱼 Logo +「SeaWhy Lex · 法学生 AI 学习助手」 |
| 3–5.5s | 核心标语 | 「让法律学习,更简单」 |
| 5.5–23.5s | 功能模块 | 8 张卡片依次展示:AI 法律咨询 / 法典数据库 / 学习题库 / 学习规划 / 学习笔记 / 法律文书 / 案例分析 / 个人中心 |
| 23.5–26s | 总结 | 8 个功能图标汇聚 +「一站式法学生态」 |
| 26–30s | 收尾 | Logo +「免费 · 开源 · 即刻体验」+ 在线地址 |

## 如何重新渲染/修改

`promo.html` 是**确定性时间轴**渲染器:画面完全由时间 t(0–30s)决定。

- **改文案/配色**:编辑 `promo.html` 里的 `FEATURES` 数组、`C` 颜色对象、各场景 `draw*` 函数。
- **浏览器预览**:直接双击 `promo.html`(自动播放,点击画面暂停/继续)。
- **重新导出 mp4**:需要本机有 Chrome + Node + ffmpeg,参考 `render.js` 思路——
  1. 用本地 HTTP 服务打开 `promo.html?t=0&render=1`(避免 file:// 污染 canvas)
  2. Chrome headless CDP 逐帧 `setPromoTime(t)` + 截图
  3. `ffmpeg -framerate 30 -i f_%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18` 合成

> 渲染脚本(`render.js` / `test.js`)在 `.promo/` 目录,可自行参考复用。
