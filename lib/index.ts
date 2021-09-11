import { Ask } from './utils/ask'

const ask = new Ask({ url: 'http://www.baidu.com', reconnectCount: 2 })

ask.start()
ask.cancel()
await ask.resCtx
console.log('ask', ask)
