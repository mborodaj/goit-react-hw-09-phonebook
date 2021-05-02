import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { authActions, authSelectors } from '../redux/auth';

const PrivateRouter = ({
  component: Component,
  token,
  noAuthenticated,
  ...routeProps
}) => {
  return (
    <Route
      {...routeProps}
      render={props =>
        Boolean(token) ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = state => ({
  token: authSelectors.getToken(state),
});

const mapDispatchToProps = {
  noAuthenticated: authActions.getCurrentUserError,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRouter);
