import axios from 'axios'
require('dotenv').config()

const SITE_TITLE = 'nuxt-v2'
const SITE_DISCRIPTION = 'nuxt-v2 description'
const SITE_URL = 'https://exsample.com'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: SITE_TITLE,
    titleTemplate: '%s |' + ' ' + SITE_TITLE,
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: https://ogp.me/ns#',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: SITE_DISCRIPTION },

      { hid: 'og:title', property: 'og:title', content: SITE_TITLE },
      {
        hid: 'og:description',
        property: 'og:description',
        content: SITE_DISCRIPTION,
      },
      { hid: 'og:site_name', property: 'og:site_name', content: SITE_TITLE },
      { hid: 'og:url', property: 'og:url', content: SITE_URL },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: SITE_URL + 'images/ogp.png',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ユーザー名' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',

    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/sitemap',
    '@nuxtjs/dayjs',
  ],

  publicRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    postPerPage: process.env.POST_PER_PAGE,
  },
  privateRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja',
    },
  },

  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
    defaultTimeZone: 'Asia/Tokyo',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
    ], // Your Day.js plugin
  },

  styleResources: {
    scss: ['~/assets/styles/settings.scss'],
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: SITE_URL,
    // 動的なルーティングに対応
    routes: async () => {
      const { data } = await axios.get(
        `${process.env.API_BASE_URL}/posts?_limit=100`
      )
      return data.map((post) => `/news/${post.id}`)
    },
  },

  router: {
    extendRoutes(routes, resolve) {
      // ページャー対応
      routes.push({
        path: '/news/page/:id',
        component: resolve(__dirname, './pages/news/index.vue'),
        name: 'newsPagenate',
      })
    },
  },

  generate: {
    fallback: true,
    async routes() {
      // min, maxに指定した数の配列を作成
      const range = (min, max) =>
        [...Array(max - min + 1)].map((_, i) => min + i)

      // 1ページあたりの取得件数
      const newsPerPage = process.env.POST_PER_PAGE
      // レスポンスヘッダーの取得（データの総数取得のため）
      const { headers } = await axios.get(
        `${process.env.API_BASE_URL}/posts?_limit=0`
      )
      // 1ページ目～のページ番号を配列で取得
      const pagerNumbers = range(
        1,
        Math.ceil(headers['x-total-count'] / newsPerPage)
      )
      // ページャーデータの作成
      const newsPages = pagerNumbers.map((id) => {
        return {
          route: `/news/page/${id}`,
          payload: id,
        }
      })

      return [...newsPages]
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
