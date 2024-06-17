import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    // 构建配置。
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    // 预渲染配置。
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
    // 开发代理配置。
    // devProxy: {
    //   '/proxy/example': { target: 'https://example.com', changeOrigin: true },
    // },
  },
  /*
  * 需要在构建后使用环境变量指定的私有或公共令牌。使用方式：
  * const config = useRuntimeConfig();
  * const baseURL = config.public.apiBase;
  * */
  runtimeConfig: {
    // 只在服务器端可用的私有键
    // apiSecret: process.env.NUXT_API_SECRET, // 秘钥
    // public中的键也可以在客户端使用
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE, // 服务器地址
    },
  },

  app: {
    // SEO和Meta 使用强大的头部配置、组合函数和组件来提升你的Nuxt应用的SEO。https://nuxt.com.cn/docs/getting-started/seo-meta
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
    // 页面应用自动过渡效果。
    // layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  pwa,

  devtools: {
    enabled: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
})
