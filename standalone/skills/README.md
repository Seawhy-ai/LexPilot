# SeaWhy AI — 角色技能库

基于 [immortal-skill](https://github.com/agenmod/immortal-skill) 标准格式，四维蒸馏模型。

## 角色列表

| # | 角色名 | 类型 | 邀请码 | 维度覆盖 |
|---|--------|------|--------|----------|
| 1 | **Swai 2.0** | 核心助手 (mentor) | 公开 | procedure + interaction + memory + personality |
| 2 | **Ahy（王晗）** | 朋友 (friend) | 030325 | procedure + interaction + memory + personality |
| 3 | **Kute** | 朋友 (friend) | 1009 | procedure + interaction + memory + personality |
| 4 | **暖日蓝恬** | 朋友 (friend) | 0909 | procedure + interaction + memory + personality |
| 5 | **奶蛙** | 朋友 (friend) | 7891 | procedure + interaction + memory + personality |

## 目录结构

每个角色包含 5 个文件：

```
skills/
├── swai/          # Swai 2.0 核心AI助手
│   ├── SKILL.md       # 主入口
│   ├── personality.md # 性格与价值观
│   ├── interaction.md # 交互风格
│   ├── memory.md      # 记忆与背景
│   └── procedure.md   # 行为规则
├── ahy/           # Ahy（王晗）法学女生
├── kute/          # Kute 抽象恶搞达人
├── nuanri/        # 暖日蓝恬 经济学院
└── naiwa/         # 奶蛙 抽象生物
```

## 证据标记说明

| 标记 | 含义 | 置信度 |
|------|------|--------|
| v (verbatim) | 原文引用 | ⭐⭐⭐ 高 |
| a (artifact) | 制品佐证 | ⭐⭐ 中 |
| i (impression) | 主观推断 | ⭐ 低 |
