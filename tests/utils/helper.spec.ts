import { isString, wait } from '@/utils/helper'

test('基础方法isString测试', () => {
  expect(isString('')).toBe(true)
  expect(isString(1)).toBe(false)
})

it('工具方法wait测试', async () => {
  await wait(30)
  expect(1).toEqual(1)
})
