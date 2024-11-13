import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FormSessionProps } from "../../models/PropsInterface";

interface ClimbTypeSelectProps {
  register: UseFormRegister<FormSessionProps>;
}

const ClimbTypeSelect: React.FC<ClimbTypeSelectProps> = ({ register }) => (
  <div className="mb-3">
    <label htmlFor="climbingType" className="form-label">
      Type de grimpe
    </label>
    <select
      {...register("climbType", { required: true })}
      className="form-select"
      id="climbingType"
    >
      <option value="IN">Intérieur</option>
      <option value="OUT">Extérieur</option>
    </select>
  </div>
);

export default ClimbTypeSelect;
