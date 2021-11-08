<template>
	<v-sheet class="pa-5 mb-2" rounded>
		<v-row>
			<v-col>
				<div class="font-weight-bold text-h3 text-center">
					{{ user.firstname }} {{ user.lastname }}
				</div>
			</v-col>
		</v-row>
		<v-row v-if="loading">
			<v-col>
				<v-skeleton-loader>
					<v-skeleton-loader tile type="image" />
					<v-skeleton-loader tile height="50" type="image" />
				</v-skeleton-loader>
			</v-col>
		</v-row>
		<v-row v-else-if="products.length">
			<v-col>
				<Splide :options="options" v-if="!loading">
					<SplideSlide v-for="product in products" :key="product.id">
						<product-card :product="product" />
					</SplideSlide>
				</Splide>
			</v-col>
		</v-row>
		<v-row v-else>
			<v-col class="empty-product text-center">
				<div class="font-weight-bold grey--text text--lighten-2 text-h1">
					{{ t("empty") }}
				</div>
			</v-col>
		</v-row>
	</v-sheet>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import locale from "@/mixins/locale";

export default {
	name: "UserWishlist",
	components: { ProductCard, Splide, SplideSlide },
	mixins: [locale],
	props: {
		user: Object,
	},
	data() {
		return {
			model: 0,
			products: [],
			loading: true,
		};
	},
	computed: {
		options() {
			return {
				rewind: true,
				perPage: this.getPerPage(),
			};
		},
	},
	created() {
		this.fetchData();
	},
	methods: {
		getPerPage() {
			let perPage;
			switch (this.$vuetify.breakpoint.name) {
				default:
				case "xs":
					perPage = 1;
					break;
				case "sm":
					perPage = 2;
					break;
				case "md":
					perPage = 3;
					break;
				case "lg":
					perPage = 4;
					break;
				case "xl":
					perPage = 5;
					break;
			}
			return perPage;
		},
		fetchData() {
			const url = `users/${this.user.id}/products`;

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
	},
};
</script>

<style scoped>
.center {
	position: relative;
	top: 30%;
	left: 30%;
}
.empty-product {
	height: 100px;
}
</style>
