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
			title: "home",
			icon: "mdi-view-dashboard",
			to: "/",
		},
		{
			title: "friends",
			icon: "mdi-account-multiple",
			to: "/friends",
		},
		{
			title: "groups",
			icon: "mdi-account-group",
			to: "/groups",
		},
		{
			title: "wishlists",
			icon: "mdi-gift",
			to: "/wishlists",
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
