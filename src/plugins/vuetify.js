import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import VueI18n from "vue-i18n";

Vue.use(Vuetify);
Vue.use(VueI18n);

const messages = {
	en: {
		$vuetify: {
			dataIterator: {
				rowsPerPageText: "Items per row:",
				pageText: "{0}-{1} of {2}",
				loadingText: "Loading",
			},
			dataTable: {
				itemsPerPageText: "Items per page:",
				pageText: "{0}-{1} of {2}",
			},
			dataFooter: {
				pageText: "{0}-{1} of {2}",
			},
			menu: {
				home: "Home",
				friends: "Friends",
				groups: "Groups",
				wishlists: "Wishlists",
				logout: "Logout",
				darkMode: "Dark Mode",
				profile: "Profile",
				language: "Language",
			},
			error: {
				default: "Something went wrong",
			},
			form: {
				save: "Save",
				close: "Close",
				cancel: "Cancel",
				skip: "Skip",
				continue: "Continou",
				product: {
					link: "Product link",
					linkPlaceholder: "Link where to buy product",
					name: "Name",
					description: "Description",
					price: "Price",
					createOrEdit: "Create or edit product",
				},
				group: {
					name: "Name",
					description: "Description",
					type: "Type",
					image: "Image",
				},
				wishlist: {
					name: "Name",
					image: "Image",
				},
			},
			groups: {
				wishlist: "Wishlist",
				addToGroup: "Add to group",
				removeFromGroup: "Remove from group",
			},
			friends: {
				firstname: "Firstname",
				lastname: "Lastname",
				actions: "Actions",
				search: "Search",
			},
			snackbar: {
				productEdited: "Product Edited",
				productAdded: "Product Added",
				userRemoved: "User removed from friends",
				groupEdited: "Group edited",
				groupCreated: "Group created",
				wishlistCreated: "Wishlist created",
				wishlistEdited: "Wishlist edited",
				friendAdded: "Friend added",
			},
			button: {
				addProduct: "Product added",
				addWishlist: "Wishlist added",
				editWishlist: "Wishlist edited",
				addGroup: "Add Group",
				editGroup: "Edit group",
				addFriend: "Add friend",
			},
			edit: "Edit",
			members: "Members",
			toStore: "To Store",
			fourOhFour: {
				text: "Page not found :(",
				back: "Get me out",
				home: "Home",
			},
			login: {
				email: "Email",
				password: "Password",
				loginText: "Login",
				login: "Login",
				forgotPassword: "Forgot password?",
				createAccount: "Create new account",
			},
			signUp: {
				signUpText: "Signup",
				signUp: "Signup",
				email: "Email",
				password: "Password",
				passwordAgain: "Password again",
				firstname: "Firstname",
				lastname: "Lastname",
				passwordsNotMatch: "Passwords does not match",
			},
			options: {
				group: {
					basic: "Basic",
					secretSanta: "Secret Santa",
				},
			},
			empty: "Empty",
		},
	},
	cs: {
		$vuetify: {
			dataIterator: {
				rowsPerPageText: "Na stránku:",
				pageText: "{0}-{1} av {2}",
				loadingText: "Načítání",
			},
			dataTable: {
				itemsPerPageText: "Na stránku:",
				pageText: "{0}-{1} av {2}",
			},
			dataFooter: {
				pageText: "{0}-{1} of {2}",
			},
			menu: {
				home: "Domů",
				friends: "Přátelé",
				groups: "Skupiny",
				wishlists: "Seznam přání",
				logout: "Odhlásit se",
				darkMode: "Tmavý režim",
				profile: "Profil",
				language: "Jazyk",
			},
			error: {
				default: "Něco se pokazilo",
			},
			form: {
				save: "Uložit",
				close: "Zavřít",
				cancel: "Zrušit",
				skip: "Přeskočit",
				continue: "Pokračovat",
				product: {
					link: "Odkaz na produkt",
					linkPlaceholder: "Odkaz, kde koupit produkt",
					name: "Název",
					description: "Popis",
					price: "Cena",
					createOrEdit: "Vytvořit nebo upravit produkt",
				},
				group: {
					name: "Název",
					description: "Popis",
					type: "Typ",
					image: "Obrázek",
				},
				wishlist: {
					name: "Název",
					image: "Obrázek",
				},
			},
			groups: {
				wishlist: "Přání",
				addToGroup: "Přidat do skupiny",
				removeFromGroup: "Odstranit ze skupiny",
			},
			friends: {
				firstname: "Jméno",
				lastname: "Přijmení",
				actions: "Akce",
				search: "Vyhledávání",
			},
			snackbar: {
				productEdited: "Produkt upraven",
				productAdded: "Produkt přidán do seznamu",
				userRemoved: "Uživatel odebrán z přátel",
				groupEdited: "Skupina upravena",
				groupCreated: "Skupina vytvořena",
				wishlistCreated: "Přání vytvořeno",
				wishlistEdited: "Přání upraveno",
				friendAdded: "Přítel přidán",
			},
			button: {
				addProduct: "Přidat produkt",
				addWishlist: "Přidat prání",
				editWishlist: "Upravit prání",
				addGroup: "Přidat skupinu",
				editGroup: "Upravit Skupinu",
				addFriend: "Přidat přítele",
			},
			edit: "Úpravy",
			members: "Členové",
			toStore: "Do obchodu",
			fourOhFour: {
				text: "Stránka nenalezena :(",
				back: "Dostaň mě zpět",
				home: "Domů",
			},
			login: {
				email: "Email",
				password: "Heslo",
				loginText: "Přihlášení",
				login: "Přihlasit",
				forgotPassword: "Zapomenté heslo?",
				createAccount: "Vytvořit účet",
			},
			signUp: {
				signUpText: "Registrace",
				signUp: "Registrovat",
				email: "Email",
				password: "Heslo",
				passwordAgain: "Heslo znovu",
				firstname: "Jméno",
				lastname: "Příjmení",
				passwordsNotMatch: "Hesla se neshodují",
			},
			options: {
				group: {
					basic: "Normální",
					secretSanta: "Tajný santa",
				},
			},
			empty: "Prázdné",
		},
	},
};

function getLanguage() {
	const language = localStorage.getItem("language");
	return JSON.parse(language);
}

// Create VueI18n instance with options
const i18n = new VueI18n({
	locale: getLanguage() || "cs", // set locale
	messages, // set locale messages
});

function isDark() {
	const darkMode = localStorage.getItem("dark-mode");
	return JSON.parse(darkMode);
}

export default new Vuetify({
	icons: {
		iconfont: "mdi",
	},
	theme: {
		dark: isDark(),
	},
	lang: {
		t: (key, ...params) => i18n.t(key, params),
	},
});
