Component({
  data: {
    aiMessage: {
      role: 'assistant',
      status: 'complete',
      content: [
        {
          type: 'thinking',
          data: {
            title: '',
            text: '',
          },
        },
        {
          type: 'text',
          data: '',
        },
      ],
    },
    pic1: {
      role: 'user',
      name: '',
      avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
      content: [
        {
          type: 'attachment',
          data: [
            {
              fileType: 'image',
              name: 'avatar.jpg',
              size: 234234,
              url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
              width: 1920, // image width
              height: 1080, // image height
            },
          ],
        },
        {
          type: 'text',
          data: '',
        },
      ],
    },
    pic3: {
      role: 'user',
      content: [
        {
          type: 'attachment',
          data: [
            {
              fileType: 'image',
              name: 'avatar.jpg',
              size: 234234,
              url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
              width: 1920, // image width
              height: 1080, // image height
            },
          ],
        },
        {
          type: 'text',
          data: '',
        },
      ],
    },
    pic2: {
      role: 'user',
      content: [
        {
          type: 'attachment',
          data: [
            {
              fileType: 'image',
              name: 'avatar.jpg',
              size: 234234,
              url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
              width: 1920, // image width
              height: 1080, // image height
            },
            {
              fileType: 'image',
              name: 'avatar2.jpg',
              size: 234234,
              url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
              width: 1920, // image width
              height: 1080, // image height
            },
          ],
        },
        {
          type: 'text',
          data: '',
        },
      ],
    },
    fileMessage: {
      role: 'user',
      content: [
        {
          type: 'attachment',
          data: [
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
        'aiMessage.content[0].data.title': i18n.t('demos.thinkingContent.title'),
        'aiMessage.content[0].data.text': i18n.t('demos.thinkingContent.text'),
        'aiMessage.content[1].data': i18n.t('demos.citations.physics'),
        'pic1.name': i18n.t('demos.chatMessage.userName'),
        'pic1.content[1].data': i18n.t('demos.chatMessage.prompts.adPlan'),
        'pic2.content[1].data': i18n.t('demos.chatMessage.prompts.adPlan'),
        'pic3.content[1].data': i18n.t('demos.chatMessage.prompts.analyze'),
        'fileMessage.content[1].data': i18n.t('demos.citations.physics'),
      });
    },
  },

  lifetimes: {
    attached() {
      this.updateI18n();
    },
  },
});
