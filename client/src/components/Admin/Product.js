import React, { useState, useEffect } from 'react'
import UserLayout from '../../hoc/UserLayout'
import Modal from 'react-modal';
import FormField from '../utils/Form/FormField'
import { update, generateData, isFormValid } from '../utils/Form/FormAction'
import { createProduct } from '../../actions/product_action'
import { getCountry } from '../../actions/country_action'

import { connect } from 'react-redux'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '800px',
    height                : '800px'
  }
};

function AdminProduct(props) {

    let subtitle

    const [modalIsOpen,setIsOpen] = React.useState(false)

    const originalState = {
            formError: false,
            formMessage: '',
            formData: {
                photo:{
                    element:'input',
                    value:'',
                    photo_data: '',
                    config: {
                        name: 'img_input',
                        type: 'file',
                        accept: "image/gif, image/jpeg, image/png"
                    },
                    validation:{
                        required: true,
                        image: true
                    },
                    valid:false,
                    validationMessage: 'You must upload product image',
                    label: 'Select a picture file:'
                },
                name: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'name_input',
                        type: 'text',
                        placeholder: 'Product Name'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                },
                year: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'year_input',
                        type: 'number',
                        placeholder: 'Year'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                },
                description: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'description_input',
                        type: 'text',
                        placeholder: 'Description'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                },
                genre: {
                    element: 'checkbox',
                    value: [],
                    data: props.genre ? props.genre : [],
                    title: 'Genre',
                    config: {
                        name: 'genre_input',
                        type: 'checkbox'
                    },
                    label: 'Select genres:',
                    validation: {
                        checkbox: true
                    },
                    valid: false,
                    validationMessage: 'You must choose at least one genre'
                },
                country: {
                    element: 'select',
                    value: props.country ? props.country[0]._id : '',
                    data: props.country ? props.country : [],
                    title: 'Select the country:',
                    config :{
                        name: 'country_input',
                        type: 'radio'
                    },
                    valid: true,
                    validation: {
                        required: false
                    },
                    validationMessage: ''
                },
                director: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'director_input',
                        type: 'text',
                        placeholder: 'Director'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                },
                price: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'price_input',
                        type: 'number',
                        placeholder: 'Price'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                },
                fixed_price: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'fixed_price_input',
                        type: 'number',
                        placeholder: 'Fixed Price'
                    },
                    validation: {
                        required: false,
                        less: 'price'
                    },
                    valid: true,
                    touched: false,
                    validationMessage: ''
                },
                trailer: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'trailer_input',
                        type: 'text',
                        placeholder: 'Embedded Link (Youtube)'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                }
            }
        }

    const [productForm, setProductForm] = useState(originalState)

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
    }
    
    function closeModal(){
        setIsOpen(false);
        setProductForm(originalState)

    }

    const updateForm = (element) => {
        
        const newFormData = update(element, productForm.formData, 'edit_product')
        
        setProductForm({
            ...productForm,
            formData: newFormData,
            formError: false,
            formMessage: ''
        })

    }

    useEffect(() => {
        props.dispatch(getCountry())
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(productForm.formData, 'edit_product')
        let formIsValid = isFormValid(productForm.formData, 'edit_product')

        if (formIsValid) {
            props.dispatch(createProduct(dataToSubmit)).then(response =>{
                closeModal()
                alert('Product has been created successfully')
            })
        } else {
            setProductForm({
                ...productForm,
                formError: true,
                formMessage: 'Please check your data'
            })
        }
    }
   


    return (
        <UserLayout {...props}>
            <div className="top_control">
                <div className="search_area">
                    
                </div>
                <button className="add_button" onClick={openModal}><i class="fas fa-plus" id="plus"></i></button>
            </div>
            <div className="admin_content">
                
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
            >
        
                <h2 ref={_subtitle => (subtitle = _subtitle)} className="form_title">Edit Product</h2>
                <button onClick={closeModal} className="close_modal"><i class="far fa-window-close" id="close"></i></button>
                <form type="POST" onSubmit={e => handleFormSubmit(e)}>
                    <FormField 
                        id={'photo'}
                        formdata={productForm.formData.photo}
                        change={(element) => updateForm(element)}
                    />
                    <FormField 
                        id={'name'}
                        formdata={productForm.formData.name}
                        change={(element) => updateForm(element)}
                    />
                    <FormField 
                        id={'year'}
                        formdata={productForm.formData.year}
                        change={(element) => updateForm(element)}
                    />

                    {props.genre ? 
                        <FormField 
                            id={'genre'}
                            formdata={productForm.formData.genre}
                            change={(element) => updateForm(element)}
                        />
                    : null}

                    {props.country ? 
                        <FormField 
                            id={'country'}
                            formdata={productForm.formData.country}
                            change={(element) => updateForm(element)}
                        />
                    : null}
                    
                    <FormField 
                        id={'director'}
                        formdata={productForm.formData.director}
                        change={(element) => updateForm(element)}
                    />
                     <FormField 
                        id={'description'}
                        formdata={productForm.formData.description}
                        change={(element) => updateForm(element)}
                    />
                    <FormField 
                        id={'price'}
                        formdata={productForm.formData.price}
                        change={(element) => updateForm(element)}
                    />
                    <FormField 
                        id={'fixed_price'}
                        formdata={productForm.formData.fixed_price}
                        change={(element) => updateForm(element)}
                    />
                    <FormField 
                        id={'trailer'}
                        formdata={productForm.formData.trailer}
                        change={(element) => updateForm(element)}
                    />
                    <div className={`${productForm.formError ? "form_message" : "form_message form_success" }`}>{productForm.formMessage}</div>
                    <button onClick={e => handleFormSubmit(e)} className="button_edit_form">Submit</button>
                </form>
            </Modal>
        </UserLayout>
    )
}

const mapStateToProps = (state) => {
    return {
        genre: state.genre.genres,
        country: state.country.countries
    }
}

export default connect(mapStateToProps) (AdminProduct)