// import ask from './utils/request';
/**
 * asldfj
 */
type ConstructorParams = {
  url: string
  callback: (response: any) => void
}

/**
 * 爬虫类
 */
class Scrappy {
  maxConnection: number = 5
  maxPage: number = 1
  params: ConstructorParams
  /**
   * 构造函数
   * @param {ConstructorParams} params
   */
  constructor(params: ConstructorParams) {
    this.params = params
  }
}

export default Scrappy
