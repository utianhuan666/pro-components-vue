<template>
  <div v-for="item in items">{{ item }}</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const items = ref(['Item 1', 'Item 2', 'Item 3'])

</script>


<style lang="scss" scoped>

</style>