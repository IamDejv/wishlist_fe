<template>
	<v-container fluid>
		<v-row justify="center">
			<v-col v-for="friend in friends" :key="friend.id" cols="12" md="12">
				<v-sheet elevation="6" class="mx-auto" height="100" rounded>
					<v-row class="pt-3 pl-5">
						<v-col cols="12" md="1">
							<v-avatar color="blue" size="60">
								<span class="text-h2 font-weight-bold pa-2">
									{{ friend | shortcut }}
								</span>
							</v-avatar>
						</v-col>
						<v-col cols="12" md="9" class="pt-6">
							<span class="font-weight-bold text-h3">
								{{ friend.firstname }} {{ friend.lastname }}
							</span>
						</v-col>
						<v-col cols="12" md="2" class="pt-6">
							<button-hover
								color="success"
								tooltip="Wishlist"
								icon="mdi-note-edit"
								position=""
								@onClick="openWishlist(friend)"
							></button-hover>
							<button-hover
								color="error"
								tooltip="Remove"
								icon="mdi-block-helper"
								position="bottom"
								@onClick="removeFriend(friend)"
							></button-hover>
						</v-col>
					</v-row>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ButtonHover from "@/components/ButtonHover";
import axios from "axios";
import auth from "@/mixins/auth";
import { sync } from "vuex-pathify";
import { EventBus, FRIEND_ADDED } from "@/utils/event-bus";

export default {
	name: "Friends",
	components: { ButtonHover },
	mixins: [auth],
	filters: {
		shortcut(friend) {
			return friend.firstname.charAt(0) + friend.lastname.charAt(0);
		},
	},
	computed: {
		snackbar: sync("app/snackbar"),
	},
	data() {
		return {
			friends: [],
		};
	},
	created() {
		EventBus.$on(FRIEND_ADDED, (friend) => this.friends.push(friend));
		this.fetchData();
	},
	methods: {
		async fetchData() {
			const uri = `users/${this.getLoggedUserId()}/friends`;

			axios
				.get(uri)
				.then((response) => {
					this.friends = response.data;
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: e.response?.message || "Something went wrong",
						type: "error",
					};
				});
		},
		openWishlist(friend) {
			this.$router.push({ name: "FriendWishlist", params: { userId: friend.id } });
		},
		removeFriend(friend) {
			const uri = `me/friends`;
			const body = {
				id: friend.id,
				action: "remove",
			};

			axios
				.put(uri, body)
				.then((response) => {
					this.friends = this.friends.filter((item) => item.id !== response.data.id);
					this.snackbar = {
						open: true,
						message: "User removed from friends",
						type: "success",
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

<style scoped></style>
