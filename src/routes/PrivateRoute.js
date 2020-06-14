import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function PrivateRoute({component: Component, isClosed, ...restProperties }) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { prevPath: restProperties.location.pathname } }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route { ...restProperties } component={Component} />;
}

// Define o vlr padrão
PrivateRoute.defaultProps = {
  isClosed: false,
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool
};
