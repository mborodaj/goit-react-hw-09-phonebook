import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Filter.module.css';
import PropTypes from 'prop-types';
import { contactsAction, contactsSelectors } from '../../redux/contacts';
import { TextField } from '@material-ui/core';

export default function Filter() {
  const dispatch = useDispatch();
  const filterValue = useSelector(contactsSelectors.getFilterValue);

  const filterHandler = e => {
    const { value } = e.currentTarget;

    dispatch(contactsAction.filterContacts(value));
  };
  return (
    <div className={styles.filterContainer}>
      <TextField
        fullWidth
        style={{ marginBottom: 10 }}
        name="filter"
        label="Contact search"
        value={filterValue}
        onChange={filterHandler}
      />
    </div>
  );
}

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
};
