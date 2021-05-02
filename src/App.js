import { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authOperations, authSelectors } from './redux/auth';
import { Container } from '@material-ui/core';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRouter';
import Navigation from './components/Navigation';

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

class App extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    console.log(Boolean(this.props.token));
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
}

const mapStateToProps = state => ({
  token: authSelectors.getToken(state),
});

const mapDispatchToProps = {
  getCurrentUser: authOperations.getCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
