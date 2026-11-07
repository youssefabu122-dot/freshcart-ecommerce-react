"use client"

import { Category } from '@/types/category.t'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';

const CategorySlider = ({ categories }: { categories: Category[] }) => {
    return (
        <div className='w-full'>

            <h2 className='text-2xl font-semibold mb-5'>Shop Popular Categories</h2>

            <Swiper
                spaceBetween={10}
                slidesPerView={2}
                loop={true}
                modules={[Autoplay]}
                autoplay={{ delay: 2000 }}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
            >
                {categories.map(function (category: Category, idx: number) {
                    return <SwiperSlide key={idx}>
                        <Link href={`/categoryDetails/${category._id}`}>
                            <Image src={category.image} alt={category.name} width={500} height={500} className='w-full h-50 object-cover' />
                            <p className='text-lg mt-2 mb-6'>{category.name}</p>
                        </Link>
                    </SwiperSlide>
                })}
            </Swiper>

        </div>
    )
}

export default CategorySlider
