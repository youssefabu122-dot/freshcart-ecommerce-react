export async function getAllCategories() {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
        const { data } = await response.json()
        return data
    } catch (e) {
        return e
    }
}

export async function getSingleCategory(id: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        const { data } = await response.json()
        return data
    } catch (e) {
        return e
    }
}

export async function getCategorySubCategories(id: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
        const { data } = await response.json()
        return data
    } catch (e) {
        return e
    }
}
