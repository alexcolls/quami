// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false,
  app: {
    baseURL: '/',
    head: {
      title: 'Oriane App',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content: 'Oriane App'
        }
      ],
      link: [
        {
          rel: 'icon',
          href: 'oriane_favicon.png',
          color: '#000000'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  nitro: {
    preset: 'bun',
    routeRules: {
      '/api/**': { ssr: false },
      '/api/secure/**': { appMiddleware: ['auth'] }
    }
  },
  runtimeConfig: {
    public: {},
    adminServer: process.env.NUXT_ADMIN_SERVER,
    cognito: {
      region: process.env.COGNITO_REGION,
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      redirectUri: process.env.COGNITO_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
      logoutUri: process.env.COGNITO_LOGOUT_URI || 'http://localhost:3000/api/auth/logout'
    },
    s3: {
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    jwtCookieName: process.env.JWT_COOKIE_NAME || 'oriane_auth'
  },
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/ui-pro',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint'
    // '@nuxtjs/eslint-module'
  ],
  imports: {
    dirs: [
      'utils',
      'stores',
    ]
  },
  piniaPersistedstate: {
    storage: 'localStorage'
  },
  i18n: {
    langDir: '../i18n',
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.ts' },
      { code: 'es', iso: 'es-ES', file: 'es.ts' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.ts' }
    ],
    strategy: 'no_prefix'
  },
  colorMode: {
    preference: 'system'
  },
  ui: {
    // icons: [
    //   'heroicons',
    // ],
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',
        'info',
        'success',
        'warning',
        'error'
      ]
    },
  },
})