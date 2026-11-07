"use client"

import { Button } from '@/components/ui/button'
import { cartContext } from '@/Context/CartContext'
import { Product } from '@/types/product.t'
import { getUserWishlistAction } from '@/WishlistAction/getUserWishlist'
import { removeFromWishlistAction } from '@/WishlistAction/removeFromWishlist'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import Loading from '../loading'

const Wishlist = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const { addProductCart } = useContext(cartContext)

    async function removeFromWishlist(id: string) {
        try {
            const data = await removeFromWishlistAction(id)
            if (data.status === "success") {
                setProducts(products.filter((product) => product.id !== id))
                toast.success(data.message, { position: "top-center" })
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function moveToCart(id: string) {
        const data = await addProductCart(id)
        if (data?.status === "success") {
            toast.success(data.message, { position: "top-center" })
            removeFromWishlist(id)
        }
    }

    useEffect(function () {
        getUserWishlistAction()
            .then(function (data) {
                setProducts(data.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='my-12 mx-3'>

            <div className='w-full p-5 md:w-[90%] mx-auto bg-slate-100'>

                <h1 className='text-2xl mb-5'>My Wishlist</h1>

                {products.length === 0 ? <h2 className="text-3xl text-center"> No Data to Display It </h2> : products.map(function (product: Product, idx: number) {
                    return <div key={idx} className="flex flex-wrap gap-3 justify-between items-center py-3 border-b border-green-700/20">

                        <div className='flex gap-5 items-center'>
                            <Image src={product.imageCover} alt={product.title} height={200} width={200} className='w-32' />
                            <div>
                                <h2 className='text-xl'>{product.title}</h2>
                                <p className='my-3 text-green-700'>Price : {product.price} EGP</p>
                                <Button variant="destructive" onClick={() => removeFromWishlist(product.id)}>Remove</Button>
                            </div>
                        </div>

                        <Button className='bg-green-600 hover:bg-green-700' onClick={() => moveToCart(product.id)}>Add To Cart</Button>

                    </div>
                })}

            </div>
        </div>
    )
}

export default Wishlist
