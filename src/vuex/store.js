import Vue from 'vue'
import Vuex from 'vuex'

const proxyedHostNames = [
  'localhost',
  '127.0.0.1',
  '10.17.225.136'
]

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {
    isLocal: () => proxyedHostNames.includes(window.location.hostname),
    appContextPath: () => proxyedHostNames.includes(window.location.hostname) ? `${window.location.origin}/dev_api/` : (window.location.origin + '/')
  }
})