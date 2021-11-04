import Vue from "vue";

export const EventBus = new Vue();

export const GROUP_CREATED = "groupCreated";
export const GROUP_EDITED = "groupEdited";
export const WISHLIST_CREATED = "wishlistCreated";
export const WISHLIST_EDITED = "wishlistEdited";
export const FRIEND_ADDED = "friendAdded";
export const WISHLIST_SET_ACTIVE = "wishlistSetActive";
export const GROUP_SET_ACTIVE = "groupSetActive";
export const PRODUCT_ADDED = "productAdded";
export const PRODUCT_REMOVED = "productRemoved";
export const EDIT_PRODUCT = "editProduct";
export const PRODUCT_EDITED = "productEdited";
