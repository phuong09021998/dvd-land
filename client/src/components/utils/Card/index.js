import React from 'react'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'

export default function index(props) {
    return (
        <div className="carousel_block" style={props.style ? props.style : null}>
            <div className="top_block">
                <Link to={`/shop/${props._id}`}><img className="carousel_img" src={`/api/photo/${props._id}`} alt={props.name}/></Link>
                <div className="carousel_hover">
                    <div className="icon_wrapp">
                        <div className="one_icon">
                            <Tooltip placement="topLeft" title="Add to cart">
                                <button className="carousel_button"><i class="fas fa-shopping-cart carousel_icon"></i></button>
                            </Tooltip>
                        
                        </div>
                        <div className="one_icon">
                            <Tooltip placement="topLeft" title="Quick View">
                                <Link to={`/shop/${props._id}`}>
                                    <button className="carousel_button"><i class="fas fa-eye carousel_icon"></i></button>
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                {props.fixed_price ? 
                    <div className="percent">{`-${Math.round(((props.price - props.fixed_price) * 100) / props.price)}%`}</div>
                : null}
                
            </div>
            <div className="bottom_block">
                <div className="carousel_price">
                    {props.fixed_price ?
                        <>
                        <p className="fixed_price">{`USD $${props.fixed_price}`}</p>
                        <div className="original_price">{`USD $${props.price}`}</div>
                        </>
                    : <p className="fixed_price">{`USD $${props.price}`}</p>}
                    
                </div>
                <Link to={`/shop/${props._id}`}><p className="carousel_item_name">{`${props.name} (${props.year})`}</p></Link>
                
            </div>
        </div>
    )
}
