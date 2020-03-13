import React from 'react'
import { Link } from 'react-router-dom'
export default function Items(props) {
    return (
        props.data.map((item, i) => (
            <Link className="menu_item" key={i} to={item.link}>
                    <div className="icon">{item.icon}</div>
                    {item.text ?
                        <div className="item_text">
                            {item.text}
                        </div>
                    : null}
            </Link>
        ))
    )
}
