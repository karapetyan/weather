import fetchForecast from '../utils/fetchForecast';

export const toggleFetching = cityName =>
    ({
        type: 'TOGGLE_FETCHING',
        cityName
    })

export const addNewCity = cityName =>
    ({
        type: 'ADD_NEW_CITY',
        cityName
    })

export const updateCityForecast = (cityName, cityData) =>
    ({
        type: 'UPDATE_CITY_FORECAST',
        cityName,
        cityData
    })

export const removeCity = cityName => {
    return ({
        type: 'REMOVE_CITY',
        cityName
    })
}

export const addCityAndLoadForecast = cityName => {
    return (dispatch, getState) => {
        if (!(cityName in getState().cities)) {
            dispatch(addNewCity(cityName));
            getAndUpdateCityForecast(cityName, dispatch, getState);
        }
    }
}

export const getAndUpdateCityForecast = async (cityName, dispatch, getState) => {
    if (!getState().cities[cityName].isFetching) {
        toggleFetching();            
        let cityData = await fetchForecast(cityName).catch(() => {toggleFetching()});
        (cityData && cityName in getState().cities) ?
            dispatch(updateCityForecast(cityName, cityData)):
                dispatch(toggleFetching(cityName))
    }
}