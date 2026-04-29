// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default defineConfig([
  globalIgnores(['dist']),
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended
    ],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic
    },
    ignores: ['node_modules', 'dist','*.json'],
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/static-components': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/exhaustive-deps': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 0,
      'react/display-name': 'warn',
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'no-class-assign': 'error', // 禁止修改类声明的变量
      'no-compare-neg-zero': 'error', // 禁止与 -0 进行比较
      'no-const-assign': 'error', // 禁止修改 const 声明的变量
      'no-func-assign': 'error', // 禁止对 function 声明重新赋值
      '@stylistic/no-mixed-spaces-and-tabs': 'error', // 禁止使用 空格 和 tab 混合缩进
      'no-inner-declarations': 'error', // 禁止在嵌套的块中出现变量声明或 function 声明
      'no-unreachable': 'error', // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
      'no-await-in-loop': 'error',
      'no-return-await': 'error',
      '@stylistic/max-statements-per-line': ['error', { max: 1 }],
      '@stylistic/semi': ['error', 'always', { omitLastInOneLineBlock: false }], // 总是使用分号
      '@stylistic/semi-spacing': 'error', // 强制分号之前和之后使用一致的空格
      '@stylistic/comma-spacing': ['error', { before: false, after: true }], // 强制逗号后面有空格
      '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }], // 使用单引号
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }], // 缩进2
      '@stylistic/no-extra-semi': 'error', // 禁止不必要的分号
      '@stylistic/space-before-blocks': 'error', // 强制块之前有空格
      '@stylistic/space-infix-ops': ['error', { int32Hint: true }], // 要求操作符周围有空格
      '@stylistic/keyword-spacing': 'error', // 关键字前后有空格，如if和else
      '@stylistic/key-spacing': ['error', { afterColon: true }], // 对象属性后有空格
      'no-unexpected-multiline': 'error',
      '@stylistic/arrow-spacing': 'error', // 箭头函数空格
      '@stylistic/linebreak-style': 'error',
      '@stylistic/no-multiple-empty-lines': 'error',
      '@stylistic/no-trailing-spaces': 'error',
    }
  }
]);
