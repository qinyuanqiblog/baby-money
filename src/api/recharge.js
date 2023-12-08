import http from '@/utils/request'

// 充值项列表
export const getRechargeItemList = (params, config = {}) => http.post('/hq/client/anon/get_recharge_item_list', params, config)

// 生成支付二维码/网址
export const generatePayQrCode = (params, config = {}) => http.post('/hq/client/pay/generate_pay_qr_code', params, config)

// 获取支付信息
export const getPayView = (params, config = {}) => http.post('/hq/client/pay/get_pay_view?k='+params.k+'&payMode='+params.payMode, {}, config)

// 根据K码检测支付状态
export const checkPay = (params, config = {}) => http.post('/hq/client/pay/check_pay_order', params, config)