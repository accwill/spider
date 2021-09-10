import { DataType } from '../constants'

/**
 * 判断一个参数是否为字符串
 * @param  {any} variable
 * @return {boolean}
 */
export const isString = (variable: any) =>
  Object.prototype.toString.call(variable) === DataType.String

/**
 * 等待一段时间
 * @param  {number} time 毫秒
 * @return {Promise<void>}
 */
export const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

// TODO: 添加日志类
// /**
//  * 错误日志打印
//  * @param  {string} str
//  */
// export const errorLog = (str: string) => {
//   console.log(str)
// }

// /**
//  * 成功日志打印
//  * @param {string} str
//  */
// export const successLog = (str: string) => {
//   console.log(123)
// }
