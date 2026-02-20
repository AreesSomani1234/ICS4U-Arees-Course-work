<template>
  <div>
    <h1>{{ product }}</h1>
    <p>{{ description }}</p>

    <div class="product-image">
      <img v-bind:src="image" :title="product">
      <img :src="image" :title="product">  <!-- shorthand -->
  
    </div>

    <button @click="switchToBlue()">Switch to Blue Socks</button>
    <button @click="switchToGreen()">Switch to Green Socks</button>
  </div>
  <a :href="url" target="_blank" rel="noopener">Open product link</a>
</template>

<script setup>
import { ref } from 'vue'
const url = ref('https://www.nike.com')

import socksGreen from './assets/images/green_socks.jpg'
import socksBlue from './assets/images/bluesocks.jpg'


const product = ref('Socks')
const description = ref('Warm, comfortable socks for everyday wear.')
const image = ref(socksGreen)

function switchToBlue() {
  image.value = socksBlue
}
function switchToGreen(){
  image.value = socksGreen
}
</script>


