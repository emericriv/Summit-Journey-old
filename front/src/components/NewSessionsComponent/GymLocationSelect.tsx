import React from "react";
import Select, { StylesConfig } from "react-select";
import { GymLocationSelectProps } from "../../models/PropsInterface";

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
}) => {
  return (
    <div className="col-md-6">
      <p className="form-label">Lieu</p>
      <Select
        options={options}
        onChange={(selectedOption) => {
          setValue("location", selectedOption?.value || "");
        }}
        styles={selectStyles}
        placeholder="Lieu de la grimpe"
        // Remove the default dropdown indicator and separator
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default GymLocationSelect;
