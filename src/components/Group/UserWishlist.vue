<template>
	<v-sheet class="pa-5 mb-2" rounded>
		<v-row>
			<v-col>
				<div class="font-weight-bold text-h3 text-center">
					{{ user.firstname }} {{ user.lastname }}
				</div>
			</v-col>
		</v-row>
		<v-row>
			<v-col v-if="products.length">
				<Splide :options="options" v-if="!loading">
					<SplideSlide v-for="product in products" :key="product.id">
						<product-card :product="product" />
					</SplideSlide>
				</Splide>
			</v-col>
		</v-row>
	</v-sheet>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";

export default {
	name: "UserWishlist",
	components: { ProductCard, Splide, SplideSlide },
	props: {
		user: Object,
	},
	data() {
		return {
			model: 0,
			products: [],
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
				touchThreshold: 5,
			},
			options: {
				rewind: true,
				perPage: 0,
			},
			loading: true,
		};
	},
	created() {
		this.options.perPage = this.getPerPage();
		this.fetchData();
	},
	methods: {
		getPerPage() {
			let perPage = 1;
			switch (this.$vuetify.breakpoint.name) {
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
						message: e.response?.message || "Something went wrong",
						type: "error",
					};
				})
				.finally(() => (this.loading = false));
		},
	},
};
</script>

<style scoped></style>
