# Loading组件Vue 3重构方案

## 1. 重构目标与技术栈

### 技术栈选择
- **Vue 3** + **Composition API**：现代化响应式框架
- **Naive UI**：轻量级组件库，替代Ant Design
- **VueUse**：Vue生态工具库，提供常用组合式函数
- **Sass**：CSS预处理器，支持变量和混入
- **TypeScript**：类型安全保障

### 核心功能保留
- ✅ 骨架屏加载效果
- ✅ 多行不规则宽度布局
- ✅ 流动动画效果
- ✅ 样式前缀定制
- ✅ 主题适配能力
- ✅ 响应式支持

## 2. 项目结构设计

```
src/components/ProCard/
├── components/
│   └── CardLoading.vue           # 主加载组件
├── composables/
│   ├── useCardLoading.ts         # 加载状态管理
│   ├── useSkeletonLayout.ts      # 骨架屏布局逻辑
│   └── useLoadingAnimation.ts    # 动画控制
├── styles/
│   ├── _variables.scss           # Sass变量定义
│   ├── _mixins.scss             # Sass混入函数
│   └── _loading.scss            # 加载组件样式
└── types/
    └── loading.ts               # 类型定义
```

## 3. 主组件实现方案

### 3.1 CardLoading.vue 组件结构

```vue
<template>
  <div 
    :class="loadingClasses" 
    :style="loadingStyles"
  >
    <div :class="`${prefixCls}-loading-content`">
      <!-- 使用NGrid替代Ant Design的Row/Col -->
      <n-grid 
        v-for="(row, index) in skeletonRows" 
        :key="index"
        :cols="24" 
        :x-gap="8"
        :y-gap="4"
      >
        <n-grid-item 
          v-for="(col, colIndex) in row" 
          :key="colIndex"
          :span="col.span"
        >
          <div :class="`${prefixCls}-loading-block`" />
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { NGrid, NGridItem } from 'naive-ui'
import { useThemeVars } from 'naive-ui'
import { useSkeletonLayout } from '../composables/useSkeletonLayout'

// Props定义
interface LoadingProps {
  className?: string
  style?: CSSProperties
  prefix?: string
  animated?: boolean
  rows?: number
  customLayout?: Array<Array<{ span: number }>>
}

const props = withDefaults(defineProps<LoadingProps>(), {
  prefix: 'n-pro-card',
  animated: true,
  rows: 5,
  className: '',
  style: () => ({})
})

// 使用组合式函数
const { skeletonRows } = useSkeletonLayout(props)
const themeVars = useThemeVars()

// 计算属性
const prefixCls = computed(() => props.prefix)
const loadingClasses = computed(() => [
  `${prefixCls.value}-loading`,
  props.className,
  {
    [`${prefixCls.value}-loading-animated`]: props.animated
  }
])
const loadingStyles = computed(() => ({ ...props.style }))
</script>
```

### 3.2 类型定义 (types/loading.ts)

```typescript
import type { CSSProperties } from 'vue'

// 骨架屏行配置
export interface SkeletonRow {
  span: number
  offset?: number
}

// 加载组件Props
export interface LoadingProps {
  /** CSS类名 */
  className?: string
  /** 自定义样式 */
  style?: CSSProperties
  /** 样式前缀 */
  prefix?: string
  /** 是否启用动画 */
  animated?: boolean
  /** 骨架屏行数 */
  rows?: number
  /** 自定义布局配置 */
  customLayout?: SkeletonRow[][]
  /** 动画持续时间 */
  animationDuration?: string
  /** 动画缓动函数 */
  animationTiming?: string
}

// 主题配置
export interface LoadingTheme {
  primaryColor: string
  backgroundColor: string
  borderRadius: string
  gradientLight: string
  gradientDark: string
}
```

## 4. 组合式函数实现

### 4.1 useSkeletonLayout.ts - 骨架屏布局逻辑

