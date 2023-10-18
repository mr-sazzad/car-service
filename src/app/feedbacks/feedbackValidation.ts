import z from "zod";

export const create = z.object({
  body: z.object({
    userId: z.string({ required_error: "User Id is required" }),
    suggestion: z.string(),
    comment: z.string(),
  }),
});

export const update = z.object({
  body: z.object({
    userId: z.string(),
    suggestion: z.string(),
    comment: z.string(),
  }),
});
