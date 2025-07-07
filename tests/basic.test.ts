import { describe, it, expect } from 'vitest'

describe('基础测试', () => {
  it('应该通过基础测试', () => {
    expect(1 + 1).toBe(2)
  })

  it('应该验证字符串', () => {
    expect('hello').toBe('hello')
  })
})
