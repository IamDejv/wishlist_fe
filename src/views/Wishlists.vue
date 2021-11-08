<template>
	<v-container fluid>
		<v-row>
			<v-row v-if="loading">
				<v-col
					v-for="skeleton in skeletons"
					:key="skeleton"
					cols="12"
					xl="3"
					lg="4"
					md="6"
					sm="6"
					xs="12"
				>
					<v-sheet class="mx-auto" height="325" width="350" style="border-radius: 8px">
						<v-skeleton-loader type="image, card-heading"></v-skeleton-loader>
						<v-spacer></v-spacer>
						<v-skeleton-loader class="pl-3 pt-5" type="button"></v-skeleton-loader>
					</v-sheet>
				</v-col>
			</v-row>
			<v-row v-else-if="wishlists.length">
				<v-col
					v-for="wishlist in wishlists"
					:key="wishlist.id"
					cols="12"
					xl="3"
					lg="4"
					md="6"
					sm="6"
					xs="12"
				>
					<wishlist-card :wishlist="wishlist" />
				</v-col>
			</v-row>
			<v-row v-else>
				<div class="center">
					<div
						class="
							font-weight-bold
							text--transparent text--lighten-2
							grey--text
							text-h1
						"
					>
						{{ t("empty") }}
					</div>
				</div>
			</v-row>
		</v-row>
	</v-container>
</template>

<script>
import axios from "axios";
import { sync } from "vuex-pathify";
import { EventBus, WISHLIST_CREATED, WISHLIST_SET_ACTIVE } from "@/utils/event-bus";
import WishlistCard from "@/components/WishlistCard";
import locale from "@/mixins/locale";

export default {
	name: "Wishlists",
	components: { WishlistCard },
	mixins: [locale],
	data() {
		return {
			wishlists: [],
			skeletons: 0,
			loading: true,
		};
	},
	created() {
		this.setSkeletons();
		EventBus.$on(WISHLIST_CREATED, (wishlist) => this.wishlists.push(wishlist));
		EventBus.$on(WISHLIST_SET_ACTIVE, (wishlist) => this.onChangeWishlistActive(wishlist));
		this.fetchData();
	},
	computed: {
		snackbar: sync("app/snackbar"),
	},
	methods: {
		setSkeletons() {
			switch (this.$vuetify.breakpoint.name) {
				case "xs":
					this.skeletons = 1;
					break;
				case "sm":
					this.skeletons = 2;
					break;
				case "md":
					this.skeletons = 2;
					break;
				case "lg":
					this.skeletons = 3;
					break;
				case "xl":
					this.skeletons = 4;
					break;
			}
		},
		fetchData() {
			axios
				.get("me/wishlists")
				.then((response) => {
					this.wishlists = response.data;
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: e.response?.message || "Something went wrong",
						type: "error",
					};
				})
				.finally(() => (this.loading = false));
		},
		onChangeWishlistActive(wishlist) {
			this.wishlists = this.wishlists.map((item) => {
				if (item.id === wishlist.id) {
					item.active = wishlist.active;
				} else {
					item.active = false;
				}
				return item;
			});
		},
	},
};
</script>

<style scoped>
.center {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
