Component({
  data: {
    animation: 'moving',
    status: 'complete',
    content: {
      text: '',
      title: '',
    },
    i18n: {},
  },
  methods: {
    updateI18n() {
      const i18n = getApp()?.globalData?.i18n;
      if (!i18n) return;
      this.setData({
        i18n: i18n.getMessages(),
        content: {
          title: i18n.t('pages.chatThinking.examples.thoughtTitle'),
          text: i18n.t('pages.chatThinking.examples.thoughtText'),
        },
      });
    },
  },
  lifetimes: {
    attached() {
      this.updateI18n();
    },
  },
});
