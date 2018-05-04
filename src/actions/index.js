import fetchForecast from '../utils/fetchForecast';
import fetchCitiesForecast from '../utils/fetchCitiesForecast';
import getUpdatableCitiesList from '../utils/getUpdatableCitiesList';
import getCitiesIds from '../utils/getCitiesIds';

export const setFetching = (cityName, isFetching) =>
    ({
        type: 'SET_FETCHING',
        cityName,
        isFetching
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

export const addCityAndLoadForecast = cityName => 
    (dispatch, getState) => {
        if (!(cityName in getState().cities)) {
            dispatch(addNewCity(cityName));
            getAndUpdateCityForecast(cityName, dispatch, getState);
        }
    }

export const getAndUpdateCityForecast = async (cityName, dispatch, getState) => {
    if (!getState().cities[cityName].isFetching) {
        dispatch(setFetching(cityName, true));      
        let cityData = await fetchForecast(cityName)
            .catch(e => {
                dispatch(setFetching(cityName, false));
                dispatch(addError(cityName, e));
            });
        if (cityData && cityName in getState().cities) dispatch(updateCityForecast(cityName, cityData))
    }
}

export const getAndUpdateAllCities = () =>     // onRehydrate! Updating data when restore items from localStorage
    async (dispatch, getState) => {
        let citiesList = getUpdatableCitiesList()
        citiesList.forEach(cityName =>
            dispatch(setFetching(cityName, true))
        )
        let citiesIds = getCitiesIds(citiesList);
        let citiesForecast = await fetchCitiesForecast(citiesIds)
            .catch(e => {
                citiesList.forEach(cityName => {
                    dispatch(setFetching(cityName, false));
                    dispatch(addError(cityName, e));
                })
            });
        console.log(citiesForecast);
        if (citiesForecast) {
            citiesForecast.forEach(cityItem => {
                if (cityItem.name in getState().cities) {
                    dispatch(updateCityForecast(
                        cityItem.name,
                        ({
                            id: cityItem.id,
                            temperature: cityItem.temperature,
                            icon: cityItem.icon,
                            isFetching: false
                        })
                    ))
                }
            })
        }
    }
