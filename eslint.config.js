import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import typescript from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  js.configs.recommended,
  ...typescript.configs.recommended,
  ...vue.configs['flat/recommended'],
  prettier,
  {
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      prettier: prettierPlugin
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Vue 3 Composition API 全局变量
        ref: 'readonly',
        reactive: 'readonly',
        computed: 'readonly',
        watchEffect: 'readonly',
        watch: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        // Node.js 全局变量
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        // 浏览器全局变量
        window: 'readonly',
        document: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      // 基础规则
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off', // 关闭基础规则，使用 TypeScript 规则
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: 'error',
      'no-implicit-coercion': 'warn',
      'no-duplicate-imports': 'error',
      // 分号规则 - 不使用分号
      semi: ['error', 'never'],
      'semi-spacing': ['error', { before: false, after: true }],
      'no-extra-semi': 'error',
      // TypeScript 规则
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Vue 规则
      'vue/require-v-for-key': 'error',
      'vue/no-unused-vars': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'error',
      'vue/no-unused-components': 'warn',
      'vue/no-mutating-props': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          }
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1
        }
      ],
      'vue/html-indent': ['error', 2],
      'vue/script-indent': ['error', 2, { baseIndent: 0 }],

      // 代码风格
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      'no-trailing-spaces': 'error',
      'eol-last': 'error',

      // Prettier 集成
      'prettier/prettier': 'error'
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: typescript.parser
      }
    },
    rules: {
      'no-unused-vars': 'off',
      indent: 'off' // Vue 文件使用 vue/script-indent
    }
  },
  {
    files: ['**/*.test.{js,ts,vue}', '**/*.spec.{js,ts,vue}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    files: ['docs/.vitepress/theme/**/*.{js,ts,vue}'],
    rules: {
      'vue/one-component-per-file': 'off'
    }
  },
  {
    ignores: [
      // 依赖和构建产物
      'node_modules/**',
      '**/node_modules/**',
      'dist/**',
      '**/dist/**',
      'build/**',
      '**/build/**',
      'coverage/**',
      '**/coverage/**',

      // 文档构建产物
      'docs/.vitepress/cache/**',
      'docs/.vitepress/dist/**',

      // 临时文件和日志
      '*.log',
      '**/*.log',
      '.DS_Store',
      'Thumbs.db',

      // 配置文件
      '*.min.js',
      '**/*.min.js',
      '*.min.css',
      '**/*.min.css',

      // 锁文件
      'pnpm-lock.yaml',
      'yarn.lock',
      'package-lock.json',

      // 环境文件
      '.env',
      '.env.*',

      // IDE 文件
      '.vscode/**',
      '.idea/**',
      '*.swp',
      '*.swo',

      // 其他
      'public/**',
      '*.d.ts',
      '!src/**/*.d.ts',
      '!packages/**/*.d.ts'
    ]
  }
]
