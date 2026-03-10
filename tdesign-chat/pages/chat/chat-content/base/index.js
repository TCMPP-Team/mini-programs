// import { Lexer } from 'marked';

// Create Lexer instance with config (optional)
// const lexer = new Lexer({});

Component({
  data: {
    userContent: {
      type: 'text',
      data: '',
    },
    assistantContent: {
      type: 'markdown',
      data: '',
    },
    i18n: {},
  },
  methods: {
    updateI18n() {
      const i18n = getApp()?.globalData?.i18n;
      if (!i18n) return;
      this.setData({
        i18n: i18n.getMessages(),
        userContent: {
          ...this.data.userContent,
          data: i18n.t('pages.chatContent.base.userTextSample'),
        },
        assistantContent: {
          ...this.data.assistantContent,
          data: i18n.t('demos.chatMarkdown.samples.base'),
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
