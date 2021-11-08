<template>
	<div class="text-center">
		<v-dialog v-model="dialog" persistent max-width="800px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-if="!isEditing" color="primary" dark v-bind="attrs" v-on="on">
					<v-icon>mdi-plus</v-icon>
					<span v-if="!isExtraSmall"> {{ t("button.addGroup") }} </span>
				</v-btn>
				<v-btn v-else color="success" dark v-bind="attrs" v-on="on">
					<v-icon>mdi-pencil</v-icon>
					<span v-if="!isExtraSmall"> {{ t("button.editGroup") }} </span>
				</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="text-h5">
						{{ isEditing ? t("button.editGroup") : t("button.addGroup") }}
					</span>
				</v-card-title>
				<v-card-text>
					<v-tabs v-if="isEditing" v-model="tabs" centered icons-and-text>
						<v-tab>
							{{ t("edit") }}
							<v-icon>mdi-pencil</v-icon>
						</v-tab>

						<v-tab>
							{{ t("members") }}
							<v-icon>mdi-account-multiple</v-icon>
						</v-tab>
					</v-tabs>
					<v-tabs-items v-model="tabs">
						<v-tab-item>
							<v-container>
								<v-form ref="form" class="form">
									<v-row>
										<v-col cols="12" md="12">
											<v-text-field
												v-model.trim="form.name"
												required
												:label="t('form.group.name')"
												:rules="[(v) => !!v || 'Name must be filled']"
											/>
										</v-col>
										<v-col cols="12" md="12">
											<v-textarea
												v-model.trim="form.description"
												required
												:label="t('form.group.description')"
												:rules="[
													(v) => !!v || 'Description must be filled',
												]"
											/>
										</v-col>
										<v-col cols="12" md="12">
											<v-select
												v-model="form.type"
												required
												:label="t('form.group.type')"
												:rules="[(v) => !!v || 'Type must be select']"
												:items="options.type"
											/>
										</v-col>
										<v-col cols="12" md="12">
											<v-text-field
												required
												disabled
												:label="t('form.group.image')"
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
						</v-tab-item>
						<v-tab-item>
							<v-list subheader v-if="members.length">
								<v-subheader> {{ t("members") }}</v-subheader>

								<v-list-item v-for="user in members" :key="user.id">
									<v-list-item-avatar>
										<v-avatar color="blue" size="60">
											<span class="font-weight-bold pa-2">
												{{ user | shortcut }}
											</span>
										</v-avatar>
									</v-list-item-avatar>

									<v-list-item-content>
										<v-list-item-title
											v-text="`${user.firstname} ${user.lastname}`"
										></v-list-item-title>
									</v-list-item-content>

									<v-list-item-icon>
										<button-hover
											icon="mdi-note-edit"
											color="default"
											:tooltip="t('groups.wishlist')"
										></button-hover>
										<button-hover
											icon="mdi-minus"
											:tooltip="t('groups.removeFromGroup')"
											color="default"
											@onClick="removeFromGroup(user)"
										></button-hover>
									</v-list-item-icon>
								</v-list-item>
							</v-list>

							<v-list subheader v-if="friends.length">
								<v-subheader>{{ t("menu.friends") }}</v-subheader>

								<v-list-item v-for="user in friends" :key="user.id">
									<v-list-item-avatar>
										<v-avatar color="blue" size="60">
											<span class="font-weight-bold pa-2">
												{{ user | shortcut }}
											</span>
										</v-avatar>
									</v-list-item-avatar>

									<v-list-item-content>
										<v-list-item-title
											v-text="`${user.firstname} ${user.lastname}`"
										></v-list-item-title>
									</v-list-item-content>

									<v-list-item-icon>
										<button-hover
											icon="mdi-note-edit"
											:tooltip="t('groups.wishlist')"
											color="default"
										></button-hover>
										<button-hover
											icon="mdi-plus"
											:tooltip="t('groups.addToGroup')"
											color="default"
											@onClick="addToGroup(user)"
										></button-hover>
									</v-list-item-icon>
								</v-list-item>
							</v-list>
						</v-tab-item>
					</v-tabs-items>
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
import {
	EventBus,
	FRIEND_ADDED_TO_GROUP,
	FRIEND_REMOVED_FROM_GROUP,
	GROUP_CREATED,
	GROUP_EDITED,
} from "@/utils/event-bus";
import ImageSelect from "@/components/ImageSelect";
import breakpoint from "@/mixins/breakpoint";
import ButtonHover from "@/components/ButtonHover";
import auth from "@/mixins/auth";
import locale from "@/mixins/locale";

