import Vue from "vue";
import router from "./router";
import Antd from "ant-design-vue";
import App from "./App";
import * as VueGoogleMaps from "vue2-google-maps-withscopedautocomp";
import "ant-design-vue/dist/antd.css";
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAf0aX6Jgz6HbqvFIhI9BejpKdx3tVhjTk",
    libraries: "places",
  },
  installComponents: true,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
