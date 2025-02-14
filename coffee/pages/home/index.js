import i18n from '../../i18n/index';
import { clearAll, getUserInfo, saveUserInfo } from '../../service/storage';
import { setTabBar } from '../../utils/i18n';
Page({
    data: {
        userInfo: null,
        lang: {
            levelName: i18n.t("初级粉丝"),
            login: i18n.t('登录'),
            menu1: i18n.t('立即点单'),
            menu1Desc: i18n.t('即刻点餐，立享优惠'),
            menu2: i18n.t('外卖'),
            menu2Desc: i18n.t('无接触，放心点'),
            menu3: i18n.t('非常好喝'),
            menu3Desc: i18n.t('喝点好喝咖啡'),
            menu4: i18n.t('快来点吧'),
            menu4Desc: i18n.t('此处招商'),
            memberScore: i18n.t('积分')
        }
    },

    onLoad: function () {
        setTabBar();
        wx.setNavigationBarTitle({
            title: i18n.t('首页')
        })
        const userInfo = getUserInfo();
        if (!userInfo) {
            wx.showToast({
                title: i18n.t('请点击登录按钮登录'),
                icon: 'none'
            })
        } else {
            this.setData({ userInfo })
        }
    },

    //跳转选择店铺
    goStore: function (e) {
        const orderType = e.currentTarget.dataset.type
        wx.reLaunch({
            url: `/pages/order/index?orderType=${orderType}`,
        })
    },

    // 跳转到会员中心
    goOther: function () {
        wx.showToast({
            icon: 'none',
            title: i18n.t('暂未开放'),
        })
    },

    defaultLogin: function () {
        const defaultUser = {
            id: 'admin',
            account: 'admin',
            userName: 'User-86E446F65',
            memberScore: Math.round(Math.random() * 10000)
        };
        this.setData({ userInfo: defaultUser })
        saveUserInfo(defaultUser)
        setTimeout(() => {
            wx.showToast({
                title: i18n.t('登录成功'),
            })
        }, 0);
    },

    //登录
    doLogin: function () {
        const { query: { noServer } } = wx.getEnterOptionsSync();

        wx.showLoading({
            title: i18n.t('登录中')
        });
        if (`${noServer}` === '1') {
            this.defaultLogin();
            wx.hideLoading()
        } else {
            wx.login({
                success: ({ code }) => {
                    if (code) {
                        wx.request({
                            url: 'https://tcmpp.woyaojianfei.club/getUserInfo',
                            method: 'POST',
                            data: {
                                appid: 'mp72qkrsyxxby6pl',
                                code: code
                            },
                            success: (res) => {
                                const { data } = res?.data || {};
                                const userInfo = { ...data, memberScore: Math.round(Math.random() * 10000) }
                                if (userInfo.account) { // 换取用户信息成功
                                    this.setData({ userInfo })
                                    saveUserInfo(userInfo)
                                    setTimeout(() => {
                                        wx.showToast({
                                            title: i18n.t('登录成功'),
                                        })
                                    }, 0);
                                } else {
                                    this.defaultLogin();
                                }
                                wx.hideLoading()
                            },
                            fail() {
                                this.defaultLogin();
                                wx.hideLoading()
                            }
                        })

                    }
                },
                fail() {
                    wx.hideLoading()
                }
            })
        }
    },

    // 退出登录
    logout: function () {
        wx.showModal({
            title: i18n.t('退出登录'),
            content: i18n.t('退出登录后数据将全部清除'),
            confirmText: i18n.t('确定'),
            cancelText: i18n.t('取消'),
            success: (res) => {
                if (res.confirm) {
                    clearAll();
                    this.setData({ userInfo: null });
                    wx.showToast({
                        title: i18n.t('退出成功'),
                    })
                }
            }
        });
    }
})