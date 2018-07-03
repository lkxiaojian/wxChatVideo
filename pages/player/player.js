// pages/player/player.js
var playUrl
var imageUrl
var title
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

    tab_image: "block" //默认显示封面图片
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function(options) {
      // 页面初始化 options为页面跳转所带来的参数
      wx.showLoading({
        title: '加载中',
      })
      var tar = this.cleanSpelChar(options.lk)
 
      let item = JSON.parse(tar);
      console.log(item)
      this.setData({
        playUrl: item
      })
      wx.hideLoading()
    }
    ,
    cleanSpelChar: function (localData) {
      var goodChar = "~!@#$%^&*()_+-=`[]{};':\"\\|,./<>?\n\r";
      var noiseChar = "～！＠＃＄％＾＆＊（）＿＋－＝｀［］｛｝；＇：＂＼｜，．／＜＞？　　";
      for (var i = 0; i < goodChar.length; i++) {
        var oneChar = goodChar.charAt(i);
        var towChar = noiseChar.charAt(i)
        while (localData.indexOf(towChar) >= 0) {
          localData = localData.replace(towChar, oneChar)
        }
      }
      return localData;

    },
    bindplay: function (e) {

      this.setData({

        tab_image: "none"

      })

    },
    onShareAppMessage: function () {

      return {
        title: title,
        path: 'pages/player/player',
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