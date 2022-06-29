import { useState, useContext, createContext } from "react";
import axios from "axios";
import { API_URL } from "../../api";
import jwt_decode from "jwt-decode";
import useLocalStorage from "../utils/useLocalStorage";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn");
  axios.defaults.validateStatus = (status) => {
    return status >= 200 && status < 300;
  };

  if (user) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    axios.defaults.headers.common["Content-Type"] = "application/json";
  } else {
    axios.defaults.headers.common["Authorization"] = null;
  }

  const postLogin = (email, password) => {
    return axios({
      method: "post",
      url: `${API_URL}/token`,
      data: {
        username: email,
        password: password,
      },
      withCredentials: true,
    });
  };

  const refreshToken = async () => {
    return await axios({
      method: "post",
      url: `${API_URL}/token/refresh`,
      withCredentials: true,
      headers: { Authorization: "" },
    })
      .then((response) => {
        if (response.headers["x-access-token"]) {
          persistToken(response.headers["x-access-token"]);
          if (response.ok) setLoggedIn(true);
        }
        return response;
      })
      .catch((error) => {
        setLoggedIn(false);
        logout();
      });
  };

  const persistToken = (token) => {
    const tokenDecoded = jwt_decode(token);
    const user = {
      token: token,
      id: tokenDecoded.id,
      name: tokenDecoded.name,
      email: tokenDecoded.sub,
      roles: tokenDecoded.role.split(","),
    };
    setUser(user);
  };

  const login = async (email, password) => {
    const response = await postLogin(email, password);
    const token = response.headers["x-access-token"];
    setLoggedIn(true);
    persistToken(token);
  };

  const clearCookies = () => {
    return axios({
      method: "delete",
      url: `${API_URL}/token`,
      withCredentials: true,
      headers: { Authorization: "" },
    });
  };

  const logout = async () => {
    await clearCookies();
    setLoggedIn(false);
    setUser(null);
  };

  window.onload = async () => {
    await refreshToken();
  };

  return {
    user,
    refreshToken,
    login,
    logout,
  };
}
