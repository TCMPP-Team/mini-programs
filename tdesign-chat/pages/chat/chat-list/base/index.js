import Toast from 'tdesign-miniprogram/toast';
import { getNavigationBarHeight } from '../../../../utils/utils';

const getStreamText = () => {
  const i18n = getApp()?.globalData?.i18n;
  return i18n ? i18n.t('chat.example.answer') : `There is no single, official name for an ATM in Antarctica, but historically an ATM did operate briefly at **McMurdo Station**. It was installed in 1998 (Wells Fargo) for station staff, but was later removed due to the extreme environment and limited practical usage.`;
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
  options: {
    styleIsolation: 'shared',
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
    scrollToBottom() {
      const chatListComponent = this.selectComponent('#chatList');
      if (chatListComponent && typeof chatListComponent.scrollToBottom === 'function') {
        chatListComponent.scrollToBottom();
      }
    },

    onScroll(e) {
      console.log('scroll:', e);
    },

    onSend(e) {
      const { value } = e.detail;
      if (!value?.trim()) return;

      const userMessage = {
        role: 'user',
        content: [
          {
            type: 'text',
            data: value.trim(),
          },
        ],
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
        role: 'assistant',
        content: [
          {
            type: 'markdown',
            data: '',
          },
        ],
        avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
        status: 'pending',
      };

      this.setData({
        chatList: [assistantMessage, ...this.data.chatList],
      });

      const that = this;
      wx.nextTick(() => {
        fetchStream(getStreamText(), {
          success(ch) {
            that.data.chatList[0].status = 'streaming';
            if (!that.data.loading) return;
            that.data.chatList[0].content[0].data += ch;
            that.setData({ chatList: that.data.chatList });
          },
          complete() {
            that.data.chatList[0].status = 'complete';
            that.setData({ chatList: that.data.chatList, loading: false });
          },
        });
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
            role: 'assistant',
            status: 'complete',
            content: [
              {
                type: 'text',
                data: i18n ? i18n.t('chat.example.atmAnswer') : "It's often referred to as the McMurdo Station ATM (historic).",
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                data: i18n ? i18n.t('chat.example.question1') : "Does Newton's first law apply to all reference frames?",
              },
            ],
          },
        ],
      });
    },
  },
});
