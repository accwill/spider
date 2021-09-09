import axios from 'axios'
import * as randomAgent from 'random-useragent'

const request = axios.create({
  timeout: 100,
  transitional: {
    forcedJSONParsing: true,
    silentJSONParsing: false,
    clarifyTimeoutError: false
  }
})

/**
 * 获取随机user-agent
 * @return {any}
 */
export const getUserAgent = () => ({ 'User-Agent': randomAgent.getRandom() })

export default request
