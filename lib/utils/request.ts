import axios from 'axios'
// import * as randomAgent from 'random-useragent'

const request = axios.create({
  timeout: 6000,
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
export const getUserAgent = () => ({
  // 'User-Agent': randomAgent.getRandom((ua) => ua.deviceType !== 'mobile' && ua.osName !== 'Linux')
})

export default request
