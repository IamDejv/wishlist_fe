<template>
	<v-hover>
		<template v-slot:default="{ hover }">
			<v-card min-height="250" min-width="250" max-width="250" max-height="250">
				<v-btn
					v-if="hover && showButtons"
					icon
					class="edit-button float-left"
					@click="editProduct"
				>
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
				<v-btn
					v-if="hover && showButtons"
					icon
					class="delete-button float-right"
					@click="removeProduct"
				>
					<v-icon>mdi-delete</v-icon>
				</v-btn>

				<v-img
					ref="img"
					:src="product.image"
					min-height="250"
					min-width="250"
					max-width="250"
					max-height="250"
					contain
				></v-img>

				<v-card-subtitle v-if="detail">
					{{ product.description }} <span class="float-end"></span
				></v-card-subtitle>

				<v-fade-transition>
					<v-overlay
						v-if="hover"
						absolute
						:color="product.reserved && !showButtons ? 'red' : 'grey darken-2'"
						class="text-center"
					>
						<div class="text-h3 font-weight-bold">{{ product.name }}</div>
						<router-link :to="`/products/${product.id}`" style="text-decoration: none">
							<v-btn color="white" text> Detail </v-btn>
						</router-link>
						<a :href="product.url" style="text-decoration: none" target="_blank">
							<v-btn color="white" text> {{ t("toStore") }} </v-btn>
						</a>
					</v-overlay>
				</v-fade-transition>
			</v-card>
		</template>
	</v-hover>
</template>

<script>
import axios from "axios";
import { sync } from "vuex-pathify";
import { EDIT_PRODUCT, EventBus, PRODUCT_REMOVED } from "@/utils/event-bus";
import locale from "@/mixins/locale";

export default {
	name: "ProductCard",
	props: {
		product: Object,
		showButtons: Boolean,
	},
	mixins: [locale],
	computed: {
		snackbar: sync("app/snackbar"),
	},
	data() {
		return {
			detail: false,
		};
	},
	methods: {
		removeProduct() {
			const url = `products/${this.product.id}`;

			axios
				.delete(url)
				.then(() => {
					EventBus.$emit(PRODUCT_REMOVED, this.product);
				})
				.catch((e) => {
					if (e.response) {
						this.snackbar = {
							open: true,
							message: e.response?.message || this.t("error.default"),
							type: "error",
						};
					}
				});
		},
		editProduct() {
			EventBus.$emit(EDIT_PRODUCT, this.product);
		},
	},
};
</script>

<style scoped>
.delete-button {
	z-index: 1000;
	position: absolute;
	right: 0;
}
.edit-button {
	z-index: 1000;
	position: absolute;
}
</style>
