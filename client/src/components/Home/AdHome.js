import React from 'react'

const advertise = [
    {
        img: <i class="fas fa-truck"></i>,
        title: 'Free Delivery',
        des: 'For all orders over $40'
    },
    {
        img: <i class="fas fa-shield-alt"></i>,
        title: 'Buyer Protection',
        des: 'Shop With Confidence'
    },
    {
        img: <i class="far fa-credit-card"></i>,
        title: 'Secure Payment',
        des: '100% secure payment'
    },
    {
        img: <i class="fas fa-comments"></i>,
        title: '24/7 Support',
        des: 'Dedicated support'
    }
]

export default function AdHome() {

    
    return (
        <div className="ad_home">
            {advertise.map((item, i) => (
                <>
                <div className="wrapp_ad">
                    <div className="a_left">
                        {item.img}
                    </div>
                    
                    <div className="a_right">
                        <p id="a_title">{item.title}</p>
                        <p className="ad_des">{item.des}</p>
                    </div>
                </div>
                </>
                ))}
        </div>
    )
}