export default {
	name: "GroupModal",
	components: { ButtonHover, ImageSelect },
	mixins: [auth, breakpoint, locale],
	filters: {
		shortcut(friend) {
			return friend.firstname.charAt(0) + friend.lastname.charAt(0);
		},
	},
	data() {
		return {
			selectedImage: "",
			tabs: 0,
			dialog: false,
			form: {
				name: "",
				description: "",
				type: "",
				image: "",
			},
			members: [],
			friends: [],
			isEditing: false,
			options: {
				type: [
					{
						text: this.t("options.group.basic"),
						value: "basic",
					},
					{
						text: this.t("options.group.secretSanta"),
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
			if (this.isEditing) {
				this.fetchGroup();
				this.fetchMembers();
			} else {
				this.tabs = 0;
			}
		},
	},
	computed: {
		snackbar: sync("app/snackbar"),
	},
	created() {
		this.isEditing = this.$route.name === "GroupDetail";
		if (this.isEditing) {
			this.fetchGroup();
			this.fetchMembers();
		}
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
						message: this.t("snackbar.groupCreated"),
						type: "success",
					};
					EventBus.$emit(GROUP_CREATED, response.data);
					this.dialog = false;
				})
				.catch((e) => {
					this.handleError(e);
				});
		},
		edit(id, body) {
			const url = `groups/${id}`;

			axios
				.put(url, body)
				.then((response) => {
					this.snackbar = {
						open: true,
						message: this.t("snackbar.groupEdited"),
						type: "success",
					};
					EventBus.$emit(GROUP_EDITED, response.data);
					this.dialog = false;
				})
				.catch((e) => {
					this.handleError(e);
				});
		},
		fetchGroup() {
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
					this.handleError(e);
				});
		},
		fetchMembers() {
			const url = `groups/${this.$route.params.groupId}/users`;

			axios
				.get(url)
				.then((response) => {
					this.members = response.data.filter(
						(user) => user.id !== this.getLoggedUserId()
					);
					this.fetchFriends();
				})
				.catch((e) => {
					this.handleError(e);
				});
		},
		fetchFriends() {
			const url = `me/friends?filters[groups][NEQ]=${this.$route.params.groupId}`;

			axios
				.get(url)
				.then((response) => {
					this.friends = response.data.filter(
						(friend) => !this.members.find((user) => user.id === friend.id)
					);
				})
				.catch((e) => {
					this.handleError(e);
				});
		},
		addToGroup(user) {
			this.actionGroup(user, "addToGroup");
		},
		removeFromGroup(user) {
			this.actionGroup(user, "removeFromGroup");
		},
		actionGroup(user, action) {
			const url = `groups/${this.$route.params.groupId}/users`;

			const body = {
				action,
				id: user.id,
			};

			axios
				.put(url, body)
				.then((response) => {
					if (action === "addToGroup") {
						this.members.push(response.data);
						this.friends = this.friends.filter((item) => item.id !== response.data.id);
						EventBus.$emit(FRIEND_ADDED_TO_GROUP, response.data);
					} else {
						this.friends.push(response.data);
						this.members = this.members.filter((item) => item.id !== response.data.id);
						EventBus.$emit(FRIEND_REMOVED_FROM_GROUP, response.data);
					}
				})
				.catch((e) => {
					this.handleError(e);
				});
		},
		validate() {
			return this.$refs.form.validate();
		},
		handleError(e) {
			if (e.response) {
				this.snackbar = {
					open: true,
					message: e.response?.message || this.t("error.default"),
					type: "error",
				};
			}
		},
	},
};
</script>

<style scoped></style>
