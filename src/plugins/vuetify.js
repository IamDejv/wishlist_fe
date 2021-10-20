import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

function isDark() {
	const darkMode = localStorage.getItem("dark-mode");
	return JSON.parse(darkMode);
}

export default new Vuetify({
	icons: {
		iconfont: "mdi",
	},
	theme: {
		dark: isDark(),
	},
});
