import React, { useState, useEffect } from 'react'
import LeftCheckout from './LeftCheckout'
import RightCheckout from './RightCheckout'
import { update, generateData, isFormValid } from '../utils/Form/FormAction'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import { onSuccessBuy, upDateUser } from '../../actions/user_actions'



function Checkout(props) {



    const [showPaypal, setShowPaypal] = useState(false)

    const [checkoutForm, setcheckoutForm] = useState({
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
                validationMessage: 'This field is required'
            },
            phone: {
                element: 'input',
                title: 'Phone number',
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
                validationMessage: 'This field is required'
            },
            order: {
                element: 'textarea',
                title: 'Order Note (optional)',
                value: '',
                config: {
                    name: 'note_input'
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: ''
            },
        }
    })

    const updateForm = (element) => {
        
        const newFormData = update(element, checkoutForm.formData, 'checkout')
        
        if (element.blur) {
            let formIsValid = isFormValid(newFormData, 'checkout')
            if (formIsValid) {
                setShowPaypal(true)
            } else {
                setShowPaypal(false)
            }
        }
       
        
    
        
        setcheckoutForm({
            ...checkoutForm,
            formData: newFormData,
            formError: false
        })

    }

    const handleSubmit = (e) => {
        // inputRef.current.blur()
        e.preventDefault()

        let dataToSubmit = generateData(checkoutForm.formData, 'checkout')
        let formIsValid = isFormValid(checkoutForm.formData, 'checkout')
        console.log(checkoutForm.formData)
        if (formIsValid) {
            
            
            
        } else {
            setcheckoutForm({
                ...checkoutForm,
                formError: true,
                formMessage: 'Please check your data'
            })
        }
    }

    useEffect(() => {
        if (props.user) {
            setcheckoutForm({
                ...checkoutForm,
                formData: {
                    ...checkoutForm.formData,
                    name:{
                        ...checkoutForm.formData.name,
                        value: props.user.name,
                        valid: true
                    },
                    lastName:{
                        ...checkoutForm.formData.lastName,
                        value: props.user.lastName,
                        valid: true
                    },
                    email:{
                        ...checkoutForm.formData.email,
                        value: props.user.email,
                        valid: true
                    },
                    address:{
                        ...checkoutForm.formData.address,
                        value: props.user.address || null,
                        valid: props.user.address ? true : false
                    },
                    phone:{
                        ...checkoutForm.formData.phone,
                        value: props.user.phone || null,
                        valid: props.user.phone ? true : false
                    }
                }
            })
        }
    }, [props.user])

    useEffect(() => {
        let formIsValid = isFormValid(checkoutForm.formData, 'checkout')
        if (formIsValid) {
            setShowPaypal(true)
        }
    }, [checkoutForm])

    const transactionSuccess = (data) => {

        props.dispatch(onSuccessBuy({
            cartDetail: props.cartItem.cartItems,
            paymentData: data
        })).then((res)=>{
            let dataToSubmit = generateData(checkoutForm.formData, 'checkout')
            props.history.push('/checkout/success')
            

        })

    }


    const renderCheckout = () => {
        if (props.cartItem && props.cartItem.cartItems && props.cartItem.cartItems.length) {
            return (
                <form type="POST" >
                    <div className="checkout_wrapp">
                        
                        <div className="left_checkout">
                            <LeftCheckout 
                                checkoutForm={checkoutForm}
                                updateForm={element => updateForm(element)}
                                user={props.user}
                            />
                        </div>
                        <div className="right_checkout">
                            <RightCheckout
                                products={props.cartItem ? props.cartItem.cartItems : null}
                                show={showPaypal}
                                handleSubmit={e => handleSubmit(e)}
                                user={props.user}
                                transactionSuccess={data => transactionSuccess(data)}
                            />
                        </div>
                    </div>
                </form>
            )
        } else if (props.cartItem && props.cartItem.cartItems && !props.cartItem.cartItems.length){
            return (
                <>
                <div className="render_empty_wrapp">
                    <div className="render_error_cart">Your cart is empty</div>
                   
                    
                </div>
                <Link to='/shop'><button className="back_to_shop">Back to shop</button></Link>
                </>
            )
        } else {
            return (
                <Spin className="loading_spin" size="large" text="Loading..." style={{marginTop: '50px'}}></Spin>
            )
        }
    }


    return (
        <div className="container" style={{marginBottom: '50px'}}>
            <div className="login_title" style={{color: 'black'}}>Checkout</div>
            {renderCheckout()}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        cartItem: state.user.cartItem
    }
}

export default connect(mapStateToProps) (Checkout)