import { getSingleProducts } from '@/apis/products'
import { Product } from '@/types/product.t'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoIosStar } from "react-icons/io";
import CartBtn from '@/app/_components/CartBtn/CartBtn'
import WishlistBtn from '@/app/_components/WishlistBtn/WishlistBtn'

const ProductDetails = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const data: Product = await getSingleProducts(id)

    return (
        <div className='my-12 w-full md:w-[80%] mx-auto px-5'>

            <div className='grid grid-cols-12 gap-5 items-center'>

                <div className='col-span-12 md:col-span-4'>
                    <div className='inner'>
                        <Image src={data?.imageCover} className='w-full' alt={data?.title} width={500} height={500} />
                    </div>

                    <div className='grid grid-cols-4 gap-2 mt-2'>
                        {data?.images.map(function (image: string, idx: number) {
                            return <Image key={idx} src={image} alt={data?.title} width={150} height={150} className='w-full' />
                        })}
                    </div>
                </div>

                <div className='col-span-12 md:col-span-8'>

                    <div className='p-5'>

                        <h2 className='text-3xl font-bold mb-5'>{data?.title}</h2>
                        <p className='mb-5'>{data?.description}</p>

                        <p className='mb-2'>Category : <Link href={`/categoryDetails/${data?.category._id}`} className='text-green-600'>{data?.category.name}</Link></p>
                        <p className='mb-5'>Brand : <Link href={`/brandDetails/${data?.brand._id}`} className='text-green-600'>{data?.brand.name}</Link></p>

                        <div className='flex justify-between items-center mb-5'>
                            <p className='text-green-500'>{data?.price} EGP</p>
                            <p>{data?.ratingsAverage} <IoIosStar className="inline-block text-yellow-500" /></p>
                        </div>

                        <div className='flex gap-3 items-center'>
                            <CartBtn id={data?.id} />
                            <WishlistBtn id={data?.id} />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ProductDetails
