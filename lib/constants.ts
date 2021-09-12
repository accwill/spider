/** 数据类型 */
export enum DataType {
  String = '[object String]'
}

/** 请求错误时，再次发起时间 */
export const ReconnectionTime = 1000
/** 默认失败请求重复次数 */
export const ReconnectCount = 5
/** 最大同时调度多少任务 */
export const maxConnect = 0

/** 请求状态 */
export enum Status {
  /** 加载中 */
  Loading = 'Loading',
  /** 加载成功 */
  Success = 'Success',
  /** 加载失败 */
  Error = 'Error',
  /** 正常 */
  Normal = 'Normal',
  /** 取消 */
  Cancel = 'Cancel'
}
