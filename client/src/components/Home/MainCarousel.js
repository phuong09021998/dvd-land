import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd';
import Shoplifters from '../../Resources/images/shoplifter_carousel.jpg'
import IPMan4 from '../../Resources/images/ip_man_4_carousel.jpg'
import Parasite from '../../Resources/images/parasite_carousel.jpg'

export default function MainCarousel() {
    return (
        <Carousel autoplay className="carousel_home">
            <div className="carousel_item">
                <img src={Shoplifters} className="img_carousel"/>
                <Link to="/shop/5e718a7eb18d2e114877b993"><button className="button_carousel">Shop now</button></Link>
                
            </div>
            <div className="carousel_item">
                <img src={IPMan4} className="img_carousel"/>
                <Link to="/shop/5e718ed6749e741e04f94166"><button className="button_carousel">Shop now</button></Link>
                
            </div>
            <div className="carousel_item">
                <img src={Parasite} className="img_carousel"/>
                <Link to="/shop/5e718e3860a9412b7ca6429c"><button className="button_carousel">Shop now</button></Link>
            </div>
        </Carousel>
    )
}
