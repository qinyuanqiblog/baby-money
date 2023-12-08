const http = uni.$u.http

// 手机登录
export const phoneSmsLogin = (params, config = {}) => http.post('/hq/client/anon/phone_sms_login', params, config)

// 发送登录短信
export const sendPhoneSmsLogin = (params, config = {}) => http.post('/hq/client/anon/send_phone_sms_login', params, config)