import { Ask } from '@/utils/ask'

it('请求测试, 重新链接次数', async () => {
  const ask = new Ask({ url: '/', reconnectionCount: 5, timeout: 100 })
  await ask.start()
  expect(ask.requestCount).toEqual(6)
})

it('请求测试，正常连接次数', async () => {
  const ask = new Ask({ url: 'http://www.baidu.com', reconnectionCount: 5, baseURL: '' })
  await ask.start()
  expect(ask.requestCount).toEqual(1)
})
