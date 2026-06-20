import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'node:path';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  builder: 'vite',
  app: {
    head: {
      title: 'Siruć Ind - We make Web',
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Siruć Industries — senior web development agency crafting websites, apps, and full digital products.' },
        { charset: 'utf-8' },
        { property: 'og:title', content: 'Softwarehouse services' },
        { property: 'og:description', content: 'Senior engineers & designers building websites, apps, and full digital products.' },
        { property: 'og:image', content: ' !add https image !' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js'
        },
        {
          src: 'https://code.iconify.design/2/2.0.3/iconify.min.js'
        }
      ],
    },
  },
  vite: {
    plugins: [
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
        // Specify symbolId format
        symbolId: '[name]',

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        customDomId: '__svg__icons__dom__',
      }),
    ],
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  components: true,
  plugins: ['~/plugins/element-plus'],
  css: ['~/assets/styles/main.scss'],
  modules: ['@nuxt/eslint'],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon',
    },
  },
});
