# 技术基线

## 总体架构

```text
React / TypeScript / Vite
        │
        ├── Domain：任务、日历、排程、提醒规则
        ├── Application：用例、状态机、权限和审计
        ├── Adapters：LLM、存储、语音、通知、日历
        └── UI：Compose-like mobile web UI
                │
                ▼
          Capacitor Android
                │
                ├── SpeechRecognizer
                ├── Local Notifications / AlarmManager
                ├── Calendar Provider
                └── Android lifecycle and permissions
```

## 建议目录

```text
src/
  domain/
    task/
    calendar/
    planning/
    reminder/
  application/
    use-cases/
    ports/
  adapters/
    llm/
    storage/
    calendar/
    notifications/
    speech/
  ui/
    pages/
    components/
    state/
  design-system/
tests/
  fixtures/
  unit/
  integration/
  e2e/
```

## 核心领域对象

```typescript
type TaskStatus =
  | 'INBOX'
  | 'PLANNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'SNOOZED'
  | 'CANCELLED'

interface Task {
  id: string
  title: string
  sourceText?: string
  status: TaskStatus
  durationMinutes?: number
  dueAt?: string
  preferredWindow?: { start: string; end: string }
  priority: 1 | 2 | 3 | 4
  recurrence?: string
  createdAt: string
  updatedAt: string
}

interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  isFixed: boolean
  source: 'LOCAL' | 'ANDROID_CALENDAR' | 'GOOGLE_CALENDAR'
}

interface PlanBlock {
  id: string
  taskId: string
  start: string
  end: string
  status: 'PROPOSED' | 'CONFIRMED' | 'CANCELLED'
}

interface PlanProposal {
  id: string
  baseVersion: number
  blocks: PlanBlock[]
  changes: Array<{ type: 'ADD' | 'MOVE' | 'REMOVE'; taskId: string }>
  explanation: string[]
}
```

## Adapter 约束

- `LLMAdapter` 不得直接写数据库或日历。
- `Planner` 不得依赖 React、Capacitor 或网络。
- `ReminderScheduler` 必须支持取消和幂等重建。
- `CalendarAdapter` 必须区分只读、预览和写入。
- 所有时间计算显式传入 timezone 和 `now`，测试禁止依赖系统当前时间。
