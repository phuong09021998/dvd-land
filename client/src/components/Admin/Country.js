import React, { useState, useEffect } from 'react'
import UserLayout from '../../hoc/UserLayout'
import { update, generateData, isFormValid } from '../utils/Form/FormAction'
import { getCountry ,createCountry, updateCountry, deleteCountry } from '../../actions/country_action'
import CountryModal from '../utils/Modal/GenreCountryModal'
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
                        placeholder: 'Genre Name'
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

    const [countryForm, setcountryForm] = useState(originalState)
    const [openNontification, setOpenNontification] = useState({
        open: false,
        text: ''
    })
    const [idUpdate, setIdUpdate] = useState()



    function openModal() {
        setcountryForm(originalState)
        setIsOpen(true);
    }

    
    function closeModal(){
        setIsOpen(false);
        setcountryForm(originalState)

    }

    const updateForm = (element) => {
        
        const newFormData = update(element, countryForm.formData, 'edit_genre')
        setcountryForm({
            ...countryForm,
            formData: newFormData,
            formError: false,
            formMessage: ''
        })

    }


    const handleFormSubmit = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(countryForm.formData, 'edit_genre')
        let formIsValid = isFormValid(countryForm.formData, 'edit_genre')


        if (formIsValid) {
            if (countryForm.isUpdate) {
                props.dispatch(updateCountry(dataToSubmit, idUpdate)).then(res => {
                    closeModal()
                    setOpenNontification({
                        open: true,
                        text: 'Genre has been updated'
                    })
                    props.dispatch(getCountry())

                })
            } else {
                props.dispatch(createCountry(dataToSubmit)).then(response =>{
                    closeModal()
                    setOpenNontification({
                        open: true,
                        text: 'Genre has been created'
                    })
                    props.dispatch(getCountry())
                })
            }
           
        } else {
            setcountryForm({
                ...countryForm,
                formError: true,
                formMessage: 'Please check your data'
            })
        }
    }



    const handleUpdateGenre = async (id, key) => {
        const country = props.country[key]

        await setcountryForm({
            ...countryForm,
            isUpdate: true,
            formData: {
                ...countryForm.formData,
                name: {
                    ...countryForm.formData.name,
                    value: country.name,
                    valid: true
                }
            }
        })
        setIdUpdate(id)
        setIsOpen(true)
    }

    const handleDeleteGenre = (id, key) => {
        props.dispatch(deleteCountry(id)).then(res => {
            props.dispatch(getCountry())
        })
       
    }

    const handleCloseModal = () => {
        setOpenNontification({
            open: false,
            text: ''
        })
    }

    return (
        <UserLayout {...props}>
            <div className="top_control">
                <div className="search_area">
                    
                </div>
                <button className="add_button" onClick={openModal}><i class="fas fa-plus" id="plus"></i></button>
            </div>
            <div className="admin_content">
                {props.country ? 
                    props.country.map((item, i) => (
                        <ItemLayout
                        key={i}
                        order={i}
                        name={item.name}
                        id={item._id}
                        update={handleUpdateGenre}
                        delete={handleDeleteGenre}
                        product={false}
                    />
                    )) 
                    
                : <Spin className="loading_spin" style={{marginTop: '20px'}}/>}
            </div>
            <CountryModal 
                genreForm={countryForm}
                open={modalIsOpen}
                closeModal={closeModal}
                change={element => updateForm(element)}
                submit={e => handleFormSubmit(e)}
            />
            {openNontification.open ? 
                <NontificationModal
                    open={openNontification.open}
                    title={openNontification.text}
                    close={handleCloseModal}
                /> 
            :null}
            
            
        </UserLayout>
    )
}

const mapStateToProps = (state) => {
    return {
        country: state.country.countries
    }
}

export default connect(mapStateToProps) (AdminProduct)