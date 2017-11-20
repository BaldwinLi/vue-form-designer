import Vue from 'vue'
import axios from 'axios'
import Lang from './i18n/init'

const i18n = Lang();
Vue.http = Vue.prototype.$http = axios;

export const loginInit = (user) => {
  Vue.prototype.$http.interceptors.request.use(
    config => {
      config.headers.common['X-Emp-No'] = '6404000055';
      return config;
    },
    err => Promise.reject(err)
  );
  Vue.prototype.$http.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        Vue.prototype.$alert(error.response.body, i18n["system_error"])
      }
      return Promise.reject(error.response.data) // 返回接口返回的错误信息
    }
  );
}

const userInfo = JSON.parse(sessionStorage.getItem('user')) || {};
userInfo && loginInit(userInfo);