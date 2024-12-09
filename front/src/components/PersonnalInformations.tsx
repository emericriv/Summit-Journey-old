import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PersonnalInformations: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <h3>Informations personnelles</h3>
      <div>
        <h1>
          Profil de {user.firstName} {user.lastName}
        </h1>
        <p>Email : {user.email}</p>
        <p>Ville : {user.city}</p>
      </div>
    </>
  );
};

export default PersonnalInformations;
