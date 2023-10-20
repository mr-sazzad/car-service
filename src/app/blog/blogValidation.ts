import z from "zod";

export const create = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
    image: z.string().optional(),
  }),
});

export const update = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
  }),
});
