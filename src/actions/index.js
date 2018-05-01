import fetchForecast from '../utils/fetchForecast';

export const toggleFetching = cityName =>
    ({
        type: 'TOGGLE_FETCHING',
        cityName
    })

export const addError = (cityName, error) =>
    ({
        type: 'ADD_ERROR',
        cityName,
        error
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
        dispatch(toggleFetching(cityName));      
        let cityData = await fetchForecast(cityName)
            .catch((e) => {
                dispatch(toggleFetching(cityName));
                dispatch(addError(cityName, e));
            });
        if (cityData && cityName in getState().cities) dispatch(updateCityForecast(cityName, cityData))
    }
}