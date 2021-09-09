import Scrappy from '@/index'

test('测试 main.ts', () => {
  const s = new Scrappy({} as any)
  expect(s.sum(1, 2)).toBe(3)
})
