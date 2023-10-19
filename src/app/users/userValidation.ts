import z from "zod";

export const create = z.object({
  body: z.object({
    name: z.string({ required_error: "Name not provided" }),
    role: z.enum(["user", "admin", "super_admin"]).default("user"),
    email: z.string({ required_error: "Email not provided" }).email(),
    password: z.string({ required_error: "Password not provided" }),
    contactNo: z.string().optional(),
    gender: z.enum(["Male", "Female", "Others"]).optional(),
    bloodGroup: z
      .enum(["O+", "B+", "B-", "AB+", "AB-", "O-", "A+", "A-"])
      .optional(),
    profileImage: z.string().optional(),
    isBanned: z.boolean().default(false),
  }),
});

export const update = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.enum(["user", "admin", "super_admin"]).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    contactNo: z.string().optional(),
    gender: z.enum(["Male", "Female", "Others"]).optional(),
    bloodGroup: z
      .enum(["O+", "B+", "B-", "AB+", "AB-", "O-", "A+", "A-"])
      .optional(),
    profileImage: z.string().optional(),
    isBanned: z.boolean().optional(),
  }),
});
