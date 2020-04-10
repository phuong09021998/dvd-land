import React from 'react'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToCart, getCartItems } from '../../actions/user_actions'
import { productFromLocalStorage } from '../../actions/product_action'
import { openNotification } from '../utils/misc'
import ls from 'local-storage'

function RightMenuList(props) {

    const handleAddCart = (id) => {

        if (props.user) {
            props.dispatch(addToCart(null, id)).then(res => {
                props.dispatch(getCartItems())
                openNotification()
            })
        } else {
            let cart = ls('cart')
            if (cart !== null) {
                const dataToSave = {
                    id: id,
                    quantity: 1
                }
                let newCart = cart
                let dupItem = newCart.findIndex(item => item.id === id)
                if (dupItem !== -1) {
                    newCart[dupItem] = {
                        id: id,
                        quantity: newCart[dupItem].quantity + 1
                    }
                } else {
                    newCart = newCart.concat(dataToSave)
                }
                ls('cart', newCart)
            } else {
                const dataToSave = [{
                    id: id,
                    quantity: 1
                }]
                ls('cart', dataToSave)
            }
            props.dispatch(productFromLocalStorage())
            openNotification()
        }
        
    }

   
    return (
        <div className="right_menu_list">
            {props.products ?
                props.products.length ?
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
                            <button className="list_view_card_button" onClick={e => handleAddCart(item._id)}>Add to cart</button>

                        </div>
                    </div>
                ))
                : <div className="nothing_found">
                    <div className="nothing_text">Nothing Found</div>
                    <i class="far fa-frown" id="nothing"></i>
                </div>
                
            : <Spin className="loading_spin" style={{marginTop: '150px'}}/>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}



export default connect(mapStateToProps)(RightMenuList)