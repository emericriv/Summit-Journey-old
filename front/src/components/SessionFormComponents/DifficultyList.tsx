import React from "react";
import DifficultyInput from "./DifficultyInput";
import { DifficultyListProps } from "../../models/PropsInterface";

const DifficultyList: React.FC<DifficultyListProps> = ({
  fields,
  register,
  selectedSet,
}) => (
  <div className="difficulty-list">
    <label
      className="form-label mb-0 d-flex flex-column"
      style={{ height: "100%" }}
    >
      Voies grimpées par difficulté
      <div className="flex-grow-1 d-flex flex-wrap align-items-center row-gap-2 mt-2">
        {selectedSet ? (
          fields.map((field, index) => (
            <DifficultyInput
              key={index}
              difficulty={field.difficulty}
              register={register}
              name={`difficulties.${index}.count`}
            />
          ))
        ) : (
          <p style={{ height: 38, width: 500, margin: 0 }}></p>
        )}
      </div>
    </label>
  </div>
);

export default DifficultyList;
