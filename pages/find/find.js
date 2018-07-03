// pages/find/find.js

var itemname=new Array;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad:function(){
      wx.showLoading({
        title: '加载中',
      })
      var page = this
      wx:wx.request({
        url: 'http://baobab.kaiyanapp.com/api/v2/categories',
        data: {
          udid:"26868b32e808498db32fd51fb422d00175e179df",
          vc:83

        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log(res.data)
          itemname = res.data
          page.setData({
            resultlist: res.data
     
          });
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      wx.hideLoading()
    },
    findClick:function(e){
      wx.showLoading({
        title: '跳转中',
      })
      var page = this;
      var index = e.currentTarget.dataset['index'];
      wx.navigateTo({
        url: '../findlist/findlist?name=' + itemname[index].name,
        complete:function(){
          wx.hideLoading()
        }
      })
    

    },
  onShareAppMessage: function () {

    return {
      title: '微视发现',
      path: 'pages/find/find',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功  
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败  
      },
      complete: function (res) {
        // 不管成功失败都会执行  
      }


    }

  }

  }
  
})
