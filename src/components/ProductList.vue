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
		<v-row v-else>
			<v-col
				v-for="product in products"
				:key="product.id"
				cols="12"
				xl="2"
				lg="3"
				md="4"
				sm="6"
				xs="12"
			>
				<product-card :product="product" :show-buttons="my" />
			</v-col>
		</v-row>
	</v-row>
</template>

<script>
import ProductCard from "@/components/ProductCard";
import { EventBus, PRODUCT_ADDED, PRODUCT_EDITED, PRODUCT_REMOVED } from "@/utils/event-bus";
import axios from "axios";

export default {
	name: "ProductList",
	components: { ProductCard },
	props: {
		my: Boolean,
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
			if (this.my) {
				url = `me/products`;
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
						message: e.response?.message || "Something went wrong",
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

<style scoped></style>
