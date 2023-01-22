import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import ViewportHeightCorrection from 'postcss-viewport-height-correction'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/radio-dakwah/' : '/',
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [ViewportHeightCorrection({ variable: 'vh' })]
    }
  },
  server: {
    port: 3333
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}))
