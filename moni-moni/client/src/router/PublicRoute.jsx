import { Navigate, Route } from "react-router";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { verifyUserSuccess } from "../features/auth/authSlice";
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to={{ pathname: "/home" }} />
        )
      }
    />
  );
};

export default PublicRoute;
