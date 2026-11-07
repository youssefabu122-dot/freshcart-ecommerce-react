import React from 'react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Product } from '@/types/product.t';
import { IoIosStar } from "react-icons/io";
import Link from 'next/link';
import Image from 'next/image';
import CartBtn from '../CartBtn/CartBtn';
import WishlistBtn from '../WishlistBtn/WishlistBtn';

const HomeCard = ({ product }: { product: Product }) => {

    return (
        <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <Card className="relative mx-auto w-full max-w-sm !p-2">

                <Link href={`/productDetails/${product.id}`}>
                    <Image
                        src={product.imageCover}
                        alt={product.title}
                        className='w-full'
                        width={500}
                        height={500}
                    />
                </Link>

                <CardHeader className='!p-0'>
                    <CardTitle>{product.title.split(" ").slice(0, 2).join(" ")}</CardTitle>
                    <CardDescription className='text-green-600 my-2'>
                        {product.category.name}
                    </CardDescription>
                    <CardDescription className='flex justify-between items-center'>
                        <p>{product.price} EGP</p>
                        <p>{product.ratingsAverage} <IoIosStar className="inline-block text-yellow-500" /></p>
                    </CardDescription>
                </CardHeader>

                <CardFooter className='!p-0 gap-3'>
                    <CartBtn id={product.id} />
                    <WishlistBtn id={product.id} />
                </CardFooter>
            </Card>
        </div>
    )
}

export default HomeCard
