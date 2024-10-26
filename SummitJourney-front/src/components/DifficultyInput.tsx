import React from "react";
import { DifficultyInputProps } from "../models/PropsInterface";

const DifficultyInput: React.FC<DifficultyInputProps> = ({ color }) => {
  return (
    <div className="d-flex align-items-center">
      <label
        className={`difficulty-circle difficulty-${color} mx-1`}
        htmlFor={`difficulty-${color}`}
      ></label>
      <input
        id={`difficulty-${color}`}
        type="number"
        min="0"
        className="form-control mx-2"
        style={{ width: "60px" }}
      />
    </div>
  );
};

export default DifficultyInput;
