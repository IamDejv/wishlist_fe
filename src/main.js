import Vue from "vue";
import { sync } from "vuex-router-sync";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins";
import { auth } from "@/firebase/firebase";

Vue.config.productionTip = false;

sync(store, router);

let app;
auth.onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			vuetify,
			store,
			render: (h) => h(App),
		}).$mount("#app");
	}
});
