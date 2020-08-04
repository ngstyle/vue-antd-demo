import Vue from "vue";
import Router from "vue-router";
import CreateOrder from './components/CreateOrder.vue';
import Building from './components/Building.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: 'create-order',
      name: "home",
    },
    {
      path: "/create-order",
      name: "create-order",
      component: CreateOrder
    },
    {
      path: "/building",
      name: "building",
      component: Building
    }
  ]
});