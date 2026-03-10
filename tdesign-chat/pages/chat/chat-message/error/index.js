Component({
  data: {
    message: {
      role: 'assistant',
      status: 'error',
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
        message: {
          ...this.data.message,
          content: [
            {
              type: 'text',
              data: i18n.t('demos.chatMessage.errorMessage'),
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
