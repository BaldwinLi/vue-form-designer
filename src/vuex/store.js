import Vuex from 'vuex';

const proxyedHostNames = [
  'localhost',
  '127.0.0.1',
  '10.17.225.136'
];

export default (Vue) => {
  window.Vue = Vue;
  window.Vue.use(Vuex);
  return new Vuex.Store({
    state: {},
    mutations: {},
    getters: {
      isLocal: () => proxyedHostNames.includes(window.location.hostname),
      appContextPath: () => proxyedHostNames.includes(window.location.hostname) ? `${window.location.origin}/dev_api/` : (window.location.origin + '/')
    }
  })
};