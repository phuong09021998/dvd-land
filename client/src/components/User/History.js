import React from 'react'
import UserLayout from '../../hoc/UserLayout'
import { connect } from 'react-redux'
import moment from 'moment'

function History(props) {

    const orderHistory = props.user.history
    console.log(orderHistory)

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
        if (orderHistory) {
            return (
                orderHistory.map((item, i) => (
                    <tr key={i}>
                        <td>{item.paymentId}</td>
                        <td>{renderProduct(item)}</td>
                        <td>{countTotal(item)}</td>
                        <td>{formatDay(item)}</td>
                    </tr>
                ))
            )
        }
    }
    
    return (
        <UserLayout {...props}>
            <table className="history_table">
                <tr>
                    <th className="payment_id">Payment Id</th>
                    <th className="product_table">Product</th>
                    <th className="total_talbe">Total</th>
                    <th className="day_purchase">Day of Purchase</th>
                </tr>
                {renderHistory()}
                
                {/* <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                </tr> */}
        
            </table>
        </UserLayout>
    )
}



export default connect()(History)
