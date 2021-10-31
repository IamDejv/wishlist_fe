<template>
	<v-container fluid> <product-list my /> </v-container>
</template>

<script>
import ProductList from "@/components/ProductList";

export default {
	name: "WishlistDetail",
	components: { ProductList },
};
</script>

<style scoped></style>
