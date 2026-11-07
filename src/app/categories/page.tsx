import { getAllCategories } from '@/apis/category'
import { Category } from '@/types/category.t'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Categories = async () => {

    const data: Category[] = await getAllCategories()

    return (
        <div className='my-10'>

            <h1 className='text-3xl text-green-700 mb-5 text-center'>All Categories</h1>

            <div className='p-5 w-full md:w-[80%] mx-auto'>

                <div className='grid grid-cols-12 gap-5'>

                    {data.map(function (category: Category, idx: number) {
                        return <div key={idx} className='col-span-12 sm:col-span-6 md:col-span-4'>
                            <Link href={`/categoryDetails/${category._id}`} className='block border rounded-lg overflow-hidden hover:shadow-lg hover:shadow-green-600/30 transition'>
                                <Image src={category.image} alt={category.name} width={500} height={500} className='w-full h-75 object-cover' />
                                <p className='text-2xl text-green-700 text-center font-semibold p-4'>{category.name}</p>
                            </Link>
                        </div>
                    })}

                </div>

            </div>
        </div>
    )
}

export default Categories
