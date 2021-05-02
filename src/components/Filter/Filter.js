import React, { Component } from 'react';

import styles from './Filter.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contactsAction, contactsSelectors } from '../../redux/contacts';
import { TextField } from '@material-ui/core';

class Filter extends Component {
  filterHandler = event => {
    const { value } = event.currentTarget;
    const { filterContacts } = this.props;
    filterContacts(value);
  };

  render() {
    const { filterValue } = this.props;
    return (
      <div className={styles.filterContainer}>
        <TextField
          fullWidth
          style={{ marginBottom: 10 }}
          name="filter"
          label="Contact search"
          value={filterValue}
          onChange={this.filterHandler}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filterValue: contactsSelectors.getFilterValue(state),
});

const mapDispatchToProps = {
  filterContacts: contactsAction.filterContacts,
};

Filter.propTypes = {
  filterContacts: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
