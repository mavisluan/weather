const url = 'https://api.openweathermap.org/data/2.5/forecast'
let token = 'APPID=ac967a874e7800f017384fb81128236a'

const fetchData = () => 
    fetch(`${url}/?id=5346462&units=metric&${token}`)
        .then(resp => resp.json())
        .then(data => ({ city: data.city.name, list: data.list}))
        
fetchData()
