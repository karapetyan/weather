import { store }  from '../store/index';

const getCitiesIds = (citiesList) =>
    citiesList.map(city =>
        store.getState().cities[city].id
    )

export default getCitiesIds;