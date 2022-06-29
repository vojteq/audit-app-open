import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAuth } from "./useAuth";
import axios from "axios";
import { useMemo } from "react";

export default function AuthVerify({ children }) {
  const { user, refreshToken } = useAuth();
  const history = useHistory();

  if (history) {
    history.listen(() => {
      if (user) {
        const tokenDecoded = jwt_decode(user.token);
        if (tokenDecoded.exp * 1000 < Date.now()) {
          refreshToken();
        }
      }
    });
  }

  useMemo(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 403) {
          refreshToken();
        }
      }
    );
  }, [refreshToken]);

  return children;
}
