// pages/orderList/orderList.js
import Mock from '../../utils/mockData'
import { i18n } from '../../i18n/lang';
const app = getApp()
Page({

     /**
      * 页面的初始数据
      */
     data: {
          stateList: Mock.OrderType,
          common_row: {
               caption_class: 'caption',
               value_class: 'value'
          },
          selectedIndex: 0,

          //数据列表数组
          orderAll: undefined,
          orderTodo: undefined,
          orderDone: undefined,
          orderCancel: undefined,

          //是否可以上拉加载
          allLoadEnable: false,
          todoLoadEnable: false,
          doneLoadEnable: false,
          cancelLoadEnable: false,

          //数据为空或请求失败的提示语
          allEmpty: i18n['全部订单为空'],
          todoEmpty: i18n['未入住订单为空'],
          doneEmpty: i18n['已入住订单为空'],
          cancelEmpty: i18n['已取消订单为空'],
          i18n,
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          wx.setNavigationBarTitle({
               title: i18n['我的订单']
          })
          this.setData({
               i18n
          })
          console.log(options);

          var pageType = options.type;
          if (pageType == 'all') {
               this.setData({
                    selectedIndex: 0,
               });
          } else if (pageType == 'todo') {
               this.setData({
                    selectedIndex: 1,
               });
          }

          setTimeout(() => {
               this.updateList()
          }, 0);
     },

     updateList() {
          const todoList = wx.getStorageSync(`orderTodo_${app.globalData.userInfo?.nickName}`)
          const allList = todoList ? Mock.HotelOrder.concat(todoList) : Mock.HotelOrder
          this.setData({
               orderAll: allList,
               orderTodo: todoList,
               orderDone: Mock.HotelOrder,
               orderCancel: [],
          });
     },

     swiperChange: function (e) {
          var detailIndex = e.detail.current;
          var source = e.detail.source;
          if (this.selectedIndex != detailIndex && source == 'touch') {
               this.setData({
                    selectedIndex: detailIndex
               });
          }
     },

     turnPage: function (e) {
          var that = this;
          var dataIndex = e.currentTarget.dataset.index;
          if (this.data.selectedIndex != dataIndex) {
               this.setData({
                    selectedIndex: dataIndex
               });
          } else {
               if (this.data.selectedIndex == 0) {
                    this.setData({
                         orderAll: null
                    });
                    wx: setTimeout(function () {
                         that.setData({
                              orderAll: [],
                         });
                    }, 2000);
               } else if (this.data.selectedIndex == 1) {
                    this.setData({
                         orderTodo: null
                    });
                    wx: setTimeout(function () {
                         that.setData({
                              orderTodo: [],
                         });
                    }, 2000);
               } else if (this.data.selectedIndex == 2) {
                    this.setData({
                         orderDone: null
                    });
                    wx: setTimeout(function () {
                         that.setData({
                              orderDone: [],
                         });
                    }, 2000);
               } else if (this.data.selectedIndex == 3) {
                    this.setData({
                         orderCancel: null
                    });
                    wx: setTimeout(function () {
                         that.setData({
                              orderCancel: [],
                         });
                    }, 2000);
               }
          }
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