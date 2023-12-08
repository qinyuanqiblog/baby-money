// @common/http.interceptor.js
import Request from 'luch-request' // 使用npm
// const defaultConfig = {
//   baseURL: '',
//   header: {},
//   method: 'GET',
//   dataType: 'json',
//   // 自定义params 处理函数
//   paramsSerializer: null,
//   // #ifndef MP-ALIPAY
//   responseType: 'text',
//   // #endif
//   // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
//   custom: {}, // 全局自定义参数默认值
//   // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
//   timeout: 60000,
//   // #endif
//   // #ifdef APP-PLUS
//   sslVerify: true,
//   // #endif
//   // #ifdef H5
//   // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
//   withCredentials: false,
//   // #endif
//   // #ifdef APP-PLUS
//   firstIpv4: false, // DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
//   // #endif
//   // 局部优先级高于全局，返回当前请求的task,options。请勿在此处修改options。非必填
//   // getTask: (task, options) => {
//   // 相当于设置了请求超时时间500ms
//   //   setTimeout(() => {
//   //     task.abort()
//   //   }, 500)
//   // },
//   // 全局自定义验证器。参数为statusCode 且必存在，不用判断空情况。
//   validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
//       return statusCode >= 200 && statusCode < 300
//   },
//    // 是否尝试将响应数据json化。boolean 或者一个包含include的对象。非必填。默认true。include为数组，包含需要json化的method
//    // forcedJSONParsing: {include: ['UPLOAD', 'DOWNLOAD']}
//    // 是否尝试将响应数据json化
//    forcedJSONParsing: true
// }
const http = new Request()
//   配置
//   baseUrl: 'http://hq_client.nat.xiwi.vip', // 请求的本域名
//   method: '', //POST/GET
//   // 设置为json，返回后会对数据进行一次JSON.parse()
//   dataType: 'json',
//   showLoading: true, // 是否显示请求中的loading
//   loadingText: '努力加载中~', // 请求loading中的文字提示
//   loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
//   originalData: false, // 是否在拦截器中返回服务端的原始数据
//   loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
//   // 配置请求头信息
//   header: {
//     'content-type': 'application/json;charset=UTF-8'
//   },

// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
  // 初始化请求配置
  http.setConfig((config) => {
    /* config 为默认全局配置*/
    config.baseURL = ''; /* 根域名 */
    config.timeout = 9999999;
    return config
  })

  // 请求拦截
  http.interceptors.request.use((config) => { // 可使用async await 做异步操作
    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
    console.log(config)
    config.data = config.data || {}
    config.header.Authorization = 'Bearer ' + uni.getStorageSync('token')
    // 下载接口 修改Content-Type
    if (['/hq/client/client/download_picture_album', '/hq/client/client/download_lamp_head'].includes(config.url)) {
      config.responseType = 'arraybuffer'
    }
    if ( config?.custom?.showLoading ) {
      uni.showLoading({
        title: config?.custom?.showLoading
      })
    }
    // 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
    // if (config.url == '/user/login') config.header.noToken = true;
    // console.log(config,"请求参数")
    // 如果return一个false值，则会取消本次请求
    return config;
  }, config => { // 可使用async await 做异步操作
    return Promise.reject(config)
  })


  // 响应拦截
  http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
    const data = response.data
    // 自定义参数
    const custom = response.config?.custom
    if (custom.showLoading) {
      uni.hideLoading();
    }
    // 拦截下载接口 直接返回response
    if (['/hq/client/client/download_picture_album', '/hq/client/client/download_lamp_head'].includes(response.config.url)) {
      // if ( response.header['content-type'].indexOf('application/json') != -1 ) {
        if ( data.byteLength == 32 ) {
          uni.$u.toast('未登录')
          uni.clearStorageSync()
          setTimeout(() =>{
            uni.navigateTo({
              url: '/pages/logOn/index',
            });
          }, 800)
          return false
        }
      // }
      return response
    }
    if (data.code !== 200) {
      // 如果是获取收藏状态 未登录状态不请求接口 拦截
      if (['/hq/client/client/get_current_client_user_collect'].includes(response.config.url)) {
        return false
      }
      // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
      if (custom.toast !== false) {
        uni.$u.toast(data.msg)
      }
	  if (data.code == 401) {
	    uni.clearStorageSync()
	    setTimeout(() =>{
			uni.navigateTo({
				url: '/pages/logOn/index',
			});
	    }, 800)
		return false
	  }

      // 如果需要catch返回，则进行reject
      // if (custom?.catch) {
      //   return Promise.reject(data)
      // } else {
      //   // 否则返回一个pending中的promise，请求不会进入catch中
      //   // return new Promise(() => { })
      // }
    }
    return data.data === undefined ? {} : data.data
  }, (response) => {
    // 对响应错误做点什么 （statusCode !== 200）
    return Promise.reject(response)
  })
}