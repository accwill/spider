import { wait } from '@/utils/helper'
import Schedule from '@/utils/Schedule'

describe('调度器测试：', () => {
  test('调度器的优先级测试：', () =>
    new Promise((resolve, reject) => {
      let count = 5
      let priority: null | number = null
      const schedule = new Schedule(
        (data) => {
          count--
          if (!priority) {
            priority = data.priority
          }
          try {
            expect(priority).toBeGreaterThanOrEqual(data.priority) // 优先级测试
          } catch (e) {
            reject(e)
          }
          schedule.complete(data.params)
        },
        async (data) => {
          schedule.stop()
          await wait(300)
          try {
            expect(count).toBe(0)
            expect(schedule.completeData.size).toBe(5) // 完成队列
            expect(schedule.mapData.size).toBe(0) // 队列是否清空
            expect(schedule.alreadyLoadMapData.size).toBe(0) // 调度队列是否清空
            resolve(true)
          } catch (e) {
            reject(e)
          }
        }
      )

      // 添加调度任务
      schedule.queue({ url: '1' }, 1)
      schedule.queue({ url: '2' }, 2)
      schedule.queue({ url: '7' }, 7)
      schedule.queue({ url: '4' }, 4)
      schedule.queue({ url: '5' }, 5)
    }))
})
