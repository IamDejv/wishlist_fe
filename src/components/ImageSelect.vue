<template>
	<Splide :options="settings" v-if="!loading">
		<SplideSlide
			v-for="item in images"
			:key="item.name"
			style="cursor: pointer"
			@click.native="$emit('select', item)"
		>
			<v-hover v-slot="{ hover }">
				<div>
					<v-img
						max-width="150"
						max-height="100"
						height="100"
						width="150"
						:src="item.path | imagePath"
						:alt="item.name"
					></v-img>

					<v-fade-transition>
						<v-overlay
							v-if="hover || (item && item.path === image)"
							max-width="150"
							max-height="100"
							height="100"
							width="150"
							absolute
						>
							{{ item && item.path === image ? "Selected" : "" }}
						</v-overlay>
					</v-fade-transition>
				</div>
			</v-hover>
		</SplideSlide>
	</Splide>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import CONST from "@/consts";
import axios from "axios";
import locale from "@/mixins/locale";

export default {
	name: "ImageSelect",
	components: { Splide, SplideSlide },
	mixins: [locale],
	props: {
		image: String,
	},
	filters: {
		imagePath(path) {
			return `${CONST.API_HOST}/${path}`;
		},
	},
	data() {
		return {
			settings: {
				perPage: 5,
				wheel: true,
			},
			loading: true,
			images: [],
		};
	},
	mounted() {
		this.fetchImages();
	},
	methods: {
		fetchImages() {
			axios
				.get("images")
				.then((response) => {
					this.images = response.data;
				})
				.catch((e) => {
					this.snackbar = {
						open: true,
						message: e.response?.message || this.t("error.default"),
						type: "error",
					};
				})
				.finally(() => (this.loading = false));
		},
	},
};
</script>

<style scoped></style>
