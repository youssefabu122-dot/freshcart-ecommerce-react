import { getAllProducts } from "@/apis/products";
import { Product } from "@/types/product.t";
import HomeCard from "./_components/HomeCard/HomeCard";
import MainSlider from "./_components/MainSlider/MainSlider";
import Categories from "./_components/Categories/Categories";

const Products = async () => {

  const data: Product[] = await getAllProducts()

  return (
    <>

      <MainSlider />

      <Categories />

      <div className='my-10'>

        <div className='p-5 w-full md:w-[80%] mx-auto'>

          <h2 className='text-2xl font-semibold mb-5'>Featured Products</h2>

          <div className='grid grid-cols-12 gap-3'>

            {data.map(function (product: Product, idx: number) {
              return <HomeCard product={product} key={idx} />
            })}

          </div>

        </div>

      </div>
    </>
  )
}

export default Products
