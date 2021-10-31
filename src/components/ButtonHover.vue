<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				class="mx-2"
				fab
				small
				icon
				:color="color"
				v-bind="attrs"
				v-on="on"
				@click="$emit('onClick')"
			>
				<v-icon dark>{{ icon }}</v-icon>
			</v-btn>
		</template>
		<span>{{ tooltip }}</span>
	</v-tooltip>
</template>

<script>
export default {
	name: "ButtonHover",

	props: {
		icon: String,
		tooltip: String,
		color: String,
		position: String,
	},
};
</script>

<style scoped></style>
