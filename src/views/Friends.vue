<template>
	<v-container fluid>
		<v-col cols="12" offset="1" xl="10">
			<v-card>
				<v-card-title>
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						:label="t('friends.search')"
						hide-details
					></v-text-field>
				</v-card-title>
				<v-data-table
					:headers="headers"
					:items="friends"
					:search="search"
					:loading="loading"
				>
					<template v-slot:item.name="{ item: { firstname, lastname } }">
						{{ firstname }} {{ lastname }}
					</template>
					<template v-slot:item.actions="{ item }">
						<v-icon small class="mr-2" @click="openWishlist(item)"> mdi-gift </v-icon>
						<v-icon small @click="removeFriend(item)"> mdi-delete </v-icon>
					</template>
				</v-data-table>
			</v-card>
		</v-col>
	</v-container>
</template>

<script>
import axios from "axios";
import auth from "@/mixins/auth";
import { sync } from "vuex-pathify";
import { EventBus, FRIEND_CONFIRMED } from "@/utils/event-bus";
import locale from "@/mixins/locale";

export default {
	name: "Friends",
	mixins: [auth, locale],
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
			search: "",
			loading: true,
			headers: [
				{
					text: this.t("friends.firstname"),
					align: "start",
					filterable: true,
					value: "firstname",
				},
				{
					text: this.t("friends.lastname"),
					align: "start",
					filterable: true,
					value: "lastname",
				},
				{
					text: this.t("friends.actions"),
					value: "actions",
					sortable: false,
					align: "end",
				},
			],
		};
	},
	created() {
		EventBus.$on(FRIEND_CONFIRMED, (friend) => this.friends.push(friend));
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.fetchFriends();
		},
		fetchFriends() {
			const uri = `users/${this.getLoggedUserId()}/friends`;

			axios
				.get(uri)
				.then((response) => {
					this.friends = response.data;
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: e.response?.message || this.t("error.default"),
						type: "error",
					};
				})
				.finally(() => (this.loading = false));
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
						message: this.t("snackbar.userRemoved"),
						type: "success",
					};
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: e.response?.message || this.t("error.default"),
						type: "error",
					};
				});
		},
	},
};
</script>

<style scoped></style>
