import React from 'react'
import UserLayout from '../../hoc/UserLayout'
import { logoutUser } from '../../actions/user_actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'




 function UserDashboard(props) {

    const handleLogout = () => {
        props.dispatch(logoutUser()).then(res => {
                
            props.history.push('/register_login')
        })
    }

    const renderSiteInfo = () => {
        if (props.user && props.user.role == 1) {
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
                <div>
                    Admin
                </div>
            )
        }
    }

    return (
        <UserLayout {...props}>
            {renderSiteInfo()}
        </UserLayout>
    )
}

export default connect() (UserDashboard)
