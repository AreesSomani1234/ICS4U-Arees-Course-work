<template>
  <button class="button" @click="addToCart">
    Add To Cart
  </button>

  <button class="button" @click="removeFromCart">
    Remove From Cart
  </button>
</template>

<script setup>
const emit = defineEmits(['add-to-cart', 'remove-from-cart'])

function addToCart() {
  emit('add-to-cart', 2234)
}

function removeFromCart() {
  emit('remove-from-cart', 2234)
}
</script>