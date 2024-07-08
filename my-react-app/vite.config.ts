import path from 'node:path'

import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

dotenv.config()

export default defineConfig(() => {
  return {
    base: '/',
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': {
        ...process.env,
      },
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
    ],
    preview: {
      port: 3000,
      strictPort: true,
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      origin: 'http://0.0.0.0:3000',
    },
  }
})
