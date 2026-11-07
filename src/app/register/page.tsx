"use client"

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { registerSchema, RegisterSchemaType } from '@/schema/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Register = () => {

    const route = useRouter()

    const form = useForm<RegisterSchemaType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        resolver: zodResolver(registerSchema)
    })

    async function signup(values: RegisterSchemaType) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)

            toast.success(data.message,
                { position: "top-center" }
            )
            route.push("/login")

        } catch (e) {
            if (axios.isAxiosError(e)) {
                toast.error(e.response?.data.message,
                    { position: "top-center" }
                )
            }
        }
    }

    return (
        <div className='w-full my-12 p-5 mx-auto md:w-[60%]'>

            <h1 className='text-3xl text-green-700 mb-5'>Register Now</h1>

            <form onSubmit={form.handleSubmit(signup)} >

                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='mb-5'>
                            <FieldLabel htmlFor={field.name}>Enter Your Name</FieldLabel>
                            <Input
                                {...field}
                                type='text'
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

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

                <Controller
                    name="rePassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='mb-5'>
                            <FieldLabel htmlFor={field.name}>Enter Your rePassword</FieldLabel>
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

                <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className='mb-5'>
                            <FieldLabel htmlFor={field.name}>Enter Your Phone</FieldLabel>
                            <Input
                                {...field}
                                type='tel'
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Button type='submit' disabled={form.formState.isSubmitting} className='bg-green-600 hover:bg-green-700'>
                    {form.formState.isSubmitting ? "Loading..." : "Register"}
                </Button>
            </form>
        </div>
    )
}

export default Register
