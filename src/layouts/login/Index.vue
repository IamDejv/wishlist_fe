<template>
	<v-app>
		<div>
			<div class="float-right mt-2 mr-2">
				<v-row>
					<v-col>
						<v-hover v-slot="{ hover }">
							<v-card
								:elevation="hover || language === 'cs' ? 15 : 0"
								tile
								@click="changeLanguage('cs')"
							>
								<v-img height="25" width="30" src="@/assets/cz_flag.png"> </v-img>
							</v-card>
						</v-hover>
					</v-col>
					<v-col>
						<v-hover v-slot="{ hover }">
							<v-card
								:elevation="hover || language === 'en' ? 15 : 0"
								tile
								@click="changeLanguage('en')"
							>
								<v-img height="25" width="30" src="@/assets/en_flag.png"> </v-img>
							</v-card>
						</v-hover>
					</v-col>
				</v-row>
			</div>
		</div>
		<login-view />

		<login-footer />
	</v-app>
</template>

<script>
import locale from "@/mixins/locale";

export default {
	name: "LoginLayout",
	mixins: [locale],
	computed: {
		language: () => JSON.parse(localStorage.getItem("language")),
	},
	components: {
		LoginFooter: () =>
			import(
				/* webpackChunkName: "login-footer" */
				"./Footer"
			),
		LoginView: () =>
			import(
				/* webpackChunkName: "login-view" */
				"./View"
			),
	},
	methods: {
		changeLanguage(lang) {
			localStorage.setItem("language", JSON.stringify(lang));
			this.$router.go();
		},
	},
};
</script>
