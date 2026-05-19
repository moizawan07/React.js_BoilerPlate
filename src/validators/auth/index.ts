import zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .string("Email is required")
    .email("Invalid email address"),
  password: zod
    .string("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const forgotPasswordSchema = zod.object({
  email: zod
    .string("Email is required")
    .email("Invalid email address"),
});

export const resetPasswordSchema = zod.object({
  password: zod
    .string("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: zod
    .string("Confirm password is required")
    .min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type LoginFormData = zod.infer<typeof loginSchema>;
export type ForgotPasswordFormData = zod.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = zod.infer<typeof resetPasswordSchema>;
