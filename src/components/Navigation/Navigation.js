import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authOperations, authSelectors } from '../../redux/auth';
import s from './Navigation.module.css';
import AppNav from './NavBar/AppNav';
import Exit from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Navigation extends Component {
  render() {
    const { token, userName, onLogout, isAutorized } = this.props;

    return (
      <div className={s.navigation}>
        <AppNav />
        {Boolean(token) ? (
          <>
            <div className={s.user__nav}>
              <AccountCircleIcon
                fontSize="large"
                htmlColor="#45B39D"
                style={{ fontSize: 30 }}
              />
              {isAutorized && (
                <p className={s.user__name}>Welcome, {userName}</p>
              )}
              <button onClick={onLogout} className={s.logout__button}>
                <Exit
                  fontSize="large"
                  htmlColor="#45B39D"
                  style={{ fontSize: 30 }}
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login" className={s.nav__link}>
              Login
            </NavLink>
            <NavLink to="/register" className={s.nav__link}>
              Registration
            </NavLink>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: authSelectors.getToken(state),
  userName: state.auth.user.name,
  isAutorized: authSelectors.isAutorizedUser(state),
});

const mapDispatchToProps = {
  onLogout: authOperations.logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
