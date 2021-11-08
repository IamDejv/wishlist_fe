<template>
	<v-container fluid>
		<v-row justify="center">
			<v-row v-if="loading">
				<v-col
					v-for="skeleton in skeletons"
					:key="skeleton"
					cols="12"
					offset="1"
					md="10"
					xs="10"
					sm="10"
					lg="10"
					xl="10"
					justify="center"
				>
					<v-sheet class="pa-5 mb-2" rounded>
						<v-row>
							<v-col>
								<div>
									<v-skeleton-loader type="heading" class="skeleton-heading" />
								</div>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-skeleton-loader>
									<v-skeleton-loader tile type="image" />
									<v-skeleton-loader tile height="60" type="image" />
								</v-skeleton-loader>
							</v-col>
						</v-row>
					</v-sheet>
				</v-col>
			</v-row>
			<v-row v-else-if="users.length">
				<v-col
					cols="12"
					offset="1"
					md="10"
					xs="10"
					sm="10"
					lg="10"
					xl="10"
					justify="center"
				>
					<user-wishlist
						v-for="user in users"
						:key="user.id"
						:user="user"
					></user-wishlist>
				</v-col>
			</v-row>
			<v-row v-else>
				<div class="center">
					<div
						class="
							font-weight-bold
							text--transparent
							grey--text
							text--lighten-2 text-h1
						"
					>
						{{ t("empty") }}
					</div>
				</div>
			</v-row>
		</v-row>
	</v-container>
</template>

<script>
import axios from "axios";
import { sync } from "vuex-pathify";
import UserWishlist from "@/components/Group/UserWishlist";
import auth from "@/mixins/auth";
import {
	EventBus,
	FRIEND_ADDED_TO_GROUP,
	FRIEND_REMOVED_FROM_GROUP,
	GROUP_EDITED,
} from "@/utils/event-bus";
import locale from "@/mixins/locale";

export default {
	name: "GroupDetail",
	components: { UserWishlist },
	mixins: [auth, locale],
	filters: {
		shortcut(friend) {
			return friend.firstname.charAt(0) + friend.lastname.charAt(0);
		},
	},
	data() {
		return {
			skeletons: 1,
			loading: true,
			group: null,
			users: [],
		};
	},
	created() {
		EventBus.$on(GROUP_EDITED, (group) => (this.group = group));
		EventBus.$on(FRIEND_ADDED_TO_GROUP, (user) => this.users.push(user));
		EventBus.$on(FRIEND_REMOVED_FROM_GROUP, (user) => this.removeFriendFromGroup(user));
		this.fetchData();
	},
	computed: {
		snackbar: sync("app/snackbar"),
	},
	methods: {
		fetchData() {
			this.fetchMembers();
		},
		removeFriendFromGroup(user) {
			this.users = this.users.filter((item) => item.id !== user.id);
		},
		fetchMembers() {
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
				})
				.finally(() => (this.loading = false));
		},
	},
};
</script>

<style scoped>
.center {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>

<style>
.skeleton-heading {
	margin-left: 35%;
	padding-top: 0;
}
.v-skeleton-loader__card-heading {
	text-align: -webkit-center;
}
</style>
