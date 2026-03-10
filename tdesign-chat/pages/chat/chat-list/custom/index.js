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
          value: v ? 'Show me a simple traffic trend line chart' : '',
        });
      },
    },
  },

  options: {
    styleIsolation: 'shared',
  },

  data: {
    renderPresets: [{ name: 'send', type: 'icon' }],
    chatList: [
      {
        avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
        message: {
          role: 'assistant',
          content: [
            {
              type: 'text',
              data: 'Welcome to the smart chart assistant. Ask a question to generate charts.',
            },
          ],
        },
      },
    ],
    value: '',
    loading: false,
    disabled: false,
    inputStyle: '',
    contentHeight: '100vh',
  },

  methods: {
    handleAction(e) {
      console.log('handleAction', e.detail);
    },

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

      const list = [assistantMessage, ...this.data.chatList];
      this.setData({ chatList: list });

      const that = this;
      wx.nextTick(async () => {
        await fetchStream('Here is a simple line chart based on a sample traffic trend:', {
          success(ch) {
            if (!that.data.loading) return;
            that.data.chatList[0].message.content[0].data += ch;
            that.setData({ chatList: that.data.chatList });
          },
          complete() {},
        });

        if (!that.data.loading) return;

        that.data.chatList[0].message.content.push({
          type: 'chart',
          data: {
            id: Date.now(),
            chartType: 'line',
            options: {
              xAxis: {
                boundaryGap: true,
                type: 'category',
                data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00'],
              },
              yAxis: {
                type: 'value',
              },
              series: [
                {
                  data: [500, 401, 382, 433, 560, 630, 720],
                  type: 'line',
                },
              ],
            },
          },
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
