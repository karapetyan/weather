import { store }  from '../store/index';

const getUpdatableCitiesList = cities => 
    Object.keys(cities).filter(city => 
        city !== '_persist' && 'id' in store.getState().cities[city]
    )

export default getUpdatableCitiesList;    