import React from 'react'

export default function FormField({formdata, change, id}) {

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
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(e) => change({e, id, blur:true})}
                            onChange={(e) => change({e, id})}
                            className="input_field"
                        />
                        {showError()}
                    </div>
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
