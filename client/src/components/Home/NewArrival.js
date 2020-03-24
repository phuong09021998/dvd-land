import React from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
export default function NewArrival(props) {
    return (
        <div className="home_block">
            <div className="home_title">
                <p className="text_title">Hot New Arrivals</p>
            </div>
            <div className="new_arrival_block">
                {props.newArrivals ?
                    props.newArrivals.map((item, i) => (
                        <div className="product_arrival_block" key={i}>
                            <div className="arrival_img_block">
                                <Link to={`/shop/${item._id}`}><img src={`/api/photo/${item._id}`} alt={item.name} className="arrival_img"/></Link>
                                
                            </div>
                            <div className="arrival_detail">
                                <Link to={`/shop/${item._id}`}><p className="arrival_name">{`${item.name} (${item.year})`}</p></Link>
                                <div className="arrival_price">{`USD $${item.fixed_price ? item.fixed_price : item.price}`}</div>
                            </div>
                        </div>
                    ))
            
                : <Spin tip="Loading..." className="loading_spin"/>}
                
            </div>
        </div>
    )
}
