import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import GymLocationSelect from "./GymLocationSelect";
import ChangeInfoComponent from "./ChangeInfoComponent";

const PersonnalInformations: React.FC = () => {
  const { user, isAuthenticated, refreshUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <div className="d-flex flex-column align-items-start justify-content-center row-gap-1">
        <h1>
          Profil de {user.firstName} {user.lastName}
        </h1>
        <p>Email : {user.email}</p>
        <ChangeInfoComponent
          content="Nom"
          itemKey="lastName"
          itemValue={user.lastName} // Nom utilisé pour la mise à jour
          onSave={refreshUser}
        >
          {(onChange, ref) => (
            <input
              type="text"
              className="form-control"
              defaultValue={user.lastName}
              onChange={(e) => onChange(e.target.value)}
              ref={ref}
            />
          )}
        </ChangeInfoComponent>
        <ChangeInfoComponent
          content="Prénom"
          itemKey="firstName"
          itemValue={user.firstName}
          onSave={refreshUser}
        >
          {(onChange, ref) => (
            <input
              type="text"
              className="form-control"
              defaultValue={user.firstName}
              onChange={(e) => onChange(e.target.value)}
              ref={ref}
            />
          )}
        </ChangeInfoComponent>
        <ChangeInfoComponent
          content="Ville"
          itemKey="city"
          itemValue={user.city} // Ville utilisée pour la mise à jour
          onSave={refreshUser}
        >
          {(onChange, ref) => (
            <input
              type="text"
              className="form-control"
              defaultValue={user.city}
              onChange={(e) => onChange(e.target.value)}
              ref={ref}
            />
          )}
        </ChangeInfoComponent>
        <ChangeInfoComponent
          content="Salle d'escalade préférée"
          itemKey="favoriteClimbingGymId"
          itemValue={user.favoriteClimbingGym?.id} // ID utilisé pour la mise à jour
          displayValue={user.favoriteClimbingGym?.gymName} // Nom affiché
          onSave={refreshUser}
        >
          {(onChange) => (
            <GymLocationSelect
              initGymId={user.favoriteClimbingGym?.id}
              onParentChange={(selectedOption: { value: any }) =>
                onChange(
                  selectedOption ? Number(selectedOption.value) : undefined
                )
              }
            />
          )}
        </ChangeInfoComponent>
      </div>
    </>
  );
};

export default PersonnalInformations;
