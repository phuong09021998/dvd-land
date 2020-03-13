import React from 'react'
import { Input, Select, Button } from 'antd'
import Items from './Items'
import {Link} from 'react-router-dom'

const { Option } = Select
const InputGroup = Input.Group



export default function Header() {

    const listItem = [
        {
            icon: <i class="fas fa-store-alt"></i>,
            link: '/shop'
        },
        {
            icon: <i class="fas fa-shopping-cart"></i>,
            link: 'cart'
        },
        {
            icon: <i class="fas fa-user"></i>,
            link: '/register_login',
            text: 'Login Register'
        }
    ]

    return (
        <header>
            <div className="header_container">
                <div className="logo">
                    <Link className="logo_group" to='/'>
                        <i class="fas fa-compact-disc logo_icon" id="logo"></i>
                        <p id="logo_text">DVD LAND</p>
                    </Link>
                </div>
                <div className="search_bar">
                    <div className="search_group">
                        <InputGroup compact size="large">
                            <Select defaultValue="Option1" id="option_search"  size="large">
                                <Option value="Option1">Option1</Option>
                                <Option value="Option2">Option2</Option>
                            </Select>
                            <Input style={{ width: '80%' }} placeholder="I'm shopping for..." />
                            <Button size="large" type="primary" id="button_search">Search</Button>
                        </InputGroup>
                    </div>
                </div>
                <div className="item_wrapp">
                    <Items 
                        data={listItem}
                    />
                </div>
            </div>
            
        </header>
    )
}
