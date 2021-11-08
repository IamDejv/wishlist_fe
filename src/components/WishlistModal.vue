<template>
	<div class="text-center">
		<v-dialog v-model="dialog" persistent max-width="800px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-if="!isEditing" color="primary" dark v-bind="attrs" v-on="on">
					<v-icon>mdi-plus</v-icon>
					<span v-if="!isExtraSmall"> {{ t("button.addWishlist") }} </span>
				</v-btn>
				<v-btn v-else color="success" dark v-bind="attrs" v-on="on">
					<v-icon>mdi-pencil</v-icon>
					<span v-if="!isExtraSmall"> {{ t("button.editWishlist") }} </span>
				</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="text-h5">
						{{ isEditing ? t("button.editWishlist") : t("button.addWishlist") }}
					</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form ref="form" class="form">
							<v-row>
								<v-col cols="12" md="12">
									<v-text-field
										v-model.trim="form.name"
										required
										:label="t('form.wishlist.name')"
										:rules="[(v) => !!v || 'Name must be filled']"
									/>
								</v-col>
								<v-col cols="12" md="12">
									<v-text-field
										required
										disabled
										:label="t('form.wishlist.image')"
										:value="selectedImage"
										:rules="[(v) => !!v || 'Image must be selected']"
									/>
								</v-col>
								<v-col>
									<image-select
										:image="form.image"
										@select="(image) => onImageSelect(image)"
									/>
								</v-col>
							</v-row>
						</v-form>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog = false">
						{{ t("form.close") }}
					</v-btn>
					<v-btn color="blue darken-1" text @click="submit"> {{ t("form.save") }} </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import axios from "axios";
import { sync } from "vuex-pathify";
import { EventBus, WISHLIST_CREATED, WISHLIST_EDITED } from "@/utils/event-bus";
import ImageSelect from "@/components/ImageSelect";
import breakpoint from "@/mixins/breakpoint";
import locale from "@/mixins/locale";

export default {
	name: "WishlistModal",
	components: { ImageSelect },
	mixins: [breakpoint, locale],
	data() {
		return {
			isEditing: false,
			dialog: false,
			selectedImage: "",
			form: {
				name: "",
				image: "",
			},
		};
	},
	watch: {
		$route: function () {
			this.form = {};
			this.isEditing = this.$route.name === "WishlistDetail";
			this.fetchWishlist();
		},
	},
	created() {
		this.isEditing = this.$route.name === "WishlistDetail";
		this.fetchWishlist();
	},
	computed: {
		snackbar: sync("app/snackbar"),
	},
	methods: {
		onImageSelect(image) {
			this.form.image = image.path;
			this.selectedImage = image.name;
		},
		submit() {
			if (this.validate()) {
				const body = {
					...this.form,
				};

				if (this.isEditing) {
					this.edit(this.$route.params.wishlistId, body);
				} else {
					this.create(body);
				}
			}
		},
		create(body) {
			axios
				.post("me/wishlists", body)
				.then((response) => {
					this.snackbar = {
						open: true,
						message: this.t("snackbar.wishlistCreated"),
						type: "success",
					};
					EventBus.$emit(WISHLIST_CREATED, response.data);
					this.dialog = false;
				})
				.catch((e) => {
					this.handleError(e);
				});
		},
		edit(id, body) {
			const url = `wishlists/${id}`;

			axios
				.put(url, body)
				.then((response) => {
					this.snackbar = {
						open: true,
						message: this.t("snackbar.wishlistEdited"),
						type: "success",
					};
					EventBus.$emit(WISHLIST_EDITED, response.data);
					this.dialog = false;
				})
				.catch((e) => {
					this.handleError(e);
				});
		},
		fetchWishlist() {
			if (!this.isEditing) {
				return;
			}
			const wishlistId = this.$route.params.wishlistId;

			const url = `wishlists/${wishlistId}`;

			axios
				.get(url)
				.then((response) => {
					this.form = {
						...this.form,
						...response.data,
					};
				})
				.catch((e) => {
					this.handleError(e);
				});
		},
		validate() {
			return this.$refs.form.validate();
		},
		handleError(e) {
			this.snackbar = {
				open: true,
				message: e.response?.message || this.t("error.default"),
				type: "error",
			};
		},
	},
};
</script>

<style scoped></style>
