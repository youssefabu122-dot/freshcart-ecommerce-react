import { getAllCategories } from '@/apis/category'
import { Category } from '@/types/category.t';
import React from 'react'
import CategorySlider from '../CategorySlider/CategorySlider';

const Categories = async () => {

    const data: Category[] = await getAllCategories()

    return (
        <div className='p-5 w-full md:w-[80%] mx-auto'>
            <CategorySlider categories={data} />
        </div>
    )
}

export default Categories
