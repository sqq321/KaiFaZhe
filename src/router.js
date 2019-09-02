import Vue from 'vue'
import Router from 'vue-router'
import Landing from './views/Landing.vue'

Vue.use(Router)

const route = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LANDING',
      component: Landing
    },
    {
      path: '/register',
      name: 'register',
      //懒加载
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      //懒加载
      component: () => import('./views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      //懒加载
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/createprofile',
      name: 'createprofile',
      //懒加载
      component: () => import('./views/CreateProfile.vue')
    },
    {
      path: '/edit-profile',
      name: 'edit-profile',
      //懒加载
      component: () => import('./views/EditProfile.vue')
    },
    {
      path: '/add-experience',
      name: 'add-experience',
      //懒加载
      component: () => import('./views/AddExperience.vue')
    },
    {
      path: '/add-education',
      name: 'add-education',
      //懒加载
      component: () => import('./views/AddEducation.vue')
    },
    {
      path: '/profiles',
      name: 'profiles',
      //懒加载
      component: () => import('./views/Profiles.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      //懒加载
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/feed',
      name: 'feed',
      //懒加载
      component: () => import('./views/Posts.vue')
    },
    {
      path: '/*',
      redirect: "/"
    },

  ]
})

//全局路由守卫
route.beforeEach((to, from, next) => {

  //执行 
  // next();
  const isLogin = localStorage.jwtToken ? true : false;

  if (to.path == "/login" || to.path == "/register" || to.path == "/") {
    next();
  } else {
    //判断用户是否处于登录状态   登录之后随便跳 ，否则跳回 /login
    isLogin ? next() : next("/login")
  }

})

export default route;
