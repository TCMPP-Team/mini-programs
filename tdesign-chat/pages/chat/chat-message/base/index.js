Component({
  data: {
    userMessage: {
      role: 'user',
      content: [
        {
          type: 'text',
          data: '',
        },
      ],
    },
    i18n: {},
  },

  methods: {
    updateI18n() {
      const i18n = getApp()?.globalData?.i18n;
      if (!i18n) return;

      this.setData({
        i18n: i18n.getMessages(),
        userMessage: {
          ...this.data.userMessage,
          content: [
            {
              type: 'text',
              data: i18n.t('pages.chatMessage.examples.question'),
            },
          ],
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
