<template>
  <div class="pro-card" :class="{ 'pro-card--bordered': bordered }">
    <div class="pro-card-header" v-if="title || $slots.header">
      <div class="pro-card-header-wrapper">
        <div class="pro-card-title" v-if="title">
          {{ title }}
        </div>
        <slot name="header"></slot>
      </div>
      <div class="pro-card-actions" v-if="$slots.actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="pro-card-body">
      <slot></slot>
    </div>
    <div class="pro-card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Props {
  title?: string
  bordered?: boolean
}

withDefaults(defineProps<Props>(), {
  bordered: true
})
</script>

<style lang="scss" scoped>
.pro-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.2s;

  &--bordered {
    border: 1px solid #e8e8e8;
  }

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #e8e8e8;

    &-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  &-title {
    font-size: 16px;
    font-weight: 500;
    color: #262626;
  }

  &-body {
    padding: 20px;
  }

  &-footer {
    padding: 16px 20px;
    border-top: 1px solid #e8e8e8;
    background: #fafafa;
    border-radius: 0 0 8px 8px;
  }
}
</style>