// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: '/',
    head: {
      title: 'QUAMI',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'QUAMI is just what you want'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  nitro: {
    preset: 'bun'
  },
  runtimeConfig: {
    public: {
      VERSION: process.env.VERSION ?? '0.0.1',
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY
    }
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/supabase'
  ],
  googleFonts: {
    download: true,
    base64: true,
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
      'stores'
    ]
  },
  piniaPersistedstate: {
    storage: 'localStorage'
  },
  ui: {
    icons: [
      'heroicons',
      'icon-park-solid',
      'material-symbols',
      'mdi'
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
