import Vue from 'vue'
import Router from 'vue-router'
import formDesigner from '@/components/formDesigner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'formDesigner',
      component: formDesigner
    }
  ]
})
