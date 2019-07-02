import Vue from 'vue'
import Router from 'vue-router'
import {
  getUser
} from '../untils/auth'

Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/',
    component: () => import('@/views/layout'),
    children: [{
      name: 'home',
      path: '',
      component: () => import('@/views/Home/home.vue')
    },
    {
      name: 'publish',
      path: '/publish',
      component: () => import('@/views/publish/publish.vue')
    }, {
      name: 'publish-edit',
      path: '/publish/:id',
      component: () => import('@/views/publish/publish.vue')
    },
    {
      name: 'account',
      path: '/account/',
      component: () => import('@/views/account/')
    },
    {
      name: 'article',
      path: '/article',
      component: () => import('@/views/article')
    },
    {
      name: 'comment',
      path: '/comment',
      component: () => import('@/views/comment')
    }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login/login.vue')
  }
  ]
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // const userInfo = window.localStorage.getItem('user_info')
  const userInfo = getUser()

  if (to.path !== '/login') {
    if (!userInfo) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    // 这就是去往登录页
    if (!userInfo) {
      next()
    } else {
      window.location.href = '/#/'
      window.location.reload()
    }
  }
})
router.afterEach((to, from) => {

})

export default router
