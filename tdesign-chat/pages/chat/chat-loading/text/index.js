Component({
  data: {
    i18n: {},
  },
  methods: {
    updateI18n() {
      const i18n = getApp()?.globalData?.i18n;
      if (!i18n) return;
      this.setData({
        i18n: i18n.getMessages(),
      });
    },
  },
  lifetimes: {
    attached() {
      this.updateI18n();
    },
  },
});
