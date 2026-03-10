import Toast from 'tdesign-miniprogram/toast';
import { getNavigationBarHeight } from '../../../../utils/utils';

const mockCode =
  "```jsx\nimport { Form, Input, Button, Message } from 'tdesign-react';\n\nexport default function LoginForm() {\n  const onSubmit = async ({ validateResult }) => {\n    if (validateResult === true) {\n      Message.success('Login success');\n    } else {\n      Message.error('Validation failed');\n    }\n  };\n\n  return (\n    <Form onSubmit={onSubmit}>\n      <Form.FormItem name=\"username\" label=\"Username\" rules={[{ required: true }]} >\n        <Input placeholder=\"Enter username\" />\n      </Form.FormItem>\n\n      <Form.FormItem name=\"password\" label=\"Password\" rules={[{ required: true }]} >\n        <Input type=\"password\" />\n      </Form.FormItem>\n\n      <Form.FormItem>\n        <Button theme=\"primary\" type=\"submit\" block>\n          Login\n        </Button>\n      </Form.FormItem>\n    </Form>\n  );\n}\n```\n\n";

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
  data: {
    customActionBar: ['refresh', 'good', 'bad'],
    i18n: {},
    chatList: [
      {
        avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
        message: {
          role: 'assistant',
          content: [
            {
              type: 'text',
              data: 'Welcome to the code assistant. Ask a coding question.',
            },
          ],
        },
      },
    ],
    value: 'Show an example login form using TDesign components',
    loading: false,
    disabled: false,
    inputStyle: '',
    contentHeight: '100vh',
  },

  methods: {
    updateI18n() {
      const i18n = getApp()?.globalData?.i18n;
      if (!i18n) return;
      this.setData({ i18n: i18n.getMessages() });
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

      this.setData({
        chatList: [assistantMessage, ...this.data.chatList],
      });

      const that = this;
      wx.nextTick(async () => {
        await fetchStream('Here is a React login form using TDesign components:\n\n', {
          success(ch) {
            if (!that.data.loading) return;
            that.data.chatList[0].message.content[0].data += ch;
            that.setData({ chatList: that.data.chatList });
          },
          complete() {},
        });

        if (!that.data.loading) return;

        that.data.chatList[0].message.content.push(
          {
            type: 'preview',
            status: 'complete',
            data: {
              id: Date.now(),
              enName: 'tdesign-login-form.jsx',
              cnName: 'Generated',
              version: 'v1',
            },
          },
          { type: 'markdown', data: '' },
        );

        that.setData({ chatList: that.data.chatList });

        await fetchStream(mockCode, {
          success(ch) {
            if (!that.data.loading) return;
            that.data.chatList[0].message.content[2].data += ch;
            that.setData({ chatList: that.data.chatList });
          },
          complete() {},
        });

        if (!that.data.loading) return;

        that.data.chatList[0].message.content.push({ type: 'markdown', data: '' });
        that.setData({ chatList: that.data.chatList });

        await fetchStream(
          'This example includes:\n1) Username & password fields\n2) Required validation\n3) Submit button\n4) Basic success/error messages',
          {
            success(ch) {
              if (!that.data.loading) return;
              that.data.chatList[0].message.content[3].data += ch;
              that.setData({ chatList: that.data.chatList });
            },
            complete() {
              that.data.chatList[0].message.status = 'complete';
              that.setData({ chatList: that.data.chatList, loading: false });
            },
          },
        );
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
      this.updateI18n();
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
