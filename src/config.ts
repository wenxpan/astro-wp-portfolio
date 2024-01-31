type NavItem = {
  path: string
  title: string
}

export const NAV_ITEMS: {
  [key: string]: NavItem
} = {
  home: {
    path: "/",
    title: "home"
  },
  projects: {
    path: "/projects",
    title: "projects"
  },
  blog: {
    path: "/blog",
    title: "blog"
  },
  about: {
    path: "/about",
    title: "about"
  }
}

export const SITE = {
  name: "Wenxuan Pan",
  title: "Wenxuan Pan",
  description:
    "Web Portfolio site for Wenxuan Pan - A full-stack web developer",
  url: "https://astro.wenxpan.com",
  githubUrl: "https://github.com/wenxpan",
  listDrafts: true,
  image: "", // TODO: add screenshot
  author: "Wenxuan Pan",
  // authorImage:
  //   "https://pbs.twimg.com/profile_images/1272979356529221632/sxvncugt_400x400.jpg, https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
  authorBio: "Full-stack web developer"
}

// Ink - Theme configuration
export const PAGE_SIZE = 8
export const USE_POST_IMG_OVERLAY = false
export const USE_MEDIA_THUMBNAIL = true

export const USE_AUTHOR_CARD = true
export const USE_SUBSCRIPTION =
  false /* works only when USE_AUTHOR_CARD is true */

export const USE_VIEW_STATS = true
