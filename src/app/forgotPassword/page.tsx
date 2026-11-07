"use client"

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    forgotPasswordSchema, ForgotPasswordSchemaType,
    verifyCodeSchema, VerifyCodeSchemaType,
    resetPasswordSchema, ResetPasswordSchemaType
} from '@/schema/forgotPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {

    const route = useRouter()

    // 1 => send email , 2 => verify code , 3 => reset password
    const [step, setStep] = useState(1)

    const emailForm = useForm<ForgotPasswordSchemaType>({
        defaultValues: { email: "" },
        resolver: zodResolver(forgotPasswordSchema)
    })

    const codeForm = useForm<VerifyCodeSchemaType>({
        defaultValues: { resetCode: "" },
        resolver: zodResolver(verifyCodeSchema)
    })

    const resetForm = useForm<ResetPasswordSchemaType>({
        defaultValues: { email: "", newPassword: "" },
        resolver: zodResolver(resetPasswordSchema)
    })

    function showError(e: unknown) {
        if (axios.isAxiosError(e)) {
            toast.error(e.response?.data.message, { position: "top-center" })
        }
    }

    async function sendCode(values: ForgotPasswordSchemaType) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
            toast.success(data.message, { position: "top-center" })
            resetForm.setValue("email", values.email)
            setStep(2)
        } catch (e) {
            showError(e)
        }
    }

    async function verifyCode(values: VerifyCodeSchemaType) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
            toast.success(data.status, { position: "top-center" })
            setStep(3)
        } catch (e) {
            showError(e)
        }
    }

    async function resetPassword(values: ResetPasswordSchemaType) {
        try {
            await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
            toast.success("Password changed successfully, login now", { position: "top-center" })
            route.push("/login")
        } catch (e) {
            showError(e)
        }
    }

    return (
        <div className='w-full my-12 p-5 mx-auto md:w-[60%]'>

            {step === 1 && <>
                <h1 className='text-3xl text-green-700 mb-5'>Forgot Password</h1>

                <form onSubmit={emailForm.handleSubmit(sendCode)} >
                    <Controller
                        name="email"
                        control={emailForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className='mb-5'>
                                <FieldLabel htmlFor={field.name}>Enter Your Email</FieldLabel>
                                <Input {...field} type='email' id={field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Button type='submit' disabled={emailForm.formState.isSubmitting} className='bg-green-600 hover:bg-green-700'>
                        {emailForm.formState.isSubmitting ? "Loading..." : "Send Code"}
                    </Button>
                </form>
            </>}

            {step === 2 && <>
                <h1 className='text-3xl text-green-700 mb-5'>Verify Reset Code</h1>

                <form onSubmit={codeForm.handleSubmit(verifyCode)} >
                    <Controller
                        name="resetCode"
                        control={codeForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className='mb-5'>
                                <FieldLabel htmlFor={field.name}>Enter the Code sent to your Email</FieldLabel>
                                <Input {...field} type='text' id={field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Button type='submit' disabled={codeForm.formState.isSubmitting} className='bg-green-600 hover:bg-green-700'>
                        {codeForm.formState.isSubmitting ? "Loading..." : "Verify"}
                    </Button>
                </form>
            </>}

            {step === 3 && <>
                <h1 className='text-3xl text-green-700 mb-5'>Reset Password</h1>

                <form onSubmit={resetForm.handleSubmit(resetPassword)} >
                    <Controller
                        name="email"
                        control={resetForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className='mb-5'>
                                <FieldLabel htmlFor={field.name}>Your Email</FieldLabel>
                                <Input {...field} type='email' id={field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="newPassword"
                        control={resetForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className='mb-5'>
                                <FieldLabel htmlFor={field.name}>Enter New Password</FieldLabel>
                                <Input {...field} type='password' id={field.name} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Button type='submit' disabled={resetForm.formState.isSubmitting} className='bg-green-600 hover:bg-green-700'>
                        {resetForm.formState.isSubmitting ? "Loading..." : "Reset Password"}
                    </Button>
                </form>
            </>}

        </div>
    )
}

export default ForgotPassword
