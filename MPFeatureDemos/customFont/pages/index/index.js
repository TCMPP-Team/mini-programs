//index.js
//get application instance
const app = getApp()


Page({
  data: {
    text: 'This is the default font'
  },
  loadFontFace: function() {
    wx.loadFontFace({
      global: true,
      family: 'APICustomFont',
      source: 'url(https://fonts.gstatic.com/s/jersey15/v2/_6_9EDzuROGsUuk2TWjiZYAgkio_SA.woff2)',
      success: (res) => {
        console.log('loadFontFace Success===', res)
        this.setData({
          text: 'This is the font loaded via wx.loadFontFace'
        })
      },
      fail: (res) => {
        console.log('loadFontFace Fail===', res)
      }
    })
  },
  toOtherPage: function() {
    wx.navigateTo({
      url: '/pages/load/load'
    })
  }
})
