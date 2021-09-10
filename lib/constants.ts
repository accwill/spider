/** 数据类型 */
export enum DataType {
  String = '[object String]'
}

/** 请求错误时，再次发起时间 */
export const ReconnectionTime = 1000

/** 请求状态 */
export enum Status {
  /** 加载中 */
  Loading,
  /** 加载成功 */
  Success,
  /** 加载失败 */
  Error,
  /** 正常 */
  Normal
}
