<template>
	<v-container fluid tag="section">
		<v-row justify="center">
			<v-col cols="12" md="5" lg="4" sm="8" xl="3">
				<v-card>
					<v-form ref="form" class="form">
						<v-row>
							<v-col md="5">
								<v-btn class="text-right" color="grey darken-3" :to="{ name: 'Login' }" exact>
									<v-icon>mdi-arrow-left-bold</v-icon>
								</v-btn>
							</v-col>
							<v-col>
								<div class="sign-up-header">Sign up</div>
							</v-col>
						</v-row>

						<v-divider class="my-5" />

						<v-row>
							<v-col>
								<v-text-field
									v-model.trim="form.email"
									required
									label="Email"
									:disabled="registered"
									:rules="[
										(v) => !!v || 'Email must be filled',
										(v) =>
											!v ||
											/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
												v
											) ||
											'Email must be valid',
									]"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field
									v-model.trim="form.firstname"
									required
									label="Firstname"
									:rules="[(v) => !!v || 'Name must be filled']"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field
									v-model.trim="form.lastname"
									required
									label="Lastname"
									:rules="[(v) => !!v || 'Lastname must be filled']"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field
									v-model="form.password"
									required
									:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
									:type="showPassword ? 'text' : 'password'"
									label="Password"
									:rules="[(v) => !!v || 'Password must be filled']"
									@click:append="showPassword = !showPassword"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field
									v-model="form.passwordAgain"
									required
									label="Password again"
									:rules="[passwordFilled, passwordMatched]"
									:append-icon="showPasswordAgain ? 'mdi-eye' : 'mdi-eye-off'"
									:type="showPasswordAgain ? 'text' : 'password'"
									@click:append="showPasswordAgain = !showPasswordAgain"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-btn
									min-width="150"
									color="info"
									class="white--text float-right"
									@click="signUp"
								>
									SignUp
								</v-btn>
							</v-col>
						</v-row>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { auth, prepareErrorMessage } from "@/firebase/firebase";
import "firebase/auth";
import { sync } from "vuex-pathify";
import axios from "axios";
import authMixin from "@/mixins/auth";

export default {
	name: "SignUp",

	mixins: [authMixin],

	data: () => ({
		form: {
			firstname: "",
			lastname: "",
			email: "",
			password: "",
			passwordAgain: "",
		},
		showPassword: false,
		showPasswordAgain: false,
		registered: false,
	}),

	computed: {
		snackbar: sync("app/snackbar"),
	},

	created() {
		const user = this.getLoggedUser();
		if (user) {
			this.registered = true;
			this.form.email = user.email;
		}
	},

	methods: {
		async signUp() {
			if (this.validate()) {
				const { firstname, lastname, email, password, passwordAgain } = this.form;
				let successfulRegistration = false;

				if (password !== passwordAgain) return;

				if (!this.registered) {
					await auth
						.createUserWithEmailAndPassword(email, password)
						.then(async () => {
							axios.defaults.headers["Authentication"] =
								await auth.currentUser.getIdToken();

							successfulRegistration = true;
						})
						.catch((e) => {
							this.snackbar = {
								open: true,
								message: prepareErrorMessage(e),
								type: "error",
							};
						});
				} else {
					successfulRegistration = true;
				}

				if (successfulRegistration) {
					const body = {
						firstname,
						lastname: this.prepareLastname(lastname),
						email,
					};

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
				}
			}
		},

		prepareLastname(lastname) {
			if (Array.isArray(lastname)) {
				let preparedLastname = "";
				lastname.forEach((item) => {
					if (preparedLastname === "") {
						preparedLastname = item;
					} else {
						preparedLastname += ` ${item}`;
					}
				});
				return preparedLastname;
			}
			return lastname;
		},

		validate() {
			return this.$refs.form.validate();
		},

		passwordFilled(v) {
			return !!v || "Password must be filled";
		},

		passwordMatched(v) {
			return v === this.form.password || "Passwords does not match";
		},
	},
};
</script>

<style scoped>
section {
	margin-top: 10%;
}

.sign-up-header {
	font-family: "Roboto";
	font-size: xx-large;
	color: dimgrey;
}

.form {
	padding: 30px;
}
</style>
