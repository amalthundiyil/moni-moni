import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{ pathname: "/login", state: { from: props.location } }}
            {...props}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
