"use client"

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { changePasswordSchema, ChangePasswordSchemaType } from '@/schema/changePasswordSchema';
import { changePasswordAction } from '@/UserAction/changePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Controller, useForm } from "react-hook-form";
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';

const ChangePassword = () => {

    const form = useForm<ChangePasswordSchemaType>({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: "",
        },
        resolver: zodResolver(changePasswordSchema)
    })

    async function changePassword(values: ChangePasswordSchemaType) {
        const data = await changePasswordAction(values)

        if (data?.message === "success") {
            toast.success("Password changed successfully, login again", { position: "top-center" })
            signOut({ callbackUrl: "/login" })
        } else {
            toast.error(data?.errors?.msg || data?.message || "Something went wrong", { position: "top-center" })
        }
    }

    return (
        <div className='w-full my-12 p-5 mx-auto md:w-[60%]'>

            <h1 className='text-3xl text-green-700 mb-5'>Change Password</h1>

            <form onSubmit={form.handleSubmit(changePassword)} >

                <Controller
                    name="currentPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='mb-5'>
                            <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                            <Input {...field} type='password' id={field.name} aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='mb-5'>
                            <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                            <Input {...field} type='password' id={field.name} aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="rePassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='mb-5'>
                            <FieldLabel htmlFor={field.name}>Confirm New Password</FieldLabel>
                            <Input {...field} type='password' id={field.name} aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Button type='submit' disabled={form.formState.isSubmitting} className='bg-green-600 hover:bg-green-700'>
                    {form.formState.isSubmitting ? "Loading..." : "Change Password"}
                </Button>
            </form>
        </div>
    )
}

export default ChangePassword
