import request from '@/utils/request'

// 获取品牌接口
export const findBrand = (limit = 6) => request('/home/brand', 'get', { limit })

// 获取bannner接口
export const findBanner = () => request('/home/banner', 'get')
