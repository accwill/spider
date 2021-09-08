module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/order': [
      'error',
      {
        //        内置类型    第三方库    内部类型alias  父级目录    兄弟目录
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after'
          }
        ],
        'newlines-between': 'always'
      }
    ],
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
      2,
      {
        extensions: ['.ts', '.tsx']
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      }
    ],
    'no-continue': 'off',
    camelcase: 'off',
    'no-prototype-builtins': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-plusplus': 'off',
    'prefer-promise-reject-errors': 'off',
    'global-require': 'off',
    'no-unused-expressions': 'off',
    'class-methods-use-this': 'off',
    'default-case': 'off'
  },
  // 引入ts
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
}
