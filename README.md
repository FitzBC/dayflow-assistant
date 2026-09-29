# Dayflow Assistant

Dayflow 是一个面向 Android 的轻量个人日常事务秘书。用户通过中文语音或文字描述需求，系统将其转成结构化任务、生成可解释的日程建议，并通过原生通知形成完成或延期闭环。

当前处于 **P1 Web 业务原型**阶段。仓库已经具备可运行的移动端 Web 壳、测试基线和跨 Agent 接续文档；任务解析、排程和 Android 原生能力尚未实现。

## 技术基线

- React 19 + TypeScript + Vite
- Vitest + Testing Library
- Playwright（后续 E2E）
- 目标容器：Capacitor Android

## 本地运行

```bash
npm install
npm run dev
```

## 验证命令

```bash
npm run build
npm run typecheck
npm run lint
npm test
npm run test:coverage
```

## Agent 接续

开始工作前依次阅读：

1. `AGENTS.md`
2. `docs/ai-secretary/00-status.md`
3. `docs/ai-secretary/03-acceptance-matrix.md`
4. `reports/` 中最新报告

项目范围、阶段计划和完成定义位于 `docs/ai-secretary/`。
