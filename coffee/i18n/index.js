const en = require('./js/en.js');
// const zh = require('./js/zh.js');
const id = require('./js/id.js');
const fr = require('./js/fr.js');
const zh = en;
const langs = {
  en,
  'en-US': en,
  'zh-Hans': zh,
  'zh-Hant': zh,
  'zh-CN': zh,
  'zh_CN': zh,
  zh: zh,
  fr: fr,
  id,
}

const extractPlaceholders = (str) => {
  const regex = /{{\s*([^}]+)\s*}}/g;
  let match;
  const result = [];

  while ((match = regex.exec(str)) !== null) {
    result.push([match[0], match[1]])
  }

  return result;
};

function t(str, options) {
  const lang = langs[getApp()?.globalData?.lang || options?.appLang];
  const placeholders = extractPlaceholders(str);
  let langStr = lang[str];
  if (options) {
    placeholders.forEach(([v, k]) => {
      langStr = langStr.replace(v, options[k]);
    })
  }
  return langStr ?? str;
}

module.exports = { t }