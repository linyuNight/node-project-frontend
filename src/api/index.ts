import server from '@/server/index'

// 注册
export const registerApi = (params: any) => {
  return server.post('/register', {
    username: params.username,
    password: params.password
  })
}

// 登录
export const loginApi = (params: any) => {
  return server.post('login', {
    username: params.username,
    password: params.password
  })
}

// 查看所有用户
export const queryAllUsersApi = () => {
  return server.get('query_all_users')
}

// 检查当前用户
export const getCurrentUser = () => {
  return server.get('current_user')
}

// 创建群组
export const createGroup = (params: any) => {
  return server.post('create_group', params)
}

// 查询所有群组
export const queryAllGroups = () => {
  return server.get('query_all_groups')
}

// 查询群信息
export const queryGroup = (params: any) => {
  return server.post('query_group', params)
}

// // 删除一条群消息
// export const deleteGroupMessage = (params) => {
//   console.log('测试删除', params)
//   return server.post('delete_group_message', params)
// }
