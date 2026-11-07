"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cartContext } from '@/Context/CartContext'
import { CahPaymentAction } from '@/PaymentAction/CashPayment'
import { onlinePaymentAction } from '@/PaymentAction/OnlinePayment'
import { useRouter } from 'next/navigation'
import React, { useContext, useRef } from 'react'

const Payment = () => {

    const { CartId, afterPayment } = useContext(cartContext)

    const router = useRouter()

    const details = useRef<HTMLInputElement>(null)
    const phone = useRef<HTMLInputElement>(null)
    const city = useRef<HTMLInputElement>(null)

    async function cashPayment() {
        const value = {
            shippingAddress: {
                details: details.current?.value,
                phone: phone.current?.value,
                city: city.current?.value
            }
        }
        try {
            await CahPaymentAction(CartId, value)
            afterPayment()
            router.push("/allorders")
        } catch (error) {
            console.log(error);
        }
    }

    async function onlinePayment() {
        const value = {
            shippingAddress: {
                details: details.current?.value,
                phone: phone.current?.value,
                city: city.current?.value
            }
        }
        try {
            const data = await onlinePaymentAction(CartId, value)
            if (data.status === "success") {
                window.location.href = data.session.url
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='my-12 p-5 w-full md:w-1/2 mx-auto'>

            <h1 className='text-3xl text-center mb-5'>Payment</h1>

            <Label htmlFor='details' className='mb-2'>Details</Label>
            <Input ref={details} type="text" id='details' className='mb-4' />

            <Label htmlFor='phone' className='mb-2'>Phone</Label>
            <Input ref={phone} type="tel" id='phone' className='mb-4' />

            <Label htmlFor='city' className='mb-2'>City</Label>
            <Input ref={city} type="text" id='city' className='mb-4' />

            <Button onClick={cashPayment} className='me-3'>Cash Payment</Button>
            <Button onClick={onlinePayment} className='bg-green-600 hover:bg-green-700'>Online Payment</Button>

        </div>
    )
}

export default Payment
