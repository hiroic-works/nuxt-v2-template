module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'prettier', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/no-v-html': 0,
  },
}
