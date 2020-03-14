

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

    newElement.value = element.e.target.value

    if (element.blur) {
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