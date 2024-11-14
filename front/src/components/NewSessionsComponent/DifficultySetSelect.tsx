import React from "react";
import { DifficultySetSelectProps } from "../../models/PropsInterface";

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
      defaultValue={"options[0].id"}
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
