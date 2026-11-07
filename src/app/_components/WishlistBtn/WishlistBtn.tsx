"use client"

import { addToWishlistAction } from '@/WishlistAction/addToWishlist'
import React from 'react'
import { IoIosHeart } from "react-icons/io";
import { toast } from 'sonner'

const WishlistBtn = ({ id }: { id: string }) => {

    async function addToWishlist() {
        try {
            const data = await addToWishlistAction(id)

            if (data.status === "success") {
                toast.success(data.message, {
                    position: "top-center"
                })
            }
        } catch (error) {
            console.log(error);
            toast.error("Product added faild to your wishlist", {
                position: "top-center"
            })
        }
    }

    return (
        <button onClick={addToWishlist} aria-label="Add to wishlist" className='cursor-pointer'>
            <IoIosHeart className='text-2xl text-red-500 hover:scale-110 transition' />
        </button>
    )
}

export default WishlistBtn
