import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'

function UserDashBoard(props) {

    const link = [
        {
            name: 'Dashboard',
            to: '/user/dashboard'
        },
        {
            name: 'Order History',
            to: '/user/order'
        },
        {
            name: 'Edit Account',
            to: '/user/setting'
        },
        {
            name: 'Address',
            to: '/user/address'
        }
    ]

    const adminLink = [
        {
            name: 'Edit Users',
            to: '/admin/user'
        },
        {
            name: 'Edit Products',
            to: '/admin/product'
        },
        {
            name: 'Edit Genre',
            to: '/admin/genre'
        },
        {
            name: 'Edit Country',
            to: '/admin/country'
        }
    ]


    const generateLink = (links) => (
        links.map((item, i) => (
            <NavLink 
                to={item.to}
                key={i} 
                className="menu_item_dashboard"
                activeClassName="dashboard_active"
                
            >{item.name}</NavLink>
        ))
    )


    const showAdminMenu = (links) => (
        <>
        <div className="admin_menu_title">
            ADMIN
        </div> 
        <div className="left_menu">
            {
                links.map((item, i) => (
                    <NavLink 
                        to={item.to}
                        key={i} 
                        className="menu_item_dashboard"
                        activeClassName="dashboard_active"
                    >{item.name}</NavLink>
                ))
            }
        </div>
       </>
    )

    return (
        <div className="container fixed_container">
            <div className="dashboard_title">My Account</div>
            <Row gutter={16}>
                <Col className="dashboard_left" sm={6}>
                    <div className="user_avatar">
                        <i class="fas fa-user-circle" id="dashboard_avatar"></i>
                        <div className="avatar_text">
                            <p className="hello">Hello!</p>
                            <p className="avatar_title">{props.user.name}</p>
                        </div>
                    </div>
                    <div className="left_menu">
                        {generateLink(link)}
                    </div>
                    {props.user.role === 1 ? showAdminMenu(adminLink) : null}
                </Col>
                <Col className="dashboard_right" sm={18}>
                    {props.children}
                </Col>
            </Row>
        </div>
    )
}

export default connect() (UserDashBoard)