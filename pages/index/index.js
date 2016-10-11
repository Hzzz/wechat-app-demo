//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    messages: [],
    loading: true,
    tabIndex: 0,
    type: 'hot'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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

    this.getMessageList();
    
  },
  switchList: function(e){
    var listType = e.currentTarget.dataset.type;
    this.setData({
      tabIndex: listType == 'hot' ? 0 : 1,
      type: listType
    });

    this.getMessageList();
  },
  swiperChange: function(e){
    var listType = e.detail.current == 0 ? 'hot' : 'latest';
    this.setData({
      tabIndex: e.detail.current,
      type: listType
    });

    this.getMessageList();
  },
  getMessageList: function(){
    var that = this;
    that.setData({
      loading: false
    });

    var listType = this.data.type;
    if(listType == 'hot') {
      app.fetchHotList(function(data){
        that.setData({
          messages: data,
          loading: true
        });
      });
    }else if(listType == 'latest'){
      app.fetchLatestList(function(data){
        that.setData({
          messages: data,
          loading: true
        });
      });
    }else{

    }
  },
  refresh: function(){
    this.getMessageList();
  }
})
