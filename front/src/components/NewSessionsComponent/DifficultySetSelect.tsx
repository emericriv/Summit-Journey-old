import React, { useEffect, useState } from "react";
import { DifficultySetSelectProps } from "../../models/PropsInterface";
import { getDifficultySets } from "../../services/apiServices";
import { DifficultySet } from "../../models/ClimbingSession";

const DifficultySetSelect: React.FC<DifficultySetSelectProps> = ({
  setSelectedSet,
  reset,
  register,
}) => {
  const [difficultySets, setDifficultySets] = useState<DifficultySet[]>();

  useEffect(() => {
    const getAllDifficultySets = async () => {
      const difficultySets = await getDifficultySets();
      setDifficultySets(difficultySets);
      setSelectedSet(difficultySets[0]);
    };
    getAllDifficultySets();
  }, [setSelectedSet]);

  if (!difficultySets) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mb-3">
      <label htmlFor="difficultySet" className="form-label">
        Set de difficulté
      </label>
      <select
        {...register("difficultySet", { required: true })}
        className="form-select"
        id="difficultySet"
        onChange={(e) => {
          const selectedSet = difficultySets.find(
            (set) => set.id === parseInt(e.target.value)
          );
          reset({ difficulties: [] });
          if (selectedSet) {
            setSelectedSet(selectedSet);
          }
        }}
        defaultValue={"options[0].id"}
      >
        {difficultySets.map((set) => (
          <option key={set.id} value={set.id}>
            {set.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DifficultySetSelect;
