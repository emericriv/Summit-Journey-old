// src/components/SearchClimbingGyms.tsx

import { useEffect, useState } from "react";

import { getGymsByCityId } from "../services/apiServices";
import MapComponent from "./MapComponent";
import { ClimbingGymLocation } from "../models/ClimbingGymLocation";
import CityAutocomplete from "./CityAutoComplete";
import ModalComponent from "./ModalComponent";

const SearchClimbingGyms: React.FC = () => {
  const [gyms, setGyms] = useState<ClimbingGymLocation[]>([]);
  const [cityId, setCityId] = useState<number>(0);

  const [searched, setSearched] = useState<boolean | null>(null);

  const fetchDataAndSetGyms = async () => {
    const gyms = await getGymsByCityId({ cityId });
    setGyms(gyms);
    setSearched(true);
  };

  useEffect(() => {
    if (cityId === 0) return;
    fetchDataAndSetGyms();
  }, [cityId]);

  const handleResponse = () => {
    setSearched(null);
  };

  return (
    <div className="row card global-appearance py-3">
      <CityAutocomplete setCityId={setCityId} />
      <div className="map">
        <MapComponent gyms={gyms} />
        {searched && gyms.length === 0 && (
          <ModalComponent
            setDependantVariable={setSearched}
            title="Aucune salle trouvée"
            actionDescription="Demander à ajouter une salle"
            buttonClassName="custom-btn-primary"
            handleResponse={handleResponse}
          >
            <p>
              La ville sélectionnée ne contient pas de salle d'escalade. Vous
              pouvez demander à ajouter une salle d'escalade dans cette ville.
            </p>
          </ModalComponent>
        )}
      </div>
    </div>
  );
};

export default SearchClimbingGyms;
