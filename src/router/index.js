import Vue from "vue";
import VueRouter from "vue-router";
import { layout, route } from "@/utils/routes";
import auth from "@/mixins/auth";

Vue.use(VueRouter);

const routes = [
	layout("Default", [
		route("Dashboard", null, "", {
			requiresAuth: true,
		}),
		route("Friends", null, "friends", {
			requiresAuth: true,
		}),
		route("Groups", null, "groups", {
			requiresAuth: true,
		}),
		route("Wishlists", null, "wishlists", {
			requiresAuth: true,
		}),
		route("Products", null, "products", {
			requiresAuth: true,
		}),
	]),
	layout("Login", [
		route("Login", "Login", "login"),
		route("SignUp", null, "sign-up"),
		route("ForgotPassword", null, "forgot-password"),
		route("SignOut", null, "sign-out", null, (to, from, next) => {
			auth.methods.signOut().then(() => {
				localStorage.removeItem("role");
				next("/login");
			});
		}),
		route("Error", null, "/*"),
	]),
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
