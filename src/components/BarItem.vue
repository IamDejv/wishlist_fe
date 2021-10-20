<script>
import { VHover, VListItem } from "vuetify/lib";
import { get } from "vuex-pathify";

export default {
	name: "AppBarItem",

	computed: {
		dark: get("user/dark"),
	},

	methods: {
		getClass(hover) {
			if (this.$vuetify.theme.dark) {
				return {
					"white--text": !hover,
					"white--text secondary elevation-12": hover,
				};
			} else {
				return {
					"black--text": !hover,
					"white--text secondary elevation-12": hover,
				};
			}
		},
	},

	render(h) {
		return h(VHover, {
			scopedSlots: {
				default: ({ hover }) => {
					return h(
						VListItem,
						{
							attrs: this.$attrs,
							class: this.getClass(hover),
							props: {
								activeClass: "",
								dark: hover,
								link: true,
								...this.$attrs,
							},
						},
						this.$slots.default
					);
				},
			},
		});
	},
};
</script>
