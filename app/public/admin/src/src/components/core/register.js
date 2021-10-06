import Vue from 'vue'

import d2Container from '@/components/core/d2-container'
import d2MultiplePageControl from '@/components/core/d2-multiple-page-control'
import DialogCommentsManage from '@/components/core/dialog-comments-manage/dialog-comments-manage'
import BasePagination from '@/components/core/base-pagination'

Vue.component('d2-container', d2Container)
Vue.component('d2-multiple-page-control', d2MultiplePageControl)
Vue.component('dialog-comments-manage', DialogCommentsManage)
Vue.component('base-pagination', BasePagination)

Vue.component('d2-icon', () => import('@/components/core/d2-icon'))
Vue.component('d2-theme-list', () => import('@/components/core/d2-theme-list'))
Vue.component('d2-page-cover', () => import('@/components/core/d2-page-cover'))
