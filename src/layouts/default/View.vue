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
	name: "DefaultView",

	components: { Snackbar },

	computed: {
		snackbar: get("app/snackbar"),
	},

	methods: {
		cleanSnackbar(event) {
			if (!event) {
				this.snackbar.open = false;
			}
		},
	},
};
</script>
