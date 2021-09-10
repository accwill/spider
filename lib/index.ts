import { Ask } from './utils/ask'

const ask = new Ask({ url: 'http://www.baidu.com', reconnectCount: 2, timeout: 20 })
ask.start()
