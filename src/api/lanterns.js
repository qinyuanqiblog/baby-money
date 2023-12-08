const http = uni.$u.http

// 灯具列表
export const getLampList = (params, config = {}) => http.post('/hq/client/anon/get_lamp_head_list', params, config)

// 灯具详情
export const getLampInfo = (params, config = {}) => http.post('/hq/client/anon/get_lamp_head_info', params, config)

// 灯具下载
export const downloadLamp = (params, config = {}) => http.post('/hq/client/client/download_lamp_head', params, config)