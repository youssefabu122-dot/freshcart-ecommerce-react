"use client"

import React, { useContext } from 'react'
import logo from "../../../../public/images/freshcart-logo.svg"
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { cartContext } from '@/Context/CartContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const Navbar = () => {

    const { status } = useSession()

    const { totalCartItem } = useContext(cartContext)

    return (
        <div className="py-5 bg-slate-100">

            <div className='w-full md:w-[80%] px-5 mx-auto'>

                <div className='parent flex text-center flex-wrap justify-between items-center gap-y-3'>

                    <div className='logo w-full md:w-1/4'>
                        <Link href="/">
                            <Image src={logo} alt="FreshCart" className='mx-auto md:mx-0' />
                        </Link>
                    </div>

                    {status === "authenticated" && <ul className='md:flex justify-around w-full md:w-1/2 items-center'>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/products">Products</Link>
                        </li>
                        <li>
                            <Link href="/categories">Categories</Link>
                        </li>
                        <li>
                            <Link href="/brands">Brands</Link>
                        </li>
                        <li>
                            <Link href="/wishlist">Wishlist</Link>
                        </li>
                        <li>
                            <Link href="/allorders">Orders</Link>
                        </li>
                        <li>
                            <Link href="/cart">Cart
                                <Badge className='ms-1 bg-green-600'>{totalCartItem}</Badge>
                            </Link>
                        </li>
                    </ul>}

                    {status === "loading" && <h1>Loading ......</h1>}

                    <ul className='md:flex justify-end items-center w-full md:w-1/4'>

                        {status === "authenticated" && <>
                            <li className='me-5'>
                                <Link href="/changePassword">Change Password</Link>
                            </li>
                            <li>
                                <Button onClick={() => signOut({
                                    callbackUrl: "/login"
                                })}>logout</Button>
                            </li>
                        </>}

                        {status === "unauthenticated" && <>
                            <li className='me-5'>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/register">Register</Link>
                            </li>
                        </>}

                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Navbar
