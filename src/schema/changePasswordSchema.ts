import * as z from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6, "must be at least 6 chars"),
    password: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20"),
    rePassword: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20"),
}).refine(function (obj) {
    return obj.password === obj.rePassword
}, {
    path: ["rePassword"],
    error: "password doesn't match"
})

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>
