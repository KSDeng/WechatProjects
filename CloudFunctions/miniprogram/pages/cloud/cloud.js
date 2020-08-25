// pages/cloud/cloud.js

// 初始化云数据库
wx.cloud.init();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 云数据库

  // 插入数据
  insertDB: function() {
    // 回调写法
    // db.collection('users').add({
    //   data: {
    //     name: 'Jerry',
    //     age: 20
    //   },
    //   success: res => {
    //     console.log(res);
    //   },
    //   fail: error => {
    //     console.log(error);
    //   }
    // });

    // pipeline写法
    // 插入数据成功则执行then中的函数，失败则进入catch中的函数
    db.collection('users').add({
      data: {
        name: 'Jack',
        age: 29
      }
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });

  },

  // 更新数据库(根据数据id)
  updateDB: function() {
    db.collection('users').doc('65825b355f4505bd00418764270d0c3e')
    .update({
      data: {
        age: 28
      }
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });

  },

  // 查询数据库
  searchDB: function() {
    // where中设置查询条件
    // get()获取查询结果
    // 查询成功进入then(), 失败进入catch()
    db.collection('users').where({
      name: 'Jack'
    }).get().then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });

  },

  // 删除数据库中的一条数据
  deleteDB: function() {
    // 小程序端删除数据库中的数据只能逐条删除
    // 批量删除需要通过云函数实现
    db.collection('users').doc('65825b355f4505bd00418764270d0c3e').remove()
    .then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  },

  // 云函数

  sum: function() {

    // wx.cloud.callFunction调用云函数
    // name为云函数名称
    // data为向云函数传递的参数，在云函数入口文件中可以通过event获取
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 1,
        b: 3
      }
    }).then(res => {
      // 此处调试时正常，运行时res.result.sum为undefined
      // 云函数上传并部署所有文件解决该问题
      console.log(res);
      console.log(res.result.sum);
    }).catch(error => {
      console.log(error);
    });

  },

  // 通过云数据库获取openID
  getOpenId: function() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
    
  },

  // 调用云函数进行数据库批量删除
  batchDelete: function() {
    wx.cloud.callFunction({
      name: 'batchDelete'
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})