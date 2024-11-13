import React from "react";
import { UseFormReset, UseFormRegister } from "react-hook-form";
import { DifficultySet } from "../../models/ClimbingSession";
import { FormSessionProps } from "../../models/PropsInterface";

interface DifficultySetSelectProps {
  options: DifficultySet[];
  setSelectedSet: (
    set: React.SetStateAction<DifficultySet | undefined>
  ) => void;
  reset: UseFormReset<FormSessionProps>;
  register: UseFormRegister<FormSessionProps>;
}

const DifficultySetSelect: React.FC<DifficultySetSelectProps> = ({
  options,
  setSelectedSet,
  reset,
  register,
}) => (
  <div className="mb-3">
    <label htmlFor="difficultySet" className="form-label">
      Set de difficulté
    </label>
    <select
      {...register("difficultySet", { required: true })}
      className="form-select"
      id="difficultySet"
      onChange={(e) => {
        const selectedSet = options.find(
          (set) => set.id === parseInt(e.target.value)
        );
        reset({ difficulties: [] });
        if (selectedSet) {
          setSelectedSet(selectedSet);
        }
      }}
    >
      {options.map((set) => (
        <option key={set.id} value={set.id}>
          {set.id}
        </option>
      ))}
    </select>
  </div>
);

export default DifficultySetSelect;
