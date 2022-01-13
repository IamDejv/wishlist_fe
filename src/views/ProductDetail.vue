<template>
	<v-container fluid>
		<v-layout row wrap>
			<!-- xs12 and sm12 to make it responsive = 12 columns on mobile and 6 columns from medium to XL layouts -->
			<v-flex xs12 sm12 md6>
				<v-img :src="product.image"></v-img>
			</v-flex>
			<v-flex xs12 sm12 offset-(md)(1) md5 class="ml-5">
				<h2 class="mb-3">{{ product.name }}</h2>
				<p>{{ product.price | money }}</p>
				<p class="mt-3" v-html="product.description"></p>
				<v-row>
					<v-col md="6">
						<v-btn
							:disabled="product.reserved || myProduct"
							class="v-btn warning"
							block
							@click="reserveProduct"
						>
							{{ t("products.reserve") }}
						</v-btn>
					</v-col>
					<v-col md="6">
						<v-btn class="v-btn info v-btn--block">
							<a :href="product.url" target="_blank">{{ t("products.toShop") }}</a>
						</v-btn>
					</v-col>
				</v-row>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import axios from "axios";
import locale from "@/mixins/locale";
import auth from "@/mixins/auth";

export default {
	name: "ProductDetail",
	mixins: [locale, auth],
	data() {
		return {
			product: {},
			loading: true,
			myProduct: true,
		};
	},
	filters: {
		money: function (value) {
			let formatter;
			const language = JSON.parse(localStorage.getItem("language"));
			if (language === "cs") {
				formatter = new Intl.NumberFormat("cs-CZ", {
					style: "currency",
					currency: "CZK",
				});
			} else {
				// TODO Actual Exchange Rate
				value = value / 21.85;
				formatter = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				});
			}

			return formatter.format(value); /* $2,500.00 */
		},
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.fetchProduct();
		},
		async fetchProduct() {
			const url = `products/${this.$route.params.productId}`;

			axios
				.get(url)
				.then(async (response) => {
					this.myProduct = response.data.owner === (await this.getLoggedUserId());
					this.product = response.data;
				})
				.catch((e) => {
					if (e.response) {
						this.snackbar = {
							open: true,
							message: e.response?.message || "Something went wrong",
							type: "error",
						};
					}
				})
				.finally(() => (this.loading = false));
		},
		reserveProduct() {
			const url = `products/${this.$route.params.productId}/reserve`;

			axios
				.patch(url)
				.then((response) => {
					this.product = response.data;
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

<style scoped>
a {
	text-decoration: none;
	color: white;
}
</style>
