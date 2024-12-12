// pages/minePage/minePage.js
import { i18n } from '../../i18n/lang';
var app = getApp();
var isLoginSuccess = false;

Page({

     /**
      * 页面的初始数据
      */
     data: {
          userTitle: i18n['点击登录'],
          userHead: '../../res/images/ic_mine_normal.png',
          i18n
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          this.setData({
               i18n
          })
     },

     previewHead: function () {
          // 目前接口无头像数据，设置为本地图片不支持预览
          // wx.previewImage({
          //      current: this.data.userHead,
          //      urls: [this.data.userHead]
          // })
     },

     loginTap: function () {
          if(!isLoginSuccess) {
               wx.navigateTo({
                    url:  "/pages/login/login",
               })
          }
     },

     initLoginMsg: function () {
          if (app.globalData.userInfo) {
               isLoginSuccess = true;
               this.setData({
                    userHead: app.globalData.userInfo.avatarUrl,
                    userTitle: app.globalData.userInfo.nickName
               })
          }
     },

     allOrderTap: function () {
          if(isLoginSuccess) {
               wx.navigateTo({
                    url: '../orderList/orderList?type=all',
               })
          } else {
               wx.navigateTo({
                    url:  "/pages/login/login",
               })
          }
     },

     todoOrderTap: function () {
          if(isLoginSuccess) {
               wx.navigateTo({
                    url: '../orderList/orderList?type=todo',
               })
          } else {
               wx.navigateTo({
                    url:  "/pages/login/login",
               })
          }
     },
     about: function () {
          wx.showToast({
               title: 'Dreams!'
          })
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
          if(this.data.userTitle === i18n['点击登录']) {
               this.initLoginMsg();
          }
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