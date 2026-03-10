Component({
  data: {
    thinking: true,
    fullText: '',
    currentText: '',
    isTyping: true,
    content: {
      text: '',
      title: '',
    },
    typeSpeed: 50,
    status: 'pending',
    startTime: 0,
    i18n: {},
  },

  lifetimes: {
    attached() {
      this.updateI18n();
      this.setData({
        startTime: Date.now(),
      });
      this.startTyping();
    },

    detached() {
      if (this.typingTimer) {
        clearTimeout(this.typingTimer);
      }
    },
  },

  methods: {
    updateI18n() {
      const i18n = getApp()?.globalData?.i18n;
      if (!i18n) return;
      this.setData({
        i18n: i18n.getMessages(),
        fullText: i18n.t('pages.chatThinking.examples.thoughtText'),
        content: {
          text: this.data.currentText || '',
          title: i18n.t('pages.chatThinking.typingTitle'),
        },
      });
    },
    startTyping() {
      const { fullText, typeSpeed } = this.data;
      let currentIndex = 0;
      const typeNextChar = () => {
        if (currentIndex <= fullText.length) {
          const currentText = fullText.substring(0, currentIndex);
          // Check whether typing is complete
          if (currentIndex === fullText.length) {
            const endTime = Date.now();
            const duration = Math.round((endTime - this.data.startTime) / 1000);
            const i18n = getApp()?.globalData?.i18n;
            this.setData({
              currentText,
              content: {
                text: currentText,
                title: i18n
                  ? i18n.t('pages.chatThinking.completedTitle', { seconds: duration })
                  : `Thinking complete (${duration}s)`,

              },
              isTyping: false,
              status: 'complete',
            });
            return;
          }
          const i18n = getApp()?.globalData?.i18n;
          this.setData({
            currentText,
            content: {
              text: currentText,
              title: i18n ? i18n.t('pages.chatThinking.typingTitle') : 'Thinking',
            },
            isTyping: currentIndex < fullText.length,
          });
          if (currentIndex < fullText.length) {
            this.typingTimer = setTimeout(typeNextChar, typeSpeed);
          }
          currentIndex += 1;
        }
      };
      typeNextChar();
    },
    replayTyping() {
      if (this.typingTimer) {
        clearTimeout(this.typingTimer);
      }
      const i18n = getApp()?.globalData?.i18n;
      this.setData({
        currentText: '',
        content: {
          text: '',
          title: i18n ? i18n.t('pages.chatThinking.typingTitle') : 'Thinking',
        },
        isTyping: true,
        startTime: Date.now(),
      });
      this.startTyping();
    },
    onStop() {
      console.log('stop thinking');
      this.setData({
        thinking: false,
      });
      const i18n = getApp()?.globalData?.i18n;
      wx.showToast({
        title: i18n ? i18n.t('pages.chatThinking.toastStopped') : 'Stopped',
        icon: 'success',
      });
    },
    toggleThinking() {
      this.setData({
        thinking: !this.data.thinking,
      });
    },
    resetThinking() {
      this.setData({
        thinking: true,
      });
      const i18n = getApp()?.globalData?.i18n;
      wx.showToast({
        title: i18n ? i18n.t('common.toast.resetSuccess') : 'Reset',
        icon: 'success',
      });
    },
  },
});
