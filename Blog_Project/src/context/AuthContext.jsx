import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  getProfile,
  logoutUser,
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const data = await getProfile();
          setUser(data);
        } catch (error) {
          localStorage.removeItem("token");
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkLogin();
  }, []);

  const handleLogin = async (userData) => {
    const data = await loginUser(userData);

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return data;
  };

  const handleRegister = async (userData) => {
    return await registerUser(userData);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);