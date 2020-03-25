import React from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'

export default function RightMenuList(props) {
   
    return (
        <div className="right_menu_list">
            {props.products ?
                props.products.map((item, i) => (
                    <div className="one_list_product" key={i}>
                        <div className="left_list_wrapp">
                            {item.fixed_price ? <div className="fixed_list">{`-${Math.round(((item.price - item.fixed_price) * 100) / item.price)}%`}</div> : null}
                            <Link to={`/shop/${item._id}`}>
                                <img src={`/api/photo/${item._id}`} alt={item.name} className="list_img"/>
                            </Link>
                            
                        </div>
                        <div className="middle_list_wrapp">
                            <Link to={`/shop/${item._id}`}>
                                <p className="list_item_name">{`${item.name} (${item.year})`}</p>
                                
                            </Link>
                            <p className="list_description">{item.description}</p>
                        </div>
                        <div className="right_list_wrapp">
                            <div className="price_list_wrapp">
                                <div className="real_price_list">{`USD $${item.fixed_price || item.price}`}</div>
                                {item.fixed_price ? <div className="fixed_price_list">{`USD $${item.price}`}</div> : null}
                            </div>
                            <button className="list_view_card_button">Add to cart</button>

                        </div>
                    </div>
                ))
                
            : <Spin className="loading_spin" style={{marginTop: '150px'}}/>}
        </div>
    )
}
