import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import ViewportHeightCorrection from 'postcss-viewport-height-correction'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/radio-dakwah/' : '/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['radio_black.svg'],
      manifest: {
        name: 'Radio Dakwah',
        short_name: 'Radio Dakwah',
        description: 'Menjaga Ketenteraman Hati',
        theme_color: '#ffffff',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,jpg,png,svg}']
      },
      pwaAssets: {
        config: true,
        overrideManifestIcons: true
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        type: 'module'
      }
    })
  ],
  css: {
    postcss: {
      plugins: [ViewportHeightCorrection({ variable: 'vh' })]
    }
  },
  server: {
    port: 3333,
    https: {
      key: '/Users/nur/Devs/WebProjects/localhost-key.pem',
      cert: '/Users/nur/Devs/WebProjects/localhost.pem',
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}))
