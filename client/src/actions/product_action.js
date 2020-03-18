import axios from 'axios'

export const createProduct = (dataToSubmit) => {
    let bodyFormData = new FormData()
    for (let key in dataToSubmit) {
        if (key !== 'photo') {
            bodyFormData.set(key, dataToSubmit[key])
        } else {
            console.log('image')
            bodyFormData.append(key, dataToSubmit[key])
        }
    }
    console.log(dataToSubmit)
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