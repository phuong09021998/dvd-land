import React from 'react'
import SuccessImg from '../../Resources/images/success.gif'
import { Link } from 'react-router-dom'

export default function Success() {
    return (
        <div className="container" style={{marginBottom: '50px'}}>
            <div className="login_title" style={{color: 'black'}}>Checkout</div>
            <div className="sucess_wrapp">
            <div className="success_text">YAY! Your order has been placed!</div>
            <img src={SuccessImg} alt="success" className="success_img"/>
            <div className="info_success">For more information, please go to <Link to="/user/order"><span>order history</span></Link>.</div>
        </div>
        </div>
    )
}
