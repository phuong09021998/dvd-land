import axios from 'axios'

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


export const getUser = () => {
    const request = axios.get(`${USER_SERVER}`)
        .then(res => res.data)
        return {
            type: 'get_user',
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