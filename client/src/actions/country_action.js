import axios from 'axios'


export const getCountry = () => {
    const request = axios.get('/api/country')
        .then(res => res.data)

    return {
        type: 'get_country',
        payload: request
    }
}


export const createCountry = (dataToSubmit) => {
    const request = axios.post('/api/admin/country/create', dataToSubmit)
        .then(res => res.data)

    return {
        type: 'create_country',
        payload: request
    }
}

export const updateCountry = (dataToSubmit ,id) => {
    const request = axios.patch(`/api/admin/country/update/${id}`, dataToSubmit)
        .then(res => res.data)

    return {
        type: 'update_country',
        payload: request
    }
}

export const deleteCountry = (id) => {
    const request = axios.delete(`/api/admin/country/delete/${id}`)
        .then(res => res.data)

    return {
        type: 'delete_country',
        payload: request
    }
}