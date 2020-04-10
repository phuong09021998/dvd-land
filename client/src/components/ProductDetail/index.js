import React, { useEffect, useState } from 'react'
import { getProductById } from '../../actions/product_action'
import { connect } from 'react-redux'
import ReactImageZoom from 'react-image-zoom'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { getUser, addToCart, getCartItems } from '../../actions/user_actions'
import { productFromLocalStorage } from '../../actions/product_action'
import { openNotification } from '../utils/misc'
import ls from 'local-storage'

const setting = {
    width: 400,
    zoomWidth: 800
}

function ProductDetail(props) {

    const id = props.match.params.id
    const [product, setProduct] = useState({})
    const [count, setCount] = useState(1)
    
    useEffect(() => {
        
        props.dispatch(getProductById(id))
    }, [])
    
    useEffect(() => {
        setProduct(props.product ? props.product.product : {})
    }, [props.product])
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (props.user) {
            props.dispatch(addToCart(null, product._id, count)).then(res => {
                props.dispatch(getUser(true)).then(res => {
                    const cartItems = res.payload.user.cart
                    props.dispatch(getCartItems(cartItems))
                })
                openNotification()
            })
        } else {
            let cart = ls('cart')
            if (cart !== null) {
                const dataToSave = {
                    id: product._id,
                    quantity: count
                }
                let newCart = cart
                let dupItem = newCart.findIndex(item => item.id === product._id)
                if (dupItem !== -1) {
                    newCart[dupItem] = {
                        id: product._id,
                        quantity: count
                    }
                } else {
                    newCart = newCart.concat(dataToSave)
                }
                ls('cart', newCart)
            } else {
                const dataToSave = [{
                    id: product._id,
                    quantity: count
                }]
                ls('cart', dataToSave)
            }
            props.dispatch(productFromLocalStorage())
            openNotification()
        }
    }

    const handleDecrease = (e) => {
        e.preventDefault()
        if (count > 1) {
            setCount(count - 1)
        }
        
    }

    const handleIncrease = (e) => {
        e.preventDefault()
        setCount(count + 1)
    }

    const handleChangeCount = (e) => {
        const value = e.target.value
        if (value && value > 0) {
            setCount(e.target.value)
        }
        
    }


    return (
        <div className="container">
            <p className="product_detail_title">Product Detail</p>
            {props.product ?
            <> 
            <div className="product_detail_wrapp">
                <div className="detail_left">
                    {product.fixed_price ? <div className="percent_detail">{`-${Math.round(((product.price - product.fixed_price) * 100) / product.price)}%`}</div> : null }
                    <ReactImageZoom {...setting} img={`/api/photo/${id}`}/>
                    <p className="instruc">Roll over image to zoom in</p>
                </div>
                <div className="detail_right">
                    <p className="detail_name">{`${product.name} (${product.year})`}</p>
                    <div className="detail_price">
                        <div className="real_price_detail">{`USD $${product.fixed_price || product.price}`}</div>
                        {product.fixed_price ? <div className="ori_price_detail">{`USD $${product.price}`}</div> : null}
                        
                    </div>
                    <div className="detail_description">{product.description}</div>
                     <div className="director_detail">{`Director: ${product.director}`}</div>
                    <div className="detail_category">
                        <div className="category_title">Category:</div>
                        {product.genre ? 
                            product.genre.map((item, i) => (
                            <span className="comma" key={i}> <Link to={`/shop?genre=${item.item._id}`}>{item.item.name}</Link></span>
                        ))
                        : null}
                    </div>
                    <div className="detail_category">
                        <div className="category_title">Country:</div>
                        {product.country ? 
                            <Link to={`/shop?country=${product.country._id}`}><span className="comma">{product.country.name}</span></Link>
                        : null}
                    </div>
                    <div className="add_to_cart_wrapp">
                        <div className="to_cart_title">Quantity:</div>
                        <form type="POST" onSubmit={e => handleSubmit(e)} className="add_cart_form">
                            <div className="button_wrapp">
                                <button className="left_button" onClick={e => handleDecrease(e)}>-</button>
                                <input className="quantity_input" type="number" value={count} onChange={e => handleChangeCount(e)}/>
                                <button className="right_button" onClick={e => handleIncrease(e)}>+</button>
                            </div>
                            <button className="add_cart" type="submit" onClick={e => handleSubmit(e)}>Add to cart</button>
                        </form>
                    </div>

                </div>
            </div>
            <p className="trailer_title">Trailer</p>
                {product.trailer ?
                <div className="product_trailer">{ReactHtmlParser(product.trailer)}</div>
                : null}
                
            </>
            : <Spin size="large" tip="Loading..." className="loading_spin"/>}
    
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        product: state.product.byId
    }
}

export default connect(mapStateToProps)(ProductDetail)
