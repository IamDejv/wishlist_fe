<template>
	<v-container fluid> <product-list my :wishlist-id="$route.params.wishlistId" /> </v-container>
</template>

<script>
import ProductList from "@/components/ProductList";

export default {
	name: "WishlistDetail",
	components: { ProductList },
};
</script>

<style scoped></style>
