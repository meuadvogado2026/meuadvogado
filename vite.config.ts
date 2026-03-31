import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    dyadComponentTagger(), 
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'pwa-192x192.png', 'pwa-512x512.png', 'robots.txt', 'favicon.ico', 'screenshot1.png', 'screenshot2.png'],
      manifest: {
        id: '/',
        start_url: '/',
        name: 'Meu Advogado',
        short_name: 'Meu Advogado',
        description: 'Encontre o advogado ideal para o seu caso com rapidez e total segurança.',
        theme_color: '#0F172A',
        background_color: '#F8FAFC',
        display: 'standalone',
        orientation: 'portrait',
        categories: ['productivity', 'business', 'legal'],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: 'screenshot1.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Encontre especialistas próximos a você'
          },
          {
            src: 'screenshot2.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Segurança e agilidade no seu atendimento'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));