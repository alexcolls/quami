// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
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
  runtimeConfig: {
    public: {
      VERSION: process.env.NUXT_APP_VERSION || 'io',
      
    },
    SUPABASE_URL: process.env.NUXT_SB_URL,
    SUPABASE_KEY: process.env.NUXT_SB_KEY,
    ELABAI_API_KEY: process.env.NUXT_ELEVEN_LABS_KEY
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
  colorMode: {
    preference: 'system'
  },
  experimental: {
    viewTransition: true,
  },
  nitro: {
    preset: 'bun',
    experimental: {
      openAPI: true,
    },
    // Configuration for handling large file uploads
    routeRules: {
      '/api/core/content/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },
  i18n: {
    locales: [
      { code: 'en', language: 'English', file: 'en.json' },
      { code: 'fr', language: 'Français', file: 'fr.json' },
      { code: 'es', language: 'Español', file: 'es.json' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      alwaysRedirect: false,
      useCookie: false,
      redirectOn: 'root',
      fallbackLocale: 'en',
    },
    // bundle: {
    //   optimizeTranslationDirective: false,
    // },
  },
  icon: {
    serverBundle: 'remote',
  },
});
