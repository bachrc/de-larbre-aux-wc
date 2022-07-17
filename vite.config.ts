import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    mode: "development",
    base: "/",
    srcDir: "src",
    filename: "sw.ts",
    includeAssets: ["public/favicon.ico"],
    strategies: "injectManifest",
    manifest: {
      name: "De L'Arbre Aux WC",
      short_name: "De L'Arbre Aux WC",
      theme_color: "#ffffff",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      icons: [],
    },
  })],
  base: "./"
})
