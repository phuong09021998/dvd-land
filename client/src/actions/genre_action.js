import axios from 'axios'


export const getGenre = () => {
    const request = axios.get('/api/genre')
        .then(res => res.data)

    return {
        type: 'get_genre',
        payload: request
    }
}