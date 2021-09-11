import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ReconnectCount, ReconnectionTime, Status } from '../constants'
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
  reconnectCount?: number
  /** 类型 */
  type?: Type
  onError?: (error: Error, config: Params) => void
} & AxiosRequestConfig

/**
 * 请求类
 * 1. 错误重连，可设置次数
 * 2. TODO: 请求解析中间件设置, Cancel方法
 */
export class Ask {
  /**
   * 获取整体状态
   * @readonly
   */
  get state() {
    const self = this
    return {
      get requestCount() {
        return self.requestCount
      },
      get reconnectCount() {
        return self.reconnectCount
      },
      url: this.config.url,
      get response() {
        return self.response
      },
      get status() {
        return self.status
      }
    }
  }
  resCtx: Promise<AxiosResponse<any>>
  /** 请求状态 */
  status: Status = Status.Normal
  /** 结果 */
  response: AxiosResponse<any> = null
  /** 可以失败重连的次数 */
  reconnectCount = ReconnectCount
  /** 请求次数 */
  requestCount = 0
  /** 错误对象 */
  error: Error = null
  _cancelToken = axios.CancelToken.source()
  config: Params | null = null
  /**
   * @param  {Params} params
   */
  constructor(params: Params) {
    this.config = { ...params }
    this.reconnectCount = this.config.reconnectCount ?? this.reconnectCount
  }
  /**
   * 请求
   * @param {number} time 请求次数
   * @return {AxiosResponse<any>}
   */
  async _start(time: number = 0): Promise<AxiosResponse<any>> {
    const { url, type, ...rest } = this.config
    let mapConfig = {}
    if (type in Type) {
      mapConfig = mapTypeConfig[type]
    }
    try {
      this.requestCount += 1
      this.status = Status.Loading
      const response = await request({
        url: encodeURI(url),
        headers: getUserAgent(),
        ...mapConfig,
        ...rest,
        cancelToken: this._cancelToken.token
      })
      this.status = Status.Success
      this.response = response
      return response
    } catch (error) {
      if (this.isExceed(time) && this.status !== Status.Cancel) {
        this.config.onError?.(error, this.config)
        this.status = Status.Error
        this.error = error
        return null
      }
      await wait(ReconnectionTime)
      if (this.status === Status.Cancel) {
        return
      }
      time += 1
      return this._start(time)
    }
  }

  /**
   * 请求
   * @param {number} time 请求次数
   * @return {AxiosResponse<any>}
   */
  async start(time: number = 0): Promise<AxiosResponse<any>> {
    const res = this._start(time)
    this.resCtx = res
    return this.resCtx
  }
  /**
   * 是否超过重连次数限制
   *
   * @param  {number} time
   * @return {boolean}
   */
  isExceed(time: number) {
    return time >= this.reconnectCount
  }

  /** 取消请求 */
  cancel() {
    this.status = Status.Cancel
    this._cancelToken.cancel()
  }
}

/**
 * 请求实例
 *
 * @param {string} url
 * @param {(Omit<Params, 'url'> | string)} params 参数
 * @return {Ask}
 */
const ask = (url: string, params?: Omit<Params, 'url'>) => {
  const res = new Ask({ ...(params || {}), url })
  res.start()
  return res
}

export default ask
