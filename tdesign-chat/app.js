import gulpError from './utils/gulpError';
import i18n from './utils/i18n';
import messages from './i18n/index';

App({
    globalData: {
        locale: 'en-US',
        i18n: null,
    },
    
    onLaunch() {
        // Initialize i18n
        this.initI18n();
    },
    
    onShow() {
        if (gulpError !== 'gulpErrorPlaceHolder') {
            wx.redirectTo({
                url: `/pages/gulp-error/index?gulpError=${gulpError}`,
            });
        }
    },
    
    initI18n() {
        // Load all language packs
        Object.keys(messages).forEach(locale => {
            i18n.loadMessages(locale, messages[locale]);
        });
        
        // Initialize from storage
        i18n.init();
        
        // Update global data
        this.globalData.locale = i18n.getLocale();
        this.globalData.i18n = i18n;
        
        console.log('[App] i18n initialized, current locale:', i18n.getLocale());
    },
    
    switchLanguage(locale) {
        i18n.setLocale(locale);
        this.globalData.locale = locale;
        
        // Trigger a global refresh by relaunching to home
        wx.reLaunch({
            url: '/pages/home/home'
        });
    },
});

//# sourceMappingURL=app.js.map
