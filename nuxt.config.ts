// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/supabase',
    '@nuxt-themes/layout-ui',
  ],
  
  // Nuxt Themes Module Configuration
  nuxtThemes: {
    version: '1.0.0',
    logoURL: 'https://quami.app',
  },
  ssr: false,
  // components: [
  //   { path: '~/app/components', pathPrefix: false },
  //   { path: '~/components', pathPrefix: false },
  // ],
  // googleFonts: {
  //   download: true,
  //   base64: true,
  //   families: {
  //     Roboto: true,
  //     'Josefin+Sans': true,
  //     Lato: [100, 300],
  //     Raleway: {
  //       wght: [100, 400],
  //       ital: [100]
  //     },
  //     Inter: '200..700',
  //     'Crimson Pro': {
  //       wght: '200..900',
  //       ital: '200..700'
  //     }
  //   }
  // },
  imports: {
    dirs: [
      'utils',
      'stores',
    ],
  },
  devtools: { enabled: true },
  app: {
    baseURL: '/',
    head: {
      title: 'QUAMI',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: 'QUAMI is just what you want',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'system',
  },
  ui: {
    // safelistColors: [
    //   'white', 'black',
    //   'gray', 'zinc', 'neutral', 'stone', 'slate',
    //   'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
    //   'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
    // ],
  },
  runtimeConfig: {
    public: {
      VERSION: process.env.NUXT_APP_VERSION || 'io',
      SUPABASE_PUBLISHABLE_KEY: process.env.NUXT_SB_PUBLIC,
      SUPABASE_URL: process.env.NUXT_SB_URL,
      SUPABASE_KEY: process.env.NUXT_SB_KEY,
      RPC_URL: process.env.NUXT_PUBLIC_RPC_URL || 'https://api.mainnet-beta.solana.com',
    },
    ELABAI_API_KEY: process.env.NUXT_ELEVEN_LABS_KEY,
  },
  experimental: {
    viewTransition: true,
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'node-server',
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
  vite: {
    define: {
      global: 'globalThis',
    },
    resolve: {
      alias: {
        buffer: 'buffer/',
      },
    },
    optimizeDeps: {
      include: ['buffer'],
      esbuildOptions: {
        define: {
          global: 'globalThis',
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
  piniaPersistedstate: {
    storage: 'localStorage',
  },
  // Configure @nuxtjs/supabase to read from env
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL || process.env.NUXT_SB_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NUXT_SB_PUBLIC,
    redirect: false,
  },
});
