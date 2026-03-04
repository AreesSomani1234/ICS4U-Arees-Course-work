<template>
  <div>
    <h1>{{ title }}</h1>

    <ProductDisplay
      :premium="premium"
      @add-to-cart="updateCart"
      @remove-from-cart="removeItem"
    />

    <p>{{ description }}</p>

    <img :src="image" :alt="product" :class="{ 'out-of-stock-img': !inStock }" />

    <h3>Variant Colors</h3>
    <div
      v-for="variant in variants"
      :key="variant.id"
      class="color-circle"
      @mouseover="updateImage(variant.image)"
      :style="{ backgroundColor: variant.color }">
    </div>

    <h3>Sizes</h3>
    <ul>
      <li v-for="size in sizes" :key="size">{{ size }}</li>
    </ul>

    <p>Cart: {{ cart.length }}</p>
    <p>{{ saleMessage }}</p>

    <!-- Lesson 10 -->
    <ReviewForm @review-submitted="addReview" />

    <div v-if="reviews.length">
      <h3>Reviews:</h3>
      <ul>
        <li v-for="(r, index) in reviews" :key="index">
          {{ r.name }} gave {{ r.rating }} stars
          <br />
          "{{ r.review }}"
          <br />
          Recommended: {{ r.recommend }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import ProductDisplay from './components/ProductDisplay.vue'
import ReviewForm from './components/ReviewForm.vue'

import greenSocks from './assets/images/green_socks.jpg'
import blueSocks from './assets/images/bluesocks.jpg'

const premium = ref(true)

const brand = ref('Vue Mastery')
const product = ref('Socks')

const title = computed(() => brand.value + ' ' + product.value)

const description = ref('Warm, comfortable socks for everyday wear.')
const sizes = ref(['S', 'M', 'L', 'XL'])

const onSale = ref(true)
const saleMessage = computed(() =>
  onSale.value ? `${title.value} is on sale` : `${title.value} is not on sale`
)

/* Lesson 9: cart is an array of product IDs */
const cart = ref([])

const image = ref(greenSocks)
const inStock = ref(true)

const variants = ref([
  { id: 2234, color: 'green', image: greenSocks },
  { id: 2235, color: 'blue', image: blueSocks }
])

/* Lesson 10: reviews list */
const reviews = ref([])

function addReview(review) {
  reviews.value.push(review)
}

function updateCart(id) {
  cart.value.push(id)
}

function removeItem(id) {
  const index = cart.value.indexOf(id)
  if (index > -1) {
    cart.value.splice(index, 1)
  }
}

function updateImage(variantImage) {
  image.value = variantImage
}
</script>