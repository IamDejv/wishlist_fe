<template>
	<v-card class="mx-auto" max-width="344">
		<v-img :src="group.image | imagePath" height="200px"></v-img>

		<v-card-title class="text-h3"> {{ group.name }} </v-card-title>

		<v-card-actions>
			<router-link :to="`groups/${group.id}`" style="text-decoration: none">
				<v-btn color="orange lighten-2" text> Detail </v-btn>
			</router-link>
			<v-spacer></v-spacer>
			<v-btn :color="iconColour" icon @click="setActive">
				<v-icon>{{ icon }}</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import axios from "axios";
import { EventBus, GROUP_SET_ACTIVE } from "@/utils/event-bus";
import { sync } from "vuex-pathify";
import CONST from "@/consts";

export default {
	name: "GroupCard",
	props: {
		group: Object,
	},
	filters: {
		imagePath(path) {
			return `${CONST.API_HOST}/${path}`;
		},
	},
	computed: {
		icon() {
			return this.group.active ? "mdi-check-circle" : "mdi-check-circle-outline";
		},
		iconColour() {
			return this.group.active ? "green lighten2" : "default";
		},
		snackbar: sync("app/snackbar"),
	},
	data() {
		return {
			show: false,
		};
	},
	methods: {
		setActive() {
			const url = `me/groups/active`;
			const body = {
				id: this.group.id,
				action: !this.group.active ? "setActive" : "setInactive",
			};

			axios
				.put(url, body)
				.then((response) => {
					this.snackbar = {
						open: true,
						message: "Change active group",
						type: "success",
					};
					EventBus.$emit(GROUP_SET_ACTIVE, response.data);
				})
				.catch((e) => {
					if (e.response) {
						this.snackbar = {
							open: true,
							message: e.response?.message || "Something went wrong",
							type: "error",
						};
					}
				});
		},
	},
};
</script>

<style scoped></style>
