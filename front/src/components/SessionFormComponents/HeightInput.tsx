import React from "react";
import { HeightInputProps } from "../../models/PropsInterface";

const HeightInput: React.FC<HeightInputProps> = ({ register }) => (
  <div className="height-input">
    <label htmlFor="height" className="form-label">
      Hauteur
    </label>
    <input
      {...register("height", { required: true })}
      type="number"
      className="form-control"
      placeholder="Hauteur grimpée en mètres"
      id="height"
    />
  </div>
);

export default HeightInput;
