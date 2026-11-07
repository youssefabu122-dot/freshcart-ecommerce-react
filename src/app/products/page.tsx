import { getAllProducts } from '@/apis/products'
import { Product } from '@/types/product.t'
import React from 'react'
import HomeCard from '../_components/HomeCard/HomeCard'

const AllProducts = async () => {

    const data: Product[] = await getAllProducts()

    return (
        <div className='my-10'>

            <h1 className='text-3xl text-green-700 mb-5 text-center'>All Products</h1>

            <div className='p-5 w-full md:w-[80%] mx-auto'>

                <div className='grid grid-cols-12 gap-3'>

                    {data.map(function (product: Product, idx: number) {
                        return <HomeCard product={product} key={idx} />
                    })}

                </div>

            </div>
        </div>
    )
}

export default AllProducts
