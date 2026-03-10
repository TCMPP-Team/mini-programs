Component({
  data: {
    items: [
      {
        fileType: 'doc',
        name: 'word-file.doc',
        url: 'https://example.com/word-file.doc',
        size: 222859,
        status: 'success',
      },
      {
        fileType: 'excel',
        name: 'excel-file.xlsx',
        url: 'https://example.com/excel-file.xlsx',
        size: 222859,
        status: 'success',
      },
      {
        fileType: 'pdf',
        name: 'pdf-file.pdf',
        url: 'https://example.com/pdf-file.pdf',
        size: 222859,
        status: 'success',
      },
      {
        fileType: 'ppt',
        name: 'ppt-file.pptx',
        url: 'https://example.com/ppt-file.pptx',
        size: 222859,
        status: 'success',
      },
      {
        fileType: 'video',
        name: 'video-file.mp4',
        url: 'https://example.com/video-file.mp4',
        size: 222859,
        status: 'success',
      },
      {
        fileType: 'file',
        name: 'file',
        url: 'https://example.com/audio-file.mp3',
        size: 222859,
        status: 'success',
      },
    ],
  },

  methods: {
    onFileClick(e) {
      const { item } = e.detail;
      console.log('file click:', item);
      const i18n = getApp()?.globalData?.i18n;
      wx.showToast({
        title: i18n ? i18n.t('common.toast.clickedFile', { name: item.name }) : `Clicked ${item.name}`,
        icon: 'none',
      });
    },

    onRemove(e) {
      const { item, index } = e.detail;
      console.log('remove file:', item, 'index:', index);

      const newItems = [...this.data.items];
      newItems.splice(index, 1);
      this.setData({ items: newItems });

      const i18n = getApp()?.globalData?.i18n;
      wx.showToast({
        title: i18n ? i18n.t('common.toast.deleteSuccess') : 'Deleted',
        icon: 'success',
      });
    },

    onAdd() {
      console.log('add button click');
      const i18n = getApp()?.globalData?.i18n;
      wx.showToast({
        title: i18n ? i18n.t('common.toast.clickedAddButton') : 'Add clicked',
        icon: 'none',
      });

      const newFile = {
        fileType: 'txt',
        name: `new-file-${this.data.items.length + 1}.txt`,
        url: 'https://example.com/newfile.txt',
        size: 256,
        status: 'success',
      };

      this.setData({
        items: [...this.data.items, newFile],
      });
    },
  },
});
