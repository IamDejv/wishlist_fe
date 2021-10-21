<template>
	<v-list-item class="mb-0 justify-space-between">
		<v-col class="text-center">
			<img :src="image" alt="image" />
			<div>{{ firstname }} {{ lastname }}</div>
		</v-col>
	</v-list-item>
</template>

<script>
// Utilities
import { get } from "vuex-pathify";

export default {
	name: "DefaultDrawerHeader",

	computed: {
		version: get("app/version"),
		...get("user", ["image", "firstname", "lastname"]),
	},
};
</script>
