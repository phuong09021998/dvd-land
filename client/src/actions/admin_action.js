import axios from 'axios'


export const getUsers = () => {
    const request = axios.get('/api/admin/users?sortBy=email&limit=9999')
        .then(res => res.data)
        return {
            type: 'get_users',
            payload: request
        }
}

export const updateUser = (dataToSubmit, id) => {
    const request = axios.patch(`/api/admin/user/${id}`, dataToSubmit)
        .then(res => res.data).catch(err => console.log(err.response) )
        return {
            type: 'update_user',
            payload: request
        }
}

export const searchUser = (dataToSubmit) => {
    const request = axios.post(`/api/admin/user/search`, dataToSubmit)
        .then(res => res.data).catch(err => console.log(err.response) )
        return {
            type: 'search_user',
            payload: request
        }
}

export const deleteUser = (id) => {
    const request = axios.delete(`/api/admin/user/${id}`)
        .then(res => res.data)
        return {
            type: 'delete_user',
            payload: request
        }
}

