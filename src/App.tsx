import './App.css'

const navigationItems = [
  { label: '今天', icon: '⌂', active: true },
  { label: '任务', icon: '✓', active: false },
  { label: '日历', icon: '▦', active: false },
  { label: '秘书', icon: '✦', active: false },
]

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">DAYFLOW · 星期二</p>
          <p className="date-label">9月29日</p>
        </div>
        <button className="profile-button" type="button" aria-label="打开个人设置">
          北
        </button>
      </header>

      <main className="today-view">
        <section className="welcome-block" aria-labelledby="welcome-title">
          <span className="sun-mark" aria-hidden="true">☀</span>
          <p className="welcome-kicker">早上好</p>
          <h1 id="welcome-title">今天，从一句话开始</h1>
          <p className="welcome-copy">
            告诉我你想完成什么，我会帮你整理成任务并安排合适的时间。
          </p>
        </section>

        <section className="capture-panel" aria-label="快速记录事务">
          <button className="voice-button" type="button">
            <span className="microphone" aria-hidden="true">●</span>
            <span>按住说话</span>
          </button>
          <button className="text-button" type="button">改用文字输入</button>
          <p className="example-copy">例如：“明天下午提醒我给房东打电话，留半小时”</p>
        </section>

        <section className="empty-agenda" aria-labelledby="agenda-title">
          <div className="agenda-line" aria-hidden="true" />
          <div>
            <p className="agenda-label">今天的安排</p>
            <h2 id="agenda-title">等待你的第一件事</h2>
            <p>记录后，任务和时间安排会出现在这里。</p>
          </div>
        </section>
      </main>

      <nav className="bottom-nav" aria-label="主要导航">
        {navigationItems.map((item) => (
          <button
            className={item.active ? 'nav-item nav-item--active' : 'nav-item'}
            type="button"
            key={item.label}
            aria-current={item.active ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
