import Vue from 'vue'
import ZH_CN from './zh_cn';
import ElementUI from 'element-ui'
import en_lang from 'element-ui/lib/locale/lang/en'
import zh_lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

/* eslint-disable no-new */
let la = 'ZH_CN';


((lang) => {
  la = lang;
  initI18nDirective(lang)
  if (lang === 'EN') {
    Vue.use(ElementUI, {
      locale: en_lang,
      size: 'small'
    });
  } else {
    Vue.use(ElementUI, {
      locale: zh_lang,
      size: 'small'
    });
  }
})(sessionStorage.getItem('locale'))

export default () => {
  if (la === 'EN') return EN;
  else return ZH_CN;
};

function initI18nDirective(lang) {
  Vue.directive('i18n', {
    bind(el, binding) {
      if (lang === 'EN') {
        el.textContent = EN[binding.value];
      } else {
        el.textContent = ZH_CN[binding.value];
      }
    }
  });
}