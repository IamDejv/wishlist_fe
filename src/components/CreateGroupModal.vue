<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" dark v-bind="attrs" v-on="on">
					<v-icon>mdi-plus</v-icon> Create Group
				</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="text-h5">Create Group</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>

						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
					<v-btn color="blue darken-1" text @click="dialog = false"> Save </v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	name: "CreateGroupModal",
	data() {
		return {
			dialog: false,
		};
	},
};
</script>

<style scoped></style>
