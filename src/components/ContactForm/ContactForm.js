import { Component } from 'react';
import styles from './ContactForm.module.css';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  getContactData = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;
    const { addContact } = this.props;

    this.resetForm();

    addContact(name, number);
    console.log(addContact);
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    console.log(this.props);
    return (
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit} className={styles.formContainer}>
          <TextField
            style={{ margin: 10 }}
            fullWidth
            name="name"
            label="Name"
            type="text"
            value={this.state.name}
            onChange={this.getContactData}
          />
          <TextField
            style={{ marginBottom: 20 }}
            fullWidth
            name="number"
            label="Phone number"
            type="text"
            value={this.state.number}
            onChange={this.getContactData}
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
}

const mapStateToProps = state => ({
  contacts: contactsSelectors.getAllContacts(state),
});

const mapDispatchToProps = {
  addContact: contactsOperations.addContact,
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
