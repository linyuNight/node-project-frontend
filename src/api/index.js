import server from '@/server/index.js'

// 注册
export const registerApi = (params) => {
  return server.post('/register', {
    username: params.username,
    password: params.password
  })
}

// 登录
export const loginApi = (params) => {
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
export const createGroup = (params) => {
  return server.post('create_group', params)
}

// 查询所有群组
export const queryAllGroups = (params) => {
  return server.get('query_all_groups', params)
}
