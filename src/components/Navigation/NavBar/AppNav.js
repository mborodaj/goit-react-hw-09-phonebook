import { NavLink } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '../../../redux/auth';

import s from './AppNav.module.css';

import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import HomeIcon from '@material-ui/icons/Home';

export default function AppNav() {
  const token = useSelector(authSelectors.getToken);

  return (
    <div className={s.app__nav}>
      <NavLink to="/" className={s.nav__link}>
        <HomeIcon htmlColor="#45B39D" style={{ fontSize: 30 }} />
      </NavLink>

      {Boolean(token) && (
        <NavLink to="/contacts" className={s.nav__contacts}>
          <ContactPhoneIcon htmlColor="#45B39D" style={{ fontSize: 30 }} />
        </NavLink>
      )}
    </div>
  );
}
