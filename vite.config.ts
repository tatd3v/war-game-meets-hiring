import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
    tsconfigPaths(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        "name": "Galactic Fishing Stats",
        "short_name": "GalacticStats",
        "description": "Leaderboard and Market data for the Galactic Fishing game.",
        "theme_color": "#0f172a",
        "background_color": "#0f172a",
        "display": "standalone",
        "start_url": "/",
        "icons": [
          {
            "src": "icons/pwa-144x144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "maskable any"
          },
          {
            "src": "icons/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable any"
          },
          {
            src: 'icons/refresh-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/refresh-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html"
      }
    }
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    },
  },
})
