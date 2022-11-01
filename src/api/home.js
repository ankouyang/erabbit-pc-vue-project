import request from '@/utils/request'

// 获取品牌接口
export const findBrand = (limit = 6) => request('/home/brand', 'get', { limit })

// 获取bannner接口
export const findBanner = () => request('/home/banner', 'get')

// 新鲜好物接口
export const findNew = () => request('home/new', 'get')

// 人气推荐接口
export const findHot = () => request('home/hot', 'get')

// 获取商品模板
export const findProduct = () => request('home/goods', 'get')
