import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "min Length 3").max(20, "max Length 20"),
    email: z.email("invalid Email"),
    password: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20"),
    rePassword: z.string().min(6, "must be at least 6 chars").max(20, "max Length 20"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "invalid phone number")
}).refine(function (obj) {
    return obj.password === obj.rePassword
}, {
    path: ["rePassword"],
    error: "password doesn't match"
})

export type RegisterSchemaType = z.infer<typeof registerSchema>
