<template>
	<v-main>
		<v-container fluid>
			<router-view :key="$route.path" />
			<snackbar :value="snackbar.open" :type="snackbar.type" @input="cleanSnackbar">
				{{ snackbar.message }}
			</snackbar>
		</v-container>
	</v-main>
</template>

<script>
import { get } from "vuex-pathify";
import Snackbar from "@/components/Snackbar";

export default {
	name: "LoginView",

	components: { Snackbar },

	computed: {
		snackbar: get("app/snackbar"),
	},

	methods: {
		cleanSnackbar() {
			setTimeout(() => {
				this.snackbar.open = false;
			}, 5000);
		},
	},
};
</script>
