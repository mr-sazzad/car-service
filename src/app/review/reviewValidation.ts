import z from "zod";

export const create = z.object({
  body: z.object({
    rating: z.number({ required_error: "Rating must be a number" }),
    review: z
      .string({
        required_error: "Review must be a string and more than ten characters",
      })
      .min(10),
    userId: z.string({ required_error: "UserId must be a string" }),
    serviceId: z.string({ required_error: "ServiceId must be a string" }),
  }),
});
