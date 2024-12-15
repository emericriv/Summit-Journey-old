import React, { createContext, useState, useContext, useEffect } from "react";
import { CustomUser } from "../models/CustomUser";
import { fetchCurrentUser } from "../services/apiServices";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: CustomUser | null;
  login: () => void;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<CustomUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
      // Récupérer les données de l'utilisateur
      fetchCurrentUser()
        .then((userData) => {
          console.log("Utilisateur récupéré :", userData);
          setUser(userData);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            error
          );
          setIsAuthenticated(false);
        });
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    // Récupérer les données après connexion
    fetchCurrentUser().then(setUser).catch(console.error);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const updatedUser = await fetchCurrentUser();
      setUser(updatedUser);
    } catch (error) {
      console.error(
        "Erreur lors du rafraîchissement des données utilisateur :",
        error
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
