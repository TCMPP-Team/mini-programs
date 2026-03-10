Page({
    data: {
        failImage: 'error-circle-filled',
        i18n: {},
    },
    onLoad() {
        this.updateI18n();
    },

    onShow() {
        this.updateI18n();
    },

    updateI18n() {
        const i18n = getApp()?.globalData?.i18n;
        if (!i18n) return;
        this.setData({
            i18n: i18n.getMessages(),
        });
    },

    toHome() {
        wx.reLaunch({
            url: '/pages/home/home',
        });
    },
});

//# sourceMappingURL=navigateFail.js.map