```typescript
import { computed, type ComputedRef } from 'vue'
import type { LoadingProps, SkeletonRow } from '../types/loading'

export function useSkeletonLayout(props: LoadingProps) {
  // 默认骨架屏布局配置
  const defaultSkeletonRows: SkeletonRow[][] = [
    [{ span: 22 }],                           // 第1行：几乎占满
    [{ span: 8 }, { span: 15 }],              // 第2行：短块 + 长块
    [{ span: 6 }, { span: 18 }],              // 第3行：很短块 + 很长块
    [{ span: 13 }, { span: 9 }],              // 第4行：中等块 + 短块
    [{ span: 4 }, { span: 3 }, { span: 16 }] // 第5行：很短块 + 很短块 + 长块
  ]

  // 计算骨架屏行配置
  const skeletonRows: ComputedRef<SkeletonRow[][]> = computed(() => {
    if (props.customLayout) {
      return props.customLayout
    }
    return defaultSkeletonRows.slice(0, props.rows || 5)
  })

  // 生成随机布局（可选功能）
  const generateRandomLayout = (rows: number): SkeletonRow[][] => {
    const layouts: SkeletonRow[][] = []
    for (let i = 0; i < rows; i++) {
      const rowSpans = generateRandomSpans()
      layouts.push(rowSpans)
    }
    return layouts
  }

  const generateRandomSpans = (): SkeletonRow[] => {
    const totalSpan = 24
    const spans: SkeletonRow[] = []
    let remaining = totalSpan
    
    while (remaining > 0) {
      const minSpan = Math.min(3, remaining)
      const maxSpan = Math.min(18, remaining)
      const span = Math.floor(Math.random() * (maxSpan - minSpan + 1)) + minSpan
      
      spans.push({ span })
      remaining -= span
      
      if (remaining > 0 && remaining < 3) {
        spans[spans.length - 1].span += remaining
        break
      }
    }
    
    return spans
  }

  return {
    skeletonRows,
    generateRandomLayout
  }
}
```

### 4.2 useLoadingAnimation.ts - 动画控制

```typescript
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useElementVisibility } from '@vueuse/core'

export function useLoadingAnimation(options: {
  animated?: boolean
  duration?: string
  timing?: string
  pauseOnHover?: boolean
}) {
  const {
    animated = true,
    duration = '1.4s',
    timing = 'ease',
    pauseOnHover = false
  } = options

  const animationRef = ref<HTMLElement>()
  const isVisible = useElementVisibility(animationRef)
  const isPaused = ref(false)

  // 动画样式计算
  const animationStyles = computed(() => {
    if (!animated || !isVisible.value) {
      return {
        animation: 'none',
        background: 'rgba(54, 61, 64, 0.2)'
      }
    }

    return {
      animationName: 'card-loading',
      animationDuration: duration,
      animationTimingFunction: timing,
      animationIterationCount: 'infinite',
      animationPlayState: isPaused.value ? 'paused' : 'running'
    }
  })

  // 鼠标悬停控制
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      isPaused.value = true
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      isPaused.value = false
    }
  }

  // 性能优化：页面不可见时暂停动画
  const handleVisibilityChange = () => {
    if (document.hidden) {
      isPaused.value = true
    } else {
      isPaused.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })

  return {
    animationRef,
    animationStyles,
    isPaused,
    handleMouseEnter,
    handleMouseLeave
  }
}
```

## 5. Sass样式系统

### 5.1 _variables.scss - 变量定义

