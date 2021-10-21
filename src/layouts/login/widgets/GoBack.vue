<template>
	<v-btn class="ml-2 text-right" min-width="0" text :to="{ name: 'Login' }" exact>
		<v-icon>mdi-arrow-left-bold</v-icon>
	</v-btn>
</template>

<script>
export default {
	name: "GoBack",
};
</script>
