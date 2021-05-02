import { Suspense, lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authOperations } from './redux/auth';
import { Container } from '@material-ui/core';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRouter';
import Navigation from './components/Navigation/Navigation';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const ContactsPage = lazy(() =>
  import('./views/ContactsPage' /* webpackChunkName: "contacts-page" */),
);
const RegistrationPage = lazy(() =>
  import('./views/RegisterPage' /* webpackChunkName: "register-page" */),
);
const LoginPage = lazy(() =>
  import('./views/LoginPage' /* webpackChunkName: "login-page" */),
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="md">
        <Navigation />
        <Suspense fallback="loading">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <PrivateRouter path="/contacts" exact component={ContactsPage} />
            <PublicRouter
              path="/login"
              restricted
              exact
              component={LoginPage}
            />
            <PublicRouter
              path="/register"
              restricted
              exact
              component={RegistrationPage}
            />
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}