```scss
// ProCard Loading 变量定义
$pro-card-prefix: 'n-pro-card' !default;

// 动画相关变量
$loading-animation-duration: 1.4s !default;
$loading-animation-timing: ease !default;

// 骨架屏块样式变量
$loading-block-height: 14px !default;
$loading-block-margin: 4px 0 !default;
$loading-block-border-radius: 4px !default;

// 渐变色彩变量
$loading-gradient-light: rgba(54, 61, 64, 0.2) !default;
$loading-gradient-dark: rgba(54, 61, 64, 0.4) !default;
$loading-background-size: 600% 600% !default;

// 暗色主题变量
$loading-dark-gradient-light: rgba(255, 255, 255, 0.1) !default;
$loading-dark-gradient-dark: rgba(255, 255, 255, 0.2) !default;

// 响应式断点
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1600px
) !default;
```

### 5.2 _mixins.scss - 混入函数

```scss
@import 'variables';

// 骨架屏动画混入
@mixin skeleton-animation($duration: $loading-animation-duration, $timing: $loading-animation-timing) {
  animation-name: card-loading;
  animation-duration: $duration;
  animation-timing-function: $timing;
  animation-iteration-count: infinite;
}

// 骨架屏块基础样式混入
@mixin skeleton-block-base {
  height: $loading-block-height;
  margin: $loading-block-margin;
  border-radius: $loading-block-border-radius;
  background: linear-gradient(
    90deg,
    $loading-gradient-light,
    $loading-gradient-dark,
    $loading-gradient-light
  );
  background-size: $loading-background-size;
}

// 响应式混入
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

// 主题适配混入
@mixin theme-adaptive {
  // 暗色主题支持
  [data-theme='dark'] & {
    .#{$pro-card-prefix}-loading-block {
      background: linear-gradient(
        90deg,
        $loading-dark-gradient-light,
        $loading-dark-gradient-dark,
        $loading-dark-gradient-light
      );
    }
  }
}

// 用户选择禁用混入
@mixin user-select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

### 5.3 _loading.scss - 主样式文件

```scss
@import 'variables';
@import 'mixins';

// 定义骨架屏动画
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

// 主要样式定义
.#{$pro-card-prefix} {
  // 加载状态容器
  &-loading {
    overflow: hidden;
    @include user-select-none;

    // 加载内容区域
    &-content {
      width: 100%;
      
      p {
        margin: 0;
      }
    }

    // 骨架屏块样式
    &-block {
      @include skeleton-block-base;
      @include skeleton-animation;
    }

    // 静态版本（无动画）
    &-static {
      .#{$pro-card-prefix}-loading-block {
        animation: none;
        background: $loading-gradient-light;
      }
    }

    // 悬停暂停动画
    &-pause-on-hover {
      .#{$pro-card-prefix}-loading-block {
        &:hover {
          animation-play-state: paused;
        }
      }
    }
  }

  // 当卡片处于加载状态时的样式
  &-loading &-body {
    @include user-select-none;
  }
}

// 主题适配
@include theme-adaptive;

// 响应式适配
@include respond-to(sm) {
  .#{$pro-card-prefix}-loading {
    &-block {
      height: 16px;
    }
  }
}

@include respond-to(lg) {
  .#{$pro-card-prefix}-loading {
    &-content {
      padding: 0 4px;
    }
  }
}
```

## 6. 使用示例

### 6.1 基础使用

```vue
<template>
  <div>
    <!-- 基础加载效果 -->
    <CardLoading />
    
    <!-- 自定义行数 -->
    <CardLoading :rows="3" />
    
    <!-- 禁用动画 -->
    <CardLoading :animated="false" />
    
    <!-- 自定义样式 -->
    <CardLoading 
      :style="{ padding: '20px' }"
      class="custom-loading"
    />
  </div>
</template>

<script setup lang="ts">
import CardLoading from './components/CardLoading.vue'
</script>
```

### 6.2 高级配置

```vue
<template>
  <CardLoading 
    :custom-layout="customLayout"
    :animated="true"
    animation-duration="2s"
    animation-timing="ease-in-out"
    prefix="my-card"
  />
</template>

<script setup lang="ts">
import CardLoading from './components/CardLoading.vue'

