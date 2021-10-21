// Pathify
import { make } from "vuex-pathify";

// Data
const state = {
	drawer: null,
	drawerImage: false,
	snackbar: {
		type: "success",
		message: "Message",
		open: false,
	},
	darkMode: false,
	mini: false,
	items: [
		{
			title: "Home",
			icon: "mdi-view-dashboard",
			to: "/",
		},
		{
			title: "Friends",
			icon: "mdi-account-multiple",
			to: "/friends",
		},
		{
			title: "Groups",
			icon: "mdi-account-group",
			to: "/groups",
		},
		{
			title: "Wishlists",
			icon: "mdi-note-edit",
			to: "/wishlists",
		},
		{
			title: "Products",
			icon: "mdi-gift",
			to: "/products",
		},
	],
	version: "0.0.1",
};

const mutations = {
	...make.mutations(state),
};

const actions = {
	...make.actions(state),
};

const getters = make.getters(state);

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
