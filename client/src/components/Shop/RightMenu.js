import React, { useState, useEffect, useRef }  from 'react'
import { Spin } from 'antd'
import Card from '../utils/Card'

export default function RightMenu(props) {

    const [items, setItems] = useState([])

    const isFirstRun = useRef(true)
    
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
        } else {
            setItems(props.products)
        }
    }, [props.products])


    return (
        <div className="product_wrapp">
            {props.products ? 
                props.products.length ?
                props.products.map((item, i) => (
                    
                    <Card {...item} style={{width: '30%', margin: '0 10px'}}/>
                    
                ))
                : <div className="nothing_found">
                    <div className="nothing_text">Nothing Found</div>
                    <i class="far fa-frown" id="nothing"></i>
                </div>
            : <Spin className="loading_spin" style={{marginTop: '150px'}}/>}
            
            
        </div>
    )
}
