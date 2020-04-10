import React, { useState, useEffect } from 'react'
import UserLayout from '../../hoc/UserLayout'
import { update, generateData, isFormValid } from '../utils/Form/FormAction'
import { getGenre ,createGenre, updateGenre, deleteGenre } from '../../actions/genre_action'
import GenreModal from '../utils/Modal/GenreCountryModal'
import NontificationModal from '../utils/Modal/NontificationModal'
import { connect } from 'react-redux'
import ItemLayout from '../../hoc/ItemLayout'
import { Spin, notification } from 'antd'


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

    const [genreForm, setgenreForm] = useState(originalState)
    const [openNontification, setOpenNontification] = useState({
        open: false,
        text: ''
    })
    const [idUpdate, setIdUpdate] = useState()



    function openModal() {
        setgenreForm(originalState)
        setIsOpen(true);
    }

    
    function closeModal(){
        setIsOpen(false);
        setgenreForm(originalState)

    }

    const updateForm = (element) => {
        
        const newFormData = update(element, genreForm.formData, 'edit_genre')
        setgenreForm({
            ...genreForm,
            formData: newFormData,
            formError: false,
            formMessage: ''
        })

    }


    const handleFormSubmit = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(genreForm.formData, 'edit_genre')
        let formIsValid = isFormValid(genreForm.formData, 'edit_genre')


        if (formIsValid) {
            if (genreForm.isUpdate) {
                props.dispatch(updateGenre(dataToSubmit, idUpdate)).then(res => {
                    closeModal()
                    setOpenNontification({
                        open: true,
                        text: 'Genre has been updated'
                    })
                    props.dispatch(getGenre())

                })
            } else {
                props.dispatch(createGenre(dataToSubmit)).then(response =>{
                    closeModal()
                    setOpenNontification({
                        open: true,
                        text: 'Genre has been created'
                    })
                    props.dispatch(getGenre())
                })
            }
           
        } else {
            setgenreForm({
                ...genreForm,
                formError: true,
                formMessage: 'Please check your data'
            })
        }
    }



    const handleUpdateGenre = async (id, key) => {
        const genre = props.genre[key]

        await setgenreForm({
            ...genreForm,
            isUpdate: true,
            formData: {
                ...genreForm.formData,
                name: {
                    ...genreForm.formData.name,
                    value: genre.name,
                    valid: true
                }
            }
        })
        setIdUpdate(id)
        setIsOpen(true)
    }

    const handleDeleteGenre = (id, key) => {
        props.dispatch(deleteGenre(id)).then(res => {
            props.dispatch(getGenre())
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
                {props.genre ? 
                    props.genre.map((item, i) => (
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
            <GenreModal 
                genreForm={genreForm}
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
        genre: state.genre.genres
    }
}

export default connect(mapStateToProps) (AdminProduct)