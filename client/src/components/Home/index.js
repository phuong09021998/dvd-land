import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getNewArrivals, getSales, getBestSelling } from '../../actions/product_action'
import NewArrival from './NewArrival'
import ClockTitle from './ClockTitle'
import HotDeal from './HotDeal'
import BestSelling from './BestSelling'
import AdHome from './AdHome'
import MainCarousel from './MainCarousel'

function Home(props) {
    
    useEffect(() => {
        props.dispatch(getNewArrivals())
        props.dispatch(getSales())
        props.dispatch(getBestSelling())
    }, [])

    return (
        <div className="container" style={{marginBottom: '100px'}}>
            <MainCarousel />
            <AdHome />
            <NewArrival newArrivals={props.newArrivals}/>
            <ClockTitle />
            <HotDeal sales={props.sales} />
            <BestSelling newArrivals={props.best_selling}/>
            <button className="button_home"><Link to="/shop" style={{color: 'black'}}>Go to shop now</Link></button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        newArrivals: state.product.newArrivals,
        sales: state.product.sales,
        best_selling: state.product.best_selling
    }
}
export default connect(mapStateToProps)(Home)
