import Engine from './Engine'

/**
 * Pipeline 操作
 * @class ItemPipelines
 */
class ItemPipelines {
  engine: Engine
  /**
   * Creates an instance of ItemPipelines.
   * @param {Engine} engine
   * @memberof ItemPipelines
   */
  constructor(engine: Engine) {
    this.engine = engine
  }

  /**
   * 处理数据
   * @param {*} data
   * @memberof ItemPipelines
   */
  processData(data: any) {
    // do something
  }
}

export default ItemPipelines
