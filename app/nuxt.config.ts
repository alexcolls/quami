// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: '/',
    head: {
      title: 'INNOCV Smart Doc AI',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'INNOCV Smart Doc AI'
        }
      ],
      link: [
        {
          rel: 'icon',
          href: 'favicon.png',
          color: '#000000'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  nitro: {
    preset: 'bun'
  },
  runtimeConfig: {
    public: {
      VERSION: process.env.APP_VERSION ?? '0.5.7',
      API_URL: process.env.API_URL ?? 'https://apps.innocv.com/smartdoc-api/',
      MAX_FILE_SIZE: Number(process.env.MAX_FILE_SIZE) ?? 1000000
    }
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui',
    '@nuxt/image'
  ],
  googleFonts: {
    families: {
      Roboto: true,
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
      Inter: '200..700',
      'Crimson Pro': {
        wght: '200..900',
        ital: '200..700'
      }
    }
  },
  imports: {
    dirs: [
      'utils',
      'stores',
      'services'
    ]
  },
  piniaPersistedstate: {
    storage: 'localStorage'
  },
  ui: {
    icons: [
      'heroicons'
    ]
  },
  colorMode: {
    preference: 'dark'
  },
  i18n: {
    langDir: 'locales/',
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.ts' }
      // { code: 'es', iso: 'es-ES', file: 'es.ts' },
      // { code: 'fr', iso: 'fr-FR', file: 'fr.ts' }
    ],
    strategy: 'no_prefix'
  }
});
