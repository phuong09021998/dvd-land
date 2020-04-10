import React from 'react'

export default function RightCheckout(props) {

    const renderProducts = (products) => {
        console.log(products)
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


    const countTotal = (products) => {
        if (products) {
            let total = 0
            products.map(item => {
                total += item.quantity * (item.item.fixed_price || item.item.price)
            })
    
            return total
        }
        
    }
    
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
                    <div className="right_box_title" style={{color: '#DC143C'}}>{`USD $${countTotal(props.products)}`}</div>
                </div>

            </div>
            <button className="paypal_checkout">Payal Checkout</button>
        </>
    )
}
