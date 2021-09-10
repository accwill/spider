import { ReconnectionTime, Status } from '../constants'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import { wait } from './helper'
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
} & AxiosRequestConfig

/**
 * 请求类
 * 1. 错误重连，可设置次数
 * 2. TODO: 请求解析中间件设置
 */
export class Ask {
  /**
   * 获取整体状态
   * @readonly
   */
  get state() {
    return {
      requestCount: this.requestCount,
      url: this.config.url,
      response: this.response,
      status: this.status
    }
  }
  /** 请求状态 */
  status: Status = Status.Normal
  /** 结果 */
  response: AxiosResponse<any>
  /**
   * @private
   */
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
  async start(time: number = 0): Promise<AxiosPromise<any>> {
    const { url, type, ...rest } = this.config
    let mapConfig = {}
    if (type in Type) {
      mapConfig = mapTypeConfig[type]
    }
    try {
      this._requestCount += 1
      this.status = Status.Loading
      const response = await request({
        url: encodeURI(url),
        headers: getUserAgent(),
        ...mapConfig,
        ...rest
      })
      this.status = Status.Success
      this.response = response
      return response
    } catch (error) {
      if (this.isExceed(time)) {
        this.config.onError?.(error, this.config)
        this.status = Status.Error
        return null
      }
      await wait(ReconnectionTime)
      time += 1
      return this.start(time)
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
    return time >= this.config.reconnectionCount
  }
}

/**
 * 请求实例
 *
 * @param {string} url
 * @param {(Omit<Params, 'url'> | string)} params 参数
 * @return {Promise<AxiosPromise<any>>}
 */
const ask = (url: string, params?: Omit<Params, 'url'>) => {
  const res = new Ask({ ...(params || {}), url })
  return res.start()
}

export default ask
