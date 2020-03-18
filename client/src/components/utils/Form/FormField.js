import React, { useState } from 'react'

export default function FormField({formdata, change, id}) {

    const [showImage, setShowImage] = useState([])

    if (formdata.photo_data) {
        let reader = new FileReader()
        let url = reader.readAsDataURL(formdata.photo_data)
        reader.onloadend = (e) => {
            setShowImage([reader.result])
        }
    }

    const showError = () => {
        let errorMessage = null

        // console.log(formdata.valid)

        if (formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage
    }

    const renderTemplate = () => {
        let formTemplate = null

        switch (formdata.element) {
            case 'input':
                formTemplate = (
                    <div className="formBlock">
                        { formdata.label ? 
                            <label htmlFor={formdata.config.name} className="label_form">{formdata.label}</label>
                        : null}
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={!formdata.label ? (e) => change({e, id, blur:true}) : null}
                            onChange={(e) => change({e, id})}
                            className={formdata.label ? "special_field" : "input_field" }
                        />
                        
                        
                        {showImage.length !== 0 ? <img src={showImage} className="img_form"/> : null}
                        {showError()}
                    </div>
                )
                break
            case 'checkbox':
                formTemplate = (
                    formdata.data ?
                        <>
                        <div className="form_input_title">{formdata.title}</div>
                        <div className="checkbox_wrapp">
                            
                                {formdata.data.map((item, i) => (
                                    <>
                                        <div className="checkbox_block">
                                            <input
                                                {...formdata.config}
                                                key={i}
                                                value={item._id}
                                                onBlur={!formdata.label ? (e) => change({e, id, blur:true}) : null}
                                                onChange={(e) => change({e, id})}
                                                className="checkbox_field"
                                            />
                                            {formdata.label ? 
                                                <label htmlFor={formdata.config.name} className="label_checkbox">{item.name}</label>
                                            : null}
                                        </div>
                                    </>
                                ))}
                            
                        </div>
                        <br/>
                        {showError()}
                        <br/>
                        </>
                    : null
                )
                break
            case 'select':
                formTemplate = (
                    formdata.data ?
                        <>
                        <div className="form_input_title" style={{display: 'inline'}}>{formdata.title}</div>
                        <select className="select_form" onChange={e => change({e, id})}>
                            {formdata.data.map((item, i) => (
                                <option value={item._id} key={i} className="option_item">{item.name}</option>
                            ))}
                        </select>
                        </>
                    : null
                )
            
            break;
            default:
                formTemplate = null
        }

        return formTemplate
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )
}
