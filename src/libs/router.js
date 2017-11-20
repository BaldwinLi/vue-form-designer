

import Vue from 'vue'
import Router from 'vue-router'
import FormDesigner from '@/form.designer/form.designer'

Vue.use(Router);

export default new Router({
    routes: [
      {
        path: '/',
        name: 'formDesigner',
        component: FormDesigner
      }
    ]
  })