<template>
	<v-container fluid>
		<v-row justify="center">
			<v-sheet color="white" elevation="1" rounded width="80%" height="40%" v-if="group">
				<v-row>
					<v-col cols="12" lg="3" md="3">
						<div class="image ml-8 ma-2">
							<v-img
								:src="group.image"
								alt="group-image"
								style="border-radius: 20px"
							/>
						</div>
						<div class="header text-center">
							<h2>{{ group.name }}</h2>
						</div>
						<div class="description text-center mt-2">
							<div>{{ group.description }}</div>
						</div>
					</v-col>
					<v-col cols="12" md="1">
						<v-divider class="mx-4" vertical></v-divider>
					</v-col>
					<v-col cols="12" md="4">
						<v-list subheader>
							<v-subheader>Members</v-subheader>

							<v-list-item v-for="user in users" :key="user.id">
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
										tooltip="Wishlist"
										color="default"
									></button-hover>
									<button-hover
										icon="mdi-minus"
										tooltip="Remove from group"
										color="default"
										@onClick="removeFromGroup(user)"
									></button-hover>
								</v-list-item-icon>
							</v-list-item>
						</v-list>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-expansion-panels>
							<v-expansion-panel>
								<v-expansion-panel-header>
									<template>
										<v-row no-gutters>
											<v-col cols="12"> Friends </v-col>
										</v-row>
									</template>
								</v-expansion-panel-header>
								<v-expansion-panel-content>
									<v-text-field v-model="friendSearch"></v-text-field>
									<v-list subheader>
										<v-list-item v-for="user in friends" :key="user.id">
											<v-list-item-avatar>
												<v-avatar color="blue" size="50">
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
													icon="mdi-plus"
													tooltip="Add to group"
													color="default"
													@onClick="addToGroup(user)"
												></button-hover>
											</v-list-item-icon>
										</v-list-item>
									</v-list>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</v-col>
				</v-row>
			</v-sheet>
		</v-row>
		<v-row>
			<v-col cols="12" offset="1" md="10" justify="center">
				<user-wishlist v-for="user in users" :key="user.id" :user="user"></user-wishlist>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from "axios";
import { sync } from "vuex-pathify";
import ButtonHover from "@/components/ButtonHover";
import UserWishlist from "@/components/Group/UserWishlist";
import auth from "@/mixins/auth";
import { EventBus, GROUP_EDITED } from "@/utils/event-bus";

export default {
	name: "GroupDetail",
	components: { UserWishlist, ButtonHover },
	mixins: [auth],
	filters: {
		shortcut(friend) {
			return friend.firstname.charAt(0) + friend.lastname.charAt(0);
		},
	},
	data() {
		return {
			group: null,
			users: [],
			friends: [],
			friendSearch: "",
		};
	},
	created() {
		EventBus.$on(GROUP_EDITED, (group) => (this.group = group));
		this.fetchData();
	},
	computed: {
		snackbar: sync("app/snackbar"),
	},
	methods: {
		fetchData() {
			this.fetchGroup();
			this.fetchUsers();
			this.fetchFriends();
		},
		fetchGroup() {
			const url = `groups/${this.$route.params.groupId}`;

			axios
				.get(url)
				.then((response) => {
					this.group = response.data;
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
		fetchUsers() {
			const url = `groups/${this.$route.params.groupId}/users`;

			axios
				.get(url)
				.then((response) => {
					this.users = response.data.filter((user) => user.id !== this.getLoggedUserId());
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
		fetchFriends() {
			const url = `me/friends?filters[groups][NEQ]=${this.$route.params.groupId}`;

			axios
				.get(url)
				.then((response) => {
					this.friends = response.data.filter(
						(friend) => !this.users.find((user) => user.id === friend.id)
					);
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
						this.users.push(response.data);
						this.friends = this.friends.filter((item) => item.id !== response.data.id);
					} else {
						this.friends.push(response.data);
						this.users = this.users.filter((item) => item.id !== response.data.id);
					}
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

<style scoped></style>
