import React from 'react'
import FormField from '../Form/FormField'
import Modal from 'react-modal'

export default function ProductModal({productForm, open, closeModal, change, submit, country, genre}) {

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
          height                : '800px',
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
                id={'photo'}
                formdata={productForm.formData.photo}
                change={(element) => change(element)}
            />
            <FormField 
                id={'name'}
                formdata={productForm.formData.name}
                change={(element) => change(element)}
            />
            <FormField 
                id={'year'}
                formdata={productForm.formData.year}
                change={(element) => change(element)}
            />

            {genre ? 
                <FormField 
                    id={'genre'}
                    formdata={productForm.formData.genre}
                    change={(element) => change(element)}
                />
            : null}

            {country ? 
                <FormField 
                    id={'country'}
                    formdata={productForm.formData.country}
                    change={(element) => change(element)}
                />
            : null}
            
            <FormField 
                id={'director'}
                formdata={productForm.formData.director}
                change={(element) => change(element)}
            />
             <FormField 
                id={'description'}
                formdata={productForm.formData.description}
                change={(element) => change(element)}
            />
            <FormField 
                id={'price'}
                formdata={productForm.formData.price}
                change={(element) => change(element)}
            />
            <FormField 
                id={'fixed_price'}
                formdata={productForm.formData.fixed_price}
                change={(element) => change(element)}
            />
            <FormField 
                id={'trailer'}
                formdata={productForm.formData.trailer}
                change={(element) => change(element)}
            />
            <div className={`${productForm.formError ? "form_message" : "form_message form_success" }`}>{productForm.formMessage}</div>
            <button onClick={e => submit(e)} className="button_edit_form">Submit</button>
        </form>
    </Modal>
    )
}
