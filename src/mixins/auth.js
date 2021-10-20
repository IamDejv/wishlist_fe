import firebase from "firebase/app";
import "firebase/auth";

export default {
	methods: {
		getLoggedUser() {
			return firebase.auth().currentUser;
		},

		getLoggedUserId() {
			return this.getLoggedUser().uid;
		},

		async signOut() {
			return firebase.auth().signOut();
		},

		async getTokenResult() {
			return this.getLoggedUser().getIdTokenResult();
		},
	},
};
