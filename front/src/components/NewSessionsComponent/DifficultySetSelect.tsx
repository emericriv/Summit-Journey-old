import React, { useEffect, useState } from "react";
import { DifficultySetSelectProps } from "../../models/PropsInterface";
import { getDifficultySets } from "../../services/apiServices";
import { DifficultySet } from "../../models/ClimbingSession";

const DifficultySetSelect: React.FC<DifficultySetSelectProps> = ({
  updateSelectedSet,
  reset,
  initSetId,
}) => {
  const [difficultySets, setDifficultySets] = useState<DifficultySet[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false); // Gère l'ouverture du menu déroulant

  useEffect(() => {
    const fetchDifficultySets = async () => {
      const sets = await getDifficultySets();
      setDifficultySets(sets);

      // Ne réinitialise que si aucun set n'est déjà sélectionné
      if (sets.length > 0 && selectedSetId === null) {
        if (initSetId) {
          const set = sets.find((set) => set.id === initSetId);
          if (set) {
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
    fetchDifficultySets();
  }, [updateSelectedSet, selectedSetId, initSetId]);

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
    <div className="mb-3 position-relative">
      <label className="form-label">
        Set de difficulté
        <div
          className="custom-select form-select"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            position: "relative",
            width: "30vw",
          }}
        >
          {/* Affiche l'option sélectionnée */}
          {difficultySets
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
                {difficulty.difficulty.color ? "" : difficulty.difficulty.label}
              </span>
            ))}
        </div>
      </label>

      {/* Menu déroulant des options */}
      {isOpen && (
        <ul
          className="custom-options"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            position: "absolute",
            width: "30vw",
            border: "1px solid #ccc",
            borderRadius: "5px",
            background: "#eee",
            zIndex: 10,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {difficultySets.map((set) => (
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
    </div>
  );
};

export default DifficultySetSelect;
