import Toast from 'tdesign-miniprogram/toast';
import { getNavigationBarHeight } from '../../../../utils/utils';

const getThinkingTemplate = () => {
  const i18n = getApp()?.globalData?.i18n;
  return {
    avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
    message: {
      role: 'assistant',
      content: [
        {
          type: 'thinking',
          status: 'complete',
          data: {
            title: i18n ? i18n.t('chat.thinking.titleShort') : 'Thinking',
            text: '',
          },
        },
      ],
    },
  };
};

const getPart1 = () => {
  const i18n = getApp()?.globalData?.i18n;
  return i18n ? i18n.t('chat.example.atmThinkingPart1') : "The user is asking about the name of an ATM in Antarctica. It's a bit unusual because Antarctica has very limited commercial infrastructure.\n";
};

const getPart2 = () => {
  const i18n = getApp()?.globalData?.i18n;
  return i18n ? i18n.t('chat.example.atmThinkingPart2') : "\n\nHistorically, an ATM operated briefly at **McMurdo Station** (installed in 1998, later removed). There is no widely-used official name beyond that context.";
};

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
        const i18n = getApp()?.globalData?.i18n;
        this.setData({
          value: v ? (i18n ? i18n.t('chat.example.atmQuestion') : 'What is the name of the ATM in Antarctica?') : '',
        });
      },
    },
  },

  data: {
    renderPresets: [{ name: 'send', type: 'icon' }],
    chatList: [],

    value: '',
    loading: false,
    disabled: false,
    inputStyle: '',
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

    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },

    simulateAssistantReply() {
      this.setData({ loading: true });

      const assistantMessage = JSON.parse(JSON.stringify(getThinkingTemplate()));
      this.setData({
        chatList: [assistantMessage, ...this.data.chatList],
      });

      const that = this;
      const i18n = getApp()?.globalData?.i18n;
      wx.nextTick(async () => {
        await fetchStream(getPart1(), {
          success(ch) {
            if (!that.data.loading) return;
            that.data.chatList[0].message.content[0].data.text += ch;
            that.setData({ chatList: that.data.chatList });
          },
          complete() {
            that.data.chatList[0].message.content[0].data.title = i18n ? i18n.t('chat.thinking.complete') : 'Thinking complete';
            that.setData({ chatList: that.data.chatList });
          },
        });

        if (!that.data.loading) return;

        that.data.chatList[0].message.content.push({ type: 'markdown', data: '' });
        that.setData({ chatList: that.data.chatList });

        await fetchStream(getPart2(), {
          success(ch) {
            if (!that.data.loading) return;
            that.data.chatList[0].message.content[1].data += ch;
            that.setData({ chatList: that.data.chatList });
          },
          complete() {
            that.data.chatList[0].message.status = 'complete';
            that.setData({ chatList: that.data.chatList, loading: false });
          },
        });
      });
    },

    handleAction(e) {
      const { name } = e.detail;
      Toast({
        context: this,
        selector: '#t-toast',
        message: `Action: ${name}`,
        theme: 'success',
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

      // Initialize chatList with i18n
      const i18n = getApp()?.globalData?.i18n;
      this.setData({
        chatList: [
          {
            avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
            message: {
              status: 'complete',
              role: 'assistant',
              content: [
                {
                  type: 'text',
                  data: i18n ? i18n.t('chat.example.atmAnswer') : "It's often referred to as the McMurdo Station ATM (historic).",
                },
              ],
            },
          },
          {
            message: {
              role: 'user',
              content: [
                {
                  type: 'text',
                  data: i18n ? i18n.t('chat.example.question1') : "Does Newton's first law apply to all reference frames?",
                },
              ],
            },
          },
        ],
      });
    },
  },
});
