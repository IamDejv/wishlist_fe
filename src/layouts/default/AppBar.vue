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

		<create-group-modal v-if="$route.name === 'Groups'"></create-group-modal>

		<create-wishlist-modal v-if="$route.name === 'Wishlists'"></create-wishlist-modal>

		<add-product-modal
			v-if="$route.name === 'WishlistDetail' || $route.name === 'Dashboard'"
		></add-product-modal>

		<add-friend-modal v-if="$route.name === 'Friends'"></add-friend-modal>

		<default-go-home />

		<default-account />
	</v-app-bar>
</template>

<script>
// Utilities
import { get, sync } from "vuex-pathify";
import AddFriendModal from "@/components/AddFriendModal";
import CreateGroupModal from "@/components/CreateGroupModal";
import CreateWishlistModal from "@/components/CreateWishlistModal";
import AddProductModal from "@/components/AddProductModal";

export default {
	name: "DefaultBar",

	components: {
		AddProductModal,
		CreateWishlistModal,
		CreateGroupModal,
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
	},

	computed: {
		...sync("app", ["mini", "drawer"]),
		name: get("route/meta"),
	},
};
</script>
