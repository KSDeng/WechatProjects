// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 获取云数据库
// 注意这里是从cloud获取而不是从wx获取
const db = cloud.database();   

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // TODO: async await的作用?
    return await db.collection('users').where({
      name: 'Jack'
    }).remove();
  } catch (error) {
    console.log(error);
  }

  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}