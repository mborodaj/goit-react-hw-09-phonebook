import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ContactList.module.css';
import Filter from '../Filter/Filter';

import PropTypes from 'prop-types';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';

export default function ContactList() {
  const dispatch = useDispatch();
  const searchedContacts = useSelector(contactsSelectors.getSearchedContacts);

  useEffect(() => {
    dispatch(contactsOperations.initContacts());
  }, [dispatch]);

  const deleteContact = useCallback(
    id => dispatch(contactsOperations.deleteContact(id)),
    [dispatch],
  );

  return (
    <>
      <Filter />
      <ul className={styles.contactList}>
        {searchedContacts &&
          searchedContacts.map(({ name, number, id }) => (
            <li key={id} className={styles.contactListItem}>
              <p className={styles.contactData}>
                {name}: {number}
              </p>
              <button
                className={styles.removeButton}
                type="button"
                onClick={() => deleteContact(id)}
              >
                X
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),

  filterValue: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
