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
        dark: {
          primary: colors.cyan[300],
          secondary: colors.cyan[500]
        },
        accent: {
          gray: {
            light: colors.gray[300],
            dark: colors.gray[500]
          },
          default: colors.blue[700]
        }
      },
      fontFamily: {
        mono: ["Fira Code Variable", ...defaultTheme.fontFamily.mono],
        sans: ["Open Sans Variable", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
