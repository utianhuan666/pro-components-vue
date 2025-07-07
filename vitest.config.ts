import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,ts,vue}', 'packages/**/*.test.{js,ts,vue}'],
    exclude: ['node_modules', 'dist', 'coverage'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'clover', 'json'],
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        'docs/',
        '**/*.config.{js,ts}',
        '**/*.d.ts',
        '**/index.{js,ts}',
        'tests/test.vue' // 排除非测试文件
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
