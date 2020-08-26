// pages/cloud/cloud.js

// 初始化云数据库
wx.cloud.init();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: []
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

  // 上传图片
  uploadPicture: function(options) {
    wx.chooseImage({
      count: 1,   // 最大选择的图片张数
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);

        // 上传图片
        wx.cloud.uploadFile({
          // cloudPath: 上传至云端的路径
          // 文件名称若重复会将原有数据覆盖
          cloudPath: new Date().getTime() + '.png',
          filePath: tempFilePaths[0],           // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID);

            // 将文件ID存入云数据库
            db.collection('images').add({
              data: {
                fileID: res.fileID
              }
            }).then(res => {
              console.log(res);
            }).catch(error => {
              console.log(error);
            });

          },
          fail: console.error
        });

      },
      fail(error) {
        console.log(error);
      }
    });

  },

  // 文件展示
  showPicture: function(options) {
    wx.cloud.callFunction({
      name: 'login',
    }).then(res => {
      db.collection('images').where({
        _openid: res.result.openid
      }).get().then(res2 => {
        console.log(res2);
        this.setData({
          images: res2.data
        });

      }).catch(error => {
        console.log(error);
      });

    }).catch(error => {
      console.log(error);
    });
  },

  downloadPicture: function(event) {

    // 这里fileID是通过"data-"的方法从button传入的
    wx.cloud.downloadFile({
      fileID: event.target.dataset.fileid,  // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath);

        // 将图片保存到本地相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) { 
            wx.showToast({
              title: '保存成功'
            });
          }
        });

      },
      fail: console.error
    })
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