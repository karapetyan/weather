import { store }  from './index';
import { getAndUpdateAllCities } from '../actions/index';
import getUpdatableCitiesList from '../utils/getUpdatableCitiesList';
import getCitiesIds from '../utils/getCitiesIds';

const onRehydrate = () => {
   let citiesList = getUpdatableCitiesList(store.getState().cities);
   let citiesIds = getCitiesIds(citiesList);
   store.dispatch(getAndUpdateAllCities(citiesIds));
}

export default onRehydrate;