# 我的咖啡菜谱

一个基于 Astro 的静态咖啡菜谱网站。

- 在线地址：https://nanxi-life.github.io/coffee-menu/
- 管理内容：直接编辑 `content/recipes/` 下的 markdown 文件和图片

## 项目结构

```text
/
├── content/recipes/          # 菜谱源文件（markdown + 图片）
│   ├── 特调/
│   │   ├── 橙子海/
│   │   │   ├── index.md
│   │   │   └── cover.jpg
│   │   └── ...
│   └── 意式/
│       └── ...
├── public/images/            # 构建时自动同步的图片（无需手动编辑）
├── src/
│   ├── content.config.ts     # 内容集合配置
│   ├── config.ts             # 主题配置
│   ├── pages/                # 页面路由
│   ├── themes/               # cozy / magazine 主题
│   └── utils/                # 工具函数
├── .github/workflows/        # GitHub Actions 自动部署
└── package.json
```

## 本地开发

```bash
npm install
npm run dev
```

本地服务启动后访问 http://localhost:4321/coffee-menu/

## 添加新菜谱

1. 在 `content/recipes/` 下新建分类文件夹（如 `特调/`）
2. 在分类下新建菜谱文件夹，比如 `content/recipes/特调/新品名称/`
3. 在该文件夹内放入：
   - `index.md`：菜谱内容
   - `cover.jpg`：封面图

`index.md` 格式：

```markdown
---
title: 新品名称
category: 特调
image: /images/特调/新品名称/cover.jpg
prepTime: 5 分钟
ingredients:
  - item: 浓缩咖啡
    amount: 36g
  - item: 某原料
    amount: 50g
steps:
  - 步骤一
  - 步骤二
---

这是一段文字描述。
```

4. 提交并 push 到 `main` 分支
5. GitHub Actions 会自动构建并部署到 GitHub Pages

## 主题切换

修改 `src/config.ts` 中的 `theme`：

```ts
theme: 'cozy' // 或 'magazine'
```

## 部署

push 到 `main` 后，GitHub Actions 会自动构建并部署。无需手动操作。

## 常用命令

| Command | Action |
| :-- | :-- |
| `npm install` | 安装依赖 |
| `npm run dev` | 启动本地开发服务器 |
| `npm run build` | 构建生产站点 |
| `npm run preview` | 本地预览构建结果 |
