import React from 'react'
import FormField from '../utils/Form/FormField'


export default function LeftCheckout({checkoutForm, updateForm, user}) {

    return (
        <>
            <div className="checkout_title">Billing Details</div>
                <FormField 
                    id={'name'}
                    formdata={checkoutForm.formData.name}
                    change={(element) => updateForm(element)}
                    style={{width: '100%'}}
                    errorStyle={{paddingLeft: '0'}}
                />
                <FormField 
                    id={'lastName'}
                    formdata={checkoutForm.formData.lastName}
                    change={(element) => updateForm(element)}
                    style={{width: '100%'}}
                    errorStyle={{paddingLeft: '0'}}
                />
                <FormField 
                    id={'email'}
                    formdata={checkoutForm.formData.email}
                    change={(element) => updateForm(element)}
                    style={{width: '100%'}}
                    errorStyle={{paddingLeft: '0'}}
                />
                <FormField 
                    id={'address'}
                    formdata={checkoutForm.formData.address}
                    change={(element) => updateForm(element)}
                    style={{width: '100%'}}
                    errorStyle={{paddingLeft: '0'}}
                />
                <FormField 
                    id={'phone'}
                    formdata={checkoutForm.formData.phone}
                    change={(element) => updateForm(element)}
                    style={{width: '100%'}}
                    errorStyle={{paddingLeft: '0'}}
                    
                />
                  <FormField 
                    id={'order'}
                    formdata={checkoutForm.formData.order}
                    change={(element) => updateForm(element)}
                    style={{width: '100%'}}
                    errorStyle={{paddingLeft: '0'}}
                    
                />
                {checkoutForm.formError ?
                    <div className="error_label_checkout">{checkoutForm.formMessage}</div>
                    : null
                }
                <br/>
        </>
    )
}
