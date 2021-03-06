import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers/index';
import onRehydrate from './onRehydrate';

const persistConfig = {
    key: 'root',
    storage: storage
   };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
);

export const persistor = persistStore(store, null, onRehydrate);
