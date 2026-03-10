import Toast from 'tdesign-miniprogram/toast';

Component({
  data: {
    content: '',
    comment: 'good',
    i18n: {},
  },

  methods: {
    updateI18n() {
      const i18n = getApp()?.globalData?.i18n;
      if (!i18n) return;
      this.setData({
        i18n: i18n.getMessages(),
        content: i18n.t('demos.chatActionbar.copyContent'),
      });
    },

    handleAction(e) {
      const { name, active, data } = e.detail;
      const i18n = getApp()?.globalData?.i18n;

      let message = '';
      switch (name) {
        case 'replay':
          message = i18n ? i18n.t('common.button.regenerate') : 'Regenerate';
          break;
        case 'copy':
          console.log(data);
          message = i18n ? i18n.t('common.toast.copySuccess') : 'Copied';
          break;
        case 'good':
          message = i18n
            ? active
              ? i18n.t('common.toast.likeSuccess')
              : i18n.t('common.toast.unlikeSuccess')
            : active
              ? 'Liked'
              : 'Unliked';
          break;
        case 'bad':
          message = i18n
            ? active
              ? i18n.t('common.toast.dislikeSuccess')
              : i18n.t('common.toast.undislikeSuccess')
            : active
              ? 'Disliked'
              : 'Undisliked';
          break;
        case 'share':
          message = i18n ? i18n.t('common.toast.notAvailable') : 'Not available';
          break;
        default:
          message = i18n ? i18n.t('common.toast.operationSuccess') : `Action: ${name}`;
      }

      Toast({
        context: this,
        selector: '#t-toast',
        message,
        theme: 'success',
      });
    },
  },

  lifetimes: {
    attached() {
      this.updateI18n();
    },
  },
});
