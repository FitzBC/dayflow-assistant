# Android 个人日常事务管理秘书：调研与功能设计

> 调研日期：2026-09-24（中国标准时间）

## 1. 产品定位

建议把产品定义为：**一个以语音为主要入口、以日程为执行界面、以提醒为闭环的个人事务秘书**。

核心承诺不是“帮用户管理一堆待办”，而是：

> 用户随口说一句，应用把它变成可执行任务，安排到现实可用的时间，并在合适的时候提醒和跟进。

首版应聚焦单人、中文、个人事务，不做协作项目管理，不做完全自主的日历改动，不做长时间后台监听。

## 2. 商业产品调研

### Todoist：任务捕获和结构化的标杆

Todoist 的 Quick Add 支持用自然语言录入日期、截止日期、标签、优先级、提醒和项目；Inbox 用于先快速收集、之后再整理；Task Assist 可以把大任务拆成子任务、给出下一步和改写成更可执行的任务。参考：[Quick Add](https://www.todoist.com/help/todoist/features/use-task-quick-add-in-todoist-va4Lhpzz)、[Inbox](https://www.todoist.com/help/todoist/get-started/use-the-inbox-in-todoist-HwHvYErS)、[Task Assist](https://www.todoist.com/help/todoist/todoist-and-ai/use-the-task-assist-extension-with-todoist-ZgldtcPeT)。

可借鉴：

- 允许“先说出来，后整理”，避免用户在输入时填写很多字段。
- 任务需要明确的动作、时间、优先级和项目归属。
- AI 结果必须先展示、可编辑、可批量确认，不能直接写入一堆用户不理解的任务。

局限：AI Task Assist 当前主要是辅助任务处理，不等于一个持续运行的自动排程秘书；其帮助文档也显示 Task Assist 扩展并不在 Android 客户端提供。因此你的产品可以把“语音 + Android 原生提醒 + 动态日程”作为差异化入口。

### Motion：自动时间块排程的标杆

Motion 会根据截止时间、优先级、依赖关系和可用时间自动安排任务，并在计划变化时重新优化日程。参考：[Motion AI Task Manager](https://www.usemotion.com/features/ai-task-manager)、[Auto-scheduling](https://www.usemotion.com/help/time-management/auto-scheduling)。

可借鉴：

- 任务必须有预计时长，否则无法排程。
- 日程不是一次性生成，而是“活的计划”，发生冲突后可以重排。
- 应向用户展示“现在该做什么”，而不是让用户自己从任务列表中挑选。

需要克制：个人应用不应一开始就频繁移动所有时间块。移动前应区分固定事项、弹性任务和用户手动锁定的时间。

### Reclaim：弹性规则和持续自适应的标杆

Reclaim 将任务、习惯、专注时间和缓冲区放入日历，支持在时间冲突时移动、缩短、跳过或保护；其 2.0 还强调了预览模式和确认后应用变更。参考：[Reclaim 功能说明](https://help.reclaim.ai/en/articles/6210740-features-in-reclaim)、[Reclaim 2.0 概览](https://help.reclaim.ai/en/articles/14846468-reclaim-ai-2-0-overview)、[Reclaim 2.0 FAQ](https://help.reclaim.ai/en/articles/15280604-reclaim-2-0-faq)。

可借鉴：

- 每个任务不只是“一个时间点”，还应有可排时间窗、最短时长、可拆分、优先级和冲突策略。
- 自动排程必须有“预览—确认—执行”的安全闸门。
- 习惯与一次性任务使用不同模型：习惯可以灵活移动，一次性截止事项更关注完成期限。

### Sunsama：日计划仪式和负荷控制的标杆

Sunsama 通过每日计划流程引导用户回顾昨天、选择今天任务、估算工作量、把任务 timebox 到日历，并允许延期超载任务。参考：[Daily Planning](https://help.sunsama.com/docs/usage-guides/daily-planning/)、[Daily Planning 产品页](https://www.sunsama.com/daily-planning)。

可借鉴：

- 每日计划不应只是一个日历页面，而是一个短流程。
- 要显示“今天计划了多少小时”和“预计几点结束”，避免 AI 排出不现实的一天。
- 用户可以在当天重新规划，而不是只能早上规划一次。

### TickTick：移动端提醒和语音入口的标杆

TickTick 官方功能页强调语音输入转任务、多次提醒、持续提醒和邮件提醒。参考：[TickTick Features](https://ticktick.com/features)。

可借鉴：

- 移动端首要体验是快速捕获和可靠提醒。
- 提醒需要支持稍后提醒、重复提醒和“直到完成”的策略。
- 语音转文字后，用户仍要能快速修正识别结果。

## 3. GitHub 开源项目调研

以下项目更适合作为后端/调度思想和边界设计的参考，不建议直接当 Android 客户端依赖。

### DayOtter

[Dayotter/dayotter](https://github.com/Dayotter/dayotter) 是开源日历与调度平台，强调多日历聚合、AI 助手、语音/自然语言操作、冲突处理以及 confirm-first；支持接入 OpenAI 兼容接口或本地模型。

值得借鉴：AI 只生成动作草案，日历真正改变前必须确认；模型供应商可插拔；AI 不是调度系统本身，确定性日历逻辑仍由应用控制。

### DailyOS

[stadimeti19/DailyOS](https://github.com/stadimeti19/DailyOS) 是 local-first 的日计划助手，把日历、邮件、任务、天气和用户偏好组合成当天时间线，强调有限读取、确定性权限引擎、SQLite 状态、审计和失败降级。

值得借鉴：将“收集上下文—生成计划—验证计划—等待批准—执行通知”拆成流水线；后台任务有去重、重试和错过执行策略；不能让模型直接拥有所有写权限。

### PersonalAgent

[macizomedia/personalagent](https://github.com/macizomedia/personalagent) 展示了优先级、多日历、家庭/个人/工作层级、复杂任务拆解和冲突解决的组合方式。

值得借鉴：先设计优先级和日历冲突规则，再接入模型；复杂任务拆分应保留任务依赖和上下文。

### agent_planner

[sea-rod/agent_planner](https://github.com/sea-rod/agent_planner) 是基于 LangGraph 的自然语言日程组织 Agent，适合参考对话状态、工具调用和日程规划的编排方式。

值得借鉴：模型调用应围绕结构化工具进行，例如 `create_task`、`find_free_slots`、`propose_plan`，不要让模型直接输出一段不可验证的自然语言排程。

### AI Personal Assistant / Herwanto OS

[Meet261/AI-Personal-Assistant](https://github.com/Meet261/AI-Personal-Assistant) 和 [MTLdept2026/herwanto-os](https://github.com/MTLdept2026/herwanto-os) 展示了任务、项目、日记、每日简报、主动提醒、check-in 和本地模型等组合能力。

值得借鉴：提醒之外增加“早间简报”和“晚间收尾”；本地模型/BYOK 是隐私和成本的重要选项；不过这些项目通常是 Web、CLI 或机器人入口，Android 原生提醒和省电限制仍需要单独设计。

## 4. 建议的 MVP 范围

### MVP 必须有

1. 语音录入：按住说话，识别成中文文本，允许编辑。
2. 智能解析：从一句话提取任务、时间、截止时间、预计时长、优先级、地点、重复规则和提醒。
3. 确认卡片：展示“我理解的是……”，用户一键确认或修改。
4. 任务 Inbox：所有新任务先进入收件箱，缺少信息的任务不强行排程。
5. 今日视图：显示当前时间、下一个任务、今天剩余任务和已占用时间。
6. 动态排程：读取本地日历或 Google Calendar，给弹性任务寻找可用时间块。
7. 计划变更预览：显示哪些任务会移动、为什么移动、预计结束时间变化，用户确认后应用。
8. 本地提醒：任务开始前、截止前、逾期后和稍后提醒。
9. 完成/跳过/延期：提醒通知上直接完成、延后 15 分钟、今天晚些时候、明天。
10. 每日简报：早上给出 3—5 个重点事项，晚上给出未完成项和重新安排建议。

### 暂不做

- 团队协作、任务分配、评论和权限体系。
- 自动发送邮件、自动改会议参与者、自动发消息。
- 持续唤醒词监听。
- 复杂目标管理、OKR、习惯社区和积分体系。
- 一开始就接入 Gmail、微信、飞书、Slack 等多个外部数据源。

## 5. 核心用户流程

### 流程 A：语音捕获

用户说：“明天下午提醒我给房东打电话，最好半小时，六点前完成。”

系统解析为：

```json
{
  "title": "给房东打电话",
  "duration_minutes": 30,
  "due_at": "次日 18:00",
  "preferred_window": {"start": "次日 13:00", "end": "次日 18:00"},
  "reminders": [{"offset_minutes": 10}],
  "priority": "normal",
  "needs_confirmation": false
}
```

如果用户说“找时间处理一下报销”，则创建 Inbox 任务，向用户追问或建议：预计多久、截止日期、是否需要安排到今天。

### 流程 B：生成日程

1. 读取未来 7 天固定日历事件。
2. 读取未完成任务和每项预计时长。
3. 锁定用户手动固定的时间块。
4. 根据截止时间、优先级、上下文、可用时间窗寻找候选槽位。
5. 给出计划预览。
6. 用户确认后写入本地计划；可选同步为日历事件。

### 流程 C：提醒和闭环

提醒文案不要只说“该做任务了”，而应包含动作、时长和下一步：

> 现在是 14:00。建议开始“给房东打电话”，预计 30 分钟，距离截止还有 4 小时。开始 / 延后 15 分钟 / 改到晚上。

如果用户没有响应：第一次轻提醒；第二次询问是否延期；超过截止时间后进入“需要重新安排”，而不是无限轰炸。

## 6. 信息架构

底部导航建议只有 4 个入口：

- **今天**：当前时间线、下一个动作、剩余负荷、快速完成/延期。
- **任务**：Inbox、全部任务、项目/标签、已完成。
- **日历**：日/周视图、任务时间块和外部日历事件。
- **秘书**：语音输入、对话、计划变更和每日简报。

全局悬浮按钮：麦克风。长按语音，松手识别；短按进入文本输入。

### 任务详情字段

- 标题、原始语音文本
- 状态：Inbox / 已计划 / 进行中 / 已完成 / 已取消
- 预计时长、截止时间、优先级
- 可用时间窗、是否可拆分、最小时间块
- 项目、标签、地点、关联联系人
- 提醒策略、重复规则
- AI 解析结果和用户修改记录
- 计划时间块与实际完成时间

## 7. AI 设计：模型负责理解，规则负责执行

### 适合交给大模型

- 语音文本清洗和任务识别。
- 将模糊表达转换为结构化字段。
- 复杂任务拆成合理的下一步。
- 根据用户偏好生成日计划说明和提醒文案。
- 在信息不足时决定应该追问什么。

### 不应完全交给大模型

- 是否与固定会议冲突。
- 时间区间计算、时区、夏令时。
- 任务是否过载、是否超过用户的工作结束时间。
- 提醒是否已经发送、是否重复发送。
- 日历写入、删除和批量移动。

### 推荐工具调用接口

```text
parse_capture(text, now, timezone) -> TaskDraft
search_calendar(start, end) -> CalendarEvent[]
find_free_slots(task, calendar, preferences) -> Slot[]
propose_plan(tasks, events, preferences) -> PlanProposal
validate_plan(proposal) -> ValidationResult
apply_plan(proposal_id) -> AppliedChanges
complete_task(task_id)
snooze_task(task_id, until)
```

模型只允许生成 `TaskDraft`、`PlanProposal` 等结构化对象；所有写操作经过 schema 校验、权限校验和用户确认。

## 8. 排程规则

### 任务类型

- **固定事件**：会议、预约、车次，不能移动。
- **有截止时间任务**：必须在 deadline 前完成，可在时间窗内移动。
- **弹性任务**：无明确截止时间，按优先级和上下文安排。
- **习惯任务**：每天/每周重复，有可移动窗口。
- **等待任务**：依赖外部条件，暂不占用时间块。

### 简化评分函数

候选时间块可按以下思路评分：

```text
score =
  deadline_urgency * 0.30
  + priority * 0.25
  + preference_match * 0.20
  + context_match * 0.10
  + continuity * 0.10
  - fragmentation_penalty * 0.05
```

实际实现可以先用确定性排序，不要在 MVP 中追求复杂优化算法。关键是解释结果：为什么安排在这里，哪些条件会触发重排。

### 重排原则

1. 固定事件永不自动移动。
2. 手动锁定时间块不自动移动。
3. 截止时间越近，任务优先级越高。
4. 默认不把任务排到用户设定的工作结束时间之后。
5. 每次重排最多影响未来 24—48 小时，避免整周计划震荡。
6. 任务被推迟两次后必须显著提醒用户，而不是继续静默延期。

## 9. Android 技术方案

### 推荐技术栈

- Kotlin + Jetpack Compose。
- Clean Architecture：`app / presentation / domain / data / core`。
- Room：本地任务、时间块、提醒、排程版本和审计记录。
- DataStore：用户偏好和模型配置。
- WorkManager：同步、日计划生成、非精确后台工作。
- AlarmManager：需要在指定时间附近提醒的任务。
- Android Calendar Provider：可选读写系统日历。
- Hilt：依赖注入。
- Retrofit/Ktor Client：服务端 API。

推荐依赖方向：`presentation → domain ← data`；domain 保持纯 Kotlin，不依赖 Android 框架。

### 语音输入

MVP 用 Android `SpeechRecognizer` 做按住说话的单次识别；官方明确说明它可能把音频流式传到远程服务，因此应在隐私说明中明确告知用户，并且不适合持续识别。参考：[SpeechRecognizer API](https://developer.android.com/reference/android/speech/SpeechRecognizer)。

后续可提供可插拔 STT：云端 ASR、设备厂商识别、本地 Whisper/其他本地模型。语音原始音频默认不落盘，只保留识别文本。

### 提醒和后台限制

Android 13 及以上需要请求 `POST_NOTIFICATIONS`，建议在用户完成第一条任务并真正开启提醒意图时再请求。参考：[Notification permission](https://developer.android.com/develop/ui/compose/notifications/notification-permission)。

Android 12 及以上精确闹钟需要相应的 special access；只有用户确实要求准点提醒时才申请，普通提醒用不精确 alarm 或 WorkManager。参考：[Schedule alarms](https://developer.android.com/develop/background-work/services/alarms)。

Android Calendar Provider 支持查询、插入、更新和删除日历、事件、参与者和提醒；MVP 可先只读日历，确认后再写入“AI 计划”专用日历。参考：[Calendar Provider](https://developer.android.com/identity/providers/calendar-provider)。

## 10. 数据和隐私

建议默认策略：

- 本地保存任务、计划、提醒和模型返回结果。
- 上传给模型前只发送完成理解所需的最小上下文。
- 语音原文、日历标题、地点和联系人视为敏感信息。
- 模型供应商可选择：官方云模型、兼容 OpenAI API 的自定义服务、本地模型。
- 每次 AI 读取和写入行为写入审计日志。
- 允许一键导出、删除全部数据和关闭云端 AI。
- 对日历采用最小权限：首版只读；写入必须用户确认。

## 11. MVP 迭代路线

### V0：可用原型

语音/文本输入 → 结构化任务草案 → 用户确认 → 本地任务列表 → 本地定时提醒。

### V1：个人日计划

加入本地日历读取、预计时长、今日计划、任务完成/延期、简单时间块排程和早晚简报。

### V2：动态排程

加入外部日历同步、冲突检测、计划预览、确认后写入日历、自动重排和任务负荷控制。

### V3：个性化秘书

根据历史完成时间学习时长，识别用户常见拖延、可用时段和提醒偏好；加入习惯、地点提醒、更多入口和本地模型。

## 12. 首版成功指标

- 从开始说话到任务草案出现：中位数小于 5 秒。
- 语音任务解析后无需修改的比例：首版目标 ≥ 70%。
- 用户确认后的任务成功提醒率：≥ 98%。
- 用户打开提醒后完成或延期的比例：≥ 50%。
- 每日计划被用户主动修改的比例逐步下降。
- 由于排程过载而被迫延期的任务比例低于 20%。

最重要的体验指标不是“AI 说得多聪明”，而是用户是否敢把事情交给它，并且相信提醒不会漏、计划不会乱改。

## 13. 结论

建议产品从“语音 Inbox + 今日计划 + 可解释排程 + 可靠提醒”切入。最关键的差异不是再做一个聊天机器人，而是让每一次对话都能落成一个可执行的时间安排，同时保持用户对计划的控制权。

技术上采用“LLM 做理解和建议，确定性代码做排程验证、提醒和写入”的组合；产品上采用“先收集、再确认、后执行”的流程。这样既能快速体现大模型价值，又能避免 AI 日程产品最常见的不信任问题：误解任务、安排过载、擅自移动日历和重复提醒。
