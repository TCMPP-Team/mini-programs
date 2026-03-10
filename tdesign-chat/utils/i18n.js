/**
 * i18n Internationalization Utility
 * Provides translation API, language switching, and fallback mechanism
 */

class I18n {
  constructor() {
    this.locale = 'en-US'; // Default language
    this.messages = {}; // Language pack cache
    this.fallbackLocale = 'en-US'; // Fallback language
  }

  /**
   * Load language pack
   * @param {string} locale - Language code (e.g., 'zh-CN', 'en-US')
   * @param {object} messages - Language pack object
   */
  loadMessages(locale, messages) {
    this.messages[locale] = messages;
  }

  /**
   * Get translation text with interpolation support
   * @param {string} key - Translation key (e.g., 'common.button.send')
   * @param {object} params - Parameters for interpolation
   * @returns {string} Translated text
   */
  t(key, params = {}) {
    const keys = key.split('.');
    let value = this.messages[this.locale];
    
    // Navigate through nested object
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    // Fallback to default locale if translation not found
    if (value === undefined && this.locale !== this.fallbackLocale) {
      value = this.messages[this.fallbackLocale];
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
    }

    // Return key if translation not found
    if (value === undefined) {
      console.warn(`[i18n] Translation not found for key: ${key}`);
      return key;
    }

    // Interpolate parameters
    return this.interpolate(value, params);
  }

  /**
   * Interpolate parameters into template string
   * Supports {{param}} syntax
   * @param {string} template - Template string
   * @param {object} params - Parameters object
   * @returns {string} Interpolated string
   */
  interpolate(template, params) {
    if (typeof template !== 'string') return template;
    
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }

  /**
   * Switch current language
   * @param {string} locale - Language code
   */
  setLocale(locale) {
    if (!this.messages[locale]) {
      console.error(`[i18n] Language pack not loaded: ${locale}`);
      return;
    }
    
    this.locale = locale;
    
    // Persist to storage
    try {
      wx.setStorageSync('locale', locale);
    } catch (e) {
      console.error('[i18n] Failed to save locale to storage:', e);
    }
    
    // Update global data
    const app = getApp();
    if (app && app.globalData) {
      app.globalData.locale = locale;
    }
    
    console.log(`[i18n] Language switched to: ${locale}`);
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  getLocale() {
    return this.locale;
  }

  /**
   * Get messages for a locale
   * @param {string} locale - Language code
   * @returns {object} Locale messages
   */
  getMessages(locale = this.locale) {
    return this.messages[locale] || {};
  }

  /**
   * Initialize i18n from storage
   */
  init() {
    try {
      const savedLocale = wx.getStorageSync('locale');
      if (savedLocale && this.messages[savedLocale]) {
        this.locale = savedLocale;
        console.log(`[i18n] Loaded locale from storage: ${savedLocale}`);
      }
    } catch (e) {
      console.warn('[i18n] Failed to load locale from storage:', e);
    }
  }

  /**
   * Get available languages
   * @returns {array} Array of language codes
   */
  getAvailableLocales() {
    return Object.keys(this.messages);
  }
}

// Create singleton instance
const i18n = new I18n();

module.exports = i18n;
