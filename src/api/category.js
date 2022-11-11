import request from '@/utils/request'

// 获取所有的分类
export const findAllCategory = () => request('/home/category/head', 'get')

/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id) => request('/category', 'get', { id })

/**
 * 获取筛选条件-PC
 * @param {String}
 */
export const findSubCategoryFilter = (id) => request('/category/sub/filter', 'get', { id })

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档
 */
export const findSubCategoryGoods = (params) => request('/category/goods/temporary', 'post', params)
