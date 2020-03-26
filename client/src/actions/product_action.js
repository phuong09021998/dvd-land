import axios from 'axios'

export const createProduct = (dataToSubmit) => {
    let bodyFormData = new FormData()
    for (let key in dataToSubmit) {
        if (key !== 'photo') {
            bodyFormData.set(key, dataToSubmit[key])
        } else {
            bodyFormData.append(key, dataToSubmit[key])
        }
    }
    const request = axios({
        method: 'post',
        url: '/api/admin/product/create',
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
    }).then(res => res.data).catch(err => console.log(err.response))

    
    return {
        type: 'create_product',
        payload: request
    }
}

export const getProducts = () => {
    const request = axios.get('/api/products')
        .then(res => res.data)

        return {
            type: 'get_products',
            payload: request
        }
}

export const getNewArrivals = () => {
    const request = axios.get('/api/products?order=desc&sortBy=createdAt&limit=6')
        .then(res => res.data)

        return {
            type: 'get_new_arrivals',
            payload: request
        }
}

export const getSales = () => {
    const request = axios.get('/api/sales')
        .then(res => res.data)

        return {
            type: 'get_sales',
            payload: request
        }
}

export const getBestSelling = () => {
    const request = axios.get('/api/products?order=desc&sortBy=sold&limit=6')
        .then(res => res.data)

        return {
            type: 'get_best_selling',
            payload: request
        }
}

export const searchProduct = (dataToSubmit) => {
    const request = axios.post('/api/product/search', dataToSubmit)
        .then(res => res.data)

        return {
            type: 'search_product',
            payload: request
        }
}

export const removeSearch = () => {
    return {
        type: 'remove_search',
        payload: null
    }
}

export const searchProductPage = (dataToSubmit, limit) => {
    const request = axios.post(`/api/product/search?limit=${limit || 12}`, dataToSubmit)
        .then(res => res.data)

        return {
            type: 'search_product_page',
            payload: request
        }
}


export function getProductsToShop(dataToSubmit, skip, limit, previousState = []){
    const request = axios.post(`/api/product/search?limit=${limit || 9}&skip=${skip || 0}`, dataToSubmit)
                .then(res => {
                    let newState = [
                        ...previousState,
                        ...res.data
                    ]
                    return {
                        articles: newState
                    }
                });

    return {
        type: 'product_to_shop',
        payload: request
    }

}

export const getProductById = (id) => {
    const request = axios.get(`/api/product/${id}`)
        .then(res => res.data)

        return {
            type: 'by_id',
            payload: request
        }
}

