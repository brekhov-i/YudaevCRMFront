import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["Auth/isAuth"]; // Проверка аутентификации пользователя
  if (to.matched.some((route) => route.meta.requiresAuth) && !isAuthenticated) {
    next("/login"); // Перенаправляем на страницу входа, если пользователь не аутентифицирован
  } else {
    next();
    console.log(router)
  }
});

export default router
