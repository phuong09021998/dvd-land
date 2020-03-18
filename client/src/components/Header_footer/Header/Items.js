import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../../actions/user_actions'
import { Menu, Dropdown } from 'antd'


function Items(props) {

    const handleClick = ({ e, item }) => {
        if (item.logout) {
            e.preventDefault()
            props.dispatch(logoutUser()).then(res => {
                props.history.push('/register_login')
            })
        }
    }

    // const menu = (setting) => (
    //     <Menu>
    //         <Menu.Item>
    //             <Link>
    //                 'OK'
    //             </Link>
    //         </Menu.Item>
    //         <Menu.Item>
    //             <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
    //             2nd menu item
    //             </a>
    //         </Menu.Item>
    //         <Menu.Item>
    //             <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
    //             3rd menu item
    //             </a>
    //         </Menu.Item>
    //     </Menu>
    // );

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

    return (
        props.data.map((item, i) => (
            item.hover ? 
            (

                <Dropdown overlay={menu(item.hover_setting)} key={i}>
                    <Link className="menu_item" key={i} to={item.link ? item.link : '#'} onClick={e => handleClick({ e, item })}>
                        <div className="icon" key={i}>{item.icon}</div>
                        {item.text ?
                            <div className="item_text" key={i}>
                                {item.text}
                            </div>
                        : null}
                        {/* <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Hover me
                            </a>
                        </Dropdown> */}
                    </Link>
                </Dropdown>
            )
            : 
            
            (
                <Link className="menu_item" key={i} to={item.link} onClick={e => handleClick({ e, item })}>
                    <div className="icon">{item.icon}</div>
                    {item.text ?
                        <div className="item_text">
                            {item.text}
                        </div>
                    : null}
                </Link>
            ) 
            
        ))
    )
}

export default connect()(withRouter(Items))
