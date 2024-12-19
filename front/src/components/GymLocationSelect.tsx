import React, { useEffect, useState, forwardRef } from "react";
import Select, { StylesConfig } from "react-select";
import { GymOption } from "../models/PropsInterface";
import { getClimbingGyms } from "../services/apiServices";
import { ClimbingGymLocation } from "../models/ClimbingGymLocation";

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

interface GymLocationSelectProps {
  initGymId?: number;
  onParentChange?: (selectedOption: GymOption | null) => void;
  [key: string]: any;
}

const GymLocationSelect = forwardRef<HTMLDivElement, GymLocationSelectProps>(
  ({ initGymId, onParentChange, ...props }, ref) => {
    const [options, setOptions] = useState<GymOption[]>();
    const [gymValue, setGymValue] = useState<GymOption | null>(null);

    useEffect(() => {
      if (!options) {
        const getGyms = async () => {
          const allGyms = await getClimbingGyms();
          const options: GymOption[] = allGyms.map(
            (gym: ClimbingGymLocation) => ({
              label: gym.gymName || "Unknown Gym",
              value: gym.id.toString(),
            })
          );
          setOptions(options);
        };
        getGyms();
      }
      if (initGymId && options) {
        setGymValue(
          options?.find((option) => option.value === initGymId.toString()) ||
            null
        );
      }
    }, [options]);

    if (!options) {
      return <div className="col-md-6">Loading...</div>;
    }

    return (
      <Select
        ref={ref as React.Ref<any>} // Transmettre la ref au composant Select
        value={gymValue}
        options={options}
        onChange={(selectedOption) => {
          console.log("selectedOption", selectedOption);
          setGymValue(selectedOption as GymOption | null); // Met à jour l'état local
          if (onParentChange) {
            onParentChange(selectedOption as GymOption | null); // Appel de la fonction passée par le parent
          }
        }}
        isClearable
        className="mt-2"
        styles={selectStyles}
        placeholder={props.placeholder || "Sélectionner une salle d'escalade"}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        {...props}
      />
    );
  }
);

export default GymLocationSelect;
