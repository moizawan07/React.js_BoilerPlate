import zod from "zod";

export const loginSchema = zod.object({
  email: zod.string("Email is required").email("Invalid email address"),
  password: zod
    .string("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});
