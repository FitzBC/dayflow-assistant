import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Dayflow app shell', () => {
  it('introduces the assistant and its primary capture action', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: '今天，从一句话开始' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '按住说话' }),
    ).toBeInTheDocument()
    expect(screen.getByText('等待你的第一件事')).toBeInTheDocument()
  })

  it('exposes the four agreed navigation destinations', () => {
    render(<App />)

    const navigation = screen.getByRole('navigation', { name: '主要导航' })
    expect(navigation).toHaveTextContent('今天')
    expect(navigation).toHaveTextContent('任务')
    expect(navigation).toHaveTextContent('日历')
    expect(navigation).toHaveTextContent('秘书')
  })
})
