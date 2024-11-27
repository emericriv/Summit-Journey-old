import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { MarkerWithInfoWindowProps } from "../models/PropsInterface";

const MarkerWithInfoWindow: React.FC<MarkerWithInfoWindowProps> = ({
  gym,
  openInfoWindowId,
  setOpenInfoWindowId,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const parseLocation = (location: string | undefined) => {
    const match = location?.match(/POINT \(([^ ]+) ([^)]+)\)/);
    if (match) {
      const longitude = parseFloat(match[1]);
      const latitude = parseFloat(match[2]);
      return { lat: latitude, lng: longitude };
    }
    return null;
  };

  const location = parseLocation(gym.location);
  const lat = location ? location.lat : 0;
  const long = location ? location.lng : 0;

  const isOpen = openInfoWindowId === gym.id; // Détermine si l'info-bulle est ouverte pour ce marqueur

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setOpenInfoWindowId(gym.id)} // Ouvrir l'info-bulle pour ce marqueur
        position={{ lat: lat, lng: long }}
        title={gym.gymName}
      />
      {isOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={250}
          onCloseClick={() => setOpenInfoWindowId(null)} // Fermer l'info-bulle
          disableAutoPan={true} // Évite le recentrage automatique sur le marqueur
          style={{ color: "black" }}
        >
          <div
            style={{ padding: "5px", fontSize: "14px", textAlign: "center" }}
          >
            <strong>{gym.gymName}</strong>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
