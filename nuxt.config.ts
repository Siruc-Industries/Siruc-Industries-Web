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
        { name: 'description', content: 'We make websites' },
        { charset: 'utf-8' },
        { property: 'og:title', content: 'Softwarehouse services' },
        { property: 'og:description', content: 'We make websites' },
        { property: 'og:image', content: ' !add https image !' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      script: [
        {
          type: 'module',
          src: 'https://unpkg.com/@splinetool/viewer@1.10.44/build/spline-viewer.js'
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
});
