import { getSingleBrand } from '@/apis/brand'
import { getProductsByBrand } from '@/apis/products'
import { Brand } from '@/types/brand.t'
import { Product } from '@/types/product.t'
import Image from 'next/image'
import React from 'react'
import HomeCard from '@/app/_components/HomeCard/HomeCard'

const BrandDetails = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const brand: Brand = await getSingleBrand(id)

    const products: Product[] = await getProductsByBrand(id)

    return (
        <div className='my-10 p-5 w-full md:w-[80%] mx-auto'>

            <div className='flex flex-wrap items-center gap-5 mb-8'>
                <Image src={brand?.image} alt={brand?.name} width={200} height={200} className='w-48 border rounded-lg' />
                <h1 className='text-3xl text-green-700 font-semibold'>{brand?.name}</h1>
            </div>

            <h2 className='text-2xl font-semibold mb-3'>Products</h2>

            {products.length === 0 ? <p>No Products for this Brand</p> : <div className='grid grid-cols-12 gap-3'>
                {products.map(function (product: Product, idx: number) {
                    return <HomeCard product={product} key={idx} />
                })}
            </div>}

        </div>
    )
}

export default BrandDetails
