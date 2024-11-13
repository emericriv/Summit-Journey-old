import React from "react";
import { UseFormSetValue } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import { FormSessionProps } from "../../models/PropsInterface";

interface GymLocationSelectProps {
  options: { label: string; value: string }[];
  setValue: UseFormSetValue<FormSessionProps>;
}

const selectStyles: StylesConfig<{ label: string; value: string }, false> = {
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
    textAlign: "left",
    opacity: 0.8,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "black" : "grey",
    backgroundColor: state.isSelected
      ? "lightgrey"
      : state.isFocused
      ? "lightgrey"
      : "white",
  }),
};

const GymLocationSelect: React.FC<GymLocationSelectProps> = ({
  options,
  setValue,
}) => (
  <div className="col-md-6">
    <p className="form-label">Lieu</p>
    <Select
      options={options}
      onChange={(selectedOption) => {
        setValue("location", selectedOption?.value || "");
      }}
      styles={selectStyles}
      placeholder="Lieu de la grimpe"
    />
  </div>
);

export default GymLocationSelect;
