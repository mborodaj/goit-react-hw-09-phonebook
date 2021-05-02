// import * as actions from './contacts-action';
import { createReducer } from '@reduxjs/toolkit';
import {
  gentCurrentUserError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
} from '../auth/auth-actions';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  filterContacts,
  initContactsRequest,
  initContactsSuccess,
  initContactsError,
} from './contacts-action';

const itemsReducers = createReducer([], {
  [initContactsSuccess]: (_, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [...state, payload],

  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

const loading = createReducer(false, {
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,
  [initContactsRequest]: () => true,
  [initContactsSuccess]: () => false,
  [initContactsError]: () => false,
  [getCurrentUserRequest]: () => true,
  [getCurrentUserSuccess]: () => false,
  [gentCurrentUserError]: () => false,
});

const filterReducer = createReducer('', {
  [filterContacts]: (_, { payload }) => payload,
});

const addContactReducer = createReducer(false, {
  [addContactSuccess]: () => false,
});

const reducers = { itemsReducers, filterReducer, loading, addContactReducer };

export default reducers;
