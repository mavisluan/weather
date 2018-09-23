import React, { Component } from 'react';
import './App.css';
import { fetchData } from './API'
import Item from './Item'
class App extends Component {
  state = {
    items: []
  }

  getStateData = (city) => {
    const localData = JSON.parse(localStorage.getItem('localData'))

    if (!localData || localData.city.toLowerCase() !== city.toLowerCase()) {
      fetchData(city)
      .then(data => {
        const city = data.city.name
        const country = data.city.country
        const items =  data.list.map( item =>  ({ 
          dt: item.dt,
          day: this.convertDate(item.dt_txt).day,
          time: this.convertDate(item.dt_txt).time,
          temp: item.main.temp,
          pressure: item.main.pressure,
          weather: item.weather[0].main,
          weather_desc: item.weather[0].description,
          weather_icon: item.weather[0].icon,
          wind: item.wind.speed,
          clouds: item.clouds.all,
        }))

        const result = { items, city, country }
        localStorage.setItem('localData', JSON.stringify(result))
        this.setState({ items, city, country})
      })  
    } 

    if (localData && localData.city.toLowerCase() === city.toLowerCase()) {
      console.log('using local data')
      this.setState({ items: localData.items, city: localData.city, country: localData.country})
    }
     
  }

  convertDate = ( string ) => {
    const date = new Date(string)
    let day
    let hour 
    
    if (date.getHours() - 7 > 0) {
      day = date.getDate()
      hour = date.getHours() - 7
    } else {
      day = date.getDate() - 1
      hour = date.getHours() + 17
    }  
    return ({ day: string.slice(0, 8) + day, time: hour + string.slice(13)})
  }
  
  render() {
    const { items, city, country } = this.state
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
        <div className='search'>
          <input 
            type='text' 
            placeholder='Your city name'
            ref={(input) => this.input = input}
          />
          <button onClick={()=> {
            this.getStateData(this.input.value)
            this.input.value=''
            }}>Search</button>
        </div>
        <div className='board'>
          {items.length > 0 && <h1>Hourly weather and forecasts in {city}, {country}</h1> }     
         {days.map((day, index) => (
           <div key={index}>
             <div className='day'>{day}</div>
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
