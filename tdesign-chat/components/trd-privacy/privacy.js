// components/privacy/privacy.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '',
      observer() {
        this.updateI18n();
      },
    },
    date: {
      type: String,
      value: '',
      observer() {
        this.updateI18n();
      },
    },
    winStyle: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    win: false,
    privacy: false,
    i18nPrivacy: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateI18n() {
      const app = getApp();
      const i18n = app?.globalData?.i18n;
      if (!i18n) return;

      const { name, date } = this.properties;
      this.setData({
        i18nPrivacy: {
          serviceTitle: i18n.t('components.privacy.serviceTitle', { name }),
          publishDate: i18n.t('components.privacy.publishDate', { date }),
          effectiveDate: i18n.t('components.privacy.effectiveDate', { date }),
          preface: i18n.t('components.privacy.preface'),
          intro: i18n.t('components.privacy.intro', { name }),
          declaration: i18n.t('components.privacy.declaration'),
          contact: i18n.t('components.privacy.contact'),
          acknowledge: i18n.t('components.privacy.acknowledge'),
          linkText: i18n.t('components.privacy.linkText', { name }),
          tips1Prefix: i18n.t('components.privacy.tips1Prefix'),
          tips1Suffix: i18n.t('components.privacy.tips1Suffix'),
          tips2Prefix: i18n.t('components.privacy.tips2Prefix'),
          tips2Suffix: i18n.t('components.privacy.tips2Suffix'),
        },
      });
    },
    showPrivacyDetail() {
      this.setData({
        win: false,
        privacy: true,
      });
    },
    privacyConfirm() {
      this.setData({
        privacy: false,
        win: false,
      });
      wx.setStorageSync('TIMIShowPrivacy', true);
    },
    showPrivacyWin() {
      this.setData({
        win: true,
      });
    },
  },
  ready() {
    this.updateI18n();
    const TIMIShowPrivacy = wx.getStorageSync('TIMIShowPrivacy');
    if (!TIMIShowPrivacy) {
      this.setData({
        win: true,
      });
    }
  },
});
