import React, { useCallback, useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarkerAnchorPoint,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { MapComponentProps } from "../models/PropsInterface";
import MapHandler from "./MapHandler";
import AdvancedMarkerWithRef from "./AdvancedMarkerWithRef";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const MapComponent: React.FC<MapComponentProps> = ({ gyms }) => {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);

  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const onMouseEnter = useCallback((id: string | null) => setHoverId(id), []);
  const onMouseLeave = useCallback(() => setHoverId(null), []);

  // Fonction pour gérer l'affichage de l'infobulle et empêcher d'afficher plusieurs infobulles en même temps
  const onMarkerClick = useCallback(
    (id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
      setSelectedGymId(id);

      if (marker) {
        setSelectedMarker(marker);
      }

      if (id !== selectedGymId) {
        setInfoWindowShown(true);
      } else {
        setInfoWindowShown((isShown) => !isShown);
      }
    },
    [selectedGymId]
  );

  // Fonction pour fermer l'infobulle lorsqu'on clique sur la carte
  const removeSelection = useCallback(() => {
    setSelectedGymId(null);
    setSelectedMarker(null);
    setInfoWindowShown(false);
  }, []);

  // Fermer l'infobulle lorsque la liste des salles change
  useEffect(() => {
    removeSelection();
  }, [gyms, removeSelection]);

  // Permet de parser la location pour récupérer la latitude et la longitude
  const parseLocation = (location: string | undefined) => {
    const match = location?.match(/POINT \(([^ ]+) ([^)]+)\)/);
    if (match) {
      const longitude = parseFloat(match[1]);
      const latitude = parseFloat(match[2]);
      return { lat: latitude, lng: longitude };
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <APIProvider apiKey={API_KEY} libraries={["marker"]}>
        <Map
          mapId={"bf51a910020fa25a"}
          defaultZoom={5}
          defaultCenter={{ lat: 46.6034, lng: 1.8883 }}
          gestureHandling={"greedy"}
          onClick={removeSelection}
          clickableIcons={false}
          disableDefaultUI
        >
          {gyms.map((gym, index) => {
            const id = String(gym.id);
            return (
              <AdvancedMarkerWithRef
                onMarkerClick={(
                  marker: google.maps.marker.AdvancedMarkerElement
                ) => onMarkerClick(id, marker)}
                onMouseEnter={() => onMouseEnter(id)}
                onMouseLeave={onMouseLeave}
                key={index}
                className="custom-marker"
                style={{
                  transform: `scale(${
                    [hoverId, selectedGymId].includes(id) ? 1.3 : 1
                  })`,
                  transformOrigin:
                    AdvancedMarkerAnchorPoint["BOTTOM"].join(" "),
                }}
                position={parseLocation(gym.location)}
              >
                <Pin
                  background={selectedGymId === id ? "#22ccff" : null}
                  borderColor={selectedGymId === id ? "#1e89a1" : null}
                  glyphColor={selectedGymId === id ? "#0f677a" : null}
                />
              </AdvancedMarkerWithRef>
            );
          })}
          {infoWindowShown && selectedMarker && (
            <InfoWindow
              anchor={selectedMarker}
              pixelOffset={[0, -2]}
              onCloseClick={removeSelection}
              style={{ color: "black" }}
              headerContent={
                <h5 style={{ color: "black", margin: 0 }}>
                  {
                    gyms.find((gym) => String(gym.id) === selectedGymId)
                      ?.gymName
                  }
                </h5>
              }
            >
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  gyms.find((gym) => String(gym.id) === selectedGymId)
                    ?.gymName || ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn custom-btn custom-btn-primary"
                style={{
                  fontSize: "0.75rem",
                  marginTop: "10px",
                  display: "inline-block",
                }}
              >
                OUVRIR DANS GOOGLE MAPS
              </a>
            </InfoWindow>
          )}
        </Map>
        <MapHandler gyms={gyms} />
      </APIProvider>
    </div>
  );
};

export default MapComponent;
