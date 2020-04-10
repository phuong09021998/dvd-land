import React from 'react'
import FormField from '../Form/FormField'
import Modal from 'react-modal'

export default function GenreCountryModal({genreForm, open, closeModal, change, submit, country, genre}) {

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
          height                : '250px',
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
                formdata={genreForm.formData.name}
                change={(element) => change(element)}
            />
            <div className={`${genreForm.formError ? "form_message" : "form_message form_success" }`}>{genreForm.formMessage}</div>
            <button onClick={e => submit(e)} className="button_edit_form">Submit</button>
        </form>
    </Modal>
    )
}
