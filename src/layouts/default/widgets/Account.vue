<template>
	<v-menu bottom left min-width="200" offset-y origin="top right" transition="scale-transition">
		<template v-slot:activator="{ attrs, on }">
			<v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</template>

		<v-list :tile="false" flat nav>
			<!--<app-bar-item :to="{ name: 'UserProfile' }">-->
			<!--<v-list-item-title v-text="t('menu.profile')" />-->
			<!--</app-bar-item>-->

			<app-bar-item to="/">
				<v-list-item-title v-text="t('menu.darkMode')" />

				<v-spacer />

				<v-col cols="auto">
					<v-switch
						:value="darkMode"
						class="ma-0 pa-0"
						color="secondary"
						hide-details
						@click="changeDarkMode"
					/>
				</v-col>
			</app-bar-item>

			<v-divider class="mb-2 mt-2" />

			<v-list-item>
				<v-row>
					<v-col cols="12" lg="6" md="6" xl="6" sm="6" xs="6">
						<v-list-item-title v-text="t('menu.language')" />
					</v-col>
					<v-col cols="12" lg="3" md="3" xl="3" sm="3" xs="3" class="pt-2">
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
					<v-col cols="12" lg="3" md="3" xl="3" sm="3" xs="3" class="pt-2">
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
			</v-list-item>

			<v-divider class="mb-2 mt-2" />

			<app-bar-item :to="{ name: 'SignOut' }">
				<v-list-item-title v-text="t('menu.logout')" />
			</app-bar-item>
		</v-list>
	</v-menu>
</template>

<script>
import AppBarItem from "@/components/BarItem";
import locale from "@/mixins/locale";

export default {
	name: "DefaultAccount",
	mixins: [locale],
	components: { AppBarItem },
	computed: {
		darkMode: () => JSON.parse(localStorage.getItem("dark-mode")),
		language: () => JSON.parse(localStorage.getItem("language")),
	},
	data() {
		return {
			languages: [
				{
					text: "Czech",
					image: "@/assets/cz_flag.png",
					value: "cs",
					active: true,
				},
				{
					text: "English",
					image: "@/assets/en_flag.png",
					value: "en",
					active: false,
				},
			],
		};
	},
	methods: {
		changeDarkMode() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			localStorage.setItem("dark-mode", JSON.stringify(this.$vuetify.theme.dark));
		},
		changeLanguage(lang) {
			localStorage.setItem("language", JSON.stringify(lang));
			this.$router.go();
		},
	},
};
</script>

<style scoped>
.hover {
	background-color: grey;
}
</style>
