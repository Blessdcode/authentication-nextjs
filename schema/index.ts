import * as z from "zod";

const ADMIN = "admin";
const USER = "user";

export const SchemaSettings = z
  .object({
    fullName: z.optional(z.string().trim()),
    userName: z.optional(z.string().trim()),
    email: z.optional(z.string().trim()),
    password: z.optional(z.string().min(6).trim()),
    confirmPassword: z.optional(z.string().min(6).trim()),
    newPassword: z.optional(z.string().min(6).trim()),
    role: z.enum([ADMIN, USER]),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (
        data.password &&
        data.confirmPassword &&
        data.password !== data.confirmPassword
      ) {
        return false;
      }
    },
    {
      message: "Password don't match",
      path: ["confirmPassword"],
    }
  );

export const SignUpSchema = z.object({
  fullName: z.string().min(3, {
    message: "Name is required",
  }),
  userName: z.string().min(3, {
    message: "Username is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum of 6 character required",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must match",
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
  code: z.optional(
    z.string().min(6, {
      message: "Minimum of 6 characters",
    })
  ),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters is required",
  }),
});
