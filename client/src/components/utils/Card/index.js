import React, { createRef } from 'react'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToCart, getCartItems } from '../../../actions/user_actions'
import { openNotification } from '../../utils/misc'
import { productFromLocalStorage } from '../../../actions/product_action'
import ls from 'local-storage'

function Card(props) {

    const handleAddToCart = (e) => {
        e.preventDefault()
        if (props.user) {
            props.dispatch(addToCart(null, props._id)).then(res => {
                props.dispatch(getCartItems())
                openNotification()
            })
        } else {
            let cart = ls('cart')
            if (cart !== null) {
                const dataToSave = {
                    id: props._id,
                    quantity: 1
                }
                let newCart = cart
                let dupItem = newCart.findIndex(item => item.id === props._id)
                if (dupItem !== -1) {
                    newCart[dupItem] = {
                        id: props._id,
                        quantity: newCart[dupItem].quantity + 1
                    }
                } else {
                    newCart = newCart.concat(dataToSave)
                }
                ls('cart', newCart)
            } else {
                const dataToSave = [{
                    id: props._id,
                    quantity: 1
                }]
                ls('cart', dataToSave)
            }
            props.dispatch(productFromLocalStorage())
            openNotification()
        }
        
    }

    return (
        <div className="carousel_block" style={props.style ? props.style : null}>
            <div className="top_block">
                <Link to={`/shop/${props._id}`}><img className="carousel_img" src={`/api/photo/${props._id}`} alt={props.name}/></Link>
                <div className="carousel_hover">
                    <div className="icon_wrapp">
                        <div className="one_icon">
                            <Tooltip placement="topLeft" title="Add to cart">
                                <button className="carousel_button" onClick={e => handleAddToCart(e)}><i class="fas fa-shopping-cart carousel_icon"></i></button>
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


const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(Card)