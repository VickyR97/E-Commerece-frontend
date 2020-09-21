import { API } from "../../user/backend";


// CATEGORY CALLS

// CREATE CATEGORY
export const createCategory =(userId, token, category) =>{
    return fetch(`${API}/category/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

// GET ALL CATEGORIES
export const getAllCategories = () =>{
    return fetch(`${API}/categories`,{
        method: "GET"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

// DELETE CATEGORY
export const deleteCategory = (categoryId, userId, token) =>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

// UPDATE CATEGORY
export const updateCategory = (categoryId, userId, token, category) =>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

// GET A CATEGORY
export const getCategory = categoryId =>{
    return fetch(`${API}/category/${categoryId}`,{
        method: "GET"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}



// PRODUCT CALLS

// CREATE PRODUCT 
export const createProduct = (userId, token, product) =>{
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product   
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

// GET ALL PRODUCTS
export const getAllProducts = () =>{
    return fetch(`${API}/products`,{
        method: "GET"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

// GET A PRODUCT
export const getProduct = productId =>{
    return fetch(`${API}/product/${productId}`,{
        method: "GET"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}



// UPDATE PRODUCT 
export const updateProduct = (productId, userId, token, product) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product   
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

// DELETE PRODUCT 
export const deleteProduct = (productId, userId, token) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

