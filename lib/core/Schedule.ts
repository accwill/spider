/*
 * @Author: aceh
 * @Date: 2021-09-11 20:35:21
 * @Last Modified by: aceh
 * @Last Modified time: 2021-09-15 21:53:28
 */

import * as fs from 'fs'
import * as path from 'path'
import { Params } from './ask'
import { wait } from '../utils/helper'
import { ConfigPath, MaxConnect } from '../constants'

export type ScheduleData = Params

type SubscribeMethod = (scheduleData: ScheduleData) => void
type CompleteCallback = (mapData: Map<string, ScheduleData>) => void

/**
 * 调度器方法
 *  1. 支持优先级调度，优先级大的优先调度
 */
class Schedule {
  /** 队列 */
  mapData: Map<string, ScheduleData> = new Map()

  /** 已经发布的任务 */
  alreadyLoadMapData: Map<string, ScheduleData> = new Map()

  /** 已经完成的任务： TODO: */
  completeData: Map<string, ScheduleData> = new Map()

  /** 是否暂停 */
  isPause: boolean = false

  // 最大任务数
  maxSchedule: number

  // 当前执行的ID
  currentStartId?: any = +new Date()
  /**
   * 监听调度方法
   * @param  {ScheduleData} scheduleData
   */
  subscribe: SubscribeMethod

  /**
   * 完成方法
   * @param  {Map<string, ScheduleData>} mapData
   */
  completeCallback: CompleteCallback

  /**
   * 触发监听方法
   * @param {SubscribeMethod} subscribe 调度订阅方法
   * @param {CompleteCallback} complete 完成回调方法, 队列中无数据时触发
   */
  constructor(subscribe: SubscribeMethod, complete: CompleteCallback) {
    this.completeCallback = complete
    this.subscribe = subscribe
    this.start()
    this.maxSchedule = MaxConnect
    this.readConfig()
  }

  /**
   * 读取配置文件
   * @memberof Schedule
   */
  readConfig() {
    const data = fs.readFileSync(ConfigPath, { encoding: 'utf-8' })
    try {
      const config = JSON.parse(data)
      // 读取配置文件
      this.maxSchedule = config.maxConnect || MaxConnect
    } catch (e) {
      console.log('配置文件未找到')
    }
  }

  /**
   *
   * 监听配置配置文件更新
   * @memberof Schedule
   */
  watchFile() {
    fs.watchFile(ConfigPath, { interval: 2000 }, this.readConfig)
  }
  /**
   * 添加追加
   * @param {Params} params
   * @param {number} priority 优先级
   */
  queue(params: Params) {
    if (!Reflect.has(params, 'priority')) {
      params.priority = 1
    }
    this.mapData.set(params.url, params)
  }

  /**
   * 发布计划
   * @param {ScheduleData} scheduleData
   */
  schedule(scheduleData: ScheduleData) {
    const url = scheduleData.url
    this.alreadyLoadMapData.set(url, scheduleData)
    this.mapData.delete(url)
    this.subscribe?.(scheduleData)
  }

  /**
   * 完成，移动到完成队列
   * @param {Params} params
   */
  complete(params: Params) {
    const scheduleData = this.alreadyLoadMapData.get(params.url)
    this.completeData.set(params.url, scheduleData)
    this.alreadyLoadMapData.delete(params.url)
    if (this.mapData.size === 0 && this.alreadyLoadMapData.size === 0) {
      this.completeCallback?.(this.alreadyLoadMapData)
    }
  }

  /**
   * 查找优先级最高的
   * @return {ScheduleData}
   */
  getMaxPriority() {
    const values = [...this.mapData.values()]
    const len = values.length
    let maxData: ScheduleData | null = null
    for (let i = 0; i < len; i++) {
      const item = values[i]
      if (!maxData) {
        maxData = item
        continue
      }
      if (item.priority > maxData.priority) {
        maxData = item
      }
    }
    return maxData
  }

  /**
   * @param  {any} startId?
   */
  async start(startId?: any) {
    let waitTime = 300
    if (this.mapData.size >= 1 && this.alreadyLoadMapData.size <= this.maxSchedule) {
      const scheduleData = this.getMaxPriority()
      this.schedule(scheduleData)
      waitTime = 100
    }
    // TODO: 这里的逻辑需要修改
    this.currentStartId = startId
    await wait(waitTime)
    if (this.currentStartId !== startId || this.isPause) {
      return
    }
    this.start(+new Date())
  }

  /** 暂停 */
  stop() {
    this.isPause = true
  }
}

export default Schedule
