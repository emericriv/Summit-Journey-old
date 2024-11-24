import { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { MarkerWithInfoWindowProps } from "../models/PropsInterface";

const MarkerWithInfoWindow: React.FC<MarkerWithInfoWindowProps> = ({ gym }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
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

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{ lat: lat, lng: long }}
        title={gym.gymName}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
          style={{ color: "black" }}
        >
          {gym.gymName}
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
