/**
 * 参考链接: https://vitejs.dev/config/
 */
import { join } from 'path'
import { UserConfig } from 'vite'
import dotenv from 'dotenv'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

dotenv.config({ path: join(__dirname, '.env') })
const root = join(__dirname, 'src/render')

const config: UserConfig = {
  root,
  resolve: {
    alias: {
      '/@': root,
    }
  },
  base: './',
  build: {
    outDir: join('../../dist/render'),
    emptyOutDir: true
  },
  server: {
    port: +process.env.PORT,
  },
  plugins: [
    vue(),
    vueJsx({ /* options are passed on to @vue/babel-plugin-jsx */ })
  ],
  optimizeDeps: {
    exclude: [
      'electron-is-dev',
      'electron-store',
    ]
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
}

export default config
