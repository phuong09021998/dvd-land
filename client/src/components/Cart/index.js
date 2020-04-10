import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { addToCart, getCartItems, removeCartItem } from '../../actions/user_actions'
import { productFromLocalStorage } from '../../actions/product_action'
import ls from 'local-storage'

function Cart(props) {

    const [ready, setReady] = useState(true)
    const handleDecrease = (e, id, quantity) => {
        e.preventDefault()
        if (props.user) {
            if (quantity !== 1) {
                props.dispatch(addToCart(null, id, quantity - 1)).then(res => {
                    setReady(true)
                    props.dispatch(getCartItems())
                })
            }
        } else if (props.cartItemLocal) {
            if (quantity !== 1) {
                let cart = ls('cart')
                cart.forEach(item => {
                    if (item.id === id) {
                        item.quantity = quantity - 1
                    } 
                })
                ls('cart', cart)
                props.dispatch(productFromLocalStorage()).then(res => {
                    setReady(true)
                })
            }
            
        }
        
        
    }

    const handleIncrease = (e, id, quantity) => {
        e.preventDefault()
        
        if (props.user) {
            props.dispatch(addToCart(null, id)).then(res => {
                props.dispatch(getCartItems()).then(res => {
                    setReady(true)
                })
            })
        } else if (props.cartItemLocal) {

            let cart = ls('cart')

            cart.forEach(item => {
                if (item.id === id) {
                    item.quantity += 1
                } 
            })

            ls('cart', cart)
            props.dispatch(productFromLocalStorage()).then(res => {
                setReady(true)
            })
            
        }
    }

 

    const handleBlur = (e, id) => {
        e.preventDefault()
        if (e.target.value === "" || e.target.value < 1) {

            if (props.user) {
                props.dispatch(addToCart(null, id, 1)).then(res => {
               
                    props.dispatch(getCartItems()).then(res => {
                        setReady(true)
                    })
                })
            } else if (props.cartItemLocal) {
    
                let cart = ls('cart')
    
                cart.forEach(item => {
                    if (item.id === id) {
                        item.quantity = 1
                    } 
                })
    
                ls('cart', cart)
                props.dispatch(productFromLocalStorage()).then(res => {
                    setReady(true)
                })
                
            }

           
        } else {
            
            if (props.user) {
                props.dispatch(addToCart(null, id, e.target.value)).then(res => {
                    props.dispatch(getCartItems()).then(res => {
                        setReady(true)
                    })
                })
            } else if (props.cartItemLocal) {
    
                let cart = ls('cart')
    
                cart.forEach(item => {
                    if (item.id === id) {
                        item.quantity = e.target.value
                    } 
                })
    
                ls('cart', cart)
                props.dispatch(productFromLocalStorage()).then(res => {
                    setReady(true)
                })
                
            }
        
        }
    }

    const handleFocus = (e) => {
        setReady(false)
    }


    const renderCount = (id, quantity, i) => (
        <div className="button_wrapp cart_count_button">
            <button className="left_button" onClick={e => handleDecrease(e, id, quantity)}>-</button>
            <input
                className="quantity_input" type="number" 
                value={ready ? quantity : null} 
                onBlur={e => handleBlur(e, id)}
                onFocus={e => handleFocus(e)}
            />
            <button className="right_button" onClick={e => handleIncrease(e, id, quantity)}>+</button>
        </div>
    )
    const countTotal = (product) => {
       return `USD $${product.quantity * (product.item.fixed_price || product.item.price)}`
    }

    const handleRemove = (id) => {
        if (props.user) {
            props.dispatch(removeCartItem(id)).then(res => {
                props.dispatch(getCartItems()).then(res => {
                    setReady(true)
                })
            })
        } else {
            let cart = ls('cart')
            const index = cart.findIndex(item => item.id === id)
            cart.splice(index, 1) 
            ls('cart', cart)
            props.dispatch(productFromLocalStorage())
        }
        
    }

    const countTotalPrice = (data) => {
        let totalPrice = 0
        if (data) {
            if (data.cartItems) {
                data.cartItems.forEach(product => {
                    totalPrice += product.quantity * (product.item.fixed_price || product.item.price)
                }) 
            }
            
        }

        return totalPrice
    }
    
    const renderCartItems = () => {
        if (props.user) {
            if (props.cartItem && props.cartItem.cartItems.length !== 0) {
                return (
                    props.cartItem.cartItems.map((product, i) => (
                        <div className="cart_item_block">
                            <div className="cart_product_wrapp">
                                <div className="cart_product_img"><Link to={`/shop/${product.item._id}`}><img src={`/api/photo/${product.item._id}`} alt={product.item.name} id="cart-photo"/></Link></div>
                                <div className="cart_product_name"><Link to={`/shop/${product.item._id}`}><p>{`${product.item.name} (${product.item.year})`}</p></Link></div>
                               
                            </div>
                            
                            <div className="cart_product_price">{`USD $${product.item.fixed_price || product.item.price}`}</div>
                            <div className="cart_product_count">{renderCount(product.item._id, product.quantity, i)}</div>
                            <div className="cart_product_total">{countTotal(product)}</div>
                            <i class="fas fa-times" id="close_cart" onClick={e => handleRemove(product.item._id)}></i>
                        </div>
                    ))
                )
            }
            else {
                return (
                    <div className="loading_cart">
                        <Spin style={{marginTop: '40px'}}/>
                    </div>
                )
            }
        } else {
            if (props.cartItemLocal) {
                return (
                    props.cartItemLocal.cartItems && props.cartItemLocal.cartItems.map((product, i) => (
                        <div className="cart_item_block">
                            <div className="cart_product_wrapp">
                                <div className="cart_product_img"><Link to={`/shop/${product.item._id}`}><img src={`/api/photo/${product.item._id}`} alt={product.item.name} id="cart-photo"/></Link></div>
                                <div className="cart_product_name"><Link to={`/shop/${product.item._id}`}><p>{`${product.item.name} (${product.item.year})`}</p></Link></div>
                               
                            </div>
                            
                            <div className="cart_product_price">{`USD $${product.item.fixed_price || product.item.price}`}</div>
                            <div className="cart_product_count">{renderCount(product.item._id, product.quantity, i)}</div>
                            <div className="cart_product_total">{countTotal(product)}</div>
                            <i class="fas fa-times" id="close_cart" onClick={e => handleRemove(product.item._id)}></i>
                        </div>
                    ))
                )
            } 
            if (props.cartItemLocal === undefined){
                return (
                    <div className="loading_cart">
                        <Spin style={{marginTop: '40px'}}/>
                    </div>
                )
            }
            
         
           
        }
    }
    
    const handleCheckout = () => {
        props.history.push('/checkout')
    }
    
    return (
        <div className="container" style={{marginBottom: '100px'}}>
            <div className="login_title" style={{color: 'black'}}>Cart</div>
            {(props.cartItemLocal &&  props.cartItemLocal.cartItems && props.cartItemLocal.cartItems.length !== 0 && props.cartItemLocal !== null) || (props.cartItem && props.cartItem.cartItems && props.cartItem.cartItems.length !== 0 && props.cartItem.cartItems !== null) ?
                <> 
                    <div className="cart_wrapp">
                    <div className="top_title_wrapp">
                        <div className="top_cart_product">Product</div>
                        <div className="top_cart_price">Price</div>
                        <div className="top_cart_quantity">Quantity</div>
                        <div className="top_cart_total">Total</div>
                    </div>
                    {renderCartItems()}
                    </div>
                    <div className="total_cart_wrapp">
                        <div className="total_cart_text">Total:</div>
                        <div className="total_cart_count">{`USD $${countTotalPrice(props.cartItem || props.cartItemLocal)}`}</div>
                    </div>
                    <button className="checkout_cart_button" onClick={handleCheckout}>Proceed to checkout</button>
                </>
            
            :   
                <>
                <div className="render_empty_wrapp">
                    <div className="render_error_cart">Your cart is empty</div>
                   
                    
                </div>
                <Link to='/shop'><button className="back_to_shop">Back to shop</button></Link>
                </>
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItem: state.user.cartItem,
        cartItemLocal: state.product.localStorage
    }
}

export default connect(mapStateToProps)(Cart)
