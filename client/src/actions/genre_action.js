import axios from 'axios'


export const getGenre = () => {
    const request = axios.get('/api/genre')
        .then(res => res.data)

    return {
        type: 'get_genre',
        payload: request
    }
}

export const createGenre = (dataToSubmit) => {
    const request = axios.post('/api/admin/genre/create', dataToSubmit)
        .then(res => res.data)

    return {
        type: 'create_genre',
        payload: request
    }
}

export const updateGenre = (dataToSubmit ,id) => {
    const request = axios.patch(`/api/admin/genre/update/${id}`, dataToSubmit)
        .then(res => res.data)

    return {
        type: 'update_genre',
        payload: request
    }
}

export const deleteGenre = (id) => {
    const request = axios.delete(`/api/admin/genre/delete/${id}`)
        .then(res => res.data)

    return {
        type: 'delete_genre',
        payload: request
    }
}