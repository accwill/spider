export const log = (str: string) => {
  console.log('日志：', str)
}

export enum LogStatus {
  StartRequest = '请求中',
  RequestError = '请求失败',
  RequestComplete = '请求成功',
  Spider = '解析中',
  AfterSpider = '解析完成',
  PipelineData = '存储数据',
  AfterPipelineData = '存储成功'
}

/**
 * 动态的log
 * @param {string} str
 * @param {LogStatus} status
 * @return {ReturnType<oraLog>}
 */
export const logStatus = (str: string, status?: LogStatus) => {
  const nextStatus = status || LogStatus.StartRequest
  log(`${nextStatus}: ${str}`)

  return {
    set status(logStatus: LogStatus) {
      log(`${logStatus}: ${str}`)
    }
  }
}
