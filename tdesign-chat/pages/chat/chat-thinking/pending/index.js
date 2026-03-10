Component({
  data: {
    animation: 'moving',
    content: {
      text: '',
      title: '',
    },
    status: 'pending',
    i18n: {},
  },

  methods: {
    updateI18n() {
      const i18n = getApp()?.globalData?.i18n;
      if (!i18n) return;
      this.setData({
        i18n: i18n.getMessages(),
        content: {
          title: i18n.t('demos.chatThinking.title'),
          text: i18n.t('pages.chatThinking.examples.thoughtText'),
        },
      });
    },

    handleCollapsedChange(e) {
      console.log('collapsed changed:', e.detail);
    },
  },

  lifetimes: {
    attached() {
      this.updateI18n();
    },
  },
});
