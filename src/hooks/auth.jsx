import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LoginService } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const localUser = localStorage.getItem("usuario");

        if (!token && !localUser) setUser(null);
        if (token && localUser) {
          setUser(JSON.parse(localUser));
          await LoginService.validateToken();
        }
      } catch (error) {
        console.error("Erro ao inicializar a autenticação:", error);
        logout();
      }
    };

    initializeAuth();
    setIsLoading(false);
  }, []);

  const login = (token, user) => {
    setIsLoading(true);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(user));

    setUser(user);
    setIsLoading(false);

    if (user?.idioma) {
      localStorage.setItem("@app-publisher-language", user?.idioma);
      i18n.changeLanguage(user?.idioma);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
