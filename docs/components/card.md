# Card 卡片

通用卡片容器。

## 基础用法

最简单的卡片容器。

<script setup>
import { Card } from '@/card/src/index.ts'
</script>

<Card title="基础卡片">
  <p>这是一个基础的卡片内容。</p>
</Card>

## 带操作按钮

卡片可以设置操作按钮。

<Card title="带操作的卡片">
  <template #actions>
    <button>设置</button>
    <button>更多</button>
  </template>
  <p>这是一个带操作按钮的卡片内容。</p>
</Card>

## 带底部

卡片可以设置底部内容。

<Card title="带底部的卡片">
  <p>这是卡片的主要内容。</p>
  <template #footer>
    <button>确定</button>
    <button>取消</button>
  </template>
</Card>

## 无边框

设置 `bordered` 为 `false` 可以移除边框。

<Card title="无边框卡片" :bordered="false">
  <p>这是一个无边框的卡片内容。</p>
</Card>

## API

### Card Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | string | - |
| bordered | 是否有边框 | boolean | true |

### Card Slots

| 名称 | 说明 |
| --- | --- |
| default | 卡片内容 |
| header | 卡片头部 |
| actions | 卡片操作区域 |
| footer | 卡片底部 |

<style scoped>
button {
  padding: 4px 8px;
  margin: 0 4px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

button:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}

.pro-card {
  margin-bottom: 16px;
}
</style>
