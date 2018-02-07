import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function AuthRoute (props) {
  const {
    component: Component,
    isAuthenticated = false,
    user = {},
    ...restProps
  } = props;
  
  return (
    <Route
      {...restProps}
      render={
        props => {
          if (isAuthenticated) {
            return <Component {...props} user={user} />
          } else {
            return <Redirect to={{pathname: "/sign_in"}} />
          }
        }
      }
    />
  )
}

export {AuthRoute};
