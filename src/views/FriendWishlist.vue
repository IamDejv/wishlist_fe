<template>
	<v-container fluid> <product-list /> </v-container>
</template>

<script>
import ProductList from "@/components/ProductList";

export default {
	name: "FriendWishlist",
	components: { ProductList },
};
</script>

<style scoped></style>
