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
    contentHeight: {
      type: String,
      value: '100vh',
    },

    isActive: {
      type: Boolean,
      value: false,
      observer(v) {
        this.setData({
          value: v ? 'Help me plan a birthday party for a 5-year-old' : '',
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
              data: 'Welcome to the family event planner agent. Give me a task!',
            },
          ],
        },
      },
    ],
    value: '',
    loading: false,
    disabled: false,
    inputStyle: '',
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
        await fetchStream('Let me break this down into a simple, actionable plan:', {
          success(ch) {
            if (!that.data.loading) return;
            that.data.chatList[0].message.content[0].data += ch;
            that.setData({ chatList: that.data.chatList });
          },
          complete() {},
        });

        if (!that.data.loading) return;

        that.data.chatList[0].message.content.push({
          type: 'agent',
          id: 'task1',
          content: {
            text: '3 phases: prep → event → follow-up',
            steps: [
              {
                step: 'Food & drinks',
                agent_id: 'a1',
                tasks: [
                  { type: 'command', text: 'Search kid-friendly menu ideas' },
                  { type: 'result', text: 'Pick 1 main + 2 snacks + 1 dessert; avoid allergens.' },
                ],
                status: 'finish',
              },
            ],
          },
        });

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
