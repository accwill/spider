import { ReconnectCount, Status } from '@/constants'
import ask, { Ask, Type } from '@/utils/ask'
import { isString } from '@/utils/helper'

it('ask测试, 失败请求次数', async () => {
  const ask = new Ask({ url: 'http://www.baidu.com', reconnectCount: 2, timeout: 20 })
  await ask.start()
  expect(ask.requestCount).toEqual(3)
})

it('ask测试，成功请求次数', async () => {
  const ask = new Ask({ url: 'http://www.baidu.com' })
  await ask.start()
  expect(ask.requestCount).toEqual(1)
})

it('ask测试，ask简单方法的使用', async () => {
  const instance = ask('http://www.baidu.com')
  expect(instance.resCtx).toBeInstanceOf(Promise)
  await instance.resCtx
  expect(isString(instance.response.data)).toEqual(true)
})

it('ask测试，ask状态', async () => {
  const instance = new Ask({ url: 'http://www.baidu.com', type: Type.Text })
  const askState = instance.state
  expect(askState.status).toBe(Status.Normal)
  expect(askState.response).toBe(null)
  instance.start()
  expect(askState.status).toBe(Status.Loading)
  await instance.resCtx
  expect(askState.requestCount).toBe(1)
  expect(askState.requestCount).toBe(instance.requestCount)
  expect(askState.reconnectCount).toBe(ReconnectCount)
  expect(askState.status).toBe(Status.Success)
  expect(isString(askState.response.data)).toBe(true)
})
