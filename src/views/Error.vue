<template>
	<v-container id="error-view" class="fill-height text-center" tag="section">
		<v-row justify="center">
			<v-col cols="auto">
				<h1 class="text-h1 mb-16 font-weight-bold">404</h1>

				<div class="text-h4 pt-8 pb-10">
					{{ t("fourOhFour.text") }}
				</div>

				<v-btn depressed large to="/"> {{ t("fourOhFour.home") }} </v-btn>
				<v-btn class="ml-5" depressed large @click="$router.go(-1)">
					{{ t("fourOhFour.back") }}
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import locale from "@/mixins/locale";

export default {
	name: "Error",
	mixins: [locale],
};
</script>

<style lang="sass">
#error-view h1.text-h1
	font-size: 14rem !important
</style>
