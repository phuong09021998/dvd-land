import React from 'react'
import { Spin } from 'antd'
import Card from '../utils/Card'

export default function RightMenu(props) {
    return (
        <div className="product_wrapp">
            {props.products ? 
                props.products.map((item, i) => (
                    
                    <Card {...item} style={{width: '30%', margin: '0 10px'}}/>
                    
                ))
            : <Spin className="loading_spin" style={{marginTop: '150px'}}/>}
            
            
        </div>
    )
}
