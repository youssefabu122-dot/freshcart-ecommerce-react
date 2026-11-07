import { getAllBrands } from '@/apis/brand'
import { Brand } from '@/types/brand.t'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Brands = async () => {

    const data: Brand[] = await getAllBrands()

    return (
        <div className='my-10'>

            <h1 className='text-3xl text-green-700 mb-5 text-center'>All Brands</h1>

            <div className='p-5 w-full md:w-[80%] mx-auto'>

                <div className='grid grid-cols-12 gap-5'>

                    {data.map(function (brand: Brand, idx: number) {
                        return <div key={idx} className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
                            <Link href={`/brandDetails/${brand._id}`} className='block border rounded-lg overflow-hidden hover:shadow-lg hover:shadow-green-600/30 transition'>
                                <Image src={brand.image} alt={brand.name} width={500} height={500} className='w-full' />
                                <p className='text-center p-4'>{brand.name}</p>
                            </Link>
                        </div>
                    })}

                </div>

            </div>
        </div>
    )
}

export default Brands
