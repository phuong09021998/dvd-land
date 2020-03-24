import React, { useRef } from 'react'
import { Carousel, Spin } from 'antd'
import {
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';

import Card from '../utils/Card'

export default function CarouselComponent(props) {

    const carousel = useRef()

    let Items
    

    if (props.sales) {
        Items = [[props.sales[0], props.sales[1], props.sales[2], props.sales[3]], [props.sales[4], props.sales[5], props.sales[6], props.sales[7]]]
    }

   

   const previous = () => {
        carousel.current.prev()
   }

   const next = () => {
       carousel.current.next()
   }

    return (
        Items ? 
            <div className="carousel_area">
                <LeftOutlined onClick={previous} className="prev_button"/>
                <Carousel autoplay dots={false} ref={carousel}>
                    {Items.map((block, i) => (
                        <div className="carousel_wrapp" key={i}>
                        {block.map((item, j) => (
                            <Card {...item} key={j}/>
                      
                        ))}
                        </div>
                    ))}
                </Carousel>
                <RightOutlined onClick={next} className="next_button"/>
            </div>
        : <Spin tip="Loading..." className="loading_spin"/>
    )
}
