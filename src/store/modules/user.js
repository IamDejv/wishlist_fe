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
	// SET_FIRSTNAME(state, value) {
	// 	state.firstname = value;
	// },
	// SET_LASTNAME(state, value) {
	// 	state.lastname = value;
	// },
	// SET_IMAGE(state, value) {
	// 	state.image = value;
	// },
};

const actions = {
	...make.actions(state),
	// setFirstname({ commit }, value) {
	// 	commit("SET_FIRSTNAME", value);
	// },
};

const getters = make.getters(state);

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
