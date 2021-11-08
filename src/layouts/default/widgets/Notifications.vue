<template>
	<v-menu
		bottom
		left
		offset-y
		min-width="200"
		origin="top right"
		transition="scale-transition"
		:disabled="!pendingFriends.length"
	>
		<template v-slot:activator="{ attrs, on }">
			<v-badge color="info" overlap :value="pendingFriends.length">
				<template #badge> {{ pendingFriends.length }} </template>
				<v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
					<v-icon>mdi-bell</v-icon>
				</v-btn>
			</v-badge>
		</template>

		<v-list :tile="false" flat nav>
			<v-list-item v-for="friend in pendingFriends" :key="friend.id">
				<span class="mr-10">{{ friend.firstname }} {{ friend.lastname }}</span>
				<v-divider vertical></v-divider>
				<v-btn icon class="ml-4" @click="confirmFriend(friend)">
					<v-icon>mdi-account-check</v-icon>
				</v-btn>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script>
import axios from "axios";
import { EventBus, FRIEND_CONFIRMED } from "@/utils/event-bus";
import locale from "@/mixins/locale";

export default {
	name: "Notifications",
	mixins: [locale],
	data() {
		return {
			pendingFriends: [],
		};
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.fetchPendingFriends();
		},
		confirmFriend(friend) {
			const url = "me/friends";

			const body = {
				action: "confirm",
				id: friend.id,
			};
			axios
				.put(url, body)
				.then((response) => {
					EventBus.$emit(FRIEND_CONFIRMED, response.data);
					this.pendingFriends = this.pendingFriends.filter(
						(item) => item.id !== response.data.id
					);
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
		fetchPendingFriends() {
			const url = "me/friends/pending";

			axios
				.get(url)
				.then((response) => {
					console.log(response.data);
					this.pendingFriends = response.data;
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
	},
};
</script>

<style scoped></style>
