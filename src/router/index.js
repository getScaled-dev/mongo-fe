import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',

    component: () => import(/* webpackChunkName: "about" */ '../views/public/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',

    component: () => import(/* webpackChunkName: "about" */ '../views/public/ForgotPassword.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    name: 'LinkedIn Data',

    component: () => import(/* webpackChunkName: "about" */ '../views/UsersTable.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/consumer-data',
    name: 'Consumer Data',

    component: () => import(/* webpackChunkName: "about" */ '../views/ConsumerData.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/linkedin2',
    name: 'LinkedIn Data 2',

    component: () => import(/* webpackChunkName: "about" */ '../views/LinkedinData2.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/mautic',
    name: 'Mautic',

    component: () => import(/* webpackChunkName: "about" */ '../views/mautic/Mautic.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/ai-campaign',
    name: 'AI-Campaign',

    component: () => import(/* webpackChunkName: "about" */ '../views/gpt/Chat.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/instances',
    name: 'Instances',

    component: () => import(/* webpackChunkName: "about" */ '../views/instances/ListInstances.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/customers',
    name: 'Customers',

    component: () => import(/* webpackChunkName: "about" */ '../views/customers/ListCustomers.vue'),
    meta: { requiresAuth: true },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  let auth = localStorage.getItem("token");

  console.log("my user", auth);

  // Not logged into a guarded route?
  if (to.meta.requiresAuth === true && auth == null) {
    console.log("requires auth, redirect to login");

    next({ name: "login" });
  }

  // Logged in for an auth route
  else if (
    (to.name == "login" || to.name == "register") &&
    auth != null
  ) {
    console.log("login or register, has a user so send home");
    next({ name: "Dashboard" });
  }

  // Carry On...
  else next();
});

export default router
