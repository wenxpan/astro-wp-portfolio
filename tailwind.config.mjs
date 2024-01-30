/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme"
import colors from "tailwindcss/colors"

export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: colors.cyan[700],
        secondary: colors.cyan[800],
        accent: colors.pink[300],
        dark: {
          primary: colors.cyan[300],
          secondary: colors.cyan[500],
          accent: colors.pink[500]
        }
      },
      fontFamily: {
        mono: ["Fira Code Variable", ...defaultTheme.fontFamily.mono],
        sans: ["Open Sans Variable", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
}
