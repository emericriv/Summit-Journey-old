import React from "react";
import { Difficulty, DifficultySet } from "../../models/ClimbingSession";
import DifficultyInput from "./DifficultyInput";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import { FormSessionProps } from "../../models/PropsInterface";

interface DifficultyListProps {
  fields: FieldArrayWithId<FormSessionProps, "difficulties", "id">[];
  register: UseFormRegister<FormSessionProps>;
  handleCountChange: (difficulty: Difficulty, count: number) => void;
  selectedSet: DifficultySet | undefined;
}

const DifficultyList: React.FC<DifficultyListProps> = ({
  fields,
  register,
  handleCountChange,
  selectedSet,
}) => (
  <div className="mb-3">
    <p className="form-label">Voies grimpées par difficulté</p>
    <div className="d-flex flex-wrap align-items-center row-gap-2">
      {selectedSet &&
        fields.map((field, index) => (
          <DifficultyInput
            key={index}
            difficulty={field}
            register={register}
            name={`difficulties.${index}.label`}
            onCountChange={handleCountChange}
          />
        ))}
    </div>
  </div>
);

export default DifficultyList;
