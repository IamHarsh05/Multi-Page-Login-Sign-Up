import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = localStorage.getItem("isAuthenticated");
  const [isAuthenticated, setIsAuthenticated] = useState(auth || false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.post(
            `${process.env.REACT_APP_API_UR}/api/auth/verify-token`,
            {
              token,
            }
          );
          setIsAuthenticated(response.data.isAuthenticated);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_UR}/api/auth/login`,
        {
          email,
          password,
        }
      );
      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", true);
        setIsAuthenticated(true);
        return response;
      } else {
        console.error("Login failed: No token received");
        setIsAuthenticated(false);
        return { msg: "Login failed: No token received" };
      }
    } catch (err) {
      setIsAuthenticated(false);
      console.error("Login failed:", err.response.data);
      throw err;
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_UR}/api/auth/register`,
        {
          username,
          email,
          password,
        }
      );
      // Assuming the response contains a token or some indicator of successful registration
      if (res.data.token) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", true);
        // You can also store the token in local storage or a cookie for future requests
        localStorage.setItem("token", res.data.token);
      } else {
        setIsAuthenticated(false);
        console.error("Registration failed: No token received");
      }
    } catch (err) {
      setIsAuthenticated(false);
      console.error("Registration failed:", err.response.data);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_UR}/api/auth/logout`,
        localStorage.getItem("token"),
        {
          // Add authorization header with JWT token from local storage
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setIsAuthenticated(false);
      // Remove the token from local storage or cookies on logout
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
    } catch (err) {
      setIsAuthenticated(true);
      console.error("Logout failed:", err.response.data);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
