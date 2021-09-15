/*
 * @Author: aceh
 * @Date: 2021-09-12 10:50:16
 * @Last Modified by: aceh
 * @Last Modified time: 2021-09-15 21:28:45
 */

import cheerio from 'cheerio'
import { Ask, Params } from './ask'
import Engine from './Engine'

/**
 * 分解器
 * @class Spider
 */
class Spider {
  engine: Engine
  itemName: string
  $ = cheerio
  /**
   * Creates an instance of Spider.
   * @param {Engine} engine
   * @param {string} itemName
   * @memberof Spider
   */
  constructor(engine: Engine, itemName: string) {
    this.engine = engine
    this.itemName = itemName
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

  /**
   * 解析url 添加到schedule中
   * @param {Params[]} urls
   * @param {*} data
   * @memberof Spider
   */
  afterSpiderUrls(urls: Params[]) {
    this.engine.afterSpiderUrls(urls)
  }

  /**
   * 实例化ItemPipeline, 并向其提供数据
   * @param {*} data 爬取的数据
   * @param {string} itemName ItemPipeline的名字
   * @memberof Spider
   */
  afterSpiderData(data: any, itemName?: string) {
    this.engine.afterSpiderData(data, itemName || this.itemName)
  }
}

export default Spider
