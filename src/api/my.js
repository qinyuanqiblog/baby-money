const http = uni.$u.http

// 当前登录用户信息
export const getUserInfo = (params, config = {}) => http.post('/hq/client/client/get_current_client_user_info', params, config)

// 用户下载列表
export const getDownloadList = (params, config = {}) => http.post('/hq/client/client/get_current_client_user_download_list', params, config)

// 用户收藏列表
export const getCollectList = (params, config = {}) => http.post('/hq/client/client/get_current_client_user_collect_list', params, config)