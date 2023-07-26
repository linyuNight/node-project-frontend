import server from '@/server/index'
import fetchRequest from '@/server/fetch.ts'
import { queryParams, postParams } from '@/utils/params'

// 查询用户音乐文件夹下的音乐
export const queryMusic = (params: any) => {
  return server.get(`query_music${queryParams(params)}`)
}

// 播放music
export const getMusic = (params: any) => {
  return fetchRequest(`music${queryParams(params)}`, {
    method: 'GET'
  })
}
