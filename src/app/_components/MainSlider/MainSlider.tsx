"use client"

import React from 'react'
import Style from "./MainSlider.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
    { title: "Fresh Products Delivered to your Door", text: "Get 20% off your first order" },
    { title: "Premium Quality Guaranteed", text: "Fresh from farm to your table" },
    { title: "Fast & Free Delivery", text: "Same day delivery available" },
]

const MainSlider = () => {
    return (

        <div className='w-full'>

            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
            >
                {slides.map(function (slide, idx: number) {
                    return <SwiperSlide key={idx}>
                        <div className={`h-125 relative ${Style.test}`}>

                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-green-600/50 flex flex-col justify-center px-10 md:px-20 text-white">
                                <h2 className='text-3xl md:text-4xl font-bold mb-3'>{slide.title}</h2>
                                <p className='text-lg'>{slide.text}</p>
                            </div>

                        </div>
                    </SwiperSlide>
                })}
            </Swiper>

        </div>

    )
}

export default MainSlider
