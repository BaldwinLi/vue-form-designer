import Vue from 'vue'
import $ from 'jquery'
import _ from 'lodash'
window.Vue = Vue
window.$ = window.jQuery = $
window._ = _
import 'bootstrap/dist/js/bootstrap'
import '@/libs/jquery-ui-1.11.4.custom/jquery-ui.min'
import '@/libs/jquery.ui.touch-punch.min.js'
import '@/libs/jquery.htmlClean.js'
import '@/libs/ckeditor/ckeditor.js'
import '@/libs/ckeditor/config.js'
import ZH_CN from './zh_cn';
import ElementUI from 'element-ui'
import en_lang from 'element-ui/lib/locale/lang/en'
import zh_lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'
import App from '@/App'
import router from '@/router'
import store from '@/vuex/store'
import axios from 'axios'

window.Vue.config.productionTip = false

/* eslint-disable no-new */

window.Vue.config.productionTip = false;
let la = 'ZH_CN';

window.Vue.config.warnHandler = (msg, vm, trace) => {
  if(msg==='Injection "elForm" not found' && 
     msg==='Injection "elFormItem" not found' && 
     msg==='Invalid prop: type check failed for prop "hideAfter". Expected Number, got String.') 
    console.error(("[Vue warn]: " + msg + trace));
}

export default (lang) => {
  la = lang;
  initI18nDirective(lang)
  if (lang === 'EN') {
    window.Vue.use(ElementUI, {
      locale: en_lang,
      size: 'small'
    });
  } else {
    window.Vue.use(ElementUI, {
      locale: zh_lang,
      size: 'small'
    });
  }

}

export const Lang = () => {
  if (la === 'EN') return EN;
  else return ZH_CN;
};

function initI18nDirective(lang) {
  window.Vue.directive('i18n', {
    bind(el, binding) {
      if (lang === 'EN') {
        el.textContent = EN[binding.value];
      } else {
        el.textContent = ZH_CN[binding.value];
      }
    }
  });
}

const i18n = Lang();
window.Vue.http = window.Vue.prototype.$http = axios;
export const loginInit = (user) => {
  window.Vue.prototype.$http.interceptors.request.use(
    config => {
      return config;
    },
    err => Promise.reject(err)
  );
  window.Vue.prototype.$http.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        window.Vue.prototype.$alert(error.response.body, i18n["system_error"])
      }
      return Promise.reject(error.response.data) // 返回接口返回的错误信息
    }
  );
}

const userInfo = JSON.parse(sessionStorage.getItem('user'));
userInfo && loginInit(userInfo);

new window.Vue({
  el: '#app',
  render: h => h(App),
  router,
  store: store(window.Vue)
})