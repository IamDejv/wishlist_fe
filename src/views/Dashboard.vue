<template>
	<v-container fluid>
		<product-list my />
	</v-container>
</template>

<script>
import ProductList from "@/components/ProductList";

export default {
	name: "Dashboard",
	components: { ProductList },
	data() {
		return {
			products: [],
			skeletons: 0,
			loading: true,
		};
	},
};
</script>

<style scoped></style>
