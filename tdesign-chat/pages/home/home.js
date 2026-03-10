import themeChangeBehavior from 'tdesign-miniprogram/mixins/theme-change';
import { list, skylineList } from './data/index';

const app = getApp();

Page({
    behaviors: [themeChangeBehavior],
    data: {
        list: [],
        currentYear: new Date().getFullYear(),
        isSkyline: false,
        currentLocale: 'en-US',
        // i18n texts
        i18nNavTitle: '',
        i18nDesc: '',
        i18nServiceLink: '',
        i18nFooterNotice: '',
        i18nFooterCopyright: '',
        i18nServiceName: '',
        i18nServiceDate: '',
    },
    onLoad(options) {
        const { q, skyline } = options;
        let compList = [];
        this.skyline = skyline;
        if (this.skyline) {
            compList = skylineList;
        }
        else {
            compList = list;
        }
        this.setData({
            list: compList,
            isSkyline: !!skyline,
        });
        // Navigate to a specific component demo page via query params
        if (q) {
            const str = this.getQueryByUrl(decodeURIComponent(q));
            wx.navigateTo({
                url: `/pages/${str.page}/${str.page}`,
            });
        }
        this.trdPrivacy = this.selectComponent('#trdPrivacy');
        
        // Update i18n texts
        this.updateI18n();
    },
    
    onShow() {
        // Refresh i18n when returning to page (after language switch)
        this.updateI18n();
    },
    
    updateI18n() {
        const { i18n } = app.globalData;
        if (!i18n) return;

        const navTitle = i18n.t('pages.home.navTitle');
        wx.setNavigationBarTitle({
            title: navTitle,
        });

        this.setData({
            currentLocale: i18n.getLocale(),
            i18nNavTitle: navTitle,
            i18nDesc: i18n.t('pages.home.description'),
            i18nServiceLink: `《${i18n.t('components.footer.serviceName')}${i18n.t('components.privacy.title')}》`,
            i18nFooterNotice: i18n.t('components.footer.notice'),
            i18nFooterCopyright: i18n.t('components.footer.copyright', { year: this.data.currentYear }),
            i18nServiceName: i18n.t('components.footer.serviceName'),
            i18nServiceDate: '2023-11-14',
        });
    },
    
    switchLanguage() {
        const newLocale = this.data.currentLocale === 'zh-CN' ? 'en-US' : 'zh-CN';
        app.switchLanguage(newLocale);
    },
    
    showPrivacyWin() {
        this.trdPrivacy.showPrivacyWin();
    },
    clickHandle(e) {
        // Safety check: ensure e.detail exists
        if (!e.detail) {
            console.error('clickHandle: e.detail is undefined', e);
            return;
        }
        // Get item from e.detail
        const { item } = e.detail;
        if (!item) {
            console.error('clickHandle: item is undefined', e.detail);
            return;
        }
        let { name, path = '' } = item;
        // Ensure name exists
        if (!name) {
            console.error('clickHandle: name is undefined', e.detail.item);
            return;
        }
        if (!path) {
            name = name.replace(/^[A-Z]/, (match) => `${match}`.toLocaleLowerCase());
            name = name.replace(/[A-Z]/g, (match) => {
                return `-${match.toLowerCase()}`;
            });
            // Check if it's a chat-related page
            const chatPages = ['chat-list', 'chat-message', 'chat-sender', 'chat-markdown', 'chat-content', 'chat-thinking', 'attachments', 'chat-actionbar', 'chat-loading'];
            if (chatPages.includes(name)) {
                path = `/pages/chat/${name}/${name}`;
            } else {
                path = `/pages/${name}/${name}`;
            }
        }
        wx.navigateTo({
            url: path,
            fail: () => {
                wx.navigateTo({
                    url: '/pages/home/navigateFail/navigateFail',
                });
            },
        });
    },
    onShareAppMessage() {
        const i18n = app?.globalData?.i18n;
        return {
            title: i18n ? i18n.t('pages.home.shareTitle') : 'TDesign UI',
            path: '/pages/home/home',
        };
    },
    getQueryByUrl(url) {
        const data = {};
        const queryArr = `${url}`.match(/([^=&#?]+)=[^&#]+/g) || [];
        // Must be a valid string
        if (queryArr.length) {
            queryArr.forEach((para) => {
                const d = para.split('=');
                const val = decodeURIComponent(d[1]);
                if (data[d[0]] !== undefined) {
                    data[d[0]] += `,${val}`;
                }
                else {
                    data[d[0]] = val;
                }
            });
        }
        return data;
    },
});

// # sourceMappingURL=home.js.map
