<template>
  <div>
    <h1>{{ product }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const product = ref('Socks')
const description = ref('Warm, comfortable socks for everyday wear.')
</script>

