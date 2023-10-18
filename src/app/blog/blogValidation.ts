import z from "zod";

export const create = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
    image: z.string(),
  }),
});

export const update = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    image: z.string(),
  }),
});
