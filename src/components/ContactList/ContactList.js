import { Component } from 'react';
import styles from './ContactList.module.css';
import Filter from '../Filter/Filter';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import {
  contactsAction,
  contactsOperations,
  contactsSelectors,
} from '../../redux/contacts';

class ContactList extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.initContacts();
    console.log('+');
  }

  render() {
    const { deleteContact, searchedContacts } = this.props;
    console.log(this.state);
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
}

const mapStateToProps = state => ({
  searchedContacts: contactsSelectors.getSearchedContacts(state),
  filterValue: contactsSelectors.getFilterValue(state),
});

const mapDispatchToProps = {
  deleteContact: id => contactsOperations.deleteContact(id),
  initContacts: contactsOperations.initContacts,
  onEditClick: contactsAction.changeContact,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
