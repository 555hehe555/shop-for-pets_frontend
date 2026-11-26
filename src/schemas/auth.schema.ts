import { z } from "zod";

export const registrationSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    pass1: z.string().min(8, "Password must be at least 8 characters"),
    pass2: z.string().min(8, "Password must be at least 8 characters"),
    email: z.string().email({ message: "Invalid email address" }),
  })
  .refine((data) => data.pass1 === data.pass2, {
    message: "Password don't match",
    path: ["pass2"],
  });

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  pass: z.string().min(8, "Password must be at least 8 characters"),
});
