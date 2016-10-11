//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    user: [],
    loading: true,
    
  },
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    that.setData({
      loading: false
    });

    var userId = options.id || 1;

    // wx.setNavigationBarTitle({
    //     title: '用户详情'
    // });

    app.getUserInfoById(userId, function(data){
      that.setData({
        user: data,
        loading: true
      });
    });
  }
})