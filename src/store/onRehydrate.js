import { store }  from './index';
import { getAndUpdateAllCities } from '../actions/index';
import getUpdatableCitiesList from '../utils/getUpdatableCitiesList';

const onRehydrate = () => {
    if (getUpdatableCitiesList().length) {
        getAndUpdateAllCities()(store.dispatch, store.getState);
    }
}

export default onRehydrate;