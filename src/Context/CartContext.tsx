"use client"

import React, { createContext, useEffect, useState } from 'react'
import { getUserCartAction } from '@/CartAction/getUserCart'
import { addProductToCartAction } from '@/CartAction/addProdutCart'
import { removeCartItemAction } from '@/CartAction/removeCartItem'
import { updateCartCountAction } from '@/CartAction/updateCartCount'
import { clearCartItemAction } from '@/CartAction/clearCart'
import { Cart, CartProduct } from '@/types/cart.t'

interface CartContextType {
    totalCartItem: number
    totalCartPrice: number
    products: CartProduct[]
    isLoading: boolean
    CartId: string
    addProductCart: (id: string) => Promise<Cart | undefined>
    deleteCartItem: (id: string) => Promise<void>
    updateCartCount: (id: string, count: number) => Promise<void>
    clearCart: () => Promise<void>
    afterPayment: () => void
}

export const cartContext = createContext<CartContextType>({} as CartContextType)

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [products, setProducts] = useState<CartProduct[]>([])
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [totalCartItem, setTotalCartItem] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [CartId, setCartId] = useState("")

    async function getUserCart() {
        setIsLoading(true)
        try {
            const data: Cart = await getUserCartAction()
            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setTotalCartItem(data.numOfCartItems)
            setCartId(data.cartId)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    async function addProductCart(id: string) {
        try {
            const data: Cart = await addProductToCartAction(id)
            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setTotalCartItem(data.numOfCartItems)
            setCartId(data.cartId)
            return data
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCartItem(id: string) {
        try {
            const data: Cart = await removeCartItemAction(id)
            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setTotalCartItem(data.numOfCartItems)
            setCartId(data.cartId)
        } catch (error) {
            console.log(error);
        }
    }

    async function updateCartCount(id: string, count: number) {
        if (count < 1) {
            return deleteCartItem(id)
        }
        try {
            const data: Cart = await updateCartCountAction(id, count)
            setProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setTotalCartItem(data.numOfCartItems)
            setCartId(data.cartId)
        } catch (error) {
            console.log(error);
        }
    }

    async function clearCart() {
        try {
            await clearCartItemAction()
            setProducts([])
            setTotalCartPrice(0)
            setTotalCartItem(0)
        } catch (error) {
            console.log(error);
        }
    }

    function afterPayment() {
        setProducts([])
        setTotalCartPrice(0)
        setTotalCartItem(0)
        setCartId("")
    }

    useEffect(function () {
        getUserCart()
    }, [])

    return (
        <cartContext.Provider value={{
            totalCartItem,
            totalCartPrice,
            products,
            isLoading,
            CartId,
            addProductCart,
            deleteCartItem,
            updateCartCount,
            clearCart,
            afterPayment
        }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartContextProvider
