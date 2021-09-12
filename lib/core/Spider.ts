/*
 * @Author: aceh
 * @Date: 2021-09-12 10:50:16
 * @Last Modified by: aceh
 * @Last Modified time: 2021-09-12 17:47:21
 */

import cheerio from 'cheerio'
import { Ask } from './ask'

/**
 * 分解器
 * @class Spider
 */
class Spider {
  engine: any
  $ = cheerio
  /**
   * Creates an instance of Spider.
   * @param {*} engine
   * @memberof Spider
   */
  constructor(engine: any) {
    this.engine = engine
  }

  /**
   * 获取cherrio项
   *
   * @param {Ask} ask
   * @return {cheerio.Root}
   * @memberof Spider
   */
  get$Data(ask: Ask) {
    const $ = cheerio.load(ask.response.data)
    return $
  }

  /**
   * 获取
   *
   * @param {Ask} ask
   * @return {any}
   * @memberof Spider
   */
  getJson(ask: Ask) {
    return ask.response.data
  }
}

export default Spider
