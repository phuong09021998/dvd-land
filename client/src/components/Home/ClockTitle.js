import React, { useState, useEffect } from 'react'

export default function ClockTitle() {

    const [clock, setClock] = useState({
        deadline: 'May, 27, 2020',
        hours:'0',
        minutes:'0',
        seconds:'0'
    })

    const getTimeUntil = (deadline) => {
        const time = Date.parse(deadline) - Date.parse(new Date())

        if(time < 0) {
            console.log('Date passed')
        } else {
            const seconds = Math.floor((time/1000)%60);
            const minutes = Math.floor((time/1000/60)%60);
            const hours = Math.floor(time/(1000*60*60))

            setClock({
                seconds,
                minutes,
                hours
            })
        }
    }

    useEffect(() => {
        setInterval(() => getTimeUntil(clock.deadline), 1000)
    }, [])


    return (
        <div className="hot_deal_title">
            <p className="title_text">Hot Deals</p>
            <div className="hot_deal_clock">
                <span className="clock_title">Ends in:</span>

                <span className="clock_item">{clock.hours}</span>
                <span className="divider">:</span>
                <span className="clock_item">{clock.minutes}</span>
                <span className="divider">:</span>
                <span className="clock_item">{clock.seconds}</span>
            </div>
        </div>
    )
}
