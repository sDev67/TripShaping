import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { checkStatus, url_prefix } from "../utils.js";
import Loading from "../utils/Loading.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch(`${url_prefix}/user/whoami`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(checkStatus)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const signup = (credentials) => {
    return fetch(`${url_prefix}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then(checkStatus)
      .then(() => {
        navigate("/signin");
      });
  };

  const signin = (credentials) => {
    return fetch(`${url_prefix}/user/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then(checkStatus)
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate("/mytrips");
      });
  };

  const signout = () => {
    window.localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
