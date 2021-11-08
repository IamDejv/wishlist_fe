export default {
	methods: {
		t(key) {
			return this.$vuetify.lang.t(`$vuetify.${key}`);
		},
	},
};
