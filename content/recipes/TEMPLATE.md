# 新建菜谱模板

复制以下内容，新建 `content/recipes/分类/菜名/index.md`，并放入 `cover.jpg`。

```markdown
---
title: 菜名
category: 分类
image: /images/分类/菜名/cover.jpg
prepTime: 5 分钟
ingredients:
  - item: 原料 1
    amount: 用量
  - item: 原料 2
    amount: 用量
steps:
  - 步骤一
  - 步骤二
  - 步骤三
---

这是一段关于这道咖啡的文字描述。
```

## 说明

- `title`：菜名，会显示在首页和详情页标题
- `category`：分类，用于首页筛选。建议和文件夹外层目录名一致，如 `特调`、`意式`、`手冲`
- `image`：封面图路径，必须是 `/images/分类/菜名/cover.jpg`
- `prepTime`：制作时间，可选
- `ingredients`：原料和用量列表
- `steps`：制作步骤列表
- `---` 下面的内容：正文描述，支持 markdown

## 图片要求

- 文件名固定为 `cover.jpg`
- 建议尺寸：4:3 或 16:9
- 文件不宜过大，建议控制在 2MB 以内
