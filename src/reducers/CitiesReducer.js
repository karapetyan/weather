import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const cities = (state = {}, action) => { 
    switch (action.type) {
        case 'ADD_NEW_CITY':
            return ({
                ...state,
                [action.cityName]: {
                    isFetching: false
                }
            })
        case 'TOGGLE_FETCHING':
            return ({
                ...state,
                [action.cityName]: {
                    isFetching: !state[action.cityName].isFetching
                }
            })
        case 'UPDATE_CITY_FORECAST':
            return ({
                ...state,
                [action.cityName]: {
                    ...state[action.cityName],
                    ...action.cityData   
                }
            })
        case 'REMOVE_CITY':
            let newState = {...state};
            delete newState[action.cityName];
            return newState

        default:
            return state
    }
}

const persistConfig = {
    key: 'cities',
    storage: storage,
    blacklist: ['isFetching']
  };

export default persistReducer(persistConfig, cities);