import React, { useState, useEffect } from 'react'
import UserLayout from '../../hoc/UserLayout'
import FormField from '../utils/Form/FormField'
import { update, generateData, isFormValid } from '../utils/Form/FormAction'
import { connect } from 'react-redux'
import { upDateUser } from '../../actions/user_actions'

function Setting(props) {
    const [formSuccess, setFormSuccess] = useState('')

    
    const [updateUser, setUpdateUser] = useState({
        formError: false,
        formMessage: '',
        formData: {
            name: {
                element: 'input',
                title: 'First Name',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastName: {
                element: 'input',
                title: 'Last Name',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            address: {
                element: 'input',
                title: 'Shipping Address',
                value: '',
                config: {
                    name: 'address_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            phone: {
                element: 'input',
                title: 'Contact Number',
                value: '',
                config: {
                    name: 'phone_input',
                    type: 'number'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                title: 'Email',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                title: 'Password',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password'
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                title: 'Confirm Password',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password'
                },
                validation: {
                    required: false,
                    confirm: 'password'
                },
                valid: true,
                touched: false,
                validationMessage: ''
            },
        }
    })

    const updateForm = (element) => {
        
        const newFormData = update(element, updateUser.formData, 'update')

       
        
        setUpdateUser({
            ...updateUser,
            formData: newFormData,
            formError: false
        })

    }

    const handleSubmit = (e) => {
        // inputRef.current.blur()
        e.preventDefault()

        let dataToSubmit = generateData(updateUser.formData, 'update')
        let formIsValid = isFormValid(updateUser.formData, 'update')

        if (formIsValid) {
            setFormSuccess('Your account has been updated')
            console.log(dataToSubmit)
            props.dispatch(upDateUser(dataToSubmit)).then(res => {
                setFormSuccess('Your account has been updated')
            })
            
        } else {
            setUpdateUser({
                ...updateUser,
                formError: true,
                formMessage: 'Please check your data'
            })
        }
    }

    useEffect(() => {

        if (props.user) {
            setUpdateUser({
                ...updateUser,
                formData:{
                    ...updateUser.formData,
                    name: {
                        ...updateUser.formData.name,
                        value: props.user.name,
                        valid: true
                    },
                    lastName: {
                        ...updateUser.formData.lastName,
                        value: props.user.lastName,
                        valid: true
                    },
                    email: {
                        ...updateUser.formData.email,
                        value: props.user.email,
                        valid: true
                    },
                    address: {
                        ...updateUser.formData.address,
                        value: props.user.address,
                        valid: true
                    },
                    phone: {
                        ...updateUser.formData.phone,
                        value: props.user.phone,
                        valid: true
                    }
                }
            })
        }
    }, [props.user])
    

    return (
        <UserLayout {...props}>
            <div className="right_dashboard_wrapp">
                <FormField 
                    id={'name'}
                    formdata={updateUser.formData.name}
                    change={(element) => updateForm(element)}
                    errorStyle={{paddingLeft: '0px'}}
                    style={{
                        width: '100%'
                    }}
                />
                <FormField 
                    id={'lastName'}
                    formdata={updateUser.formData.lastName}
                    change={(element) => updateForm(element)}
                    errorStyle={{paddingLeft: '0px'}}
                    style={{
                        width: '100%'
                    }}
                />
                <FormField 
                    id={'email'}
                    formdata={updateUser.formData.email}
                    change={(element) => updateForm(element)}
                    errorStyle={{paddingLeft: '0px'}}
                    style={{
                        width: '100%'
                    }}
                />
                 <FormField 
                    id={'address'}
                    formdata={updateUser.formData.address}
                    change={(element) => updateForm(element)}
                    errorStyle={{paddingLeft: '0px'}}
                    style={{
                        width: '100%'
                    }}
                />
                 <FormField 
                    id={'phone'}
                    formdata={updateUser.formData.phone}
                    change={(element) => updateForm(element)}
                    errorStyle={{paddingLeft: '0px'}}
                    style={{
                        width: '100%'
                    }}
                />
                <FormField 
                    id={'password'}
                    formdata={updateUser.formData.password}
                    change={(element) => updateForm(element)}
                    errorStyle={{paddingLeft: '0px'}}
                    style={{
                        width: '100%'
                    }}
                />
                <FormField 
                    id={'confirmPassword'}
                    formdata={updateUser.formData.confirmPassword}
                    change={(element) => updateForm(element)}
                    errorStyle={{paddingLeft: '0px'}}
                    style={{
                        width: '100%'
                    }}
                    
                />
                {updateUser.formError ?
                    <div className="error_label_update">{updateUser.formMessage}</div>
                    : null
                }
                {formSuccess !== 'a'?
                    <div className="success_label_update">{formSuccess}</div>
                    : null
                }
                

                <br/>
                <button onClick={(e) => handleSubmit(e)} className="update_button">Update</button>
            </div>
        </UserLayout>
    )
}



export default connect() (Setting)