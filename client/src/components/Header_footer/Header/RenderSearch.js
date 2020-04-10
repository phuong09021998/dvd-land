import React from 'react'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'

export default function RenderSearch(props) {

    const renderItems = () => {
        try {
            return (props.items.length !== 0 ?
                props.items.map((item, i) => (
                    <Link to={`/shop/${item._id}`} key={i} onClick={props.handleSearchClick}>
                        <div className="search_item_b" key={i}>
                            <div className="search_photo_block"><img src={`http://localhost:3000/api/photo/${item._id}`} alt={item.name} className="photo_search"/></div>
                            
                            <p className="search_item_name">{`${item.name} (${item.year})`}</p>
                        </div>
                    </Link>
                ))
        
                : <div>Nothing found</div>)
        } catch (error) {
            return  <div>Nothing found</div>
        }
    }
    
    return (
        <div className="search_results">
        {props.loading ?
            <Spin className="loading_spin"/>
    
        : renderItems()}
        </div>
    )
}
