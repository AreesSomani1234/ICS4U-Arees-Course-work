<template>
  <div>
    <h1>{{ product }}</h1>
    <p>{{ description }}</p>

    <!-- Product image (changes on hover) -->
    <img :src="image" :alt="product" />

    <h3>Variant Colors</h3>
    <ul>
      <li
        v-for="variant in variants"
        :key="variant.id"
        @mouseover="updateImage(variant.image)"
      >
        {{ variant.color }}
      </li>
    </ul>

    <h3>Sizes</h3>
    <ul>
      <li v-for="size in sizes" :key="size">{{ size }}</li>
    </ul>

    <p>Cart: {{ cart }}</p>

    <button @click="addToCart">Add To Cart</button>
    <button @click="removeFromCart">Remove from Cart</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ✅ Import images from src/assets (Vite requires this)
import greenSocks from './assets/images/green_socks.jpg'
import blueSocks from './assets/images/bluesocks.jpg'

const product = ref('Socks')
const description = ref('Warm, comfortable socks for everyday wear.')
const sizes = ref(['S', 'M', 'L', 'XL'])

const cart = ref(0)

const image = ref(greenSocks) // default image

const variants = ref([
  { id: 2234, color: 'green', image: greenSocks },
  { id: 2235, color: 'blue', image: blueSocks }
])

function addToCart() {
  cart.value += 1
}

function removeFromCart() {
  cart.value -= 1
}

function updateImage(variantImage) {
  image.value = variantImage
}
</script>