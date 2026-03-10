Component({
  data: {
    items: [
      {
        fileType: 'image',
        name: 'sample-image.jpg',
        url: 'https://tdesign.gtimg.com/site/avatar.jpg',
        size: 1024,
        status: 'pending',
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
