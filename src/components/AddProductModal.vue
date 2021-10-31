<template>
	<div class="text-center">
		<v-dialog
			v-model="dialog"
			fullscreen
			persistent
			hide-overlay
			transition="dialog-bottom-transition"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on">
					<v-icon>mdi-plus</v-icon> Add Product
				</v-btn>
			</template>
			<v-card>
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title>Add product</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn v-if="step === 2" dark text @click="submit"> Save </v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<v-stepper v-model="step" vertical elevation="0">
					<v-stepper-step :complete="step > 1" step="1" editable>
						Add product link
					</v-stepper-step>

					<v-stepper-content step="1">
						<v-form ref="linkForm" class="link-form">
							<v-row>
								<v-col cols="12" md="12">
									<v-text-field
										v-model.trim="form.url"
										required
										label="Link where to buy product"
										:rules="[(v) => !!v || 'Link must be filled']"
									/>
								</v-col>
							</v-row>
						</v-form>
						<v-btn color="primary" @click="nextStep(2)"> Continue </v-btn>
						<v-btn class="ml-4" color="primary" @click="skip(2)"> Skip </v-btn>
					</v-stepper-content>

					<v-stepper-step :complete="step > 2" step="2" :editable="isEditing">
						Create or Edit product
					</v-stepper-step>

					<v-stepper-content step="2">
						<v-card>
							<v-card-text>
								<v-container>
									<v-form ref="form" class="form">
										<v-row>
											<v-col cols="12" md="12">
												<v-text-field
													v-model.trim="form.name"
													required
													label="Name"
													:rules="[
														(v) => !!v || 'Name must be filled',
														(v) =>
															(v && v.length < 75) ||
															'Name can\'t have more than 75 characters',
													]"
												/>
											</v-col>
											<v-col cols="12" md="12">
												<v-textarea
													v-model.trim="form.description"
													required
													label="Description"
													:rules="[
														(v) => !!v || 'Description must be filled',
													]"
												/>
											</v-col>
											<v-col cols="12" md="12">
												<v-text-field
													v-model.number="form.price"
													required
													type="number"
													label="Price"
													:rules="[(v) => !!v || 'Price must be filled']"
												/>
											</v-col>
											<v-col cols="12" md="12">
												<v-img
													:src="form.image"
													contain
													max-height="200"
													height="200"
													max-width="200"
													width="200"
												/>
											</v-col>
											<v-col cols="12" md="12">
												<v-row>
													<span
														v-for="image in options.images"
														:key="image"
													>
														<v-hover v-slot="{ hover }">
															<v-card
																class="my-4 mx-2"
																height="100"
																max-height="100"
																max-width="100"
																width="100"
																@click="form.image = image"
															>
																<v-img
																	:src="image"
																	contain
																	height="100"
																	max-height="100"
																	max-width="100"
																	width="100"
																/>
																<v-fade-transition>
																	<v-overlay
																		v-if="
																			image === form.image ||
																			hover
																		"
																		absolute
																		color="grey darken-2"
																	>
																	</v-overlay>
																</v-fade-transition>
															</v-card>
														</v-hover>
													</span>
												</v-row>
											</v-col>
										</v-row>
									</v-form>
								</v-container>
							</v-card-text>
							<v-btn color="primary" @click="submit"> Save </v-btn>
						</v-card>
					</v-stepper-content>
				</v-stepper>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import axios from "axios";
import { sync } from "vuex-pathify";
import auth from "@/mixins/auth";
import { EventBus, PRODUCT_ADDED, EDIT_PRODUCT, PRODUCT_EDITED } from "@/utils/event-bus";

export default {
	name: "AddProductModal",
	mixins: [auth],
	data() {
		return {
			dialog: false,
			isEditing: false,
			form: {
				name: "",
				description: "",
				url: "",
				price: 0,
				image: "",
			},
			step: 1,
			defaultImage:
				"https://icons-for-free.com/iconfiles/png/512/present+icon-1320184287234188353.png",
			options: {
				images: new Set(),
			},
		};
	},
	computed: {
		snackbar: sync("app/snackbar"),
	},
	created() {
		this.isEditing = false;
		EventBus.$on(EDIT_PRODUCT, (product) => this.loadProduct(product));
	},
	methods: {
		submit() {
			if (this.validate()) {
				const body = {
					...this.form,
					url: this.form.url.split("?")[0],
					image: this.form.image,
					price: parseFloat(this.form.price),
					wishlistId: parseInt(this.$route.params.wishlistId),
					categories: [],
				};

				if (this.isEditing) {
					this.edit(body);
				} else {
					this.create(body);
				}
			}
		},
		create(body) {
			const url = `products`;

			axios
				.post(url, body)
				.then((response) => {
					this.snackbar = {
						open: true,
						message: "Product added to wishlist",
						type: "success",
					};
					EventBus.$emit(PRODUCT_ADDED, response.data);
					this.eraseForm();
					this.dialog = false;
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: e.response?.message || "Something went wrong",
						type: "error",
					};
				});
		},
		eraseForm() {
			this.form = {};
			this.options.images = [];
			this.step = 1;
			this.reset();
			this.resetValidation();
		},
		edit(body) {
			const url = `products/${this.form.id}`;

			axios
				.put(url, body)
				.then((response) => {
					this.snackbar = {
						open: true,
						message: "Product edited",
						type: "success",
					};
					EventBus.$emit(PRODUCT_EDITED, response.data);
					this.eraseForm();
					this.dialog = false;
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: e.response?.message || "Something went wrong",
						type: "error",
					};
				});
		},
		loadProduct(product) {
			this.isEditing = true;
			this.form = {
				...this.form,
				...product,
			};
			this.options.images = new Set([product.image, this.defaultImage]);
			this.dialog = true;
		},
		validate() {
			return this.$refs.form.validate();
		},
		reset() {
			this.$refs.form.reset();
		},
		resetValidation() {
			this.$refs.form.resetValidation();
		},
		async nextStep(step) {
			if (this.$refs.linkForm.validate()) {
				await this.analyzeLink();
				this.step = step;
			}
		},
		skip(step) {
			this.step = step;
		},
		async analyzeLink() {
			const url = "service/link";

			await axios
				.post(url, { link: this.form.url })
				.then((response) => {
					this.options.images = new Set([
						...this.options.images,
						...response.data.image,
						this.defaultImage,
					]);
					this.form = {
						...this.form,
						image: this.options.images[0],
						name: response.data.name,
						description: response.data.description,
					};
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: e.response?.message || "Something went wrong",
						type: "error",
					};
				});
		},
	},
};
</script>

<style scoped>
.v-stepper {
	height: 100%;
}
</style>
