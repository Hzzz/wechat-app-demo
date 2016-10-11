//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  fetchHotList: function(cb){
    var url = 'https://www.v2ex.com/api/topics/hot.json';
    wx.request({
      url: url,
      success: function(res){
        cb(res.data)
      }
    })
  },
  fetchLatestList: function(cb){
    var url = 'https://www.v2ex.com/api/topics/latest.json';
    wx.request({
      url: url,
      success: function(res){
        cb(res.data)
      }
    })
  },
  getUserInfoById: function(id, cb){
    var url = 'https://www.v2ex.com/api/members/show.json?id=' + id;
     wx.request({
      url: url,
      success: function(res){
        cb(res.data)
      }
    })
  }
})