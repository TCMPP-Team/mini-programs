Page({
    data: {
        loading: true,
        loadingText: '',
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

        wx.setNavigationBarTitle({
            title: i18n.t('demos.chatLoading.pageTitle'),
        });

        this.setData({
            i18n: i18n.getMessages(),
            loadingText: i18n.t('pages.chatLoading.text.loading'),
        });
    },
    toggleLoading() {
        this.setData({
            loading: !this.data.loading
        });
    },
    resetLoading() {
        const i18n = getApp()?.globalData?.i18n;
        this.setData({
            loading: true,
            loadingText: i18n ? i18n.t('pages.chatLoading.text.loading') : this.data.loadingText,
        });
        wx.showToast({
            title: i18n ? i18n.t('common.toast.resetSuccess') : 'Reset',
            icon: 'success'
        });
    },
});

//# sourceMappingURL=chat-loading.js.map
