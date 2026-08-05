## Project

这是一个基于 Astro 的静态咖啡菜谱网站。

- 在线地址：https://nanxi-life.github.io/coffee-menu/
- 仓库：https://github.com/nanxi-life/coffee-menu
- 内容目录：`content/recipes/`
- 主题：`cozy`（可在 `src/config.ts` 切换为 `magazine`）

## Development

启动本地开发服务器（后台模式）：

```bash
npx astro dev --host --background
```

带 GitHub Pages 子路径访问：

```
http://localhost:4321/coffee-menu/
```

管理后台服务器：

```bash
npx astro dev stop
npx astro dev status
npx astro dev logs
```

## Content

菜谱内容放在 `content/recipes/`，按分类组织：

```text
content/recipes/
├── 特调/
│   └── 橙子海/
│       ├── index.md
│       └── cover.jpg
├── 意式/
└── 手冲/
```

每个菜谱文件夹需要：

- `index.md`：菜谱 frontmatter + 正文
- `cover.jpg`：封面图

参考模板：`content/recipes/TEMPLATE.md`

## Images

`public/images/` 是 `content/recipes/` 中图片的构建副本，由 `scripts/sync-images.mjs` 自动生成。**不要手动修改 `public/images/`**。

开发或构建前会运行：

```bash
npm run sync
```

## Theme Switching

修改 `src/config.ts`：

```ts
theme: 'cozy' // 或 'magazine'
```

切换主题后需要重启 dev 服务器。

## Build & Deploy

本地构建：

```bash
npm run build
```

部署到 GitHub Pages：

1. push 到 `main` 分支
2. GitHub Actions 自动构建并部署
3. 访问 https://nanxi-life.github.io/coffee-menu/

## Documentation

- Astro: https://docs.astro.build
- Routing: https://docs.astro.build/en/guides/routing/
- Content Collections: https://docs.astro.build/en/guides/content-collections/
