import { Brand, Category, Subcategory } from "./product.t"

export interface Order {
    shippingAddress: ShippingAddress
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: User
    cartItems: CartItem[]
    createdAt: string
    updatedAt: string
    id: number
    __v: number
}

export interface ShippingAddress {
    details: string
    phone: string
    city: string
}

export interface User {
    _id: string
    name: string
    email: string
    phone: string
}

export interface CartItem {
    count: number
    _id: string
    product: Product
    price: number
}

export interface Product {
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    id: string
}
