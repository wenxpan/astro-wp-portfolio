import { z, defineCollection } from "astro:content"

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z
      .string()
      .max(100, "The title length must be less than or equal to 100 chars"),
    date: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        url: z.string(),
        alt: z.string().optional()
      })
      .optional(),
    tags: z.array(z.string())
  })
})

const projectsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      isFeatured: z.boolean().default(false),
      name: z
        .string()
        .max(100, "The title length must be less than or equal to 100 chars"),
      description: z.string().optional(),
      githubURL: z.string(),
      deployURL: z.string().optional(),
      image: z
        .object({
          path: image(),
          alt: z.string().optional()
        })
        .optional(),
      techStack: z.array(z.string())
    })
})

export const collections = {
  posts: postsCollection,
  projects: projectsCollection
}
