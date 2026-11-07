import { getCategorySubCategories, getSingleCategory } from '@/apis/category'
import { getProductsByCategory } from '@/apis/products'
import { Category, SubCategory } from '@/types/category.t'
import { Product } from '@/types/product.t'
import Image from 'next/image'
import React from 'react'
import HomeCard from '@/app/_components/HomeCard/HomeCard'

const CategoryDetails = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    const category: Category = await getSingleCategory(id)

    const allSubCategories: SubCategory[] = await getCategorySubCategories(id)

    const subCategories = allSubCategories.filter(function (sub: SubCategory) {
        return sub.category === id
    })

    const products: Product[] = await getProductsByCategory(id)

    return (
        <div className='my-10 p-5 w-full md:w-[80%] mx-auto'>

            <div className='flex flex-wrap items-center gap-5 mb-8'>
                <Image src={category?.image} alt={category?.name} width={150} height={150} className='w-36 h-36 object-cover rounded-lg' />
                <h1 className='text-3xl text-green-700 font-semibold'>{category?.name}</h1>
            </div>

            <h2 className='text-2xl font-semibold mb-3'>Sub Categories</h2>

            {subCategories.length === 0 ? <p className='mb-8'>No Sub Categories</p> : <div className='flex flex-wrap gap-3 mb-8'>
                {subCategories.map(function (sub: SubCategory, idx: number) {
                    return <span key={idx} className='border border-green-600 rounded-full px-4 py-2'>{sub.name}</span>
                })}
            </div>}

            <h2 className='text-2xl font-semibold mb-3'>Products</h2>

            {products.length === 0 ? <p>No Products in this Category</p> : <div className='grid grid-cols-12 gap-3'>
                {products.map(function (product: Product, idx: number) {
                    return <HomeCard product={product} key={idx} />
                })}
            </div>}

        </div>
    )
}

export default CategoryDetails
