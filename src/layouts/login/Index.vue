<template>
	<v-app>
		<login-view />

		<login-footer />
	</v-app>
</template>

<script>
export default {
	name: "LoginLayout",

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
};
</script>
