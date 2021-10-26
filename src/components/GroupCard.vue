<template>
	<v-card class="mx-auto" max-width="344">
		<v-img :src="group.image" height="200px"></v-img>

		<v-card-title class="text-h3"> {{ group.name }} </v-card-title>

		<v-card-subtitle> {{ group.description }} </v-card-subtitle>

		<v-card-actions>
			<v-btn color="orange lighten-2" text> Explore </v-btn>

			<v-spacer></v-spacer>

			<span>
				<v-btn @click="show = !show">
					Users
					<v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
				</v-btn>
			</span>
		</v-card-actions>

		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>

				<v-card-text v-for="user in users" :key="user.id">
					{{ user.firstname }} {{ user.lastname }}
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-card>
</template>

<script>
export default {
	name: "GroupCard",

	props: {
		group: Object,
		users: Array,
	},

	data() {
		return {
			show: false,
		};
	},
};
</script>

<style scoped></style>
