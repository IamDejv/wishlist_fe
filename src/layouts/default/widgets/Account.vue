<template>
	<v-menu bottom left min-width="200" offset-y origin="top right" transition="scale-transition">
		<template v-slot:activator="{ attrs, on }">
			<v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</template>

		<v-list :tile="false" flat nav>
			<app-bar-item :to="{ name: 'UserProfile' }">
				<v-list-item-title v-text="'Profile'" />
			</app-bar-item>

			<app-bar-item to="/">
				<v-list-item-title v-text="'Dark Mode'" />

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

			<app-bar-item :to="{ name: 'SignOut' }">
				<v-list-item-title v-text="'Logout'" />
			</app-bar-item>
		</v-list>
	</v-menu>
</template>

<script>
import AppBarItem from "@/components/BarItem";

export default {
	name: "DefaultAccount",

	components: { AppBarItem },

	computed: {
		darkMode: () => JSON.parse(localStorage.getItem("dark-mode")),
	},

	methods: {
		changeDarkMode() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			localStorage.setItem("dark-mode", JSON.stringify(this.$vuetify.theme.dark));
		},
	},
};
</script>
