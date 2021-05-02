import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authOperations, authSelectors } from '../../redux/auth';
import s from './Navigation.module.css';
import AppNav from './NavBar/AppNav';
import Exit from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function Navigation() {
  const token = useSelector(authSelectors.getToken);
  const userName = useSelector(state => state.auth.user.name);
  const isAutorized = useSelector(authSelectors.isAutorizedUser);

  const dispatch = useDispatch();

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
            {isAutorized && <p className={s.user__name}>Welcome, {userName}</p>}
            <button
              onClick={() => dispatch(authOperations.logoutUser())}
              className={s.logout__button}
            >
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
