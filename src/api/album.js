// import request from '@/utils/request'
const http = uni.$u.http

// 画册样本分类列表
export const getAlbumCategoryList = (params, config = {}) => http.post('/hq/client/anon/get_picture_album_category_list', params, config)

// 画册样本列表
export const getAlbumList = (params, config = {}) => http.post('/hq/client/anon/get_picture_album_list', params, config)

// 画册样本系列列表
export const getAlbumSeriesList = (params, config = {}) => http.post('/hq/client/anon/get_picture_album_series_list', params, config)

// 画册样本系列图片列表
export const getAlbumSeriesImageList = (params, config = {}) => http.post('/hq/client/anon/get_picture_album_series_image_list', params, config)

// 画册样本下载
export const downloadAlbum = (params, config = {}) => http.post('/hq/client/client/download_picture_album', params, config)

// 画册样本下所有系列
export const getAlbumAllImageList = (params, config = {}) => http.post('/hq/client/anon/get_picture_album_all_image_list', params, config)