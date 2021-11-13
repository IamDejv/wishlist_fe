import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import VueI18n from "vue-i18n";
import cs from "@/locales/cs";
import en from "@/locales/en";

Vue.use(Vuetify);
Vue.use(VueI18n);

function getLanguage() {
	const language = localStorage.getItem("language");
	let parsedLanguage = JSON.parse(language);

	if (!parsedLanguage) {
		let browserLanguage;
		switch (navigator.language) {
			case "cs-CZ":
			case "sk-SK":
			case "cs":
			case "sk":
				browserLanguage = "cs";
				break;
			case "en-US":
			default:
				browserLanguage = "en";
				break;
		}
		console.log(browserLanguage);
		localStorage.setItem("language", JSON.stringify(browserLanguage));
		parsedLanguage = "cs";
	}
	return parsedLanguage;
}

// Create VueI18n instance with options
const i18n = new VueI18n({
	locale: getLanguage() || "cs", // set locale
	messages: {
		en,
		cs,
	}, // set locale messages
});

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
	lang: {
		t: (key, ...params) => i18n.t(key, params),
	},
});
