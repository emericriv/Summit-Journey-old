// src/components/SearchClimbingGyms.tsx

import { useEffect, useState } from "react";

import { getGymsByCityId } from "../services/apiServices";
import MapComponent from "./MapComponent";
import { ClimbingGymLocation } from "../models/ClimbingGymLocation";
import CityAutocomplete from "./CityAutoComplete";

const SearchClimbingGyms: React.FC = () => {
  const [gyms, setGyms] = useState<ClimbingGymLocation[]>([]);
  const [cityId, setCityId] = useState<number>(0);

  const fetchDataAndSetGyms = async () => {
    const gyms = await getGymsByCityId({ cityId });
    setGyms(gyms);
  };

  useEffect(() => {
    fetchDataAndSetGyms();
  }, [cityId]);

  return (
    <div className="row justify-content-around">
      <div className="city-selection col-md-4">
        <h3>Où veux tu grimper ?</h3>
        {/* <input
          type="text"
          className="form-control mb-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entrez une ville"
        /> */}
        <CityAutocomplete setCityId={setCityId} />
        <button id="searchGyms" className="btn" onClick={fetchDataAndSetGyms}>
          Indique moi les salles dans cette ville
        </button>
      </div>
      <div className="map col-md-5 card p-3">
        <div className="ratio ratio-1x1">
          <MapComponent gyms={gyms} />
        </div>
      </div>
    </div>
  );
};

export default SearchClimbingGyms;
