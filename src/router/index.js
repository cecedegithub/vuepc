import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/Login/login.vue'
import Home from '../views/Home/home.vue'
import article from '../components/article.vue'
import publish from '../components/publish.vue'
import comment from '../components/comment.vue'
import image from '../components/image.vue'
import account from '../components/accout.vue'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/article',
    component: article
  }, {
    path: '/publish',
    component: publish
  }, {
    path: '/publish/:articleId',
    component: Home
  }, {
    path: '/comment',
    component: comment
  }, {
    path: '/image',
    component: image
  },
  // }, {
  //   path: '/fans',
  //   component: fans
  // }, {
  //   path: '/fans/overview',
  //   component: overview
  // }, {
  //   path: '/fans/portrayal',
  //   component: portrayal
  // }, {
  //   component: list
  // }
  {
    path: '/account',
    component: account
  }
  ]
})
