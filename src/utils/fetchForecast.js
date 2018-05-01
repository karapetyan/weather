import toCelsium from './toCesium';

const URL = 'http://api.openweathermap.org/data/2.5/';
const APIKEY = 'a9d72b77c34e39bd7be46514f5ae69ed';

const fetchForecast = (cityName) => { 
    return fetch(`${URL}weather?q=${cityName}&appid=${APIKEY}`)
        .then(response => {
            if (response.status !== 200) throw ('Looks like there was a problem. Status Code: ' + response.status);
            return response.json()
        })
        .then(json => {
            return ({
                temperature: toCelsium(json.main.temp),
                icon: json.weather[0].icon,
                isFetching: false
            })
        })
        .catch(e => {
            throw (e);
        })
}

export default fetchForecast;