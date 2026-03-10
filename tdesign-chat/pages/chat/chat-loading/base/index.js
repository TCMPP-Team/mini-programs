Component({
  data: {
    currentAnimation: 'skeleton',
    loadingText: '',
    animations: [
      { key: 'moving', text: '' },
      { key: 'gradient', text: '' },
      { key: 'circle', text: '' },
      { key: 'skeleton', text: '' },
    ],
    i18n: {},
  },

  methods: {
    updateI18n() {
      const i18n = getApp()?.globalData?.i18n;
      if (!i18n) return;

      this.setData({
        i18n: i18n.getMessages(),
        animations: [
          { key: 'moving', text: i18n.t('demos.chatLoading.types.moving') },
          { key: 'gradient', text: i18n.t('demos.chatLoading.types.gradient') },
          { key: 'circle', text: i18n.t('demos.chatLoading.types.circle') },
          { key: 'skeleton', text: '' },
        ],
      });
    },

    startAnimationCycle() {
      let index = 0;
      this.animationTimer = setInterval(() => {
        const animation = this.data.animations[index];
        this.setData({
          currentAnimation: animation.key,
          loadingText: animation.text,
        });

        index = (index + 1) % this.data.animations.length;
      }, 2000);
    },

    switchAnimation(e) {
      const { animation } = e.currentTarget.dataset;
      const animationData = this.data.animations.find((item) => item.key === animation);

      if (animationData) {
        this.setData({
          currentAnimation: animationData.key,
          loadingText: animationData.text,
        });
      }
    },
  },

  lifetimes: {
    attached() {
      this.updateI18n();
      this.startAnimationCycle();
    },

    detached() {
      if (this.animationTimer) {
        clearInterval(this.animationTimer);
      }
    },
  },
});
