import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";
import { ClimbingGymLocation } from "../models/ClimbingGymLocation";

interface MapHandlerProps {
  gyms: ClimbingGymLocation[];
}

const MapHandler: React.FC<MapHandlerProps> = ({ gyms }) => {
  const map = useMap();

  const parseLocation = (location: string | undefined) => {
    const match = location?.match(/POINT \(([^ ]+) ([^)]+)\)/);
    if (match) {
      const longitude = parseFloat(match[1]);
      const latitude = parseFloat(match[2]);
      return { lat: latitude, lng: longitude };
    }
    return null;
  };

  useEffect(() => {
    if (gyms.length > 0 && map) {
      const bounds = new window.google.maps.LatLngBounds();

      gyms.forEach((gym) => {
        const location = parseLocation(gym.location);
        const lat = location ? location.lat : 0;
        const long = location ? location.lng : 0;
        bounds.extend(new window.google.maps.LatLng(Number(lat), Number(long)));
      });

      // Ajuster la vue de la carte pour s'adapter aux marqueurs
      map.fitBounds(bounds);

      // Dézoomer légèrement
      const zoom = map.getZoom(); // Obtenir le zoom actuel
      if (zoom && zoom > 2) {
        map.setZoom(zoom - 1); // Dézoomer d'un niveau
      }
    }
  }, [gyms, map]);

  return null;
};

export default React.memo(MapHandler);
