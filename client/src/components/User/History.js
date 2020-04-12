import React from 'react'
import UserLayout from '../../hoc/UserLayout'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'

function History(props) {
    const orderHistory = props.user.history


    const renderProduct = (item) => {
        return `${item.name} (${item.year})`
    }

    const countTotal = (item) => {
        return `$${item.price * item.quantity}`
    }
    
    const formatDay = (item) => {
        return moment(item.dateOfPurchase).format('MM-DD-YYYY')
    }

    const renderHistory = () => {
        if (orderHistory && orderHistory.length) {
            return (
                    <table className="c">
                        <tr>
                            <th className="payment_id">Payment Id</th>
                            <th className="product_table">Product</th>
                            <th className="total_talbe">Total</th>
                            <th className="day_purchase">Day of Purchase</th>
                        </tr>
                        {orderHistory.map((item, i) => (
                            <tr key={i}>
                                <td>{item.paymentId}</td>
                                <td>{renderProduct(item)}</td>
                                <td>{countTotal(item)}</td>
                                <td>{formatDay(item)}</td>
                            </tr>
                        ))}
                        
                        {/* <tr>
                            <td>Jill</td>
                            <td>Smith</td>
                            <td>50</td>
                        </tr> */}
                
                    </table>
               
            )
        } else {
            return (
                <>
                <div className="render_empty_wrapp" style={{marginLeft: '30px', position: 'relative', marginTop: '0px'}}>
                    <div className="render_error_cart">There is no purchase history recoreded</div>
                   
                    
                </div>
                <Link to='/shop'><button className="back_to_shop">Back to shop</button></Link>
                </>
            )
        }
    }
    
    return (
        <UserLayout {...props}>
            {renderHistory()}
        </UserLayout>
    )
}



export default connect()(History)
