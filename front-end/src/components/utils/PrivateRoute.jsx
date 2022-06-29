import { Route, Redirect } from "react-router-dom";
import { fetchTaskDetails } from "../../services/TaskService";
import { useAuth } from "../auth/useAuth";

export default function PrivateRoute({ children, roles, ...rest }) {
  let auth = useAuth();

  const routeAccessibleByAnyone = roles === "any";

  let hasRequiredRole = !!auth.user
    ? auth.user.roles.some((r) => roles.includes(r))
    : false;

  const path = rest?.location?.pathname;
  const checkWriteAccess = async () => {
    const id = path.split("/")[2];
    const taskDetails = await fetchTaskDetails(id);
    return auth.user.id === taskDetails.data.taskManagerId;
  };

  if (!hasRequiredRole && path?.indexOf("/edycjaZadania/") >= 0 && auth?.user) {
    hasRequiredRole = checkWriteAccess();
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!auth.user && (routeAccessibleByAnyone || hasRequiredRole) ? (
          children
        ) : !!auth.user && !(routeAccessibleByAnyone || hasRequiredRole) ? (
          <Redirect
            to={{
              pathname: "/zaloguj",
              state: {
                from: "/",
              },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/zaloguj",
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  );
}
