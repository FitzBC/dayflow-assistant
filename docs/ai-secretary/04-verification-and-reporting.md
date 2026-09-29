# 验证与测试报告规范

## 每个阶段必须执行的验证层级

### 1. 构建验证

```bash
npm run build
```

Android 阶段增加：

```bash
./gradlew assembleDebug
```

### 2. 类型和静态检查

```bash
npm run typecheck
npm run lint
```

### 3. 单元测试

覆盖纯函数、领域模型、解析器、排程规则、状态转换和错误处理。

### 4. 集成测试

覆盖本地数据库、LLM Adapter、通知调度器、日历适配器和权限失败。

### 5. E2E 测试

使用 Playwright 验证 Web 核心流程；使用 Android 真机/模拟器验证语音、通知、生命周期和日历。

### 6. 安全检查

- 检查 API Key、token、真实个人数据是否进入仓库。
- 检查日志是否输出语音原文、日历标题和用户隐私。
- 检查 WebView/JS Bridge 是否只接受可信前端调用。
- 检查网络失败、模型失败和权限拒绝是否安全降级。

## 报告模板

每次阶段验收保存为 `reports/<phase>-<yyyy-mm-dd>.md`：

```markdown
# <阶段> 验收报告

- 日期：
- Agent：
- Git commit：
- 环境：Node / npm / Android SDK / 模拟器或真机

## 范围

本次验证覆盖：

## 命令和结果

| 检查项 | 命令 | 结果 | 备注 |
|---|---|---|---|
| Build | `...` | PASS/FAIL | |
| Typecheck | `...` | PASS/FAIL | |
| Lint | `...` | PASS/FAIL | |
| Unit | `...` | PASS/FAIL | X/Y |
| Integration | `...` | PASS/FAIL | |
| E2E | `...` | PASS/FAIL | |
| Coverage | `...` | PASS/FAIL | % |
| Security | `...` | PASS/FAIL | |

## 验收矩阵

| ID | 状态 | 证据路径 | 备注 |
|---|---|---|---|
| AC-001 | PASS | `...` | |

## 问题与风险

## 结论

PASS / NOT READY
```

## 阶段通过条件

阶段只能在以下条件同时满足时标记 `PASS`：

- 该阶段验收矩阵中所有非延期条目为 PASS。
- 构建、类型检查、Lint 通过。
- 相关自动化测试通过。
- 核心覆盖率达到阶段目标。
- 报告已保存到 `reports/`。
- status 文件已更新。

## 证据要求

- 测试输出保留关键摘要，不要求把超长日志全部提交。
- UI 验收必须有截图或 Playwright HTML 报告。
- Android 真机验收必须记录设备型号、系统版本、App 版本。
- 失败不能只写“未通过”，必须记录复现步骤和下一步。
