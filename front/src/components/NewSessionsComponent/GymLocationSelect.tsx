import React, { useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { GymLocationSelectProps, GymOption } from "../../models/PropsInterface";
import { getClimbingGyms } from "../../services/apiServices";
import { ClimbingGymLocation } from "../../models/ClimbingGymLocation";

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

const GymLocationSelect: React.FC<GymLocationSelectProps> = ({ setValue }) => {
  const [options, setOptions] = useState<GymOption[]>();

  useEffect(() => {
    console.log(
      "Chargement des salles d'escalade et des sets de difficulté..."
    );
    const getGyms = async () => {
      const allGyms = await getClimbingGyms();
      const options: GymOption[] = allGyms.map((gym: ClimbingGymLocation) => ({
        label: gym.gymName,
        value: gym.id.toString(),
      }));
      setOptions(options);
    };
    getGyms();
  }, []);

  if (!options) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-md-6">
      <p className="form-label">Lieu</p>
      <Select
        options={options}
        onChange={(selectedOption) => {
          setValue("location", selectedOption?.value || "");
        }}
        isClearable
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
