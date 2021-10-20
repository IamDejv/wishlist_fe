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
	mini: false,
	items: [
		{
			title: "Home",
			icon: "mdi-view-dashboard",
			to: "/",
		},
	],
};

const mutations = make.mutations(state);

const actions = {
	...make.actions(state),
	init: async ({ dispatch }) => {
		console.log(dispatch);
	},
};

const getters = {};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
