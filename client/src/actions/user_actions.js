import axios from 'axios'
import ls from 'local-storage'

import { USER_SERVER } from '../components/utils/misc'

export function loginUser (dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(res => res.data)

    
    return {
        type: 'login_user',
        payload: request
    }
}

export const registerUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/create`, dataToSubmit)
        .then(res => res.data)

        return {
            type: 'register_user',
            payload: request
        }
}


export const getUser = (cart=false) => {
    const request = axios.get(`${USER_SERVER}`)
        .then(res => res.data)

        return {
            type: cart ? 'get_user_cart' : 'get_user',
            payload: request
        }
}

export const logoutUser = () => {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(res => res.data)
        return {
            type: 'logout_user',
            payload: request
        }
}


export const addToCart = (dataToSubmit, id, quantity) => {
    const request = axios.post(`/api/user/addtocart?productId=${id}&quantity=${quantity || ''}`, dataToSubmit)
    .then(res => res.data)
    return {
        type: 'add_to_cart',
        payload: request
    }
}


export const getCartItems = () => {
    const request = axios.get(`/api/user/cartitem`)
    .then(res => res.data)
    return {
        type: 'get_cart_items',
        payload: request
    }
}

export const removeCartItem = (id) => {
    const request = axios.get(`/api/user/removefromcart?productId=${id}`)
    .then(res => res.data)
    return {
        type: 'add_to_cart',
        payload: request
    }
}

export const removeCartItemState = (id) => {
  
    return {
        type: 'remove_cart',
        payload: null
    }
}


export const onSuccessBuy = (data) => { 

    const request = axios.post('/api/user/success', data)
                    .then(response => response.data)
                    .catch(err => console.log(err.response))

    return {
        type: 'success_buy',
        payload: request
    }
}


export const upDateUser = (dataToSubmit) => {
    const request = axios.patch(`/api/user/update`, dataToSubmit)
        .then(res => res.data)
        return {
            type: 'update_user',
            payload: request
        }
}