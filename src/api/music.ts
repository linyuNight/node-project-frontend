import server from '@/server/index'
import { queryParams, postParams } from '@/utils/params'

// 查询用户音乐文件夹下的音乐
export const queryMusic = (params: any) => {
  return server.get(`query_music${queryParams(params)}`)
}

// 查看music
export const getMusic = (params: any) => {
  return server.get(`music${queryParams(params)}`, {
    responseType: 'blob'
  })
}