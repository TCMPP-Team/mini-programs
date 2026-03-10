import Toast from 'tdesign-miniprogram/toast';
import { getNavigationBarHeight } from '../../../../utils/utils';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetchStream = async (str, options) => {
  const { success, complete, delay = 100 } = options;

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
      observer: function (v) {
        // 延迟 30ms，避免 hidden 场景下， value 变更无法触发 textarea 的自动换行
        // 代码片段（iOS 真机可复现）：https://developers.weixin.qq.com/s/7UoAYgmr8G4k
        setTimeout(() => {
          const i18n = getApp()?.globalData?.i18n;
          this.setData({
            value: v ? i18n?.t('chat.example.question4') || '' : '', // 输入框的值
          });
        }, 30);
      },
    },
  },
  data: {
    customActionBar: ['copy', 'good', 'bad'],
    chatList: [],
    value: '', // 输入框的值
    loading: false, // 加载状态
    disabled: false, // 禁用状态
    inputStyle: '', // 动态样式
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
        status: '',
      },
      {
        name: 'send',
        type: 'icon',
      },
    ],
    fileList: [],
    visible: false, // 是否显示选择文件面板
    chatContentProps: {
      thinking: { maxHeight: 100, collapsed: true },
    },
    contentHeight: '100vh', // 内容高度
  },

  methods: {
    // 发送消息事件处理
    onSend(e) {
      const { value } = e.detail;
      if (!value || value.trim() === '') return;

      // 创建用户消息对象
      const content = [
        {
          type: 'text',
          data: value.trim(),
        },
      ];
      const attachments = this.data.attachmentsProps.items.map((item) => {
        return {
          ...item,
          status: 'success',
        };
      });
      content.unshift({
        type: 'attachment',
        data: attachments,
      });
      this.setData({
        attachmentsProps: {
          ...this.data.attachmentsProps,
          items: [],
        },
        fileList: [],
      });
      const userMessage = {
        message: {
          role: 'user',
          content,
        },
      };

      // 将用户消息插入到chatList的开头（因为reverse为true，所以用unshift）
      this.setData({
        chatList: [userMessage, ...this.data.chatList],
        value: '', // 清空输入框
      });

      // 模拟助手回复（可选）
      this.simulateAssistantReply(value.trim());
    },

    // 停止事件处理
    onStop() {
      const i18n = getApp()?.globalData?.i18n;
      console.log(i18n?.t('chat.docs.console.stopSending') || 'Stop sending');
      this.setData({
        loading: false,
      });
    },

    // 聚焦事件处理
    onFocus() {
      const i18n = getApp()?.globalData?.i18n;
      console.log(i18n?.t('chat.docs.console.inputFocus') || 'Input focused');
    },

    // 打开选择文件界面
    onUpdateVisible(e) {
      const visible = e.detail;
      const i18n = getApp()?.globalData?.i18n;
      console.log(i18n?.t('chat.docs.console.uploadPanelStatus') || 'Upload panel display status:', visible);
      this.setData({ visible });
    },

    onFileDelete() {
      this.setData({
        attachmentsProps: {
          ...this.data.attachmentsProps,
          items: [],
        },
      });
    },

    onFileChange(e) {
      const { files } = e.detail;
      this.setData({ attachmentsProps: { ...this.data.attachmentsProps, items: files } });
      this.setData({ fileList: files });
    },

    // 模拟助手回复
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
      const i18n = getApp()?.globalData?.i18n;
      const mockData = i18n?.t('chat.docs.mockResponse') || '';

      wx.nextTick(() => {
        fetchStream(mockData, {
          success(result) {
            if (!that.data.loading) return;
            that.data.chatList[0].message.content[0].data += result;
            that.setData({
              chatList: that.data.chatList,
            });
          },
          complete() {
            that.data.chatList[0].message.status = 'complete';
            that.setData({
              chatList: that.data.chatList,
            });
            that.setData({
              loading: false,
            });
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
          message = i18n?.t('chat.docs.toast.regenerate') || 'Regenerate';
          break;
        case 'copy':
          console.log(data);
          message = i18n?.t('chat.docs.toast.copySuccess') || 'Copy successful';
          break;
        case 'good':
          message = active
            ? (i18n?.t('chat.docs.toast.likeSuccess') || 'Liked successfully')
            : (i18n?.t('chat.docs.toast.unlikeSuccess') || 'Unliked');
          break;
        case 'bad':
          message = active
            ? (i18n?.t('chat.docs.toast.dislikeSuccess') || 'Disliked successfully')
            : (i18n?.t('chat.docs.toast.undislikeSuccess') || 'Undisliked');
          break;
        case 'share':
          message = i18n?.t('chat.docs.toast.share') || 'Share';
          break;
        default:
          message = i18n?.t('chat.docs.toast.defaultAction', { name }) || `Performed ${name} action`;
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
    attached: function () {
      /**
       * 计算内容区域高度
       * 生成CSS calc表达式：calc(100vh - 96rpx - 导航高度 - 底部安全区域高度)
       */
      try {
        // 获取当前的导航栏高度和安全区域高度
        const navigationBarHeight = getNavigationBarHeight() || 0;

        // 生成CSS calc表达式字符串
        const contentHeight = `calc(100vh - 96rpx - ${navigationBarHeight}px)`;

        this.setData({
          contentHeight: contentHeight,
        });

        const i18n = getApp()?.globalData?.i18n;
        console.log(i18n?.t('chat.docs.console.contentHeightExpression') || 'Content area height CSS expression:', contentHeight);
      } catch (error) {
        const i18n = getApp()?.globalData?.i18n;
        console.error(i18n?.t('chat.docs.console.generateContentHeightFailed') || 'Failed to generate content height expression:', error);
        this.setData({
          contentHeight: 'calc(100vh - 96rpx)',
        });
      }

      // 初始化欢迎消息
      const i18n = getApp()?.globalData?.i18n;
      const welcomeMessage = {
        avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
        message: {
          role: 'assistant',
          content: [
            {
              type: 'text',
              data: i18n?.t('chat.example.welcome.writer') || 'Welcome to TDesign Copywriting Assistant. You can upload reference files and enter your writing topic~',
            },
          ],
        },
      };
      this.setData({
        chatList: [welcomeMessage],
      });
    },
  },
});
