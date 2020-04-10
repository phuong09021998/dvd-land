import React from 'react'
import FormField from '../Form/FormField'
import Modal from 'react-modal'

export default function UserModal({userForm, open, closeModal, change, submit, country, genre}) {

    let subtitle


    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          width                 : '800px',
          height                : '600px',
          zIndex                : '10000'
        }
    };


    function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
    }
    


    return (
    <Modal
        isOpen={open}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={false}
    >

        <h2 ref={_subtitle => (subtitle = _subtitle)} className="form_title">Edit Product</h2>
        <button onClick={closeModal} className="close_modal"><i class="far fa-window-close" id="close"></i></button>
        <form type="POST" onSubmit={e => submit(e)}>

            <FormField 
                id={'name'}
                formdata={userForm.formData.name}
                change={(element) => change(element)}
            />
            <FormField 
                id={'lastName'}
                formdata={userForm.formData.lastName}
                change={(element) => change(element)}
            />
            <FormField 
                id={'email'}
                formdata={userForm.formData.email}
                change={(element) => change(element)}
            />
            <FormField 
                id={'password'}
                formdata={userForm.formData.password}
                change={(element) => change(element)}
            />
            <FormField 
                id={'confirmPassword'}
                formdata={userForm.formData.confirmPassword}
                change={(element) => change(element)}
            />
            <FormField 
                id={'address'}
                formdata={userForm.formData.address}
                change={(element) => change(element)}
            />
            <FormField 
                id={'phone'}
                formdata={userForm.formData.phone}
                change={(element) => change(element)}
            />



            <div className={`${userForm.formError ? "form_message" : "form_message form_success" }`}>{userForm.formMessage}</div>
            <button onClick={e => submit(e)} className="button_edit_form">Submit</button>
        </form>
    </Modal>
    )
}
