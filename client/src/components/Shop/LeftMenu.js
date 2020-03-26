import React, { useEffect } from 'react'
import { Collapse } from 'antd'
import { Spin } from 'antd'


const { Panel } = Collapse
export default function LeftMenu({shopForm, submitForm, change, initial}) {


    const genreHeader = () => (
        <div className="header_collapse">
            <i class="fas fa-film" id="collapse_icon"></i>
            <p className="collapse_title_text">Genres</p>
        </div>
    )

    const countryHeader = () => (
        <div className="header_collapse">
            <i class="fas fa-flag" id="collapse_icon"></i>
            <p className="collapse_title_text">Countries</p>
        </div>
    )
    return (
        <div>
            <form type="POST" onSubmit={e => submitForm(e)}  >
                <div className="search_collapse">
                    <i class="fas fa-search" id="search_collapse"></i>
                    <input
                        {...shopForm.formData.key.config}
                        className="input_collapse"
                        onChange={e => change({e, id:"key"})}
                        value={initial.key || shopForm.formData.key.value}
                    />
                </div>
                
                <Collapse defaultActiveKey={['1', '2']} bordered={false} expandIconPosition="right" className="collapse_area">
                    <Panel header={genreHeader()} key="1" className="collapse_title">
                        {shopForm.formData.genre.data.length > 0 ?
                            shopForm.formData.genre.data.map((item, i) => (
                                <div className="checkbox_item" key={i}>
                                    <label htmlFor={item.name} className="label_checkbox_collapse">{item.name}</label>
                                    <input
                                        type="checkbox"
                                        className="checkbox_collapse"
                                        name={item.name}
                                        value={item._id}
                                        onChange={(e) => change({e, id:"genre"})}
                                        checked={initial.genre ? initial.genre[0] === item._id : null}
                                    />
                                    
                                </div>
                            ))
                          
                        : <Spin className="spin_collapse"/>}
                        
                    </Panel>
                    <Panel header={countryHeader()} key="2" className="collapse_title">
                        
                        {shopForm.formData.country.data.length > 0 ?
                            <>
                             <div className="radio_item">
                                <label htmlFor="country" className="label_radio_collapse">All</label>
                                <input
                                    type="radio"
                                    className="radio_collapse"
                                    name="country"
                                    value=""
                                    onChange={(e) => change({e, id:"country"})} 
                                />
                            </div>
                        

                            {shopForm.formData.country.data.map((item, i) => (
                                <div className="radio_item" key={i}>
                                    <label htmlFor="country" className="label_radio_collapse">{item.name}</label>
                                    <input
                                        type="radio"
                                        className="radio_collapse"
                                        name="country"
                                        value={item._id}
                                        onChange={(e) => change({e, id:"country"})}
                                        checked={initial.country ? initial.country === item._id : null}
                                    />
                                </div>
                            ))}
                            </>
                        : <Spin className="spin_collapse"/>}
                    </Panel>
                </Collapse>
                <button onClick={e => submitForm(e)} className="button_shop">Apply</button>
            </form>
        </div>
    )
}
