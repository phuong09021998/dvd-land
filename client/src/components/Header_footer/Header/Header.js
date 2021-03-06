import React, { useEffect, useState } from 'react'
import Items from './Items'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getGenre } from '../../../actions/genre_action'
import { getCountry } from '../../../actions/country_action'
import { searchProduct, removeSearch } from '../../../actions/product_action'
import RenderSearch from './RenderSearch'


function Header(props) {

    const listItem = [
        {
            icon: <i class="fas fa-store-alt"></i>,
            link: '/shop',
            tooltip: true,
            tooltip_text: 'Go to Shop'
        },
        {
            icon: <i class="fas fa-shopping-cart"></i>,
            link: '/cart',
            hover: true,
            cart: true
        },
        {
            icon: <i class="fas fa-user"></i>,
            link: '/register_login',
            text: 'Login Register'
        }
    ]

    const listItemUser = [
        {
            icon: <i class="fas fa-store-alt"></i>,
            link: '/shop',
            tooltip: true,
            tooltip_text: 'Go to Shop'
        },
        {
            icon: <i class="fas fa-shopping-cart"></i>,
            link: '/cart',
            hover: true,
            cart: true
        },
        {
            icon: <i class="far fa-user"></i>,
            link: '/user/dashboard',
            hover: true,
            hover_setting: [
                {
                    text: `Hello, ${props.user ? props.user.name : ''}`,
                    name: true,
                    title: true
                },
                {
                    text: 'Dashboard',
                    link: '/user/dashboard'
                },
                {
                    text: 'Order History',
                    link: '/user/order'
                },
                {
                    text: 'Account Setting',
                    link: '/user/setting'
                }
            ]
        },
        {
            icon: <i class="fas fa-sign-out-alt"></i>,
            text: 'Logout',
            logout: true
        }
    ]

    const inputRef = React.createRef()

    const [searchValue, setSearchValue] = useState({
        key: '',
        genre: []
    })

    const [loadingSearch, setLoadingSearch] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        props.dispatch(getGenre())
        props.dispatch(getCountry())
    }, [])

    const handleSearchInput = (e) => {
        setSearchValue({
            ...searchValue,
            key: e.target.value
        })
        
    }

    useEffect(() => {
        
        if (searchValue.key !== "") {
            setLoadingSearch(true)
            props.dispatch(searchProduct(searchValue)).then((res) => {
                setLoadingSearch(false)
            })
        } else {
            props.dispatch(removeSearch('header'))
        }
        
        

    }, [searchValue])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchValue.key !== "") {
            setSearchValue({
                ...searchValue,
                key: ''
            })
            inputRef.current.blur()
            props.history.push(`/shop?key=${searchValue.key}&genre=${searchValue.genre}`)
            
        }

    }

    const handleSelect = (e) => {
        setSearchValue({
            ...searchValue,
            genre: e.target.value ? [e.target.value] : []
        })
        
    }

    const handleSearchClick = () => {
        setSearchValue({
            ...searchValue,
            key: ''
        })
        inputRef.current.blur()
    }

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
                        <form type="POST" onSubmit={e => handleSubmit(e)} className="search_bar_form">
                            <select id="search_bar" onChange={e => handleSelect(e)} className="select_search">
                                <option value="">All</option>
                                {props.genre ? props.genre.map((item, i) => (
                                    <option value={item._id} key={i}>{item.name}</option>
                                )) : null}
                            </select>
                            <div className="input_wrapp">
                                <input type="text" onChange={e => handleSearchInput(e)} className="input_search" placeholder="I'm searching for..." value={searchValue.key} ref={inputRef}/>
                                {searchValue.key ?<RenderSearch items={props.search} loading={loadingSearch} handleSearchClick={handleSearchClick}/> : null}
                            </div>
                            
                            <button onClick={e => handleSubmit(e)} className="button_search">Search</button>
                        </form>
                    </div>
                </div>
                
                <div className="item_wrapp">
                    <Items 
                        data={props.user ? listItemUser : listItem}
                        user={props.user}
                    />
                </div>
            </div>
        
            
                    

        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        genre: state.genre.genres,
        newArrivals: state.product.newArrivals,
        search: state.product.search
    }
}

export default connect(mapStateToProps)(withRouter(Header))
