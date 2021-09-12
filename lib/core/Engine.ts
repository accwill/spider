import { Ask, Params } from './ask'
import Schedule, { ScheduleData } from './Schedule'

/**
 * 中心交互
 */
type ConstructorParams = {
  spiders: {
    [spiderName: string]: any
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
  /**
   * 构造函数
   * @param {ConstructorParams} params
   */
  constructor(params: ConstructorParams) {
    this.params = params
    const paramsSpiders = params.spiders
    const keys = Reflect.ownKeys(paramsSpiders)
    this.spiders = {}
    keys.forEach((key: string) => {
      this.spiders[key] = new paramsSpiders[key]({ engine: this })
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
    // 调用下载器
    const ask = new Ask(params)
    ask.start()
    await ask.resCtx
    if (ask.error) {
      console.log('请求错误: ', ask.error)
      return
      // 错误处理
    }
    // 分析数据
    this.spiders[ask.config.spiderName].spider(ask)
  }

  /**
   * @memberof Engine
   */
  async scheduleComplete() {
    console.log(123)
  }
}

export default Engine
