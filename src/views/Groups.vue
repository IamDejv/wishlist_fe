<template>
	<v-container fluid>
		<v-row>
			<v-row v-if="loading">
				<v-col
					v-for="skeleton in skeletons"
					:key="skeleton"
					cols="12"
					xl="3"
					lg="4"
					md="6"
					sm="6"
					xs="12"
				>
					<v-sheet height="325" width="350" style="border-radius: 8px">
						<v-skeleton-loader type="image, card-heading"></v-skeleton-loader>
						<v-spacer></v-spacer>
						<v-skeleton-loader class="pl-3 pt-5" type="button"></v-skeleton-loader>
					</v-sheet>
				</v-col>
			</v-row>
			<v-row v-else>
				<v-col
					v-for="group in groups"
					:key="group.id"
					cols="12"
					xl="3"
					lg="4"
					md="6"
					sm="6"
					xs="12"
				>
					<group-card :group="group" />
				</v-col>
			</v-row>
		</v-row>
	</v-container>
</template>

<script>
import GroupCard from "@/components/GroupCard";
import axios from "axios";
import { sync } from "vuex-pathify";
import { EventBus, GROUP_CREATED, GROUP_SET_ACTIVE } from "@/utils/event-bus";

export default {
	name: "Groups",
	components: { GroupCard },
	data() {
		return {
			groups: [],
			skeletons: 0,
			loading: true,
		};
	},
	created() {
		this.setSkeletons();
		EventBus.$on(GROUP_CREATED, (group) => this.groups.push(group));
		EventBus.$on(GROUP_SET_ACTIVE, (group) => this.onChangeGroupActive(group));
		this.fetchData();
	},
	computed: {
		snackbar: sync("app/snackbar"),
	},
	methods: {
		setSkeletons() {
			switch (this.$vuetify.breakpoint.name) {
				case "xs":
					this.skeletons = 1;
					break;
				case "sm":
					this.skeletons = 2;
					break;
				case "md":
					this.skeletons = 3;
					break;
				case "lg":
					this.skeletons = 3;
					break;
				case "xl":
					this.skeletons = 4;
					break;
			}
		},
		fetchData() {
			axios
				.get("me/groups")
				.then((response) => {
					this.groups = response.data;
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: e.response?.message || "Something went wrong",
						type: "error",
					};
				})
				.finally(() => (this.loading = false));
		},
		onChangeGroupActive(group) {
			this.groups = this.groups.map((item) => {
				if (item.id === group.id) {
					item.active = group.active;
				} else {
					item.active = false;
				}
				return item;
			});
		},
	},
};
</script>

<style scoped></style>
