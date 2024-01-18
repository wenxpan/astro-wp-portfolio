import rss from "@astrojs/rss"

export function GET(context) {
  return rss({
    title: "Wenxuan Pan's Blog",
    description: "My journey learning coding",
    site: context.site,
    // TODO: add items
    items: [],
    customData: `<language>en-gb</language>`
  })
}
