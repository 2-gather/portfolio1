# AI Product Portfolio
## 当前包含

- 作品集首页
- AI 数据分析 Agent 项目详情页
- AI 志愿规划助手项目详情页
- 产品分析报告、PRD、方案设计与架构、测试总结的站内阅读页
- 响应式布局，支持桌面与移动端

## 本地运行

需要安装 Node.js。

```bash
npm install
npm run dev
```

终端会显示本地访问地址，通常是 `http://localhost:5173`。

正式构建：

```bash
npm run build
npm run preview
```

## 注意

1. 当前文档页是基于项目背景整理的展示版摘要。请对照飞书中的最终版本，补充/校正为真实定稿内容。
2. 测试页目前只展示测试范围与问题摘要，没有伪造通过率。可以把真实测试 Excel 放入 `public/files/` 并配置下载链接。
3. 发布前检查仓库与构建产物，确保没有 `.env`、API Key、个人敏感数据或其他机密。

## 项目结构

```text
ai-pm-portfolio/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.jsx
    └── styles.css
```

## 注意

此项目只负责作品集展示。AI 数据分析 Agent 本身仍需要单独运行或部署；把 Python 源代码放在静态网站中并不会让 Agent 自动在线运行。
