/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  testTimeout: 60 * 1000,
  // transform: {
  //   '^.+\\.ts$': 'ts-jest' // ts 文件用 ts-jest 转换
  // },
  transform: {},
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/lib/$1'
  },
  // 匹配 __tests__ 目录下的 .js/.ts 文件 或其他目录下的 xx.test.js/ts xx.spec.js/ts
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$'
}
