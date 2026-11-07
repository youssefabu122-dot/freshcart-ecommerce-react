"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

export async function getAllordersAction() {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }

    const { id } = jwtDecode<{ id: string }>(token as string)

    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
        headers: {
            token: token as string
        }
    })

    return data
}
