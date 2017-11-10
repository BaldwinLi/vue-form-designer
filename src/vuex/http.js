import axios from 'axios';
import {
  Lang
} from '@/libs/i18n/initI18n';

const i18n = Lang();

window.Vue.http = window.Vue.prototype.$http = axios;
export default (user) => {
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