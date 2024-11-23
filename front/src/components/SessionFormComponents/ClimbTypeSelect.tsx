import React from "react";
import { ClimbTypeSelectProps } from "../../models/PropsInterface";

const ClimbTypeSelect: React.FC<ClimbTypeSelectProps> = ({ register }) => (
  <div className="mb-3">
    <label htmlFor="climbingType" className="form-label">
      Type de grimpe
    </label>
    <select
      {...register("climbType", { required: true })}
      className="form-select"
      id="climbingType"
      defaultValue={"IN"}
    >
      <option value="IN">Intérieur</option>
      <option value="OUT">Extérieur</option>
    </select>
  </div>
);

export default ClimbTypeSelect;
