import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const findGoods = (id) => request('/goods', 'get', { id })

/**
* 获取相关推荐商品
* @param {String} id - 商品ID,传入相关推荐,不传则是猜你喜欢
* @param {Number} limit - 获取条数
*/
export const findRelevantGoods = ({ id, limit = 16 }) => request('/goods/relevant', 'get', { id, limit })
