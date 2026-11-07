import { getAllordersAction } from '@/PaymentAction/Order'
import { CartItem, Order } from '@/types/orders.t'
import Image from 'next/image'
import React from 'react'

const Allorders = async () => {

    const data: Order[] = await getAllordersAction()

    return (
        <div className='my-12 w-full md:w-[90%] mx-auto p-5'>

            <h1 className='text-3xl text-green-700 mb-5 text-center'>All Orders</h1>

            {data?.length === 0 && <h2 className='text-2xl text-center'>No Orders Yet</h2>}

            {data?.map(function (order: Order, idx: number) {
                return <div key={idx} className='p-4 mb-5 bg-slate-50'>

                    <div className='grid grid-cols-12 gap-3'>
                        {order.cartItems?.map(function (item: CartItem, idx: number) {
                            return <div key={idx} className='col-span-6 md:col-span-3 lg:col-span-2'>
                                <Image src={item.product.imageCover} alt={item.product.title} height={200} width={200} />
                                <h3>{item.product.title.split(" ").slice(0, 3).join(" ")}</h3>
                                <p className='text-green-700'>{item.count} x {item.price} EGP</p>
                            </div>
                        })}
                    </div>

                    <h3 className='mt-3'>payment Method Type : {order.paymentMethodType}</h3>
                    <h3>total Order Price : {order.totalOrderPrice} EGP</h3>

                </div>
            })}

        </div>
    )
}

export default Allorders
