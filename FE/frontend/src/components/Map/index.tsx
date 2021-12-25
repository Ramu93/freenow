import React, { FC } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

import {
  Coords,
  VehicleMarker,
} from "../../common/interfaces/coords.interface";

const mapStyles = {
  width: "100%",
  height: "50%",
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
  icon: string;
};

const MapContainer: FC<MapContainerProps> = ({
  google,
  vehicleMarkers,
  showLabels,
  icon,
}) => (
  <Map google={google} zoom={14} style={mapStyles} initialCenter={MapCenter}>
    {vehicleMarkers.map((marker: VehicleMarker) => (
      <Marker
        label={showLabels ? marker.label : undefined}
        position={marker.coords}
        icon={{
          url: icon,
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

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
})(MapContainer);
