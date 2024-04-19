"use strict";

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      "jsx": true
    }
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "standard-with-typescript"
  ],
  plugins: [
    "react",
    "@typescript-eslint"
  ],
  ignorePatterns: ["*.json", ".eslintrc.js"],
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/display-name": "warn",
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/indent": ["error", 2, { "SwitchCase": 1 }],
    "@typescript-eslint/semi": ["error", "always", { "omitLastInOneLineBlock": false}],
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-dynamic-delete": "off",
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        }
      }
    ],
    "no-class-assign": "error", // 禁止修改类声明的变量
    "no-compare-neg-zero": "error", // 禁止与 -0 进行比较
    "no-const-assign": "error", // 禁止修改 const 声明的变量
    "no-func-assign": "error", // 禁止对 function 声明重新赋值
    "no-mixed-spaces-and-tabs": "error", // 禁止使用 空格 和 tab 混合缩进
    "no-inner-declarations": "error", // 禁止在嵌套的块中出现变量声明或 function 声明
    "no-unreachable": "error", // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
    "no-await-in-loop": "error",
    "no-return-await": "error",
    "max-statements-per-line": ["error", { "max": 1 }],
    "semi": ["error", "always", { "omitLastInOneLineBlock": false}], // 总是使用分号
    "semi-spacing": "error", // 强制分号之前和之后使用一致的空格
    "comma-spacing": ["error", { "before": false, "after": true }], // 强制逗号后面有空格
    "quotes": ["warn", "single", { "avoidEscape": true }], // 使用单引号
    "indent": ["error", 2, { "SwitchCase": 1 }], // 缩进2
    "no-extra-semi": "error", // 禁止不必要的分号
    "space-before-blocks": "error", // 强制块之前有空格
    "space-infix-ops": ["error", {"int32Hint": true}], // 要求操作符周围有空格
    "keyword-spacing": "error", // 关键字前后有空格，如if和else
    "key-spacing": ["error", { "afterColon": true }], // 对象属性后有空格
    "no-multiple-empty-lines": "error",
    "no-unexpected-multiline": "error",
    "arrow-spacing": "error", // 箭头函数空格
    "eqeqeq": 0
  }
};