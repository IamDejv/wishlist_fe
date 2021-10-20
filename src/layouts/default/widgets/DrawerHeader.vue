<template>
	<v-list-item class="mb-0 justify-space-between pl-3">
		<v-img :src="require('@/assets/logo.png')" />
	</v-list-item>
</template>

<script>
// Utilities
import { get } from "vuex-pathify";

export default {
	name: "DefaultDrawerHeader",

	computed: { version: get("app/version") },
};
</script>
