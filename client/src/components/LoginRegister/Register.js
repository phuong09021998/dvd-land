import React, { useState} from 'react'
import FormField from '../utils/Form/FormField'
import { update, generateData, isFormValid } from '../utils/Form/FormAction'
import { registerUser } from '../../actions/user_actions'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { USER_SERVER } from '../utils/misc'
import axios from 'axios'
import Fade from 'react-reveal/Fade'

const Register = (props) => {
    const [registerForm, setRegisterForm] = useState({
        formError: false,
        formMessage: '',
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'First Name'
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
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Last Name'
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
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Email Address'
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
                    required: true,
                    password: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm Your Password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
        }
    })

    // const inputRef = React.createRef()

    const updateForm = (element) => {
        
        const newFormData = update(element, registerForm.formData, 'register')

        const dataToCheck = {
            email: newFormData.email.value
        }

        

        if (element.id === 'email'  && element.blur) {
            
            axios.post(`${USER_SERVER}/check`, dataToCheck).then(res => {
                newFormData.email.valid = false
                newFormData.email.validationMessage = 'Your email has already been used'
    
                setRegisterForm({
                    ...registerForm,
                    formData: newFormData,
                    formError: false
                })
            })
        }
       
        
        setRegisterForm({
            ...registerForm,
            formData: newFormData,
            formError: false
        })

    }

    const handleRegisterSubmit = (e) => {
        // inputRef.current.blur()
        e.preventDefault()

        let dataToSubmit = generateData(registerForm.formData, 'register')
        let formIsValid = isFormValid(registerForm.formData, 'register')
        console.log(registerForm.formData)
        if (formIsValid) {
            
            props.dispatch(registerUser(dataToSubmit)).catch(err => {
                setRegisterForm({
                    ...registerForm,
                    formError: true,
                    formMessage: 'Please check your data'
                })
            });
            
        } else {
            setRegisterForm({
                ...registerForm,
                formError: true,
                formMessage: 'Please check your data'
            })
        }
    }

    
    
  

    return (
        <Fade duration={500} distance="10px" bottom>
        <div className="login_wrapp">
            <form onSubmit={(e) => handleRegisterSubmit(e)} type="POST">
                <p className="formtitle">Register an account</p>
                <FormField 
                    id={'name'}
                    formdata={registerForm.formData.name}
                    change={(element) => updateForm(element)}
                    
                />
                <FormField 
                    id={'lastName'}
                    formdata={registerForm.formData.lastName}
                    change={(element) => updateForm(element)}
                />
                <FormField 
                    id={'email'}
                    formdata={registerForm.formData.email}
                    change={(element) => updateForm(element)}
                />
                <FormField 
                    id={'password'}
                    formdata={registerForm.formData.password}
                    change={(element) => updateForm(element)}
                />
                <FormField 
                    id={'confirmPassword'}
                    formdata={registerForm.formData.confirmPassword}
                    change={(element) => updateForm(element)}
                    
                />
                {registerForm.formError ?
                    <div className="error_label">{registerForm.formMessage}</div>
                    : null
                }
                <br/>
                <button onClick={(e) => handleRegisterSubmit(e)} className="login_button">Register</button>
            </form>
           
        </div>
        </Fade>
    )
}

export default connect()(withRouter(Register))