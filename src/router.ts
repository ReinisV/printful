import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import(/* webpackChunkName: "quiz" */ './views/Quiz.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import(/* webpackChunkName: "result" */ './views/Result.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(from.name === null && to.name !== 'home'){
    next({name: 'home'});
  }else{
    next();
  }
})

export default router;