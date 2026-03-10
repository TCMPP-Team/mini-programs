import Toast from 'tdesign-miniprogram/toast';

Component({
  data: {
    value: '',
    loading: false,
    disabled: false,
    i18n: {},
    fileList: [],
    visible: true,
    placeholder: '',
    textareaProps: {
      autosize: {
        maxHeight: 264,
        minHeight: 48,
      },
    },
    attachmentsProps: {
      items: [],
      removable: true,
      imageViewer: true,
      addable: false,
    },
    renderPresets: [
      {
        name: 'upload',
        presets: ['uploadCamera', 'uploadImage', 'uploadAttachment'],
        type: 'bottom',
        status: '',
      },
      {
        name: 'send',
        type: 'icon',
      },
    ],
    deepThinkActive: false,
    netSearchActive: false,
    showUploadMenu: true,
  },

  methods: {
    updateI18n() {
      const i18n = getApp()?.globalData?.i18n;
      if (!i18n) return;

      const imgName = i18n.t('demos.chatSender.sampleFile1');
      const docName = i18n.t('demos.chatSender.sampleFile2');

      const fileList = [
        {
          fileType: 'image',
          name: imgName,
          url: 'https://tdesign.gtimg.com/site/square.png',
        },
        {
          fileType: 'pdf',
          name: docName,
          url: 'https://example.com/document.pdf',
          size: 3072,
          status: 'pending',
        },
      ];

      this.setData({
        i18n: i18n.getMessages(),
        placeholder: i18n.t('common.placeholder.inputMessage'),
        fileList,
        attachmentsProps: {
          ...this.data.attachmentsProps,
          items: fileList,
        },
      });
    },

    onSend(e) {
      const { value } = e.detail;
      console.log('send:', value);

      if (!value?.trim()) {
        const i18n = getApp()?.globalData?.i18n;
        wx.showToast({
          title: i18n ? i18n.t('common.toast.inputRequired') : 'Message required',
          icon: 'none',
        });
        return;
      }

      this.setData({ loading: true });

      setTimeout(() => {
        if (this.data.loading) {
          this.setData({
            loading: false,
            value: '',
          });
          const i18n = getApp()?.globalData?.i18n;
          wx.showToast({
            title: i18n ? i18n.t('common.toast.sendSuccess') : 'Sent',
            icon: 'success',
          });
        }
      }, 3000);
    },

    onStop(e) {
      const { value } = e.detail;
      console.log('stop:', value);

      this.setData({ loading: false });
      const i18n = getApp()?.globalData?.i18n;
      wx.showToast({
        title: i18n ? i18n.t('common.toast.stopSuccess') : 'Stopped',
        icon: 'none',
      });
    },

    onFocus(e) {
      const { value, context } = e.detail;
      console.log('focus:', value, context);
    },

    onBlur(e) {
      const { value, context } = e.detail;
      console.log('blur:', value, context);
    },

    onChange(e) {
      const { value } = e.detail;
      this.setData({ value });
    },

    onUploadClick() {
      console.log('upload click');
    },

    onFileClick(e) {
      const { file } = e.detail;
      console.log('file click:', file);
      const i18n = getApp()?.globalData?.i18n;
      wx.showToast({
        title: i18n ? i18n.t('common.toast.clickedFile', { name: file.name }) : `Clicked ${file.name}`,
        icon: 'none',
      });
    },

    onFileDelete(e) {
      const { file } = e.detail;
      console.log('file delete:', file);
      const i18n = getApp()?.globalData?.i18n;
      wx.showToast({
        title: i18n ? i18n.t('common.toast.deleteSuccess') : 'Deleted',
        icon: 'success',
      });
    },

    onFileChange(e) {
      const { files } = e.detail;
      this.setData({
        attachmentsProps: { ...this.data.attachmentsProps, items: files },
        fileList: files,
      });
    },

    onFileAdd() {
      console.log('file add');
    },

    onFileSelect(e) {
      const { files } = e.detail;
      const i18n = getApp()?.globalData?.i18n;
      wx.showToast({
        title: i18n ? i18n.t('common.toast.filesSelected', { count: files.length }) : `Selected ${files.length}`,
        icon: 'success',
      });
    },

    onUpdateVisible() {
      const i18n = getApp()?.globalData?.i18n;
      Toast({
        context: this,
        selector: '#t-toast',
        message: i18n ? i18n.t('common.toast.notAvailable') : 'Not available',
      });
    },

    onKeyboardHeightChange(e) {
      console.log('keyboard height:', e.detail);
    },

    toggleDisabled() {
      this.setData({ disabled: !this.data.disabled });
    },

    toggleLoading() {
      this.setData({ loading: !this.data.loading });
    },

    clearInput() {
      this.setData({ value: '' });
    },

    onDeepThinkTap() {
      this.setData({ deepThinkActive: !this.data.deepThinkActive });
    },

    onNetSearchTap() {
      this.setData({ netSearchActive: !this.data.netSearchActive });
    },
  },

  lifetimes: {
    attached() {
      this.updateI18n();
    },
  },

  pageLifetimes: {
    show() {
      this.updateI18n();
    },
  },
});
