import z from "zod";

export const create = z.object({
  body: z.object({
    name: z.string({ required_error: "Name filed is required" }),
    email: z.string({ required_error: "Email filed is required" }).email(),
    password: z.string({ required_error: "Password filed is required" }),
    age: z.string({ required_error: "Age filed is required" }),
    address: z.string({ required_error: "Address filed is required" }),
    role: z.enum(["admin", "user", "super_admin"], {
      required_error: "Role filed is required",
    }),
    profileImage: z.string({
      required_error: "Profile image filed is required",
    }),
  }),
});

export const update = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    age: z.string(),
    address: z.string(),
    role: z.enum(["admin", "user", "super_admin"]),
    profileImage: z.string(),
  }),
});
