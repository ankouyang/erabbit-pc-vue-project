import request from '@/utils/request'

// 获取所有的分类

export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
