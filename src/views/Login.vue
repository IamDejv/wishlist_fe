<template>
	<v-container fluid tag="section">
		<v-row justify="center">
			<v-col cols="12" md="5" lg="4" sm="8" xl="3">
				<v-card>
					<v-form ref="form" class="form">
						<v-row>
							<v-col>
								<div class="sign-in-header text-center">Sign in</div>
							</v-col>
						</v-row>
						<v-row>
							<v-col class="text-center">
								<v-btn
									x-large
									outlined
									color="#3b5998"
									icon
									elevation="2"
									fab
									class="mr-10"
									@click="onFacebookLogin"
								>
									<v-icon>mdi-facebook</v-icon>
								</v-btn>
								<v-btn
									x-large
									outlined
									color="#4C8BF5"
									icon
									elevation="2"
									fab
									class="ml-10"
									@click="onGoogleLogin"
								>
									<v-icon>mdi-google</v-icon>
								</v-btn>
							</v-col>
						</v-row>

						<v-divider class="my-5" />

						<v-row>
							<v-col>
								<v-text-field
									v-model="credentials.login"
									label="Email"
									:rules="[(v) => !!v || 'Email must be filled']"
									@keypress.enter="onLogin"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field
									v-model="credentials.password"
									:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
									:type="showPassword ? 'text' : 'password'"
									label="Password"
									:rules="[(v) => !!v || 'Password must be filled']"
									@keypress.enter="onLogin"
									@click:append="showPassword = !showPassword"
								/>
							</v-col>
						</v-row>
						<v-spacer />
						<v-row>
							<v-col>
								<v-btn
									x-large
									block
									color="info"
									class="white--text"
									@click="onLogin"
								>
									Login
								</v-btn>
							</v-col>
						</v-row>
						<v-row>
							<v-col class="text-center">
								<router-link
									:to="{ name: 'ForgotPassword' }"
									class="forgot-password"
								>
									Forgot Password?
								</router-link>
							</v-col>
						</v-row>
						<v-divider class="my-5" />
						<v-row>
							<v-col class="mx-10">
								<router-link
									:to="{ name: 'SignUp' }"
									class="v-btn white--text v-size--x-large v-btn--block success"
								>
									Create New Account
								</router-link>
							</v-col>
						</v-row>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import {auth, prepareErrorMessage} from "@/firebase/firebase";
import authMixin from "@/mixins/auth";
import firebase from "firebase/app";
import "firebase/auth";
import {sync} from "vuex-pathify";
import axios from "axios";

export default {
	name: "Login",

	mixins: [authMixin],

	data: () => ({
		credentials: {
			login: "",
			password: "",
		},
		staySigned: false,
		valid: true,
		showPassword: false,
	}),

	computed: {
		snackbar: sync("app/snackbar"),
		...sync("user", ["firstname", "lastname", "image"]),
	},

	methods: {
		onLogin() {
			if (this.validate()) {
				const { login, password } = {
					login: this.credentials.login.trim(),
					password: this.credentials.password,
				};
				auth.signInWithEmailAndPassword(login, password)
					.then((response) => {
						this.storeUser(response);
						this.$router.push({ name: "Dashboard" });
					})
					.catch((e) => {
						this.snackbar = {
							open: true,
							message: prepareErrorMessage(e),
							type: "error",
						};
					});
			}
		},

		onGoogleLogin() {
			const provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope("profile");
			provider.addScope("email");
			auth.signInWithPopup(provider)
				.then(async ({ additionalUserInfo }) => {
					axios.defaults.headers["Authentication"] =
						await this.getLoggedUser().getIdToken();

					this.firstname = additionalUserInfo.profile.given_name;
					this.lastname = additionalUserInfo.profile.family_name;
					this.image = additionalUserInfo.profile.picture;
					if (additionalUserInfo.isNewUser) {
						const body = {
							firstname: additionalUserInfo.profile.given_name,
							lastname: additionalUserInfo.profile.family_name,
							email: additionalUserInfo.profile.email,
						};
						this.signUp(body);
					} else {
						axios
							.get("me")
							.then(() => {
								this.$router.push({ name: "Dashboard" });
							})
							.catch((e) => {
								if (e.response) {
									if (e.response.status === 404) {
										const body = {
											firstname: additionalUserInfo.profile.given_name,
											lastname: additionalUserInfo.profile.family_name,
											email: additionalUserInfo.profile.email,
										};
										this.signUp(body);
									} else {
										this.snackbar = {
											open: true,
											message: e.response?.message || "Something went wrong",
											type: "error",
										};
									}
								}
							});
					}
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: prepareErrorMessage(e),
						type: "error",
					};
				});
		},

		onFacebookLogin() {
			const provider = new firebase.auth.FacebookAuthProvider();
			provider.addScope("user_birthday");
			auth.signInWithPopup(provider)
				.then((response) => {
					if (response.additionalUserInfo.isNewUser) {
						this.$router.push({ name: "SignUp" });
					} else {
						this.storeUser(response);
						this.$router.push({ name: "Dashboard" });
					}
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: prepareErrorMessage(e),
						type: "error",
					};
				});
		},

		signUp(body) {
			const url = "public/sign-up";

			axios
				.post(url, body)
				.then(() => {
					this.$router.push({ name: "Dashboard" });
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: e.response?.message || "Something went wrong",
						type: "error",
					};
				});
		},

		async storeUser() {
			localStorage.setItem("staySigned", JSON.stringify(this.staySigned));
		},

		validate() {
			return this.$refs.form.validate();
		},
	},
};
</script>

<style scoped>
section {
	margin-top: 10%;
}

.forgot-password {
	text-decoration: none;
}

.sign-in-header {
	font-family: "Roboto";
	font-size: xx-large;
	color: dimgrey;
}

.form {
	padding: 30px;
}

.block {
	max-width: 50%;
}
</style>
