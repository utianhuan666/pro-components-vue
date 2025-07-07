<template>
  <div v-for="(item, index) in items" :key="index">
    {{ item }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'])
</script>

<style lang="scss" scoped></style>
