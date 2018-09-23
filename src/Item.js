import React from 'react'

const Item = ({item: {time, weather_desc, weather_icon, temp, wind, clouds, pressure }}) =>  (
    <div className='item' >
        <div className='left'>
        <span>{time}</span>
        <img 
            src={`https://openweathermap.org/img/w/${weather_icon}.png`}
            alt={weather_desc}
        />
        </div>
        <div className='right'>
        <div className='top'>
            <span className='temp'>{temp}°F </span>
            <span className='desc'>{weather_desc}</span>
        </div>
        <div className='bottom'>
            <span>{wind}, m/s</span>
            <span>clouds: {clouds}%, </span>
            <span>{pressure} hpa</span>
        </div>
        </div>
    </div>
)

export default Item