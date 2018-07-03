// logs.js
// const util = require('../../utils/util.js')

// Page({
//   data: {
//     logs: []
//   },
//   onLoad: function () {
//     this.setData({
//       logs: (wx.getStorageSync('logs') || []).map(log => {
//         return util.formatTime(new Date(log))
//       })
//     })
//   }
// })

Page({
  clickMe: function(event) {
    this.setData({
      msg: event.currentTarget.offsetLeft
    })
    console.log(event.currentTarget.offsetLeft)

  },


  handleTap1: function() {
      this.setData({
        msg: "handleTap1"
      })
      console.log("handleTap1")
    }

    ,
  handleTap3: function() {
    this.setData({
      msg: "handleTap3"
    })
    console.log("handleTap3")

  }
})