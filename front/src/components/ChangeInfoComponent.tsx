import React, { useEffect, useState, useRef } from "react";
import ModalComponent from "./ModalComponent";
import { updateCurrentUser } from "../services/apiServices";
import { CustomUser } from "../models/CustomUser";

interface ChangeInfoProps<T extends keyof CustomUser> {
  content: string;
  itemKey: T;
  itemValue: CustomUser[T];
  displayValue?: string;
  children: (
    onChange: (value: CustomUser[T]) => void,
    ref?: React.RefObject<HTMLInputElement>
  ) => React.ReactNode;
  onSave?: () => void;
}

const ChangeInfoComponent = <T extends keyof CustomUser>({
  content,
  itemKey,
  itemValue,
  displayValue,
  children,
  onSave,
}: ChangeInfoProps<T>) => {
  const [newValue, setNewValue] = useState<CustomUser[T]>(itemValue);
  const [isChanging, setIsChanging] = useState<boolean | null>(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // Création du ref pour l'input

  const handleResponse = async () => {
    setIsRefreshing(true);
    try {
      await updateCurrentUser({ [itemKey]: newValue });
      onSave && (await onSave());
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    } finally {
      setIsRefreshing(false);
      setIsChanging(false);
    }
  };

  useEffect(() => {
    if (isChanging && inputRef.current) {
      inputRef.current.focus(); // Focus automatique sur l'input
      // inputRef.current.select(); // Sélectionne tout le texte pour une meilleure UX
    }
  }, [isChanging]); // Déclenché uniquement à l'ouverture du modal

  return (
    <>
      <div className="d-flex align-items-center w-100">
        {isRefreshing ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        ) : (
          <>
            <p style={{ marginRight: "1rem" }}>
              {content} : {String(displayValue || itemValue || "Non défini")}
            </p>
            <button
              onClick={() => setIsChanging(true)}
              className="btn-icon btn-icon-profile custom-btn-primary"
              aria-label="Modifier"
            >
              <i className="bi bi-pencil-fill"></i>
            </button>
          </>
        )}
      </div>
      {isChanging && (
        <ModalComponent
          setDependantVariable={setIsChanging}
          title={`Changer ${content.toLowerCase()}`}
          actionDescription="Valider"
          buttonClassName="custom-btn-primary"
          handleResponse={handleResponse}
        >
          {/* Passage du ref à l'enfant */}
          {children((value: CustomUser[T]) => setNewValue(value), inputRef)}
        </ModalComponent>
      )}
    </>
  );
};

export default ChangeInfoComponent;
