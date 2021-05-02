import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './ContactForm.module.css';
import { TextField, Button } from '@material-ui/core';
import { contactsOperations } from '../../redux/contacts';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const getContactData = useCallback(event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.warn(`Error`);
    }
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(contactsOperations.addContact(name, number));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <TextField
          style={{ margin: 10 }}
          fullWidth
          name="name"
          label="Name"
          type="text"
          value={name}
          onChange={getContactData}
        />
        <TextField
          style={{ marginBottom: 20 }}
          fullWidth
          name="number"
          label="Phone number"
          type="text"
          value={number}
          onChange={getContactData}
        />
        <Button
          disableRipple
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Add contact
        </Button>
      </form>
    </div>
  );
}
