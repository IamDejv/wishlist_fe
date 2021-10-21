<template>
	<v-fade-transition mode="out-in">
		<router-view />
	</v-fade-transition>
</template>

<script>
import "@/styles/overrides.sass";
import { sync } from "vuex-pathify";
import auth from "@/mixins/auth";

export default {
	name: "App",

	mixins: [auth],

	metaInfo: {
		title: "App",
		titleTemplate: "Wishlist",
		htmlAttrs: { lang: "en" },
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
		],
	},

	computed: {
		...sync("user", ["firstname", "lastname", "image"]),
	},

	created() {
		const providerData = this.getLoggedUser()?.providerData;
		if (providerData) {
			const displayName = providerData[0]?.displayName;

			const nameParts = displayName.split(" ");

			this.firstname = nameParts[0];
			this.lastname = nameParts[1];
			this.image = providerData[0].photoURL;
		}
	},
};
</script>
