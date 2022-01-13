import Vue from "vue"
import vuetify from "@/plugins/vuetify"

import VuetifyDialog from "vuetify-dialog"
import "vuetify-dialog/dist/vuetify-dialog.css"

Vue.use(VuetifyDialog, {
	context: {
		vuetify,
	},
	confirm: {
		actions: {
			false: "Zrušit",
			true: {
				text: "Potvrdit",
				color: "yellow darken-1",
			},
		},
		width: 300,
	},
	warning: {},
	error: {},
	prompt: {},
	},
)
