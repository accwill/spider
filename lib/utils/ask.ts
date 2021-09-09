import { ReconnectionTime } from '@/constants'
import { AxiosPromise } from 'axios'
import { isString, wait } from './helper'
import request, { getUserAgent } from './request'

/** 请求类型 */
export enum Type {
  /** 自动文件流处理 */
  File = 'File',
  /** 文本设置 */
  Text = 'Text',
  /** JSON配置 */
  JSON = 'JSON'
}

const mapTypeConfig = {
  [Type.File]: {
    responseType: 'stream'
  },
  [Type.Text]: {},
  [Type.JSON]: {
    responseType: 'json'
  }
}
type Params = {
  /** 请求url */
  url: string
  /** 失败重试次数 */
  reconnectionCount?: number
  /** 类型 */
  type?: Type
  onError?: (error: Error, config: Params) => void
}

/**
 * 请求类
 * 1. 错误重连，可设置次数
 * 2. 请求解析中间件设置
 */
class Ask {
  _requestCount = 0
  /** 请求总次数 */
  get requestCount() {
    return this._requestCount
  }
  config: Params | null = null
  /**
   * @param  {Params} params
   */
  constructor(params: Params = {} as any) {
    this.config = params
  }
  /**
   * 请求
   * @param {number} time 请求次数
   * @return {AxiosPromise<any>}
   */
  async _request(time: number = 0): Promise<AxiosPromise<any>> {
    const { url, type } = this.config
    let mapConfig = {}
    if (type in Type) {
      mapConfig = mapTypeConfig[type]
    }
    try {
      this._requestCount += 1
      const response = await request({
        url: encodeURI(url),
        headers: getUserAgent(),
        ...mapConfig,
        method: 'GET'
      })
      return response
    } catch (error) {
      if (this.isExceed(time)) {
        this.config.onError?.(error, this.config)
        return
      }
      await wait(ReconnectionTime)
      time += 1
      return this._request(time)
    }
  }
  /**
   * 是否超过重连次数限制
   *
   * @param  {number} time
   * @return {boolean}
   */
  isExceed(time: number) {
    if (!Reflect.has(this.config, 'reconnectionCount')) {
      return false
    }
    return time > this.config.reconnectionCount
  }
}

/**
 * 请求实例
 *
 * @param {(Params | string)} params 参数
 * @return {Promise<AxiosPromise<any>>}
 */
const ask = (params: Params | string) => {
  let _params: any = params
  if (isString(params)) {
    _params = { url: params }
  }
  const res = new Ask(_params)
  return res._request()
}

export default ask
