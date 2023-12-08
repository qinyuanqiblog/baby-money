const http = uni.$u.http

// 轮播图列表
export const getCarouselList = (params, config = {}) => http.post('/hq/client/anon/get_carousel_list', params, config)

// 获取收藏状态
export const getCollect = (params, config = {}) => http.post('/hq/client/client/get_current_client_user_collect', params, config)

// 变更收藏状态
export const updateCollect = (params, config = {}) => http.post('/hq/client/client/update_current_client_user_collect', params, config)