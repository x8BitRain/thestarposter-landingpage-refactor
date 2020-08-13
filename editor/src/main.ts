import Vue from "vue";
import Editor from "./components/Editor.vue";
import VueI18n from "vue-i18n";
import { init } from "./i18n";
import router from "./router";
import "./assets/css/global.scss";
import "./assets/css/inputs.scss";
import { initSentry } from './util/initSentry';

Vue.config.productionTip = false;

initSentry('https://eeabcb6659f3422ba316f2501aec8be9@o176033.ingest.sentry.io/5375400')

Vue.use(VueI18n);

new Vue({
  router,
  render: h => h(Editor),
  i18n: init()
}).$mount("#app");
