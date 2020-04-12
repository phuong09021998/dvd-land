import React, {useEffect} from 'react'
import UserLayout from '../../hoc/UserLayout'
import { logoutUser } from '../../actions/user_actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrders } from '../../actions/user_actions'
import { Spin } from 'antd'
import moment from 'moment'



 function UserDashboard(props) {

    const renderProduct = (item) => {
        return `${item.name} (${item.year})`
    }


    const renderListOrder = () => {
        if (props.listOrders && props.listOrders.orders) {
            return (
                <div className="right_dashboard_wrapp" style={{marginBottom: '50px'}}>
                    <div className="list_order_title">List of Orders</div>
                    <table className="order_table">
                        <tr>
                            <th className="payment_id">Payment Id</th>
                            <th className="email_talbe" style={{width: '15%'}}>Email</th>
                            <th className="product_table" style={{width: '40%'}}>Products</th>
                            <th className="total_talbe">Total</th>
                            <th className="day_purchase" style={{width: '15%'}}>Day of Purchase</th>
                        </tr>
                        {props.listOrders.orders.map((item, i) => {
                            console.log(item.product)
                            return (
                                <tr key={i}>
                                    <td>{item.product[0].paymentId}</td>
                                    <td>{item.user[0].email}</td>
                                    <td>{renderProduct(item.product[0])}</td>
                                    <td>{`$${item.product[0].price * item.product[0].quantity}`}</td>
                                    <td>{moment(item.product[0].dateOfPurchase).format('MM-DD-YYYY')}</td>
                                </tr>
                            )
                        })}
                        
                        
                    </table>
                </div>
            )
        } else if (props.listOrders && props.listOrders.orders && !props.listOrders.orders.length){
            return (
                <>
                <div className="render_empty_wrapp" style={{marginLeft: '30px', position: 'relative', marginTop: '0px'}}>
                    <div className="render_error_cart">There is no order recorded</div> 
                </div>

                </>
            )
        } else {
            return (
                <Spin className="loading_spin" style={{marginTop: '30px'}}/>
            )
        }
    }

    const handleLogout = () => {
        props.dispatch(logoutUser()).then(res => {
                
            props.history.push('/register_login')
        })
    }

    const renderSiteInfo = () => {
        if (props.user && props.user.role !== 1) {
            return (
                <div className="welcome_text_wrapp">
                    Hello <b>{`${props.user.name} ${props.user.lastName}!`}</b> ( not <b>{`${props.user.name} ${props.user.lastName}`} </b> ? <span onClick={handleLogout}>Logout</span> )
                    <br/>
                    <br/>
                    <br/>
                    From your account dashboard you can view your <Link to="/user/order">recent orders,</Link> <Link to="/user/setting">edit your password</Link>  and <Link to="/user/setting">account details.</Link> 
                </div>
            )
        } else {
            return (
                renderListOrder()
            )
        }
    }

    useEffect(() => {
        props.dispatch(getOrders())
    }, [])
    console.log(props.listOrders)
    return (
        <UserLayout {...props}>
            {renderSiteInfo()}
        </UserLayout>
    )
}

const mapStateToProps = (state) => {
    return {
        listOrders: state.user.listOrders
    }
}

export default connect(mapStateToProps) (UserDashboard)
