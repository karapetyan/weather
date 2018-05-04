import toCelsium from './toCesium';

const URL = 'http://api.openweathermap.org/data/2.5/';
const APIKEY = 'a9d72b77c34e39bd7be46514f5ae69ed';

const fetchCitiesForecast = (citiesIds) => { 
    return fetch(`${URL}group?id=${citiesIds.join(',')}&appid=${APIKEY}`)
        .then(response => {
            if (response.status !== 200) throw ('Looks like there was a problem. Status Code: ' + response.status);
            return response.json()
        })
        .then(json => {
            return json.list.map(item => 
                ({
                    name: item.name,
                    id: item.id,
                    temperature: toCelsium(item.main.temp),
                    icon: item.weather[0].icon,
                })
            )
        })
        .catch(e => {
            throw (e);
        })
}

export default fetchCitiesForecast;