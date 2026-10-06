import { defineConfig } from 'vite'

export default defineConfig({

  base: './',

  server: {
    port: 5174,
    strictPort: true,
    allowedHosts: [
      'yofi-pc.tailab7e1c.ts.net'
    ]
  }
})