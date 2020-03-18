import axios from 'axios'


export const getCountry = () => {
    const request = axios.get('/api/country')
        .then(res => res.data)

    return {
        type: 'get_country',
        payload: request
    }
}