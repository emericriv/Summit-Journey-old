import React from "react";
import ChangeInfoComponent from "./ChangeInfoComponent";
import { useAuth } from "../context/AuthContext";

const MaterialInfoComponent: React.FC = () => {
  const { user, refreshUser } = useAuth();

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <div className="d-flex flex-column align-items-start justify-content-center row-gap-1">
        <h3>Matériel et modèle</h3>
        <ChangeInfoComponent
          content="Chaussons d'escalade"
          itemKey="climbingShoes"
          itemValue={user.climbingShoes || "Non renseigné"}
          onSave={refreshUser}
        >
          {(onChange, ref) => (
            <input
              type="text"
              className="form-control"
              defaultValue={user.climbingShoes}
              onChange={(e) => onChange(e.target.value)}
              ref={ref}
            />
          )}
        </ChangeInfoComponent>
        <ChangeInfoComponent
          content="Harnais"
          itemKey="climbingHarness"
          itemValue={user.climbingHarness || "Non renseigné"}
          onSave={refreshUser}
        >
          {(onChange, ref) => (
            <input
              type="text"
              className="form-control"
              defaultValue={user.climbingHarness}
              onChange={(e) => onChange(e.target.value)}
              ref={ref}
            />
          )}
        </ChangeInfoComponent>
        <ChangeInfoComponent
          content="Casque"
          itemKey="climbingHelmet"
          itemValue={user.climbingHelmet || "Non renseigné"}
          onSave={refreshUser}
        >
          {(onChange, ref) => (
            <input
              type="text"
              className="form-control"
              defaultValue={user.climbingHelmet}
              onChange={(e) => onChange(e.target.value)}
              ref={ref}
            />
          )}
        </ChangeInfoComponent>
        <ChangeInfoComponent
          content="Corde"
          itemKey="climbingRope"
          itemValue={user.climbingRope || "Non renseigné"}
          onSave={refreshUser}
        >
          {(onChange, ref) => (
            <input
              type="text"
              className="form-control"
              defaultValue={user.climbingRope}
              onChange={(e) => onChange(e.target.value)}
              ref={ref}
            />
          )}
        </ChangeInfoComponent>
      </div>
    </>
  );
};

export default MaterialInfoComponent;
