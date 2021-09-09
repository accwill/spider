// import ask from './utils/request';

/**
 * asldfj
 */
type ContructorParams = {
  url: string
  callback: (response: any) => void
}

/**
 * 爬虫类
 */
class Scrappy {
  maxConnection: number = 2
  maxPage: number = 1
  params: ContructorParams
  /**
   * 构造函数
   * @param {ContructorParams} params
   */
  constructor(params: ContructorParams) {
    this.params = params
  }

  /**
   * asdfasdf
   * @param {number} a str
   * @param  {number} b str
   * @return {number}
   */
  sum(a: number, b: number) {
    return a + b
  }
}

export default Scrappy
