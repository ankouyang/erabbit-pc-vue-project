import request from '@/utils/request'

// 获取用户信息
export const userInfo = (params) => {
  return request(
    '/member/profile222',
    'get',
    params
  )
}
