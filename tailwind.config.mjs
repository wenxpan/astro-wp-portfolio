/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme"
import colors from "tailwindcss/colors"

export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      mono: ["Fira Code Variable", ...defaultTheme.fontFamily.mono],
      sans: ["Open Sans Variable", ...defaultTheme.fontFamily.sans]
    },
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
      typography: (theme) => ({
        dark: {
          css: {
            color: theme("colors.gray.100"),
            "--tw-prose-bold": theme("colors.gray.100"),
            "--tw-prose-headings": theme("colors.dark.primary"),
            "--tw-prose-links": theme("colors.gray.100"),
            a: {
              "&:hover": {
                color: theme("colors.dark.primary")
              }
            },
            blockquote: {
              color: theme("colors.dark.primary"),
              borderColor: theme("colors.primary")
            },
            "blockquote > p::before, p::after": {
              color: theme("colors.primary")
            }
          }
        },
        DEFAULT: {
          css: {
            "--tw-prose-headings": theme("colors.primary"),
            a: {
              "&:hover": {
                color: theme("colors.primary")
              }
            },
            blockquote: {
              color: theme("colors.primary"),
              fontSize: theme("fontSize.2xl"),
              borderColor: theme("colors.dark.primary")
            },
            "blockquote > p::before, p::after": {
              color: theme("colors.dark.primary")
            },
            img: { maxWidth: "500px", margin: 0, borderRadius: "0.5rem" },
            "p:has(> img)": {
              margin: 0,
              fontSize: "0.8rem",
              maxWidth: "500px"
            }
          }
        }
      })
    }
  },
  plugins: [require("@tailwindcss/typography")]
}
