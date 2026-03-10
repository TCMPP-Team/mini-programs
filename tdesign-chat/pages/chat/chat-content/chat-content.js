Page({
  data: {
    i18n: {},
  },

  onLoad() {
    this.updateI18n();
    this.setNavigationBarTitle();
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

  setNavigationBarTitle() {
    const i18n = getApp()?.globalData?.i18n;
    if (!i18n) return;
    wx.setNavigationBarTitle({
      title: i18n.t('pages.chatContent.navTitle'),
    });
  },
});

//# sourceMappingURL=chat-content.js.map
