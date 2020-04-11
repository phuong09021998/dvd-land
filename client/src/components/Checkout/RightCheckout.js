import React, { useState, useEffect, useRef } from 'react'
import Paypal from '../utils/paypal'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

function RightCheckout(props) {


    const test = '{"paid":true,"cancelled":false,"payerID":"MHJAP8P9SHLZE","paymentID":"PAYID-L2ID5KY666604826M1231154","paymentToken":"EC-954872393A991291W","returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L2ID5KY666604826M1231154&token=EC-954872393A991291W&PayerID=MHJAP8P9SHLZE","address":{"recipient_name":"Doe John","line1":"123 Thomson Rd.","city":"Singapore","state":"SG_zip = 308123","postal_code":"308123","country_code":"SG"},"email":"sb-wabv41417684@personal.example.com"}'
    console.log(JSON.parse(test))
    const [total, setTotal] = useState(0)

    const renderProducts = (products) => {

        if (products) {
            return (
                <div className="product_checkout_wrapp">
                    {products.map((item, i) => (
                        <div className="checkout_item" key={i}>
                            <div className="left_checkout_item">
                                {`${item.item.name} (${item.item.year}) x ${item.quantity}`}
                            </div>
                            <div className="right_checkout_item">
                                {`USD $${(item.item.fixed_price || item.item.price) * item.quantity}`}
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    }


    

 

   

    
    //{"paid":true,"cancelled":false,"payerID":"MHJAP8P9SHLZE","paymentID":"PAYID-L2ID5KY666604826M1231154","paymentToken":"EC-954872393A991291W","returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L2ID5KY666604826M1231154&token=EC-954872393A991291W&PayerID=MHJAP8P9SHLZE","address":{"recipient_name":"Doe John","line1":"123 Thomson Rd.","city":"Singapore","state":"SG_zip = 308123","postal_code":"308123","country_code":"SG"},"email":"sb-wabv41417684@personal.example.com"}
  

    useEffect(() => {
        if (props.products) {
            let total = 0
            props.products.map(item => {
                total += item.quantity * (item.item.fixed_price || item.item.price)
            })


    
            setTotal(total)
        } 

    }, [props.products])


    
    return (
        <>
            <div className="checkout_title">Your order</div>
            <div className="box_wrapp">
                <div className="check_box_title_wrapp">
                    <div className="left_box_title">Product</div>
                    <div className="right_box_title">Total</div>
                </div>
                {renderProducts(props.products)}
                <div className="check_box_title_wrapp" style={{marginBottom: '20px', border: 'none', marginTop: '10px'}}>
                    <div className="left_box_title">Total</div>
                    <div className="right_box_title" style={{color: '#DC143C'}}>{`USD $${total}`}</div>
                </div>

            </div>
            {/* <div className="paypal_button">
                <button className="paypal_checkout">Proceed to Checkout</button>
            </div> */}
            <Paypal
                toPay={total}

                onSuccess={(data)=> props.transactionSuccess(data)}
                handleSubmit={props.handleSubmit}
                show={props.show}
                handleSubmit={e => props.handleSubmit(e)}
            />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItem: state.user.cartItem
    }
}

export default connect(mapStateToProps)(withRouter(RightCheckout))