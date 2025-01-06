import React, { useState, useEffect, forwardRef } from "react";
import Select, { StylesConfig } from "react-select";
import { getCities } from "../services/apiServices";
import { City } from "../models/City";
import { CityAutocompleteProps } from "../models/PropsInterface";

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
  menu: (provided) => ({
    ...provided,
    maxHeight: "200px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    maxHeight: "200px",
  }),
};

const CityAutocomplete: React.FC<CityAutocompleteProps> = forwardRef<
  HTMLDivElement,
  CityAutocompleteProps
>(
  (
    { setCityId, setCityLabel, onParentChange, extended = false, ...props },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [options, setOptions] = useState<any[]>([]); // Utilisation d'un tableau d'options pour React Select
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<any | null>(null); // État pour la ville sélectionnée

    const fetchCities = async (query: string) => {
      setLoading(true);
      try {
        const response = await getCities(query);
        const cities = response.map((city: City) => ({
          value: city.id,
          label: extended
            ? `${city.label} - ${city.zipCode} - ${city.departmentName}`
            : city.label,
        }));
        setOptions(cities);
      } catch (error) {
        console.error("Error fetching cities", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (inputValue.length > 2) {
        fetchCities(inputValue);
      } else {
        setOptions([]);
      }
    }, [inputValue]);

    return (
      <div ref={ref}>
        {/*Besoin d'une div pour que la liste ne s'étende pas selon la width du container parent*/}
        <Select
          value={selectedCity} // Assigner l'état de la ville sélectionnée à `value`
          onInputChange={(newInputValue) => setInputValue(newInputValue)}
          options={options}
          isLoading={loading}
          // getOptionLabel={(option: any) => option.label} // Spécifie l'affichage du label dans l'option
          onChange={(selectedOption) => {
            setSelectedCity(selectedOption); // Mettre à jour la ville sélectionnée
            setCityId && setCityId(selectedOption.value); // Mettre à jour l'ID de la ville sélectionnée
            setCityLabel && setCityLabel(selectedOption.label); // Mettre à jour le label de la ville sélectionnée
            console.log("Selected city:", selectedOption);
          }}
          className="mb-2"
          isClearable
          styles={selectStyles}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          placeholder="Indiquez une ville ici ..."
          noOptionsMessage={() => (loading ? "Loading..." : "No cities found")}
          {...props}
        />
      </div>
    );
  }
);

export default CityAutocomplete;
