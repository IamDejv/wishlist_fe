<template>
	<v-row>
		<v-row v-if="loading">
			<v-col
				v-for="skeleton in skeletons"
				:key="skeleton"
				cols="12"
				xl="2"
				lg="3"
				md="4"
				sm="6"
				xs="12"
			>
				<v-sheet height="250" width="250" style="border-radius: 8px">
					<v-skeleton-loader type="image"></v-skeleton-loader>
				</v-sheet>
			</v-col>
		</v-row>
		<v-row v-else-if="products.length">
			<v-col
				v-for="product in products"
				:key="product.id"
				cols="12"
				xl="2"
				lg="3"
				md="4"
				sm="6"
				xs="6"
			>
				<product-card :product="product" :show-buttons="my" />
			</v-col>
		</v-row>
		<v-row v-else>
			<div class="center">
				<div class="font-weight-bold text--transparent grey--text text--lighten-2 text-h1">
					{{ t("empty") }}
				</div>
			</div>
		</v-row>
	</v-row>
</template>

<script>
import ProductCard from "@/components/ProductCard";
import { EventBus, PRODUCT_ADDED, PRODUCT_EDITED, PRODUCT_REMOVED } from "@/utils/event-bus";
import axios from "axios";
import locale from "@/mixins/locale";

export default {
	name: "ProductList",
	components: { ProductCard },
	mixins: [locale],
	props: {
		my: Boolean,
		wishlistId: String,
	},
	data() {
		return {
			products: [],
			skeletons: 0,
			loading: true,
		};
	},
	created() {
		EventBus.$on(PRODUCT_REMOVED, (product) => this.removeProduct(product));
		EventBus.$on(PRODUCT_ADDED, (product) => this.products.push(product));
		EventBus.$on(PRODUCT_EDITED, (product) => this.editProduct(product));
		this.setSkeletons();
		this.fetchData();
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
					this.skeletons = 3;
					break;
				case "lg":
					this.skeletons = 4;
					break;
				case "xl":
					this.skeletons = 6;
					break;
			}
		},
		fetchData() {
			let url;
			if (this.my && !this.wishlistId) {
				url = `me/products`;
			} else if (this.wishlistId) {
				url = `wishlists/${this.wishlistId}/products`;
			} else {
				url = `users/${this.$route.params.userId}/products`;
			}

			axios
				.get(url)
				.then((response) => {
					this.products = response.data;
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: e.response?.message || this.t("error.default"),
						type: "error",
					};
				})
				.finally(() => (this.loading = false));
		},
		removeProduct(product) {
			this.products = this.products.filter((item) => item.id !== product.id);
		},
		editProduct(product) {
			this.products = this.products.map((item) => {
				if (item.id === product.id) {
					return product;
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
