// import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@reduxjs/toolkit';

const initContactsRequest = createAction('contacts/initContactsRequest');
const initContactsSuccess = createAction('contacts/initContactsSuccess');
const initContactsError = createAction('contacts/initContactsError');

const addContactRequest = createAction('contacts/addContactRequest');
const addContactSuccess = createAction('contacts/addContactSuccess');
const addContactError = createAction('contacts/addContactError');

const deleteContactRequest = createAction('contacts/deleteContactRequest');
const deleteContactSuccess = createAction('contacts/deleteContactSuccess');
const deleteContactError = createAction('contacts/deleteContactError');

const filterContacts = createAction('contact/filter');

export {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  initContactsRequest,
  initContactsSuccess,
  initContactsError,
  filterContacts,
};
