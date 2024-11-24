import React from "react";
import DifficultyInput from "./DifficultyInput";
import { DifficultyListProps } from "../../models/PropsInterface";

const DifficultyList: React.FC<DifficultyListProps> = ({
  fields,
  register,
  selectedSet,
}) => (
  <div className="mb-3">
    <p className="form-label">Voies grimpées par difficulté</p>
    <div className="d-flex flex-wrap align-items-center row-gap-2">
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
  </div>
);

export default DifficultyList;
