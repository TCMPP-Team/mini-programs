Component({
  data: {
    markdownContent: '',
    i18n: {},
  },

  methods: {
    updateI18n() {
      const i18n = getApp()?.globalData?.i18n;
      if (!i18n) return;

      this.setData({
        i18n: i18n.getMessages(),
        markdownContent: i18n.t('demos.chatMarkdown.samples.sheet'),
      });
    },

    handleLinkTap(e) {
      // Open link
      console.log('link tap', e);
      wx.navigateTo({
        url: e.detail.node.href,
      });
    },
  },

  lifetimes: {
    attached() {
      this.updateI18n();
    },
  },
});
