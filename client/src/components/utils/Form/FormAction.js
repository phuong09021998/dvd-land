

export const validate =  (element, formData=[]) => {
    let error = [true, '']

    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'Must be a valid email':''}`;
        error = !valid ? [valid,message] : error;
        
       
    }

    if(element.validation.password){
        const valid = element.value.length >= 6
        const message = `${!valid ? 'Password must be greater than 6 characters':''}`;
        error = !valid ? [valid,message] : error;
    }


    if(element.validation.confirm) {
        const valid = element.value === formData[element.validation.confirm].value
        const message = `${!valid ? 'Passwords do not match':''}`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.less) {
        let valid 
        if (parseInt(element.value) < parseInt(formData[element.validation.less].value)) {
            valid = true
        } else {
            valid = false
        }
        const message = `${!valid ? 'Fixed price must be less than original price':''}`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.image) {
        const valid = (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(element.value)
        const message = `${!valid ? 'File upload must be an image':''}`;
        error = !valid ? [valid,message] : error;
    }

    if (element.validation.checkbox) {
        const valid = element.value.length !== 0
        console.log(element.value.length !== 0)
        const message = `${!valid ? 'You must choose at least one genre':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required':''}`;
        error = !valid ? [valid,message] : error;
    }

    return error
}


export const update = (element, formData, formName) => {
    const newFormData = {
        ...formData
    }

    const newElement = {
        ...formData[element.id]
    }

    if (element.id === 'genre') {
        if(element.e.target.checked){
            if(!newElement.value.includes(element.e.target.value)) {
                newElement.value.push(element.e.target.value)
            }
        } else {
            newElement.value = newElement.value.filter(id => id !== element.e.target.value)
        }
        
       
    } else if (element.id === 'photo') {
        newElement.value = element.e.target.value
        newElement.photo_data = element.e.target.files[0]
        
    } else {
        newElement.value = element.e.target.value
    }

    

    if (element.blur || element.id === 'photo' || element.id === 'genre') {
        let validData = validate(newElement, formData)
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1]
    }

    newElement.touched = element.blur
    newFormData[element.id] = newElement
    
    return newFormData
}

export const generateData = (formData, formName) => {
    let dataToSubmit = {}

    for (let key in formData) {
        if (key !== 'confirmPassword') {
            dataToSubmit[key] = formData[key].value
        }
        dataToSubmit.photo = formData.photo.photo_data
    }

    return dataToSubmit
}


export const isFormValid = (formData, formName) => {
    let formIsValid = true

    for (let key in formData) {
        formIsValid = formData[key].valid && formIsValid
    }

    return formIsValid
}