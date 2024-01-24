import { z, defineCollection } from "astro:content"

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z
      .string()
      .max(100, "The title length must be less than or equal to 100 chars"),
    date: z.string(),
    author: z.string(),
    description: z.string(),
    image: z
      .object({
        url: z.string(),
        alt: z.string()
      })
      .optional(),
    tags: z.array(z.string())
  })
})

export const collections = {
  posts: postsCollection
}
