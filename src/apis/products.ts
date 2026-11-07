export async function getAllProducts() {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/products")
        const { data } = await response.json()
        return data
    } catch (e) {
        return e
    }
}

export async function getSingleProducts(id: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        const { data } = await response.json()
        return data
    } catch (e) {
        return e
    }
}

export async function getProductsByCategory(id: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
        const { data } = await response.json()
        return data
    } catch (e) {
        return e
    }
}

export async function getProductsByBrand(id: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
        const { data } = await response.json()
        return data
    } catch (e) {
        return e
    }
}
