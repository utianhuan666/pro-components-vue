import { defineConfig } from 'vitepress'
import path from 'path'

const fileAndStyles: Record<string, string> = {}

export default defineConfig({
  title: 'Pro Components Vue',
  description: 'Vue 3 组件库',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      { text: 'API', link: '/api/' }
    ],
    sidebar: {
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Card 卡片', link: '/components/card' }
          ]
        }
      ]
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../packages')
      }
    },
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc', '@vicons/antd']
    }
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html)
      return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, `${style}</head>`)
    }
  }
})