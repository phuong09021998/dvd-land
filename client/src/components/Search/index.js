import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { searchProductPage } from '../../actions/product_action'
import { connect } from 'react-redux'
import Card from '../utils/Card'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


function SearchResult(props) {
    let query = useQuery();
    const [searchValue, setSearchValue] = useState({
        key: query.get('key'),
        genre: query.get('genre')
    })

    useEffect(() => {
        props.dispatch(searchProductPage(searchValue))
    }, [])

    console.log(props.searchPage)
    return (
        <div className="login_register_wrapp" style={{backgroundColor: '#f1f1f1'}}>
            <div className="container">
            <h1 className="login_title">{`Search Result (${props.searchPage ? props.searchPage.length : 0})`}</h1>
                <div className="search_wrapp">
                    {props.searchPage ?
                        props.searchPage.map((item, i) => (
                            <Card {...item} style={{margin: '10px 17px', border: '1px solid gray', borderRadius: '0 0 5px 5px'}}/>
                        ))
                    : null}
                </div>
            </div>
            
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        searchPage: state.product.searchPage
    }
    
}

export default connect(mapStateToProps) (SearchResult)