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

		<create-group-modal></create-group-modal>

		<add-friend-modal></add-friend-modal>

		<default-go-home />

		<default-account />
	</v-app-bar>
</template>

<script>
// Utilities
import { get, sync } from "vuex-pathify";
import AddFriendModal from "@/components/AddFriendModal";
import CreateGroupModal from "@/components/CreateGroupModal";

export default {
	name: "DefaultBar",

	components: {
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
