import { store }  from '../store/index';

const getUpdatableCitiesList = () => 
    Object.keys(store.getState().cities).filter(city => 
        city !== '_persist' && 'id' in store.getState().cities[city]
    )

export default getUpdatableCitiesList;