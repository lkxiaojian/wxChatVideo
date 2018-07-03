// pages/findlist/findlist.js
var itemname
var nextPageUrl = ""
var resultList = new Array
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
    //下拉刷新
    onPullDownRefresh() {
      var page = this
      console.log("下拉")
      wx.request({
        url: 'http://baobab.kaiyanapp.com/api/v3/videos',
        header: {
          'content-type': 'application/json'
        },
        data: {
          categoryName: itemname,
          strategy: 'date',
          udid: '26868b32e808498db32fd51fb422d00175e179df',
          vc: 83
        },
        success: function(res) {
          nextPageUrl = res.data.nextPageUrl
          resultList = res.data.itemList
          console.log(resultList)
          wx.hideLoading()
          page.setData({
            resultlist: resultList
          });
        }

      })
      wx.stopPullDownRefresh();

    },

    //上啦加载更多
    onReachBottom() {
      var page = this
  
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: nextPageUrl,
        header: {
          'content-type': 'application/json'
        },
        data :{

        },
        success: function(res) {
          nextPageUrl = res.data.nextPageUrl
          var list = new Array
            list=res.data.itemList
            resultList=  resultList.concat(list)
          page.setData({
            resultlist: resultList
          });
        }
      })
      wx.hideLoading()
    },

    //初始化数据
    onLoad: function(options) {
      var page = this
      wx.showLoading({
        title: '加载中',
      })
      itemname = options.name

      wx.request({
        url: 'http://baobab.kaiyanapp.com/api/v3/videos',
        header: {
          'content-type': 'application/json'
        },
        data: {
          categoryName: itemname,
          strategy: 'date',
          udid: '26868b32e808498db32fd51fb422d00175e179df',
          vc: 83
        },
        success: function(res) {
          nextPageUrl = res.data.nextPageUrl
          resultList = res.data.itemList
          console.log(resultList)
          wx.hideLoading()
          page.setData({
            resultlist: resultList
          });
        },
        fail: function() {
          wx.hideLoading()

        }


      })

    },
    findlistClick :function(e){
      var page = this;
      var index = e.currentTarget.dataset['index'];
      console.log(resultList)
      var item = resultList[index]
  
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
        complete: function () {
          wx.hideLoading()
          // console.log(url)
        }
      })
    },
    cleanSpelChar: function (localData) {
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
    onShareAppMessage: function () {

      return {
        title: '发现',
        path: 'pages/findlist/findlist',
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