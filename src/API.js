const url = 'https://api.openweathermap.org/data/2.5/forecast'
let token = 'APPID=ac967a874e7800f017384fb81128236a'

export const fetchData = () => 
    fetch(`${url}/?id=5346462&units=imperial&${token}`)
        .then(resp => resp.json())
        .then(data => data.list)
        
