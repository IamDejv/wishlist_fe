<template>
	<div class="text-center">
		<v-dialog v-model="dialog" persistent max-width="800px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on">
					<v-icon>mdi-plus</v-icon> {{ isEditing ? "Edit Group" : "Create Group" }}
				</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="text-h5">
						{{ isEditing ? "Edit Group" : "Create Group" }}
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
										label="Name"
										:rules="[(v) => !!v || 'Name must be filled']"
									/>
								</v-col>
								<v-col cols="12" md="12">
									<v-textarea
										v-model.trim="form.description"
										required
										label="Description"
										:rules="[(v) => !!v || 'Description must be filled']"
									/>
								</v-col>
								<v-col cols="12" md="12">
									<v-select
										v-model="form.type"
										required
										label="Type"
										:rules="[(v) => !!v || 'Type must be select']"
										:items="options.type"
									/>
								</v-col>
								<v-col cols="12" md="12">
									<v-text-field
										required
										disabled
										label="Image"
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
					<v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
					<v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import axios from "axios";
import { sync } from "vuex-pathify";
import { EventBus, GROUP_CREATED, GROUP_EDITED } from "@/utils/event-bus";
import ImageSelect from "@/components/ImageSelect";

export default {
	name: "CreateGroupModal",
	components: { ImageSelect },
	data() {
		return {
			selectedImage: "",
			dialog: false,
			form: {
				name: "",
				description: "",
				type: "",
				image: "",
			},
			isEditing: false,
			options: {
				type: [
					{
						text: "Basic",
						value: "basic",
					},
					{
						text: "Secret Santa",
						value: "secret_santa",
					},
				],
			},
		};
	},
	watch: {
		$route: function () {
			this.form = {};
			this.isEditing = this.$route.name === "GroupDetail";
			this.fetchGroup();
		},
	},
	computed: {
		snackbar: sync("app/snackbar"),
	},
	created() {
		this.isEditing = this.$route.name === "GroupDetail";
		this.fetchGroup();
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
					this.edit(this.$route.params.groupId, body);
				} else {
					this.create(body);
				}
			}
		},
		create(body) {
			axios
				.post("me/groups", body)
				.then((response) => {
					this.snackbar = {
						open: true,
						message: "Group created",
						type: "success",
					};
					EventBus.$emit(GROUP_CREATED, response.data);
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
		edit(id, body) {
			const url = `groups/${id}`;

			axios
				.put(url, body)
				.then((response) => {
					this.snackbar = {
						open: true,
						message: "Group Edited",
						type: "success",
					};
					EventBus.$emit(GROUP_EDITED, response.data);
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
		fetchGroup() {
			if (!this.isEditing) {
				return;
			}
			const groupId = this.$route.params.groupId;

			const url = `groups/${groupId}`;

			axios
				.get(url)
				.then((response) => {
					this.form = {
						...this.form,
						...response.data,
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
		validate() {
			return this.$refs.form.validate();
		},
	},
};
</script>

<style scoped></style>
