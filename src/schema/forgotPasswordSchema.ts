import * as z from "zod";

export const forgotPasswordSchema = z.object({
    email: z.email("invalid Email"),
})

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

export const verifyCodeSchema = z.object({
    resetCode: z.string().regex(/^[0-9]{4,6}$/, "invalid code"),
})

export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>

export const resetPasswordSchema = z.object({
    email: z.email("invalid Email"),
    newPassword: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20"),
})

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>
