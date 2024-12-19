import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import ModalComponent from "./ModalComponent";
import GymLocationSelect from "./GymLocationSelect";
import { updateCurrentUser } from "../services/apiServices";

const PersonnalInformations: React.FC = () => {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [isChangingClimbingGym, setIsChangingClimbingGym] = useState<
    boolean | null
  >(false);
  const [selectedGymId, setSelectedGymId] = useState<number | null>(null); // Stocke l'ID de la salle sélectionnée
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <p>Chargement...</p>;
  }

  // Fonction pour gérer la mise à jour de la salle
  const handleResponse = async () => {
    if (!selectedGymId) {
      return;
    }

    setIsRefreshing(true);
    try {
      await updateCurrentUser({
        favoriteClimbingGymId: selectedGymId,
      });
      await refreshUser();
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsRefreshing(false);
      setIsChangingClimbingGym(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-start justify-content-center">
        <h1>
          Profil de {user.firstName} {user.lastName}
        </h1>
        <p>Email : {user.email}</p>
        <p>Ville : {user.city}</p>
        <div className="d-flex align-items-center justify-content-between w-100">
          {isRefreshing ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              <p>
                Salle d'escalade préférée : {user.favoriteClimbingGym.gymName}
              </p>

              <button
                onClick={() => setIsChangingClimbingGym(true)}
                className="btn-icon custom-btn-primary"
                aria-label="Modifier"
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
            </>
          )}
        </div>
        {isChangingClimbingGym && (
          <ModalComponent
            setDependantVariable={setIsChangingClimbingGym}
            title="Changer de salle favorite"
            actionDescription="Valider"
            buttonClassName="custom-btn-primary"
            handleResponse={handleResponse} // Utilise la fonction handleResponse
          >
            <div>
              <p>Changer de salle favorite</p>
              <GymLocationSelect
                initGymId={user.favoriteClimbingGym.id}
                onParentChange={(selectedOption: { value: any }) => {
                  setSelectedGymId(
                    selectedOption ? Number(selectedOption.value) : null
                  );
                }} // Met à jour l'état dans le parent
              />
            </div>
          </ModalComponent>
        )}
      </div>
    </>
  );
};

export default PersonnalInformations;
