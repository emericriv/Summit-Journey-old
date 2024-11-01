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

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{ lat: Number(gym.lat), lng: Number(gym.long) }}
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