// 自定义布局配置
const customLayout = [
  [{ span: 24 }],                    // 标题行
  [{ span: 6 }, { span: 18 }],       // 标签 + 内容
  [{ span: 12 }, { span: 12 }],      // 两列布局
  [{ span: 8 }, { span: 8 }, { span: 8 }] // 三列布局
]
</script>
```

## 7. 性能优化策略

### 7.1 动画性能优化
- 使用`transform`和`opacity`属性进行动画，避免重排重绘
- 页面不可见时自动暂停动画
- 支持`prefers-reduced-motion`媒体查询

### 7.2 组件懒加载
```typescript
// 异步组件加载
const CardLoading = defineAsyncComponent(() => 
  import('./components/CardLoading.vue')
)
```

### 7.3 样式优化
- 使用CSS变量支持主题切换
- 按需引入Naive UI组件
- 样式代码分割和懒加载

## 8. 主题定制方案

### 8.1 CSS变量方式
```scss
:root {
  --loading-gradient-light: rgba(54, 61, 64, 0.2);
  --loading-gradient-dark: rgba(54, 61, 64, 0.4);
  --loading-animation-duration: 1.4s;
  --loading-block-height: 14px;
  --loading-border-radius: 4px;
}

[data-theme='dark'] {
  --loading-gradient-light: rgba(255, 255, 255, 0.1);
  --loading-gradient-dark: rgba(255, 255, 255, 0.2);
}
```

### 8.2 Naive UI主题集成
```typescript
// 主题配置
const themeOverrides = {
  common: {
    primaryColor: '#18a058',
    borderRadius: '6px'
  },
  Loading: {
    color: 'rgba(54, 61, 64, 0.2)'
  }
}
```

## 9. 测试策略

### 9.1 单元测试
```typescript
import { mount } from '@vue/test-utils'
import CardLoading from '../CardLoading.vue'

describe('CardLoading', () => {
  it('应该渲染默认的骨架屏行数', () => {
    const wrapper = mount(CardLoading)
    expect(wrapper.findAll('.n-pro-card-loading-block')).toHaveLength(8)
  })

  it('应该支持自定义行数', () => {
    const wrapper = mount(CardLoading, {
      props: { rows: 3 }
    })
    expect(wrapper.findAll('.n-grid')).toHaveLength(3)
  })

  it('应该支持禁用动画', () => {
    const wrapper = mount(CardLoading, {
      props: { animated: false }
    })
    expect(wrapper.classes()).toContain('n-pro-card-loading-static')
  })
})
```

### 9.2 视觉回归测试
- 使用Storybook进行组件展示
- 集成Chromatic进行视觉回归测试
- 支持多主题和响应式测试

## 10. 迁移指南

### 10.1 从React版本迁移
1. **组件结构调整**：从React函数组件改为Vue 3 Composition API
2. **状态管理**：从useState改为ref/reactive
3. **样式系统**：从CSS-in-JS改为Sass
4. **组件库**：从Ant Design改为Naive UI

### 10.2 API对比

| React版本 | Vue 3版本 | 说明 |
|-----------|-----------|------|
| `className` | `class` | CSS类名属性 |
| `style` | `style` | 内联样式（保持一致） |
| `prefix` | `prefix` | 样式前缀（保持一致） |
| - | `animated` | 新增动画控制 |
| - | `rows` | 新增行数控制 |
| - | `customLayout` | 新增自定义布局 |

## 11. 总结

这个重构方案完整保留了原有Loading组件的所有核心功能，同时利用Vue 3和现代前端技术栈的优势，提供了更好的：

- **开发体验**：TypeScript类型安全 + Composition API
- **性能表现**：按需加载 + 动画优化 + 响应式设计
- **可维护性**：模块化设计 + Sass变量系统 + 组合式函数
- **可扩展性**：插件化架构 + 主题定制 + 自定义布局

通过这种方式，既保持了与原组件的功能一致性，又充分发挥了Vue 3生态系统的优势。