import z from "zod";

export const create = z.object({
  body: z.object({
    service: z.string({ required_error: "Service Id is required" }),
    status: z
      .enum(["in_progress", "pending", "cancelled", "completed"])
      .default("in_progress"),
    userId: z.string({ required_error: "User Id is required" }),
    confirmedDate: z.string().optional(),
  }),
});

export const update = z.object({
  body: z.object({
    service: z.string().optional(),
    status: z
      .enum(["in_progress", "pending", "cancelled", "completed"])
      .default("in_progress"),
    userId: z.string().optional(),
    confirmedDate: z.string().optional(),
  }),
});
