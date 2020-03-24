import React, { useState, useEffect } from 'react'
import { Spin, Carousel, Tooltip, Button } from 'antd'
import { Link } from 'react-router-dom'
import CarouselComponent from './Carousel'


export default function HotDeal(props) {


    return (
        <CarouselComponent sales={props.sales}/>
    )
}
