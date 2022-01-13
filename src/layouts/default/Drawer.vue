<template>
	<v-navigation-drawer
		id="default-drawer"
		v-model="drawer"
		:right="$vuetify.rtl"
		:mini-variant.sync="mini"
		mini-variant-width="80"
		app
		width="260"
	>
		<div class="px-2">
			<v-divider class="mx-3 mb-2" />

			<default-list :items="items" />
		</div>

		<template #append>
			<div class="pa-4 text-center">
				<v-btn block class="text-none" @click="logout">
					<v-icon left> mdi-exit-to-app </v-icon>

					{{ t("menu.logout") }}
				</v-btn>
			</div>
		</template>

		<div class="pt-12" />
	</v-navigation-drawer>
</template>

<script>
// Utilities
import { get, sync } from "vuex-pathify";
import locale from "@/mixins/locale";

export default {
	name: "DefaultDrawer",
	mixins: [locale],
	components: {
		DefaultList: () =>
			import(
				/* webpackChunkName: "default-list" */
				"./List"
		),
	},
	computed: {
		...get("user", ["gradient", "image"]),
		...get("app", ["items", "version", "darkMode"]),
		...sync("app", ["drawer", "drawerImage", "mini"]),
	},
	methods: {
		logout() {
			this.$router.push("/sign-out");
		},
	},
};
</script>

<style lang="sass">
#default-drawer
	.v-list-item
		margin-bottom: 8px

	.v-list-item::before,
	.v-list-item::after
		display: none

	.v-list-group__header__prepend-icon,
	.v-list-item__icon
		margin-top: 12px
		margin-bottom: 12px
		margin-left: 4px

	&.v-navigation-drawer--mini-variant
		.v-list-item
			justify-content: flex-start !important
</style>
