import React from "react";
import { HighestDifficultiesCompletedProps } from "../models/PropsInterface";

const HighestDifficultiesCompletedComponent: React.FC<
  HighestDifficultiesCompletedProps
> = ({ session, number }) => {
  // reverse used set to start from the highest difficulty
  const reversedDifficultyCompletions = [
    ...(session.difficultyCompletions || []),
  ].reverse();
  const topDifficulties = reversedDifficultyCompletions
    .filter((completion) => completion.count > 0) // Exclure les counts nuls
    .slice(0, number); // Récupérer les 2 premiers éléments

  // setHighestDifficulties(topDifficulties);
  // Faire un composant dedié pour afficher les difficultés
  return (
    <div>
      {topDifficulties &&
        topDifficulties.map((difficulty, index) => (
          <span key={index}>
            {difficulty.count}{" "}
            <span
              className={`difficulty-circle mx-1`}
              style={{
                backgroundColor: difficulty.difficulty.color
                  ? difficulty.difficulty.hexColor
                  : "transparent",
              }}
            >
              {difficulty.difficulty.color ? "" : difficulty.difficulty.label}
            </span>
          </span>
        ))}
    </div>
  );
};

export default HighestDifficultiesCompletedComponent;
