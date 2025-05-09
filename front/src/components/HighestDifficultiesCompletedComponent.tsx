import React from "react";
import { HighestDifficultiesCompletedProps } from "../models/PropsInterface";

const HighestDifficultiesCompletedComponent: React.FC<
  HighestDifficultiesCompletedProps
> = ({ session, numberOfDifficulties }) => {
  // reverse used set to start from the highest difficulty
  const reversedDifficultyCompletions = [
    ...(session.difficultyCompletions || []),
  ].reverse();

  let topDifficulties = reversedDifficultyCompletions.filter(
    (completion) => completion.count > 0
  ); // Exclure les counts nuls

  if (numberOfDifficulties !== "all") {
    topDifficulties = topDifficulties.slice(0, numberOfDifficulties);
  }

  return (
    <div>
      {topDifficulties &&
        topDifficulties.map((difficulty, index) => (
          <span key={index} className="mx-1 d-inline-flex align-items-center">
            {difficulty.count}
            <span
              className="difficulty-circle difficulty-border mx-1"
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
