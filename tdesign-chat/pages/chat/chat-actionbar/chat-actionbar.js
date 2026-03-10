Page({
  data: {
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
      title: i18n.t('demos.chatActionbar.pageTitle'),
    });

    this.setData({
      i18n: i18n.getMessages(),
    });
  },
});

//# sourceMappingURL=chat-actionbar.js.map
