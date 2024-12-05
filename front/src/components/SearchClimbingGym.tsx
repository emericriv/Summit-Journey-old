// src/components/SearchClimbingGyms.tsx

import { useEffect, useState } from "react";

import { getGymsByCityId } from "../services/apiServices";
import MapComponent from "./MapComponent";
import { ClimbingGymLocation } from "../models/ClimbingGymLocation";
import CityAutocomplete from "./CityAutoComplete";

const SearchClimbingGyms: React.FC = () => {
  const [gyms, setGyms] = useState<ClimbingGymLocation[]>([]);
  const [cityId, setCityId] = useState<number>(0);

  const [searched, setSearched] = useState(false);

  const fetchDataAndSetGyms = async () => {
    setSearched(true);
    const gyms = await getGymsByCityId({ cityId });
    setGyms(gyms);
  };

  useEffect(() => {
    if (cityId === 0) return;
    fetchDataAndSetGyms();
  }, [cityId]);

  return (
    <div className="row card global-appearance py-3">
      <CityAutocomplete setCityId={setCityId} />
      <div className="map">
        {gyms.length === 0 && searched ? (
          <p className="text-center">No gyms found in this city</p>
        ) : searched ? (
          (console.log(gyms), (<MapComponent gyms={gyms} />))
        ) : (
          <MapComponent gyms={gyms} />
        )}
      </div>
    </div>
  );
};

export default SearchClimbingGyms;
