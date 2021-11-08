// Pathify
import { make } from "vuex-pathify";

// Data
const state = {
	firstname: null,
	lastname: null,
	image: null,
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
