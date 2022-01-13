<template>
	<v-container fluid>
		<v-row>
			<v-layout row wrap>
				<!-- xs12 and sm12 to make it responsive = 12 columns on mobile and 6 columns from medium to XL layouts -->
				<v-flex xs12 sm12 md6 class="ml-6">
					<div class="text-center">
						<h2>{{ t("group.my") }}</h2>
					</div>
					<v-data-table :headers="headers" :items="groups" :loading="loading.groups">
						<template v-slot:item.name="{ item: { name } }">
							{{ name }}
						</template>
						<template v-slot:item.actions="{ item }">
							<v-icon small class="mr-2" @click="openGroup(item)">
								mdi-gift
							</v-icon>
							<v-icon small @click="archiveGroup(item)"> mdi-archive </v-icon>
						</template>
					</v-data-table>
				</v-flex>
				<v-flex xs12 sm12 offset-(md)(1) md5 class="ml-5">
					<div class="text-center">
						<h2>{{ t("wishlist.my") }}</h2>
					</div>
					<v-data-table
						:headers="headers"
						:items="wishlists"
						:loading="loading.wishlists"
					>
						<template v-slot:item.name="{ item: { name } }">
							{{ name }}
						</template>
						<template v-slot:item.actions="{ item }">
							<v-icon small class="mr-2" @click="openWishlist(item)">
								mdi-account-group
							</v-icon>
							<v-icon small @click="archiveWishlist(item)"> mdi-archive </v-icon>
						</template>
					</v-data-table>
				</v-flex>
			</v-layout>
		</v-row>
	</v-container>
</template>

<script>
import axios from "axios";
import { sync } from "vuex-pathify";
import confirmation from "@/mixins/confirmation";
import locale from "@/mixins/locale";
import auth from "@/mixins/auth";

export default {
	name: "UserProfile",
	mixins: [confirmation, locale, auth],
	data() {
		return {
			user: {},
			groups: [],
			wishlists: [],
			loading: {
				groups: true,
				wishlists: true,
				user: true,
			},
			headers: [
				{
					text: this.t("group.name"),
					align: "start",
					value: "name",
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
		this.fetchData();
	},
	computed: {
		snackbar: sync("app/snackbar"),
	},
	methods: {
		fetchData() {
			this.fetchUser();
			this.fetchGroups();
			this.fetchWishlists();
		},
		fetchUser() {
			axios
				.get("me")
				.then((response) => {
					this.user = response.data;
				})
				.catch((e) => {
					this.handleError(e);
				})
				.finally(() => {
					this.loading.user = false;
				});
		},
		fetchGroups() {
			axios
				.get("me/groups")
				.then((response) => {
					this.groups = response.data.filter((item) => item.owner === auth.methods.getLoggedUserId());
				})
				.catch((e) => {
					this.handleError(e);
				})
				.finally(() => {
					this.loading.groups = false;
				});
		},
		fetchWishlists() {
			axios
				.get("me/wishlists")
				.then((response) => {
					this.wishlists = response.data;
				})
				.catch((e) => {
					this.handleError(e);
				})
				.finally(() => {
					this.loading.wishlists = false;
				});
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
		openWishlist(wishlist) {
			this.$router.push({ name: "WishlistDetail", params: { wishlistId: wishlist.id } });
		},
		openGroup(group) {
			this.$router.push({ name: "GroupDetail", params: { groupId: group.id } });
		},
		async archiveWishlist(wishlist) {
			const confirm = await this.confirm({
				title: this.t("wishlist.archive"),
				text: this.t("wishlist.archiveText"),
				type: "danger",
			});

			if (confirm) {
				axios
					.patch(`wishlists/${wishlist.id}/archive`)
					.then(() => {
						this.wishlists = this.wishlists.filter((item) => item.id !== wishlist.id);
					})
					.catch((e) => {
						this.handleError(e);
					});
			}
		},
		async archiveGroup(group) {
			const confirm = await this.confirm({
				title: this.t("group.archive"),
				text: this.t("group.archiveText"),
				type: "danger",
			});

			if (confirm) {
				axios
					.patch(`groups/${group.id}/archive`)
					.then(() => {
						this.groups = this.groups.filter((item) => item.id !== group.id);
					})
					.catch((e) => {
						this.handleError(e);
					});
			}
		},
	},
};
</script>

<style scoped></style>
