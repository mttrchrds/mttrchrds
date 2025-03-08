/// <reference types="vitest" />
import { defineConfig } from 'vite'
import ViteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true}),
    ViteReact()
  ],
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/testing/setup.ts',
  },
})
