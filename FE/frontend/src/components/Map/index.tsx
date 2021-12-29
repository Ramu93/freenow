import React, { FC } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

import { Coords, VehicleMarker } from "../../interfaces/coords.interface";

const mapStyles = {
  width: "66.5%",
  height: "100%",
};

//coordinates of Hamburg, Germany
const MapCenter: Coords = {
  lat: 53.5511,
  lng: 9.9937,
};

type MapContainerProps = {
  google: typeof google;
  vehicleMarkers: VehicleMarker[];
  showLabels?: boolean;
  iconUri: string;
};

const MapContainer: FC<MapContainerProps> = ({
  google,
  vehicleMarkers,
  showLabels,
  iconUri,
}) => {
  // when only one vehicle marker is available, then user should have selected a vehicle from the list
  // focus the vehicle on the map
  let focusCenter: Coords | undefined;
  if (vehicleMarkers.length === 1) {
    focusCenter = vehicleMarkers[0].coords;
  }

  return (
    <Map
      google={google}
      zoom={15}
      initialCenter={MapCenter}
      containerStyle={mapStyles}
      center={focusCenter}
    >
      {vehicleMarkers.map((marker: VehicleMarker) => (
        <Marker
          label={showLabels ? marker.label : undefined}
          position={marker.coords}
          icon={{
            url: iconUri,
            scaledSize: new google.maps.Size(24, 24),
          }}
        >
          {/* <InfoWindow visible={true}>
          <div>{marker.id}</div>
        </InfoWindow> */}
        </Marker>
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
})(MapContainer);
