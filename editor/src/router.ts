import Vue from "vue";
import VueRouter from "vue-router";

import DatePicker from "./components/inputs/DatePicker.vue";
import Location from "./components/inputs/Location.vue";

Vue.use(VueRouter);
const routes = [
  { path: "/" },
  {
    path: "/dedication",
    component: Location,
    name: "dedication"
  },
  { path: "/layout", component: DatePicker, name: "layout" },
  {
    path: "/products",
    component: DatePicker,
    name: "products"
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

const hasQueryParams = route => {
  return !!Object.keys(route.query).length;
};

router.beforeEach((to, from, next) => {
  if (!hasQueryParams(to) && hasQueryParams(from)) {
    // Typecheck this better maybe.
    const toWithQuery: any = Object.assign({}, to, { query: from.query });
    next(toWithQuery);
  } else {
    next();
  }
});

export default router;
