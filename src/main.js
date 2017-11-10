import '@/assets/css/bootstrap-combined.min.css'
import '@/assets/css/layoutit.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import $ from 'jquery'
import _ from 'lodash'
import 'bootstrap/dist/js/bootstrap'
import '@/libs/jquery-ui-1.11.4.custom/jquery-ui.min'
import '@/libs/jquery.ui.touch-punch.min.js'
import '@/libs/jquery.htmlClean.js'
import '@/libs/ckeditor/ckeditor.js'
import '@/libs/ckeditor/config.js'
import '@/libs/i18n/init'
import router from '@/libs/router'
import store from '@/vuex/store'
import '@/libs/http'
import App from '@/App'

Vue.config.productionTip = false

Vue.config.warnHandler = (msg, vm, trace) => {
  if(msg==='Injection "elForm" not found' && 
     msg==='Injection "elFormItem" not found' && 
     msg==='Invalid prop: type check failed for prop "hideAfter". Expected Number, got String.') 
    console.error(("[Vue warn]: " + msg + trace))
}

window.Vue = Vue

new window.Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})
