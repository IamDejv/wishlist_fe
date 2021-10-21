import firebase from "firebase/app";
import "firebase/auth";
import "firebase/messaging";
import { fetcher } from "@/utils/fetcher";

// firebase init - add your own config here
const firebaseConfig = {
	apiKey: "AIzaSyDmEDuX2cqJMIRXg-FFL-oEfL_hER0H7Hw",
	authDomain: "wishlist-e7ce0.firebaseapp.com",
	projectId: "wishlist-e7ce0",
	storageBucket: "wishlist-e7ce0.appspot.com",
	messagingSenderId: "734967465344",
	appId: "1:734967465344:web:a15fc3f0cf883a0a8aed65",
	measurementId: "G-8BD7M00EGP",
};
firebase.initializeApp(firebaseConfig);

let messaging = null;
if (firebase.messaging.isSupported()) {
	messaging = firebase.messaging();
}

function getToken() {
	if (messaging === null) return;
	// Add the public key generated from the console here.
	return messaging
		.getToken({
			vapidKey:
				"BDyhFbJrcM15NHGJTaQxPc8iW_5N9urEVOANWdzzW1QZ2e6RvjucRFtyp0sv-zE4Vu1cZmN-oDSlXIBMucPSAXQ",
		})
		.then((currentToken) => {
			if (currentToken) {
				return currentToken;
			}
		})
		.catch((err) => {
			console.log("An error occurred while retrieving token. ", err);
		});
}

async function subscribe(topic) {
	const token = await getToken();
	if (!token) return;
	await fetcher({
		uri: "subscribe",
		auth: true,
		method: "POST",
		body: {
			token,
			topic,
		},
	});
}

async function unsubscribe(topic) {
	const token = await getToken();
	if (!token) return;
	await fetcher({
		uri: "unsubscribe",
		auth: true,
		method: "DELETE",
		body: {
			token,
			topic,
		},
	});
}

// utils
const auth = firebase.auth();

function prepareErrorMessage({ code }) {
	switch (code) {
		case "auth/account-exists-with-different-credential":
			return "Account exists with different credentials";
		case "auth/email-already-in-use":
			return "Email already in use";
		case "auth/popup-closed-by-user":
			return "Login window closed";
		case "auth/invalid-email":
			return "Invalid email";
		case "auth/user-not-found":
		case "auth/invalid-credential":
			return "Invalid Credential";
		case "auth/id-token-expired":
			return "Login expired";
		default:
			return "Something went wrong";
	}
}

// export utils/refs
export { auth, prepareErrorMessage, firebaseConfig, getToken, subscribe, unsubscribe, messaging };
