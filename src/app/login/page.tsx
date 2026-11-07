"use client"

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { loginSchema, LoginSchemaType } from '@/schema/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Controller, useForm } from "react-hook-form";
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Login = () => {

    const form = useForm<LoginSchemaType>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema)
    })

    async function signin(values: LoginSchemaType) {

        const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: "/"
        })

        if (res?.ok === true) {
            toast.success("login successfully",
                { position: "top-center" }
            )
            window.location.href = res?.url || "/"
        } else {
            toast.error(res?.error,
                { position: "top-center" }
            )
        }
    }

    return (
        <div className='w-full my-12 p-5 mx-auto md:w-[60%]'>

            <h1 className='text-3xl text-green-700 mb-5'>Login Now</h1>

            <form onSubmit={form.handleSubmit(signin)} >

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='mb-5'>
                            <FieldLabel htmlFor={field.name}>Enter Your Email</FieldLabel>
                            <Input
                                {...field}
                                type='email'
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='mb-5'>
                            <FieldLabel htmlFor={field.name}>Enter Your Password</FieldLabel>
                            <Input
                                {...field}
                                type='password'
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <div className='flex flex-wrap justify-between items-center gap-3'>
                    <Button type='submit' disabled={form.formState.isSubmitting} className='bg-green-600 hover:bg-green-700'>
                        {form.formState.isSubmitting ? "Loading..." : "Login"}
                    </Button>
                    <Link href="/forgotPassword" className='text-green-700 hover:underline'>Forgot Password ?</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
