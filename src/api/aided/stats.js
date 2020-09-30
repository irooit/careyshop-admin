import request from '@/plugin/axios/request'

const url = '/v1/stats'

/**
 * 获取某一项数据统计
 * @param {Object} data
 * @returns
 */
export function getStatsData(data) {
  return request({
    url,
    method: 'post',
    data: {
      method: 'get.stats.data',
      ...data
    }
  })
}
