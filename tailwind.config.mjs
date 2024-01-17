/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme"
import colors from "tailwindcss/colors"

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      ...colors,
      primary: colors.cyan[700],
      primaryDark: colors.cyan[300],
      primarySecondary: colors.cyan[800],
      primarySecondaryDark: colors.cyan[500]
    },
    extend: {
      fontFamily: {
        mono: ["Fira Code Variable", ...defaultTheme.fontFamily.mono]
      }
    }
  },
  plugins: []
}
