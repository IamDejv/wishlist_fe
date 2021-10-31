<template>
	<v-card class="mx-auto" max-width="344">
		<v-img :src="wishlist.image" height="200px"></v-img>

		<v-card-title class="text-h3"> {{ wishlist.name }} </v-card-title>

		<v-card-actions>
			<router-link :to="`wishlists/${wishlist.id}`" style="text-decoration: none">
				<v-btn color="orange lighten-2" text> Detail </v-btn>
			</router-link>

			<v-spacer></v-spacer>
			<v-btn :color="iconColour" icon @click="setActive()">
				<v-icon>{{ icon }}</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import axios from "axios";
import { EventBus, WISHLIST_SET_ACTIVE } from "@/utils/event-bus";
import { sync } from "vuex-pathify";

export default {
	name: "WishlistCard",
	props: {
		wishlist: Object,
	},
	computed: {
		icon() {
			return this.wishlist.active ? "mdi-check-circle" : "mdi-check-circle-outline";
		},
		iconColour() {
			return this.wishlist.active ? "green lighten2" : "default";
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
			const url = `me/wishlists/active`;
			const body = {
				id: this.wishlist.id,
				action: !this.wishlist.active ? "setActive" : "setInactive",
			};

			axios
				.put(url, body)
				.then((response) => {
					this.snackbar = {
						open: true,
						message: "Changed active wishlist",
						type: "success",
					};
					EventBus.$emit(WISHLIST_SET_ACTIVE, response.data);
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
