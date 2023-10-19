import z from "zod";

export const create = z.object({
  body: z.object({
    title: z.string({ required_error: "Title not provided" }),
    price: z.string({ required_error: "Price not provided" }),
    status: z.enum(["up_coming", "current"]).default("current"),
    description: z.string({ required_error: "Description not provided" }),
    image: z.string({ required_error: "Image not provided" }),
  }),
});

export const update = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.string().optional(),
    status: z.enum(["up_coming", "current"]).default("current").optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});
