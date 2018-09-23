import React, { Component } from 'react';
import './App.css';
import { fetchData } from './API'
import Item from './Item'
class App extends Component {
  state = {
    items: []
  }

  componentDidMount() {
    const oldTime = JSON.parse(localStorage.getItem('time'))
    const currentTime = Date.now()
    const localItems = JSON.parse(localStorage.getItem('localItems'))
    const timeAge = (currentTime - oldTime )/ (1000 * 60 * 60)

    if (timeAge >= 3) {
      this.getStateData()
    } else {
      this.setState({ items: localItems})
    }
  }

  getStateData = () => {
    fetchData()
      .then(data => {
        const items =  data.map( item => ({ 
          dt: item.dt,
          day: new Date(item.dt_txt).toString().substr(0,15),
          time: item.dt_txt.substr(11, 5),
          temp: item.main.temp,
          pressure: item.main.pressure,
          weather: item.weather[0].main,
          weather_desc: item.weather[0].description,
          weather_icon: item.weather[0].icon,
          wind: item.wind.speed,
          clouds: item.clouds.all,
        }))
        localStorage.setItem('localItems', JSON.stringify(items))
        localStorage.setItem('time', Date.now())
        this.setState({ items})
    })   
  }

  render() {
    const { items } = this.state
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
      <div className="App">
        <div className='header'>
          <h1>Hourly weather and forecasts in Emeryville, US</h1>  
        </div>
        <div className='board'>
         {days.map((day, index) => (
           <div key={index}>
             <div className='day'>{day} UTC</div>
             <div>{items.map(item => (
               (item.day === day) && <Item key={item.dt} item={item}/>
             ))}</div>
           </div>
         ))}
        </div>
      </div>
    );
  }
}

export default App;
