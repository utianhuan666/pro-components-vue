<template>
  <div :class="`${prefix}-loading-content`" :style="style">
    <n-grid :cols="24" :x-gap="8">
      <n-grid-item :span="22">
        <div :class="`${prefix}-loading-block`"></div>
      </n-grid-item>
    </n-grid>
    <n-grid :cols="24" :x-gap="8">
      <n-grid-item :span="22">
        <n-grid-item :span="8">
          <div :class="`${prefix}-loading-block`" />
        </n-grid-item>
        <n-grid-item :span="15">
          <div :class="`${prefix}-loading-block`" />
        </n-grid-item>
      </n-grid-item>
    </n-grid>
    <n-grid :cols="24" :x-gap="8">
      <n-grid-item :span="6">
        <div :class="`${prefix}-loading-block`" />
      </n-grid-item>
      <n-grid-item :span="18">
        <div :class="`${prefix}-loading-block`" />
      </n-grid-item>
    </n-grid>
    <n-grid :cols="24" :x-gap="8">
      <n-grid-item :span="13">
        <div :class="`${prefix}-loading-block`" />
      </n-grid-item>
      <n-grid-item :span="9">
        <div :class="`${prefix}-loading-block`" />
      </n-grid-item>
    </n-grid>
    <n-grid :cols="24" :x-gap="8">
      <n-grid-item :span="4">
        <div :class="`${prefix}-loading-block`" />
      </n-grid-item>
      <n-grid-item :span="3">
        <div :class="`${prefix}-loading-block`" />
      </n-grid-item>
      <n-grid-item :span="16">
        <div :class="`${prefix}-loading-block`" />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
interface LoadingProps {
  class?: string
  style?: Record<string, any>
  prefix?: string
}
withDefaults(defineProps<LoadingProps>(), {
  prefix: 'easy-pro-card'
})
</script>

<script lang="ts">
// 添加默认导出
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>
/* 使用动态类名，支持自定义前缀 */
[class$="-loading-content"] {
  width: 100%;
}

[class$="-loading-content"] p {
  margin: 0;
}

[class$="-loading-block"] {
  height: 14px;
  margin: 4px 0;
  background: linear-gradient(
    90deg,
    rgba(54, 61, 64, 0.2),
    rgba(54, 61, 64, 0.4),
    rgba(54, 61, 64, 0.2)
  );
  background-size: 600% 600%;
  border-radius: var(--border-radius, 2px);
  animation: card-loading 1.4s ease infinite;
}

@keyframes card-loading {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
