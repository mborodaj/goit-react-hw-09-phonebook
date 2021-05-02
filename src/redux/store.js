import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import reducers from './contacts/contacts-reducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducers from './auth';

const persistConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

const contactsReducer = combineReducers({
  items: reducers.itemsReducers,
  filter: reducers.filterReducer,
  loading: reducers.loading,
  addContact: reducers.addContactReducer,
});

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

const persistedReducer = persistReducer(persistConfig, authReducers);

let store = configureStore({
  reducer: {
    auth: persistedReducer,
    contacts: contactsReducer,
  },
  middleware,
});

let persistor = persistStore(store);

export { store, persistor };
