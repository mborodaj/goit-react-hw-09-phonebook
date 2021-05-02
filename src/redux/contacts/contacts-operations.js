import axios from 'axios';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactSuccess,
  deleteContactRequest,
  deleteContactError,
  initContactsRequest,
  initContactsSuccess,
  initContactsError,
} from './contacts-action';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const initContacts = () => async dispatch => {
  dispatch(initContactsRequest());

  try {
    const { data } = await axios.get('/contacts');

    dispatch(initContactsSuccess(data));
  } catch (error) {
    dispatch(initContactsError(error));
  }
};

const addContact = (name, number) => async dispatch => {
  const contact = {
    name,
    number,
  };

  dispatch(addContactRequest());

  try {
    const { data } = await axios.post('/contacts', contact);
    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error));
  }
};

const deleteContact = id => async dispatch => {
  dispatch(deleteContactRequest());

  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(deleteContactSuccess(id));
  } catch (error) {
    dispatch(deleteContactError(error));
  }
};

export { addContact, deleteContact, initContacts };
