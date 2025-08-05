<template>
  <div style="padding: 20px; background-color: #f5f5f5; min-height: 100vh;">
    <h2>Loading组件调试</h2>
    
    <div class="demo-section">
      <h3>默认样式</h3>
      <Loading />
    </div>
    
    <div class="demo-section">
      <h3>自定义样式</h3>
      <Loading :style="{ width: '80%' }" />
    </div>
    
    <div class="demo-section">
      <h3>自定义前缀</h3>
      <Loading prefix="custom-prefix" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '../../packages/card/src/components/Loading/index.vue'
</script>

<style scoped>
.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
}
</style>