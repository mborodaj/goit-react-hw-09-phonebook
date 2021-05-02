import s from '../App.module.css';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Paper from '@material-ui/core/Paper';

export default function ContactsPage() {
  return (
    <div>
      <div className={s.filter__add__container}></div>
      <Paper elevation={3} className={s.addContact__container}>
        <ContactForm />
      </Paper>
      <div className={s.container}>
        <h2 className={s.contacts__title}>Contact list</h2>
        <ContactList />
      </div>
    </div>
  );
}
