import { getNavigationBarHeight } from '../../../../utils/utils';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchStream = async (str, options) => {
  const { success, complete, delay = 30 } = options;
  const arr = str.split('');
  for (let i = 0; i < arr.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(delay);
    success(arr[i]);
  }
  complete();
};

Component({
  properties: {
    isActive: {
      type: Boolean,
      value: false,
      observer(v) {
        this.setData({
          value: v ? 'Design three promo images for TDesign' : '',
        });
      },
    },
  },

  options: {
    styleIsolation: 'shared',
  },

  data: {
    renderPresets: [{ name: 'send', type: 'icon' }],
    customActionBar: ['good', 'bad'],
    chatList: [
      {
        avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
        message: {
          role: 'assistant',
          content: [
            {
              type: 'text',
              data: 'Welcome to the image assistant. Describe your idea (you can attach a reference image).',
            },
          ],
        },
      },
    ],
    value: '',
    loading: false,
    disabled: false,
    inputStyle: '',
    attachmentsProps: {
      items: [],
      removable: true,
      imageViewer: true,
      addable: false,
    },
    contentHeight: '100vh',
  },

  methods: {
    onSend(e) {
      const { value } = e.detail;
      if (!value?.trim()) return;

      const userMessage = {
        message: {
          role: 'user',
          content: [
            {
              type: 'text',
              data: value.trim(),
            },
          ],
        },
      };

      this.setData({
        chatList: [userMessage, ...this.data.chatList],
        value: '',
      });

      this.simulateAssistantReply();
    },

    onStop() {
      this.setData({ loading: false });
    },

    onFocus() {
      console.log('focus');
    },

    simulateAssistantReply() {
      this.setData({ loading: true });

      const assistantMessage = {
        avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
        message: {
          role: 'assistant',
          content: [
            {
              type: 'markdown',
              data: '',
            },
          ],
        },
      };

      this.setData({
        chatList: [assistantMessage, ...this.data.chatList],
      });

      const that = this;
      wx.nextTick(async () => {
        await fetchStream('Generating images based on your prompt...', {
          success(ch) {
            if (!that.data.loading) return;
            that.data.chatList[0].message.content[0].data += ch;
            that.setData({ chatList: that.data.chatList });
          },
          complete() {},
        });

        if (!that.data.loading) return;

        that.data.chatList[0].message.content.push({
          type: 'imageview',
          status: 'complete',
          data: [
            {
              name: 'sample1.png',
              url: 'https://tdesign.gtimg.com/site/square.png',
              fileType: 'image',
              status: 'success',
              size: 1032,
              width: 128,
              height: 128,
            },
            {
              name: 'sample2.png',
              url: 'https://tdesign.gtimg.com/site/square.png',
              fileType: 'image',
              status: 'success',
              size: 1032,
              width: 128,
              height: 128,
            },
            {
              name: 'sample3.png',
              url: 'https://tdesign.gtimg.com/site/square.png',
              fileType: 'image',
              status: 'success',
              size: 1032,
              width: 128,
              height: 128,
            },
          ],
        });

        that.data.chatList[0].message.status = 'complete';
        that.setData({ chatList: that.data.chatList, loading: false });
      });
    },
  },

  lifetimes: {
    attached() {
      try {
        const navigationBarHeight = getNavigationBarHeight() || 0;
        const contentHeight = `calc(100vh - 96rpx - ${navigationBarHeight}px)`;
        this.setData({ contentHeight });
      } catch (error) {
        console.error('Failed to compute content height:', error);
        this.setData({ contentHeight: 'calc(100vh - 96rpx)' });
      }
    },
  },
});
