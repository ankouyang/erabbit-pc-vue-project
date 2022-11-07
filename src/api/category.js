import request from '@/utils/request'

// 获取所有的分类
export const findAllCategory = () => request('/home/category/head', 'get')

/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id) => request('/category', 'get', { id })
