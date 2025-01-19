import React, { useEffect, useState } from "react";
import { DifficultySetSelectProps } from "../../models/PropsInterface";
import { getDifficultySets } from "../../services/apiServices";
import { DifficultySet } from "../../models/ClimbingSession";

const DifficultySetSelect: React.FC<DifficultySetSelectProps> = ({
  updateSelectedSet,
  reset,
  initSetId,
}) => {
  const [difficultySets, setDifficultySets] = useState<DifficultySet[]>();
  const [selectedSetId, setSelectedSetId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false); // Gère l'ouverture du menu déroulant

  useEffect(() => {
    if (!difficultySets) fetchDifficultySets();
  }, []);

  const fetchDifficultySets = async () => {
    const sets = await getDifficultySets();
    setDifficultySets(sets);

    // Ne réinitialise que si aucun set n'est déjà sélectionné
    if (sets.length > 0 && !selectedSetId) {
      if (initSetId) {
        const set = sets.find((set) => set.id === initSetId);
        if (set) {
          updateSelectedSet(set);
          setSelectedSetId(initSetId);
        }
      } else {
        updateSelectedSet(sets[0]);
        if (sets[0].id !== undefined) {
          setSelectedSetId(sets[0].id);
        }
      }
    }
  };

  const handleSelect = (set: DifficultySet) => {
    updateSelectedSet(set);
    if (set.id !== undefined) {
      setSelectedSetId(set.id);
    }
    reset((formValues) => ({
      ...formValues,
      difficulties: [],
    })); // Réinitialise les difficultés associées
    setIsOpen(false); // Ferme le menu après sélection
  };

  return (
    <div className="difficulty-set-select" style={{ position: "relative" }}>
      <label className="form-label mb-0" style={{ width: "100%" }}>
        Set de difficulté
        <div
          className="custom-select form-select mt-2"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {/* Affiche l'option sélectionnée */}
          {difficultySets ? (
            difficultySets
              .find((set) => set.id === selectedSetId)
              ?.difficulties.map((difficulty, index) => (
                <span
                  key={index}
                  className="difficulty-circle difficulty-border mx-1"
                  style={{
                    backgroundColor: difficulty.difficulty.color
                      ? difficulty.difficulty.hexColor
                      : "transparent",
                  }}
                >
                  {difficulty.difficulty.color
                    ? ""
                    : difficulty.difficulty.label}
                </span>
              ))
          ) : (
            <span>Chargement...</span>
          )}
        </div>
        {/* Menu déroulant des options */}
        {isOpen && (
          <ul className="custom-options">
            {difficultySets &&
              difficultySets.map((set) => (
                <li
                  key={set.id}
                  onClick={() => handleSelect(set)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="option-item"
                >
                  {/* Contenu de chaque option */}
                  <div>
                    {set.difficulties.map((difficulty, index) => (
                      <span
                        key={index}
                        className="difficulty-circle difficulty-border mx-1"
                        style={{
                          backgroundColor: difficulty.difficulty.color
                            ? difficulty.difficulty.hexColor
                            : "transparent",
                        }}
                      >
                        {difficulty.difficulty.color
                          ? ""
                          : difficulty.difficulty.label}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
          </ul>
        )}
      </label>
    </div>
  );
};

export default DifficultySetSelect;
