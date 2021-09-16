import { log, LogStatus, logStatus } from '../utils/log'
import { Ask, Params } from './ask'
import ItemPipelines from './ItemPipelines'
import Schedule, { ScheduleData } from './Schedule'
import Spider from './Spider'

/**
 * 日志数据类型描述
 */
type LogData = {
  url: string
  status: LogStatus
  spiderName: string
  itemName: string
}
// key: url, status: logStatus, spiderName, itemName
/**
 * 中心交互
 * url -> schedule -> engine -> ask -> spider -> engine -> delete Schedule
 */
type ConstructorParams = {
  // 解析器
  spiders: {
    [spiderName: string]: typeof Spider
  }
  // 存储数据
  items: {
    [itemName: string]: typeof ItemPipelines
  }
}

/**
 * 爬虫类
 * TODO: schedule complete方法调用时机
 */
class Engine {
  schedule: Schedule
  params: ConstructorParams
  spiders: any
  items: any
  _logData: any[]
  /**
   * 构造函数
   * @param {ConstructorParams} params
   */
  constructor(params: ConstructorParams) {
    this.params = params
    const paramsSpiders = params.spiders
    const keys = Reflect.ownKeys(paramsSpiders)
    this.spiders = {}
    this.items = params.items ?? {}
    keys.forEach((key: string) => {
      this.spiders[key] = new (paramsSpiders[key] as any)(this, key.replace('Spider', 'Item'))
    })
    this.schedule = new Schedule(this.subscribe.bind(this), this.scheduleComplete.bind(this))
  }

  /**
   * 开始爬取数据
   * @param {Params} params
   * @memberof Engine
   */
  start(params: Params) {
    this.schedule.queue(params)
  }

  /**
   * schedule回调，调用下载器
   * @param {ScheduleData} params
   * @memberof Engine
   */
  async subscribe(params: ScheduleData) {
    const logData = logStatus(params.url)
    // 调用下载器
    const ask = new Ask(params)
    ask.start()
    await ask.resCtx
    if (ask.error) {
      logData.status = LogStatus.RequestError
      return
      // 错误处理
    }
    // TODO: 分析失败处理
    // 分析数据
    logData.status = LogStatus.RequestComplete
    logData.status = `${LogStatus.Spider}<${ask.config.spiderName}>` as any
    await this.spiders[ask.config.spiderName].spider(ask)
    // 告诉调度器完成任务
    this.scheduleComplete(ask)
    logData.status = LogStatus.AfterSpider
  }

  /**
   * 一个url完成分析时调用
   * @param {Ask} ask
   * @memberof Engine
   */
  async scheduleComplete(ask: Ask) {
    this.schedule.complete(ask.config)
  }

  /**
   * 解析url 添加到schedule中
   * @param {Params[]} urls
   * @param {*} data
   * @memberof Engine
   */
  afterSpiderUrls(urls: Params[]) {
    for (let i = 0; i < urls.length; i++) {
      this.schedule.queue(urls[i])
    }
  }

  /**
   * 实例化ItemPipeline, 并向其提供数据
   * @param {*} data 爬取的数据
   * @param {string} itemName ItemPipeline的名字
   * @memberof Engine
   */
  afterSpiderData(data: any, itemName: string) {
    const itemInstance = new this.items[itemName]()
    itemInstance?.processData(data)
  }
}

export default Engine
