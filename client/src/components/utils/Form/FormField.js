import React, { useState, useEffect } from 'react'

export default function FormField({formdata, change, id, inputRef, style, errorStyle}) {

    const [showImage, setShowImage] = useState()
    useEffect(() => {
        if (typeof formdata.photo_data === 'object') {
            const objectUrl = URL.createObjectURL(formdata.photo_data)
            setShowImage(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        } else if (typeof formdata.photo_data === 'string') {
            setShowImage(formdata.photo_data)
        }
    }, [formdata.photo_data ? formdata.photo_data : null])

    const showError = () => {
        let errorMessage = null

        if (formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className="error_label" style={{...errorStyle}}>
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
                        { formdata.title ?
                            <div className="form_element_titel">{formdata.title}</div>
                        : null}
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={!formdata.label ? (e) => change({e, id, blur:true}) : null}
                            onChange={(e) => change({e, id})}
                            className={formdata.label ? "special_field" : "input_field" }
                            style={{...style}}
                        />
                        
                        
                        {showImage? <img src={showImage} className="img_form"/> : null}
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
                                                checked={formdata.value.includes(item._id) ? true : null}
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
                                <option value={item._id} key={i} className="option_item" selected={formdata.value === item._id ? "selected" : null}>{item.name}</option>
                            ))}
                        </select>
                        </>
                    : null
                )
            
                break;
            case 'textarea':
                formTemplate = (
                        <>
                        <div className="form_element_titel">{formdata.title}</div>
                        <textarea 
                        
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={!formdata.label ? (e) => change({e, id, blur:true}) : null}
                            onChange={(e) => change({e, id})}
                            className="textarea_input"
                            style={{...style}}
                        />
                        </>
                      
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
