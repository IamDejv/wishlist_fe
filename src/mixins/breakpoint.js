export default {
	computed: {
		isSmall() {
			return this.$vuetify.breakpoint.name === "sm";
		},
		isExtraSmall() {
			return this.$vuetify.breakpoint.name === "xs";
		},
		isMedium() {
			return this.$vuetify.breakpoint.name === "md";
		},
		isLarge() {
			return this.$vuetify.breakpoint.name === "lg" || this.$vuetify.breakpoint.name === "xl";
		},
	},
};
