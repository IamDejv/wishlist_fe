<template>
	<div class="text-center">
		<v-dialog v-model="dialog" width="800">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on">
					<v-icon>mdi-plus</v-icon> Add Friend
				</v-btn>
			</template>

			<v-card>
				<v-card-title class="text-h5 grey darken-4"> Add Friend </v-card-title>

				<v-card-text>
					<v-row>
						<v-col cols="12">
							<v-text-field
								v-model="searchValue"
								label="Search"
								prepend-icon="mdi-magnify"
								:loading="loading"
								@input="search"
							></v-text-field>
						</v-col>
					</v-row>
					<v-divider></v-divider>

					<v-list subheader>
						<v-subheader>Recent chat</v-subheader>

						<v-list-item v-for="user in users" :key="user.id">
							<v-list-item-avatar>
								<v-avatar color="blue" size="60">
									<span class="text-h4 font-weight-bold pa-2">
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
								<v-btn @click="addFriend(user.id)">
									<v-icon :color="user ? 'deep-purple accent-4' : 'grey'">
										mdi-plus
									</v-icon>
								</v-btn>
							</v-list-item-icon>
						</v-list-item>
					</v-list>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="dialog = false"> Close </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import axios from "axios";
import { addQueryParams } from "@/utils/helpers";
import auth from "@/mixins/auth";

export default {
	name: "AddFriendModal",
	data() {
		return {
			dialog: false,
			users: [],
			searchValue: "",
			limit: 10,
			page: 1,
			loading: false,
		};
	},
	mixins: [auth],
	filters: {
		shortcut(user) {
			return user.firstname.charAt(0) + user.lastname.charAt(0);
		},
	},
	methods: {
		addFriend(id) {
			const url = `users/${this.getLoggedUserId()}/friends`;

			axios
				.put(url, { id })
				.then(() => {
					console.log("hello");
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
		search() {
			this.loading = true;
			let url = "/users/new";

			url = addQueryParams(
				{
					searchValue: [this.searchValue],
					limit: [this.limit],
					page: [this.page],
				},
				url
			);

			axios
				.get(url)
				.then((response) => {
					this.users = response.data;
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
				.finally(() => {
					this.loading = false;
				});
		},
	},
};
</script>

<style scoped></style>
