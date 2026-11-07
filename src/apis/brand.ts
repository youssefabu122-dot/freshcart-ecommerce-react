export async function getAllBrands() {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
        const { data } = await response.json()
        return data
    } catch (e) {
        return e
    }
}

export async function getSingleBrand(id: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        const { data } = await response.json()
        return data
    } catch (e) {
        return e
    }
}
