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
    ecmaFeatures: {
      jsx: true
    },
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
    'react/jsx-filename-extension': [
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
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'error', // 检查 effect 的依赖
    'no-continue': 'off',
    camelcase: 'off',
    'no-prototype-builtins': 'off',
    'no-param-reassign': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-children-prop': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-return-assign': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    // 关闭eslint自身的，开启typescript的
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/prop-types': 'off',
    'no-plusplus': 'off',
    'react/require-default-props': 'off',
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
