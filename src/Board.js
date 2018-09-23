import React from 'react'
import Item from './Item'

const Board = ( {items, city, country} ) => {
    let days = []
    let lastDay = null
    items.forEach(item => {  
      if(item.day !== lastDay) {
        days.push(item.day)
        lastDay = item.day
      }
      return days
    })

    return (
        <div className='board'>
            {items.length > 0 && <h1>Hourly weather and forecasts in {city}, {country}</h1> }     
            {days.map((day, index) => (
              <div key={index}>
                <div className='day'>{day} PST</div>
                <div>{items.map(item => (
                  (item.day === day) && <Item key={item.dt} item={item}/>
                ))}</div>
              </div>
            ))}
        </div>   
      ) 
} 

export default Board