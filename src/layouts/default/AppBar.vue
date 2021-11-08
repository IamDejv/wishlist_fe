<template>
	<v-app-bar
		id="default-app-bar"
		app
		absolute
		class="v-bar--underline"
		color="transparent"
		:clipped-left="$vuetify.rtl"
		:clipped-right="!$vuetify.rtl"
		height="70"
		flat
	>
		<v-app-bar-nav-icon @click="drawer = !drawer" />

		<v-toolbar-title class="font-weight-light text-h5" v-text="name.title" />

		<v-spacer />

		<group-modal v-if="$route.name === 'Groups' || $route.name === 'GroupDetail'"></group-modal>

		<wishlist-modal
			v-if="$route.name === 'Wishlists' || $route.name === 'WishlistDetail'"
		></wishlist-modal>

		<product-modal
			v-if="$route.name === 'WishlistDetail' || $route.name === 'Dashboard'"
			class="ml-5"
		></product-modal>

		<add-friend-modal v-if="$route.name === 'Friends'"></add-friend-modal>

		<default-go-home />

		<default-notifications />

		<default-account />
	</v-app-bar>
</template>

<script>
// Utilities
import { get, sync } from "vuex-pathify";
import AddFriendModal from "@/components/AddFriendModal";
import GroupModal from "@/components/GroupModal";
import WishlistModal from "@/components/WishlistModal";
import ProductModal from "@/components/ProductModal";

export default {
	name: "DefaultBar",

	components: {
		ProductModal,
		WishlistModal,
		GroupModal,
		AddFriendModal,
		DefaultAccount: () =>
			import(
				/* webpackChunkName: "default-account" */
				"./widgets/Account"
			),
		DefaultGoHome: () =>
			import(
				/* webpackChunkName: "default-go-home" */
				"./widgets/GoHome"
			),
		DefaultNotifications: () =>
			import(
				/* webpackChunkName: "default-notifications" */
				"./widgets/Notifications"
			),
	},

	computed: {
		...sync("app", ["mini", "drawer"]),
		name: get("route/meta"),
	},
};
</script>
