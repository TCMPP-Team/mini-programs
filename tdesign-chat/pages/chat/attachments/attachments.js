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
      title: i18n.t('pages.attachments.navTitle'),
    });

    this.setData({
      i18n: i18n.getMessages(),
    });
  },
});

//# sourceMappingURL=attachments.js.map
