<template>
  <form @submit.prevent="onSubmit">
    <h3>Leave a Review</h3>

    <input v-model="name" placeholder="Name" />

    <textarea v-model="review" placeholder="Write your review"></textarea>

    <select v-model.number="rating">
      <option disabled value="">Rating</option>
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <p>Would you recommend this product?</p>

    <label>
      <input type="radio" value="Yes" v-model="recommend" />
      Yes
    </label>

    <label>
      <input type="radio" value="No" v-model="recommend" />
      No
    </label>

    <button class="button">Submit Review</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['review-submitted'])

const name = ref('')
const review = ref('')
const rating = ref(null)
const recommend = ref(null)

function onSubmit() {
  if (!name.value || !review.value || !rating.value) {
    alert('Complete all fields')
    return
  }

  emit('review-submitted', {
    name: name.value,
    review: review.value,
    rating: rating.value,
    recommend: recommend.value
  })

  name.value = ''
  review.value = ''
  rating.value = null
  recommend.value = null
}
</script>