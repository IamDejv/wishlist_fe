import Vue from "vue";
import VueRouter from "vue-router";
import { layout, route } from "@/utils/routes";
import auth from "@/mixins/auth";

Vue.use(VueRouter);

const requireAuth = async (to, form, next) => {
	if (auth.methods.getLoggedUser()) {
		next();
	} else {
		next("sign-out");
	}
};

const isAuth = async (to, from, next) => {
	if (auth.methods.getLoggedUser()) {
		next();
	} else {
		next();
	}
};

const routes = [
	layout(
		"Default",
		[
			route("Dashboard", null, ""),
			route("Friends", null, "friends"),
			route("Groups", null, "groups"),
			route("GroupDetail", null, "groups/:groupId"),
			route("WishlistDetail", null, "wishlists/:wishlistId"),
			route("FriendWishlist", "WishlistDetail", "friends/:userId"),
			route("Wishlists", null, "wishlists"),
			route("ProductDetail", null, "products/:productId"),
			route("UserProfile", null, "profile"),
		],
		"",
		{},
		requireAuth
	),
	layout(
		"Login",
		[
			route("Login", "Login", "login"),
			route("SignUp", null, "sign-up"),
			route("ForgotPassword", null, "forgot-password"),
			route("SignOut", null, "sign-out", null, (to, from, next) => {
				auth.methods.signOut().then(() => {
					next("/login");
				});
			}),
			route("Error", null, "/*"),
		],
		"",
		{},
		isAuth
	),
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: (to, from, savedPosition) => {
		if (to.hash) return { selector: to.hash };
		if (savedPosition) return savedPosition;

		return { x: 0, y: 0 };
	},
});

export default router;
