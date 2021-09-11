module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'google',
    'plugin:jest/recommended',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 0
  }
}
