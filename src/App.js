import React, { Component } from 'react';
import './App.css';
import { fetchData } from './API'
import Board from './Board'

class App extends Component {
  state = {
    items: [],
    error: ''
  }

  getStateData = (city) => {
    const localData = JSON.parse(localStorage.getItem('localData'))

  //if the search city is the same as the last search, it will use the local data
    if (localData && localData.city.toLowerCase() === city.toLowerCase()) {
      this.setState({ 
        items: localData.items, 
        city: localData.city, 
        country: localData.country
      })
    } else {
      fetchData(city)
      .then(data => {
        const city = data.city.name
        const country = data.city.country
        const items =  data.list.map( item =>  ({ 
          dt: item.dt,
          day: this.convertDate(item.dt_txt).day,
          time: this.convertDate(item.dt_txt).time.slice(0,5),
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
      }).catch(() => this.setState({ error: 'Sorry, no search result'}))  
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
    const { items, city, country, error } = this.state

    return (
      <div className="App">
        <div className='search'>
          <input 
            type='text' 
            placeholder='Your city name, country'
            ref={(input) => this.input = input}
          />
          <button onClick={()=> {
            this.getStateData(this.input.value)
            this.input.value=''
            }}>Search</button>
        </div>
        {error && <div className='error'>{error}</div>}
        <Board items={items} city={city} country={country}/>
      </div>
    );
  }
}

export default App;
