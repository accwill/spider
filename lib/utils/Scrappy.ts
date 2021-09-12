/**
 * 中心交互
 */
type ConstructorParams = {
  url: string
  callback: (response: any) => void
}

/**
 * 爬虫类
 */
class Engine {
  params: ConstructorParams
  /**
   * 构造函数
   * @param {ConstructorParams} params
   */
  constructor(params: ConstructorParams) {
    this.params = params
  }
}

export default Engine
