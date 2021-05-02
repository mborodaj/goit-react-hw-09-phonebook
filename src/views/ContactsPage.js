import { Component } from 'react';
import s from '../App.module.css';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { contactsAction, contactsSelectors } from '../redux/contacts';

class ContactsPage extends Component {
  state = {
    contactForEdit: null,
  };

  getContactForEdit = contactForEdit => {
    this.setState({ contactForEdit });
  };

  onAddBtn = () => {
    this.setState({ contactForEdit: null });
  };

  render() {
    return (
      <div>
        <div className={s.filter__add__container}></div>
        <Paper elevation={3} className={s.addContact__container}>
          <ContactForm />
        </Paper>
        <div className={s.container}>
          <h2 className={s.contacts__title}>Contact list</h2>
          <ContactList contactForEdit={this.getContactForEdit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: contactsSelectors.getModalValue(state),
});

const mapDispatchToProps = {
  openModal: contactsAction.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
