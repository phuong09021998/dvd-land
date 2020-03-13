import React, { useState } from 'react'
import FormField from '../utils/Form/FormField'
import { update, generateData, isFormValid } from '../utils/Form/FormAction'

export default function LoginRegister() {

    const [toggleBox, setToggleBox] = useState(false)


    const [formState, setFormState] = useState({
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Email address'
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
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    })

    const updateForm = (element) => {
        
        const newFormData = update(element, formState.formData, 'login')
        
        setFormState({
            ...formState,
            formData: newFormData,
            formError: false
        })

    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(formState.formData, 'login')
        let formIsValid = isFormValid(formState.formData, 'login')

        if (formIsValid) {
            console.log(dataToSubmit)
        }
    }

    const renderLogin = () => (
        <div className="login_wrapp">
            <form onSubmit={(e) => handleLoginSubmit(e)} type="POST">
                <p className="formtitle">Login Your Account</p>
                <FormField 
                    id={'email'}
                    formdata={formState.formData.email}
                    change={(element) => updateForm(element)}
                />
                <FormField 
                    id={'password'}
                    formdata={formState.formData.password}
                    change={(element) => updateForm(element)}
                />
                <button onClick={(e) => handleLoginSubmit(e)} className="login_button">Login</button>
            </form>
        </div>
    )

    const renderRegister = () => (
        <div className="login_wrapp">
            Register
        </div>
    )

    const handleLoginClick = () => setToggleBox(false)
    const handleRegisterClick = () => setToggleBox(true)

    return (
        <div className="login_register_wrapp">
            <h1 className="login_title">My Account</h1>
            <div className="login_register">
                <div className="title_wrapp">
                    <span 
                        className="login_subtitle" 
                        id={toggleBox ? '' : 'login_active'}
                        onClick={handleLoginClick}
                    >Login</span>
                    <span 
                        className="login_subtitle"
                        id={toggleBox ? 'login_active' : ''}
                        onClick={handleRegisterClick}
                    >Register</span>
                </div>

                <div className="login_box_wrapp">
                    {toggleBox ?
                        renderRegister()
                    : renderLogin()}
                </div>
                
            </div>
        </div>
    )
}
