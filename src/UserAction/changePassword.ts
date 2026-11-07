"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function changePasswordAction(values: { currentPassword: string, password: string, rePassword: string }) {

    const token = await getMyToken()

    if (!token) {
        throw new Error("Login First")
    }

    try {
        const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values, {
            headers: {
                token: token as string,
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            return e.response?.data
        }
        throw e
    }
}
