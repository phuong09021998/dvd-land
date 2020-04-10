import React from 'react'
import { Link } from 'react-router-dom'

export default function ItemLayout(props) {
    return (
        <div className="item_layout">
            {props.product ?
                <Link to={`/shop/${props.id}`}><div className="item_name">{props.name}</div></Link>
            : <div className="item_name">{props.name}</div>}
            
            <div className="icon_item_wrapp">
                <i className="far fa-edit icon_item" onClick={e => props.update(props.id, props.order)}></i>
                <i className="far fa-trash-alt icon_item" onClick={e => props.delete(props.id, props.order)}></i>
            </div>
        </div>
    )
}
