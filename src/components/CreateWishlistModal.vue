<template>
	<div class="text-center">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on">
					<v-icon>mdi-plus</v-icon> Create Wishlist
				</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="text-h5">Create Wishlist</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form ref="form" class="form">
							<v-row>
								<v-col cols="12" md="12">
									<v-text-field
										v-model.trim="form.name"
										required
										label="Name"
										:rules="[(v) => !!v || 'Name must be filled']"
									/>
								</v-col>
								<v-col cols="12" md="12">
									<v-text-field
										v-model.trim="form.image"
										required
										label="Image"
										:rules="[(v) => !!v || 'Image must be selected']"
									/>
								</v-col>
							</v-row>
						</v-form>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
					<v-btn color="blue darken-1" text @click="create"> Save </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import axios from "axios";
import { sync } from "vuex-pathify";
import auth from "@/mixins/auth";
import { EventBus, WISHLIST_CREATED } from "@/utils/event-bus";

export default {
	name: "CreateWishlistModal",
	mixins: [auth],
	data() {
		return {
			dialog: false,
			form: {
				name: "",
				image: "https://www.history.com/.image/t_share/MTY4ODE4ODA4MzY1MDAwNDY1/christmas-gettyimages-184652817.jpg",
			},
		};
	},
	computed: {
		snackbar: sync("app/snackbar"),
	},
	methods: {
		create() {
			if (this.validate()) {
				const body = {
					...this.form,
					user: this.getLoggedUserId(),
				};
				axios
					.post("wishlists", body)
					.then((response) => {
						this.snackbar = {
							open: true,
							message: "Wishlist created",
							type: "success",
						};
						EventBus.$emit(WISHLIST_CREATED, response.data);
						this.dialog = false;
					})
					.catch((e) => {
						this.snackbar = {
							open: true,
							message: e.response?.message || "Something went wrong",
							type: "error",
						};
					});
			}
		},
		validate() {
			return this.$refs.form.validate();
		},
	},
};
</script>

<style scoped></style>
