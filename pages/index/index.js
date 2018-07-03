//index.js
//获取应用实例
const app = getApp()
var nextUrl
var datalist = new Array;

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true

          })
        }
      })
    }
  },
  onLoad: function() {
    var page = this
    list: wx.request({
      url: 'http://baobab.kaiyanapp.com/api/v2/feed',
      header: {
        'content-type': 'application/json'
      },
      data: {
        num: 2,
        udid: '26868b32e808498db32fd51fb422d00175e179d',
        vc: 83
      },
      success: function(res) {
        // var message = JSON.parse(res.data);

        console.log(res.data.nextPageUrl)
        nextUrl = res.data.nextPageUrl
        for (var i = 0; i < res.data.issueList.length; i++) {

          for (var j = 0; j < res.data.issueList[i].itemList.length; j++) {
            if (res.data.issueList[i].itemList[j].type == "video") {
              datalist.push(res.data.issueList[i].itemList[j])
            }

          }
        }
        console.log(datalist)
        page.setData({
          resultlist: datalist
        });

      }
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    var page = this
    list: wx.request({
      url: 'http://baobab.kaiyanapp.com/api/v2/feed',
      header: {
        'content-type': 'application/json'
      },
      data: {
        num: 2,
        udid: '26868b32e808498db32fd51fb422d00175e179d',
        vc: 83
      },
      success: function(res) {
        // var message = JSON.parse(res.data);
        var datalist = new Array
        console.log(res.data.nextPageUrl)
        nextUrl = res.data.nextPageUrl
        for (var i = 0; i < res.data.issueList.length; i++) {
          for (var j = 0; j < res.data.issueList[i].itemList.length; j++) {
            if (res.data.issueList[i].itemList[j].type == "video") {
              datalist.push(res.data.issueList[i].itemList[j])
            }

          }
        }
        console.log(datalist)
        page.setData({
          resultlist: datalist
        });
        wx.stopPullDownRefresh();
      }
    })


  },
  //上啦加载更多
  onReachBottom() {
    var page = this;
    wx.showLoading({
      title: '玩命加载中',
    })

    list: wx.request({
        url: nextUrl,
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data.nextPageUrl)
          nextUrl = res.data.nextPageUrl
          for (var i = 0; i < res.data.issueList.length; i++) {

            for (var j = 0; j < res.data.issueList[i].itemList.length; j++) {
              if (res.data.issueList[i].itemList[j].type == "video") {
                datalist.push(res.data.issueList[i].itemList[j])
              }

            }
          }
          console.log(datalist)
          page.setData({
            resultlist: datalist
          });
          wx.hideLoading()

        }
      }


    )


    wx.hideLoading();
  },
  videoClick: function(e) {
    var page = this;
    var index = e.currentTarget.dataset['index'];
    var item = datalist[index]
    console.log(item)
    wx.showLoading({
      title: '跳转中',
    })
    var clist = new Array
    clist.push(item.data.title)
    var imageUrl = page.cleanSpelChar(item.data.cover.detail)
    clist.push(imageUrl)
    var playUrl = item.data.playUrl
    clist.push(page.cleanSpelChar(playUrl))
    clist.push(item.data.category)
    clist.push(page.cleanSpelChar(item.data.description))
    clist.push(item.data.duration)
    let str = JSON.stringify(clist);
    wx.navigateTo({
      url: '../player/player?lk=' + str,
      complete: function() {
        wx.hideLoading()
        // console.log(url)
      }
    })
  },
  cleanSpelChar: function(localData) {
    var noiseChar = "~!@#$%^&*()_+-=`[]{};':\"\\|,./<>?\n\r";
    var goodChar = "～！＠＃＄％＾＆＊（）＿＋－＝｀［］｛｝；＇：＂＼｜，．／＜＞？　　";
    for (var i = 0; i < noiseChar.length; i++) {
      var oneChar = noiseChar.charAt(i);
      var towChar = goodChar.charAt(i)
      // console.log('oneChar  ' + oneChar + '   towChar ' + towChar)
      while (localData.indexOf(oneChar) >= 0) {
        localData = localData.replace(oneChar, towChar)
      }
    }
    return localData;

  },
  onShareAppMessage: function() {

    return {
      title:'微视',
        path:'pages/index/index',
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

})