import React, { useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { GymLocationSelectProps, GymOption } from "../../models/PropsInterface";
import { getClimbingGyms } from "../../services/apiServices";
import { ClimbingGymLocation } from "../../models/ClimbingGymLocation";
import { Controller } from "react-hook-form";

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
  control,
  initGymId,
}) => {
  const [options, setOptions] = useState<GymOption[]>();
  const [gymValue, setGymValue] = useState<GymOption | null>(null);

  useEffect(() => {
    console.log(
      "Chargement des salles d'escalade et des sets de difficulté..."
    );
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
    // set initial value if it exists in options
    if (initGymId && options) {
      setGymValue(
        options?.find((option) => option.value === initGymId.toString()) || null
      );
    }
  }, [initGymId, options]);

  if (!options) {
    return <div className="col-md-6">Loading...</div>;
  }

  return (
    <div className="col-md-6">
      <p className="form-label">Lieu</p>
      {
        <Controller
          name="location"
          control={control}
          render={({ field: { onChange, onBlur, ref } }) => {
            return (
              <Select
                value={gymValue}
                options={options}
                onChange={(selectedOption) => {
                  onChange(Number(selectedOption?.value));
                  setGymValue(selectedOption as GymOption | null);
                }}
                isClearable
                ref={ref}
                onBlur={onBlur}
                styles={selectStyles}
                placeholder="Lieu de la grimpe"
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            );
          }}
          rules={{ required: true }}
        />
      }
    </div>
  );
};

export default GymLocationSelect;
