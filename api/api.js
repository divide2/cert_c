
const request = (url, options) => {
  return new Promise((resolve, reject) => {
	  const app = getApp()
    let baseUrl = app && app.globalData && app.globalData.baseUrl
	console.log(app)
	console.log(app.globalData)
    uni.request({
      url: `${baseUrl}${url}`,
      method: options.method,
      data: options.data,
      header: {
        Authorization: 'Bearer ' + uni.getStorageSync('accessToken')
      },
      success(req) {
        if (req.statusCode >= 200 && req.statusCode < 300) {
          resolve(req.data)
        } else if (req.statusCode === 403) {
          //token过期需重新登录
          uni.removeStorageSync('userInfo')
          uni.redirectTo({
            url: '/pages/login/index'
          })
          reject(req)
        } else {
          reject(req)
        }
      },
      fail(error) {
        if (error.statusCode === 403) {
          //token过期需重新登录
          uni.removeStorageSync('userInfo')
          uni.redirectTo({
            url: '/pages/login/login'
          })
        }
        reject(error)
      }
    })
  })
}

const get = (url, options = {}) => {
  return request(url, {
    method: 'GET',
    data: options
  })
}

const post = (url, options) => {
  return request(url, {
    method: 'POST',
    data: options
  })
}

const put = (url, options) => {
  return request(url, {
    method: 'PUT',
    data: options
  })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
  return request(url, {
    method: 'DELETE',
    data: options
  })
}

module.exports = {
  get,
  post,
  put,
  remove
}