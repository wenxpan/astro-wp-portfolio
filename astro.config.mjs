import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import icon from "astro-icon"

import preact from "@astrojs/preact"

// https://astro.build/config
export default defineConfig({
  site: "https://astro.wenxpan.com",
  sitemap: true,
  markdown: {
    shikiConfig: {
      // theme: "material-theme-darker",
      // experimentalThemes: {
      //   light: "github-light",
      //   dark: "github-dark"
      // },
      wrap: true
    }
  },
  integrations: [tailwind(), sitemap(), icon(), preact()]
})
