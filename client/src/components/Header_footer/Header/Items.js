import React, { useState ,useEffect, useRef } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../../actions/user_actions'
import { Menu, Dropdown, Tooltip } from 'antd'
import { getUser, getCartItems, removeCartItem, addToCart, removeCartItemState } from '../../../actions/user_actions'
import { productFromLocalStorage, removeCartItems } from '../../../actions/product_action'
import ls from 'local-storage'




function Items(props) {

    
    const [cartLength, setCartLength] = useState()



    const handleClick = ({ e, item }) => {
        if (item.logout) {
            e.preventDefault()
            props.dispatch(logoutUser()).then(res => {
                
                props.history.push('/register_login')
            })
        }
    }




    const menu = (setting) => (
        <Menu className="dropdown_menu">
            {setting.map((item, i) => (
                item.title ?
                    <p className="user_title" key={i}>{item.text}</p>
                : <Menu.Item key={i}>
                    <Link to={item.link} className="dropdown_item" key={i}>
                        {item.text}
                    </Link>
                </Menu.Item>
            ))}
            <br/>
        </Menu>
    )




    const handleRemoveCart = (id) => {
        if (props.user) {
            props.dispatch(removeCartItem(id)).then(res => {
                props.dispatch(getCartItems())
            })
        } else {
            let cart = ls('cart')
            const index = cart.findIndex(item => item.id === id)
            cart.splice(index, 1) 
            ls('cart', cart)
            props.dispatch(productFromLocalStorage())
        }
       
    }
    

   

    const menuCart = (items) => {
        
        if (items && items.length > 0 && props.user){
            return (
                <Menu className="dropdown_menu menu_cart">
                    <div className="top_dropdown_cart">
                        {items.map((item, i, arr) => (
                            <>
                            <div className="cart_dropdown_item" key={i}>
                                <div className="left_dropdown_item">
                                    <div className="dropdown_photo_wrapp">
                                        <Link to={`/shop/${item.item._id}`}>
                                            <img src={`/api/photo/${item.item._id}`} alt={item.name} className="dropdown_photo"/>
                                        </Link>
                                        
                                    </div>
                                </div>
                                
                                <div className="right_dropdown_item">
                                        <Link to={`/shop/${item.item._id}`}>
                                            <div className="dropdown_item_name">
                                                {`${item.item.name} (${item.item.year})`}
                                            </div>
                                        </Link>
                                    
                                    <div className="dropdown_item_info">
                                        <span> </span>
                                        <span>{`${item.quantity} x USD $${item.item.fixed_price || item.item.price}`}</span>
                                    </div>  
                                </div>
                                <div className="remove_icon_dropdown">
                                <i class="fas fa-times" onClick={e => handleRemoveCart(item.item._id)} style={{cursor: 'pointer'}}></i>
                                </div>
                            </div>
                            {arr.length - 1 === i ? null : <hr className="seperate_cart_item"/>}
                            
                            </>
                        ))}
                    </div>
                    <div className="bottom_dropdown_cart">
                        <div className="total_count">
                            <div className="count_title">
                                Total:
                            </div>
                            <div className="count">
                                {`USD $${getTotal(items)}`}
                            </div>
                        </div>
                        <button className="dropdown_button_cart" onClick={e => handleCheckout(e)}>Checkout</button>
                    </div>
                    
                </Menu>
            )
        } else if (items && items.length > 0 && !props.user) {
            return (
                <Menu className="dropdown_menu menu_cart">
                    <div className="top_dropdown_cart">
                        {items.map((item, i, arr) => (
                            <>
                            <div className="cart_dropdown_item" key={i}>
                                <div className="left_dropdown_item">
                                    <div className="dropdown_photo_wrapp">
                                        <Link to={`/shop/${item.item._id}`}>
                                            <img src={`/api/photo/${item.item._id}`} alt={item.name} className="dropdown_photo"/>
                                        </Link>
                                        
                                    </div>
                                </div>
                                
                                <div className="right_dropdown_item">
                                        <Link to={`/shop/${item.item._id}`}>
                                            <div className="dropdown_item_name">
                                                {`${item.item.name} (${item.item.year})`}
                                            </div>
                                        </Link>
                                    
                                    <div className="dropdown_item_info">
                                        <span> </span>
                                        <span>{`${item.quantity} x USD $${item.item.fixed_price || item.item.price}`}</span>
                                    </div>  
                                </div>
                                <div className="remove_icon_dropdown">
                                <i class="fas fa-times" onClick={e => handleRemoveCart(item.item._id)} style={{cursor: 'pointer'}}></i>
                                </div>
                            </div>
                            {arr.length - 1 === i ? null : <hr className="seperate_cart_item"/>}
                            
                            </>
                        ))}
                    </div>
                    <div className="bottom_dropdown_cart">
                        <div className="total_count">
                            <div className="count_title">
                                Total:
                            </div>
                            <div className="count">
                                {`USD $${getTotal(items)}`}
                            </div>
                        </div>
                        <button className="dropdown_button_cart" onClick={e => handleCheckout(e)}>Checkout</button>
                    </div>
                    
                </Menu>
            )
        } else if (!items || items.length === 0) {
            
            return (
                <Menu className="dropdown_menu">
                    <p className="cart_empty">Cart is empty</p>
                </Menu>
            )
        }
    }
    

    useEffect(() => {
        if (props.cartItem && props.user) {
            if (props.cartItem.cartItems) {
                setCartLength(props.cartItem.cartItems.length)
            }
            
        } else if (props.cartItemLocal){
            if (props.cartItemLocal.cartItems) {
                let cart = ls('cart')
                if (cart) {
                    setCartLength(cart.length)
                }
                
            }
            
        }
        
        
    }, [props.cartItem, props.cartItemLocal])

    
    const getTotal = (items) => {
        let total = 0

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            total += element.quantity * (element.item.fixed_price || element.item.price)
        }

        return total
    }

    

    const handleCheckout = (e) => {
        e.preventDefault()
        props.history.push('/checkout')
    }

    const renderItem = (item ,i) => {
        if (props.user && item.hover && props.cartItem) {
            return (
                <Dropdown overlay={ item.cart ? menuCart(props.cartItem ? props.cartItem.cartItems : null) : menu(item.hover_setting)} key={i} placement="bottomCenter">
                    <Link className="menu_item" key={i} to={item.link ? item.link : '#'} onClick={e => handleClick({ e, item })}>
                        <div className="icon" key={i}>{item.icon}</div>
                        {item.text ?
                            <div className="item_text" key={i}>
                                {item.text}
                            </div>
                        : null}
                        {cartLength && item.cart && props.cartItem?
                        <div className="cart_count">{cartLength}</div>
                        : null}


                    </Link>
                </Dropdown>
            )
        } else if (!props.user && item.hover && props.cartItemLocal) {
            
            return (
                
                    <Dropdown overlay={ item.cart ? menuCart(props.cartItemLocal ? props.cartItemLocal.cartItems : null) : menu(item.hover_setting)} key={i} placement="bottomCenter">
                        <Link className="menu_item" key={i} to={item.link ? item.link : '#'} onClick={e => handleClick({ e, item })}>
                            <div className="icon" key={i}>{item.icon}</div>
                            {item.text ?
                                <div className="item_text" key={i}>
                                    {item.text}
                                </div>
                            : null}
                            {cartLength && item.cart && props.cartItemLocal?
                            <div className="cart_count">{cartLength}</div>
                            : null}
    
    
                        </Link>
                    </Dropdown>
            )
        } 
        
        else if (item.tooltip) {
            return (
                <Tooltip placement="bottom" title={item.tooltip_text} key={i}>
                    <button className="button_tooltip" id="button_shop">
                        <Link className="menu_item" key={i} to={item.link} onClick={e => handleClick({ e, item })}>
                            <div className="icon">{item.icon}</div>
                            {item.text ?
                                <div className="item_text">
                                    {item.text}
                                </div>
                            : null}
                        </Link>
                    </button>
                </Tooltip>
                    
            )
        } else {
            return (
                <Link className="menu_item" key={i} to={item.link} onClick={e => handleClick({ e, item })}>
                    <div className="icon">{item.icon}</div>
                    {item.text ?
                        <div className="item_text">
                            {item.text}
                        </div>
                    : null}
                </Link>
            )
        }
    }

    
    
    

    useEffect(() => {
        
        props.dispatch(productFromLocalStorage()).catch(err => {
            props.dispatch(removeCartItems())
            props.dispatch(removeCartItemState())
        })
        if (props.user) {
            const cart = ls('cart')
            if (cart) {
                props.dispatch(addToCart({
                    cart: cart
                })).then(res => {
                    ls.remove('cart')
                    props.dispatch(getCartItems())
                })
            } else {
                props.dispatch(getCartItems())
            }
           
            
        }
        
        
    }, [props.user])
    

    return (
        <>
        {props.data.map((item, i) => (
            renderItem(item, i)
        ))}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItem: state.user.cartItem,
        cartItemLocal: state.product.localStorage
    }
}

export default connect(mapStateToProps)(withRouter(Items))
