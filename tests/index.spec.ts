import Scrappy from '../lib/index'

test('main.ts', () => {
  const s = new Scrappy({} as any)
  expect(s.sum(1, 2)).toBe(3)
})
