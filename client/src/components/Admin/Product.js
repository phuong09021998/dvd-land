import React, { useState, useEffect } from 'react'
import UserLayout from '../../hoc/UserLayout'
import { update, generateData, isFormValid } from '../utils/Form/FormAction'
import { createProduct, updateProduct, deleteProduct } from '../../actions/product_action'
import ProductModal from '../utils/Modal/ProductModal'
import NontificationModal from '../utils/Modal/NontificationModal'
import { connect } from 'react-redux'
import ItemLayout from '../../hoc/ItemLayout'
import { getProductsToAdmin } from '../../actions/product_action'
import { Spin } from 'antd'


function AdminProduct(props) {

    const [modalIsOpen, setIsOpen] = React.useState(false)

    const originalState = {
            formError: false,
            formMessage: '',
            isUpdate: false,
            formData: {
                photo:{
                    element:'input',
                    value:'',
                    photo_data: '',
                    link: '',
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
    const [openNontification, setOpenNontification] = useState({
        open: false,
        text: ''
    })
    const [idUpdate, setIdUpdate] = useState()

    useEffect(() => {
        setProductForm({
            ...productForm,
            formData: {
                ...productForm.formData,
                genre: {
                    ...productForm.formData.genre,
                    data: props.genre ? props.genre : []
                },
                country: {
                    ...productForm.formData.country,
                    data: props.country ? props.country : [],
                    value: props.country ? props.country[0]._id : ''
                }
            }
        })
    }, [props.genre, props.country])

    useEffect(() => {
        props.dispatch(getProductsToAdmin({key: ''}))
    }, [])

    function openModal() {
        setProductForm(originalState)
        setIsOpen(true);
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

    const handleFormSubmit = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(productForm.formData, 'edit_product')
        let formIsValid = isFormValid(productForm.formData, 'edit_product')
        

        if (formIsValid) {
            console.log(dataToSubmit)
            if (productForm.isUpdate) {
                props.dispatch(updateProduct(dataToSubmit, idUpdate)).then(res => {
                    closeModal()
                    setOpenNontification({
                        open: true,
                        text: 'Product has been updated'
                    })
                    props.dispatch(getProductsToAdmin({key: ''}))
                })
            } else {
                props.dispatch(createProduct(dataToSubmit)).then(response =>{
                    closeModal()
                    setOpenNontification({
                        open: true,
                        text: 'Product has been created'
                    })
                    props.dispatch(getProductsToAdmin({key: ''}))
                })
            }
           
        } else {
            setProductForm({
                ...productForm,
                formError: true,
                formMessage: 'Please check your data'
            })
        }
    }

    const handleSearch = (e) => {
        props.dispatch(getProductsToAdmin({key: e.target.value}))
    }

    const handleUpdateProduct = async (id, key) => {
        let newGenre = []
        const product = props.productAdmin[key]



        product.genre.map((item, i) => {
            newGenre.push(item.item._id)
        })

        await setProductForm({
            ...productForm,
            isUpdate: true,
            formData: {
                ...productForm.formData,
                photo: {
                    ...productForm.formData.photo,
                    photo_data: `/api/photo/${id}`,
                    valid: true
                },
                genre: {
                    ...productForm.formData.genre,
                    value: newGenre,
                    valid: true
                },
                country: {
                    ...productForm.formData.country,
                    value: product.country._id,
                    valid: true
                },
                name: {
                    ...productForm.formData.name,
                    value: product.name,
                    valid: true
                },
                year: {
                    ...productForm.formData.year,
                    value: product.year,
                    valid: true
                },
                description: {
                    ...productForm.formData.description,
                    value: product.description,
                    valid: true
                },
                director: {
                    ...productForm.formData.director,
                    value: product.director,
                    valid: true
                },
                price: {
                    ...productForm.formData.price,
                    value: product.price,
                    valid: true
                },
                fixed_price: {
                    ...productForm.formData.fixed_price,
                    value: product.fixed_price,
                    valid: true
                },
                trailer: {
                    ...productForm.formData.trailer,
                    value: product.trailer,
                    valid: true
                }
            }
        })
        setIdUpdate(id)
        setIsOpen(true)
    }

    const handleDeleteProduct = (id, key) => {
        props.dispatch(deleteProduct(id)).then(res => {
            props.dispatch(getProductsToAdmin({key: ''}))
        })
       
    }

    const closeNontification = () => {
        setOpenNontification({
            open: false,
            text: ''
        })
    }

    return (
        <UserLayout {...props}>
            <div className="top_control">
                <div className="search_area">
                    <input type="text" onChange={e => handleSearch(e)} className="search_admin" placeholder="Searching..."/>
                </div>
                <button className="add_button" onClick={openModal}><i class="fas fa-plus" id="plus"></i></button>
            </div>
            <div className="admin_content">
                {props.productAdmin ? 
                    props.productAdmin.map((item, i) => (
                        <ItemLayout
                        key={i}
                        order={i}
                        name={`${item.name} (${item.year})`}
                        id={item._id}
                        update={handleUpdateProduct}
                        delete={handleDeleteProduct}
                        product={true}
                    />
                    )) 
                    
                : <Spin className="loading_spin" style={{marginTop: '20px'}}/>}
            </div>
            <ProductModal 
                productForm={productForm}
                open={modalIsOpen}
                closeModal={closeModal}
                change={element => updateForm(element)}
                submit={e => handleFormSubmit(e)}
                genre={props.genre}
                country={props.country}
                
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
        productAdmin: state.product.productAdmin
    }
}

export default connect(mapStateToProps) (AdminProduct)