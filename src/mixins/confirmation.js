export default {
	methods: {
		async confirm({ title, text, type }) {
			return this.$dialog.confirm({
				title,
				text,
				color: this.getColor(type),
				actions: {
					false: "Zrušit",
					true: {
						text: "Potvrdit",
						color: this.getColor(type),
					},
				},
			});
		},

		getColor(type) {
			switch (type) {
				case "error":
					return "red";
				case "info":
					return "blue";
				case "success":
					return "green";
				case "warning":
					return "orange";
				default:
					return "black";
			}
		},
	},
};
