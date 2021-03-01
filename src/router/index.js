import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/table1",
    name: "Table1",
    component: () => import("../views/table1.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/table1/table/:id",
    name: "Table2",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/table2.vue"),
  },
  {
    path: "/total",
    name: "Total",
    component: () => import("../views/total.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  // console.log(to.path, JSON.parse(localStorage.getItem("adminName")) === "123123")
  if (to.path === "/login") {
    next();
  } else {
    if (
      to.path.indexOf("/table1") != -1 &&
      JSON.parse(localStorage.getItem("adminName")) ===
        store.state.adminName &&
      JSON.parse(localStorage.getItem("adminPwd")) ===
        store.state.adminPwd
    ) {
      next();
    } else if (
      to.path.indexOf("/total") != -1 &&
      JSON.parse(localStorage.getItem("clientName")) ===
        store.state.clientName &&
      JSON.parse(localStorage.getItem("clientPwd")) ===
        store.state.clientPwd
    ) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
