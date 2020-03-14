import React, { useState} from 'react'
import FormField from '../utils/Form/FormField'
import { update, generateData, isFormValid } from '../utils/Form/FormAction'
import { loginUser } from '../../actions/user_actions'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Fade from 'react-reveal/Fade'

const Login = (props) => {
    const [loginForm, setLoginForm] = useState({
        formError: false,
        formMessage: '',
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
        
        const newFormData = update(element, loginForm.formData, 'login')
        
        setLoginForm({
            ...loginForm,
            formData: newFormData,
            formError: false
        })

    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(loginForm.formData, 'login')
        let formIsValid = isFormValid(loginForm.formData, 'login')

        if (formIsValid) {
            props.dispatch(loginUser(dataToSubmit)).then(response =>{
                props.history.push('/user/dashboard')
            }).catch(err => {
                console.log(err)
                setLoginForm({
                    ...loginForm,
                    formError: true,
                    formMessage: 'Wrong email or password'
                })
            });
        } else {
            setLoginForm({
                ...loginForm,
                formError: true,
                formMessage: 'Please check your data'
            })
        }
    }
    return (
        <Fade duration={500} distance="20px" bottom>
        <div className="login_wrapp">
            
            <form onSubmit={(e) => handleLoginSubmit(e)} type="POST">
                <p className="formtitle">Register an account</p>
                <FormField 
                    id={'email'}
                    formdata={loginForm.formData.email}
                    change={(element) => updateForm(element)}
                />
                <FormField 
                    id={'password'}
                    formdata={loginForm.formData.password}
                    change={(element) => updateForm(element)}
                />
                {loginForm.formError ?
                    <div className="error_label">{loginForm.formMessage}</div>
                    : null
                }
                <br/>
                <button onClick={(e) => handleLoginSubmit(e)} className="login_button">Login</button>
            </form>
        </div>
        </Fade>
    )
}

export default connect()(withRouter(Login))