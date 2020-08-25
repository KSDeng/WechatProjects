// 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init()

// 云函数入口函数
// event 包含调用该云函数时从小程序端传递过来的一些参数
// context 包含服务器端调用该云函数时的上下文
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  return {

    sum: event.a + event.b
    // event,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}