import React, { useState, useEffect } from 'react'
import UserLayout from '../../hoc/UserLayout'
import { update, generateData, isFormValid } from '../utils/Form/FormAction'
import { getUsers, updateUser, deleteUser, searchUser } from '../../actions/admin_action'
import { registerUser } from '../../actions/user_actions'
import UserModal from '../utils/Modal/UserModal'
import NontificationModal from '../utils/Modal/NontificationModal'
import { connect } from 'react-redux'
import ItemLayout from '../../hoc/ItemLayout'
import { Spin } from 'antd'


function AdminProduct(props) {

    const [modalIsOpen, setIsOpen] = React.useState(false)

    const originalState = {
            formError: false,
            formMessage: '',
            isUpdate: false,
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
                address: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'address_input',
                        type: 'text',
                        placeholder: 'Address'
                    },
                    validation: {
                        required: false
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                },
                phone: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'phone_input',
                        type: 'number',
                        placeholder: 'Phone number'
                    },
                    validation: {
                        required: false
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                }
        }
    }

    const [userForm, setuserForm] = useState(originalState)
    const [openNontification, setOpenNontification] = useState({
        open: false,
        text: ''
    })
    const [idUpdate, setIdUpdate] = useState()


    useEffect(() => {
        props.dispatch(getUsers())
    }, [])

    function openModal() {
        setuserForm(originalState)
        setIsOpen(true);
    }

    
    function closeModal(){
        setIsOpen(false);
        setuserForm(originalState)

    }

    const updateForm = (element) => {
        
        const newFormData = update(element, userForm.formData, 'edit_product')
        setuserForm({
            ...userForm,
            formData: newFormData,
            formError: false,
            formMessage: ''
        })

    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(userForm.formData, 'edit_product')
        let formIsValid = isFormValid(userForm.formData, 'edit_product')
        console.log(dataToSubmit)

        if (formIsValid) {
            if (userForm.isUpdate) {
                props.dispatch(updateUser(dataToSubmit, idUpdate)).then(res => {
                    closeModal()
                    setOpenNontification({
                        open: true,
                        text: 'Product has been updated'
                    })
                    props.dispatch(getUsers())
                })
            } else {
                props.dispatch(registerUser(dataToSubmit)).then(response =>{
                    closeModal()
                    setOpenNontification({
                        open: true,
                        text: 'Product has been created'
                    })
                    props.dispatch(getUsers())
                })
            }
           
        } else {
            setuserForm({
                ...userForm,
                formError: true,
                formMessage: 'Please check your data'
            })
        }
    }

    const handleUpdateProduct = async (id, key) => {
        let newUser = []
        const user = props.users[key]

        await setuserForm({
            ...userForm,
            isUpdate: true,
            formData: {
                ...userForm.formData,
                name: {
                    ...userForm.formData.name,
                    value: user.name,
                    valid: true
                },
                lastName: {
                    ...userForm.formData.lastName,
                    value: user.lastName,
                    valid: true
                },
                email: {
                    ...userForm.formData.email,
                    value: user.email,
                    valid: true
                },
                address: {
                    ...userForm.formData.address,
                    value: user.address || null,
                    valid: true
                },
                phone: {
                    ...userForm.formData.phone,
                    value: user.phone || null,
                    valid: true
                }
                
            }
        })
        setIdUpdate(id)
        setIsOpen(true)
    }

    const handleDeleteProduct = (id, key) => {
        props.dispatch(deleteUser(id)).then(res => {
            props.dispatch(getUsers())
        })
       
    }

    const closeNontification = () => {
        setOpenNontification({
            open: false,
            text: ''
        })
    }

    const handleSearch = (e) => {
        props.dispatch(searchUser({email: e.target.value}))
    }

    return (
        <UserLayout {...props}>
           <div className="top_control">
                <div className="search_area" style={{width: '100%', border: '1px solid gray', borderRadius: '0 0 0 0', borderBottom: 'none'}}>
                    <input type="text" onChange={e => handleSearch(e)} className="search_admin" placeholder="Searching..."/>
                </div>
                
            </div>
            <div className="admin_content">
                {props.users ? 
                    props.users.map((item, i) => (
                        <ItemLayout
                        key={i}
                        order={i}
                        name={item.role === 1 ? `${item.email} (Admin)` : item.email}
                        id={item._id}
                        update={handleUpdateProduct}
                        delete={handleDeleteProduct}
                        product={false}
                    />
                    )) 
                    
                : <Spin className="loading_spin" style={{marginTop: '20px'}}/>}
            </div>
            <UserModal 
                userForm={userForm}
                open={modalIsOpen}
                closeModal={closeModal}
                change={element => updateForm(element)}
                submit={e => handleFormSubmit(e)}
                
            />
            {openNontification.open ? 
                <NontificationModal
                    open={openNontification.open}
                    title={openNontification.text}
                    close={closeNontification}
                /> 
            :null}
            
            
        </UserLayout>
    )
}

const mapStateToProps = (state) => {
    return {
        genre: state.genre.genres,
        country: state.country.countries,
        productAdmin: state.product.productAdmin,
        users: state.admin.users
    }
}

export default connect(mapStateToProps) (AdminProduct)