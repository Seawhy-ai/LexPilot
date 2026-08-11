<div align="center">

<img src="standalone/app-icon.jpg" width="128" height="128" alt="SeaWhy Lex" />

# 🐋 SeaWhy Lex

**法学生 AI 学习助手** · 基于法学实证研究的智能法律学习工具

> 源自《AI法律工具失效模式与规制路径研究》(2026)——对 DeepSeek 与千问双模型实证测试驱动，
> 覆盖 8 类法律案例 × 2 轮测试 × 4 维测评，归纳 10 大 AI 法律工具失效模式并针对性优化。

[🚀 在线使用](https://seawhy-ai.github.io/LexPilot/) · [⭐ 功能一览](#-功能一览) · [⚡ 快速开始](#-快速开始) · [🛠 技术栈](#-技术栈) · [📄 更新日志](#-更新日志)

![last commit](https://img.shields.io/github/last-commit/Seawhy-ai/LexPilot?style=flat-square&color=2980b9)
![repo size](https://img.shields.io/github/repo-size/Seawhy-ai/LexPilot?style=flat-square&color=27ae60)
![top language](https://img.shields.io/github/languages/top/Seawhy-ai/LexPilot?style=flat-square&color=8e44ad)

</div>

---

## ✨ 功能一览

| 模块 | 说明 |
| --- | --- |
| ⚖️ **法律咨询** | AI 智能问答，SWAI / AHY / NAIWA / KUTE / 暖日 多角色人格化服务 |
| 📚 **法律数据库** | 民法典、刑法、诉讼法等核心法典全文检索与在线阅读 |
| 🎯 **学习题库** | 393 道法学题目，练习 / 考试双模式，计时与倒计时，错题本 |
| 📅 **学习规划** | 课表管理（周视图）、每日打卡、今日待办、主页卡片 |
| 📝 **笔记本** | 学习笔记，支持标签分类与云端同步 |
| 📄 **法律文书** | 常用法律文书模板与生成 |
| 🧑‍⚖️ **案例分析** | 判例检索与解析 |
| 👤 **个人中心** | 头像昵称、积分体系、VIP 特权、云端备份 |

## ⚡ 快速开始

**在线体验**：打开 [https://seawhy-ai.github.io/LexPilot/](https://seawhy-ai.github.io/LexPilot/) 即可使用，无需安装。

**本地运行**：

```bash
git clone https://github.com/Seawhy-ai/LexPilot.git
cd LexPilot
npm install
node server.js
```

浏览器访问 `http://localhost:3000`。

> 应用主体为单文件 Web 应用（`standalone/law.html`），直接双击亦可打开（部分功能需本地服务支持）。

## 🛠 技术栈

- **前端**：原生 HTML / CSS / JavaScript（单文件 SPA，零依赖，可离线部署）
- **后端**：Node.js + Express
- **AI**：DeepSeek API
- **部署**：GitHub Pages

## 📄 更新日志

- **v2.5.5** (2026.08.05) — 主界面打卡与今日待办
- **v2.5.0** (2026.08.03) — 学习题库优化升级，支持按章节查询
- **v2.4.0** (2026.08.01) — 名言卡片自动轮播与手动切换
- **v2.3.7** (2026.07.31) — 新增笔记本，支持创建学习笔记
- **v2.3.0** (2026.07.30) — 新增个人中心，支持创建头像与昵称

完整更新历史见应用内「设置 → 关于」。

## 🙏 致谢

本项目系统提示词优化基于对 **DeepSeek** 与 **千问** 两款主流 AI 的实证测试结果。

---

<div align="center">

Made with ❤️ for 法学生

</div>
