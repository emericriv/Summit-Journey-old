import React, { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { MapComponentProps } from "../models/PropsInterface";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";
import MapHandler from "./MapHandler";

const MapComponent: React.FC<MapComponentProps> = ({ gyms }) => {
  const [openInfoWindowId, setOpenInfoWindowId] = useState<number | null>(null);

  return (
    <div>
      <APIProvider
        apiKey="AIzaSyDTB_f2a413NJzJQio0gWhpLe1wyTGPuIo"
        libraries={["marker"]}
      >
        <Map
          mapId={"bf51a910020fa25a"}
          defaultZoom={5}
          defaultCenter={{ lat: 46.6034, lng: 1.8883 }}
          gestureHandling={"greedy"}
          disableDefaultUI
        >
          {gyms.map((gym, index) => (
            <MarkerWithInfoWindow
              key={index}
              gym={gym}
              openInfoWindowId={openInfoWindowId}
              setOpenInfoWindowId={setOpenInfoWindowId}
            />
          ))}
        </Map>
        <MapHandler gyms={gyms} />
      </APIProvider>
    </div>
  );
};

export default MapComponent;
