<template>
	<v-container fluid>
		<v-row justify="center">
			<v-col v-for="group in groups" :key="group.id" cols="12" xl="3" lg="3" md="4" sm="5">
				<GroupCard :group="group" :users="users[group.id]" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import GroupCard from "@/components/GroupCard";

export default {
	name: "Groups",
	components: { GroupCard },
	data() {
		return {
			groups: [
				{
					id: 1,
					name: "Christmas 2021",
					description: "Christmas 2021 for my family",
					image: "https://www.history.com/.image/t_share/MTY4ODE4ODA4MzY1MDAwNDY1/christmas-gettyimages-184652817.jpg",
				},
				{
					id: 2,
					name: "Christmas 2020",
					description: "Christmas 2020 for my family",
					image: "https://www.history.com/.image/t_share/MTY4ODE4ODA4MzY1MDAwNDY1/christmas-gettyimages-184652817.jpg",
				},
				{
					id: 3,
					name: "Christmas 2019",
					description: "Christmas 2019 for my family",
					image: "https://www.history.com/.image/t_share/MTY4ODE4ODA4MzY1MDAwNDY1/christmas-gettyimages-184652817.jpg",
				},
			],
			users: {
				1: [
					{
						id: "someid",
						firstname: "David",
						lastname: "Kalianko",
					},
					{
						id: "someid2",
						firstname: "Darina",
						lastname: "Plachetkova",
					},
				],
				2: [
					{
						id: "someid",
						firstname: "David",
						lastname: "Kalianko",
					},
					{
						id: "someid2",
						firstname: "Darina",
						lastname: "Plachetkova",
					},
				],
				3: [
					{
						id: "someid",
						firstname: "David",
						lastname: "Kalianko",
					},
					{
						id: "someid2",
						firstname: "Darina",
						lastname: "Plachetkova",
					},
				],
			},
		};
	},
};
</script>

<style scoped></style>
