"use client"

import { Button } from '@/components/ui/button'
import { cartContext } from '@/Context/CartContext'
import { CartProduct } from '@/types/cart.t'
import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '../loading'

const Cart = () => {

    const { products, totalCartPrice, isLoading, clearCart, deleteCartItem, updateCartCount } = useContext(cartContext)

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='my-12 mx-3'>

            <div className='w-full p-5 md:w-[90%] mx-auto bg-slate-100'>

                {products.length === 0 ? <h1 className="text-3xl text-center"> No Data to Display It </h1> : <>

                    <h1 className='text-2xl'>Cart</h1>

                    <p className='font-mono my-3 text-green-700'>Total Cart Price : {totalCartPrice} EGP</p>

                    <div className='flex gap-3 mb-5'>
                        <Button onClick={clearCart}>Clear</Button>
                        <Link href="/payment">
                            <Button className='bg-green-600 hover:bg-green-700'>Check Out</Button>
                        </Link>
                    </div>

                    {products.map(function (product: CartProduct, idx: number) {
                        return <div key={idx} className="flex flex-wrap gap-3 justify-between items-center py-3 border-b border-green-700/20">

                            <div className='flex gap-5 items-center'>
                                <Image src={product.product.imageCover} alt={product.product.title} height={200} width={200} className='w-32' />
                                <div>
                                    <h2 className='text-xl'>{product.product.title}</h2>
                                    <p className='my-3'>Price : {product.price} EGP</p>
                                    <Button onClick={() => { deleteCartItem(product.product.id) }}>Remove</Button>
                                </div>
                            </div>

                            <div className='flex gap-3 items-center'>
                                <Button onClick={() => updateCartCount(product.product.id, product.count + 1)}>+</Button>
                                <p>{product.count}</p>
                                <Button onClick={() => updateCartCount(product.product.id, product.count - 1)}>-</Button>
                            </div>

                        </div>
                    })}

                </>}

            </div>
        </div>
    )
}

export default Cart
