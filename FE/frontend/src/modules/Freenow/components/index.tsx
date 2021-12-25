import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  FreenowVehicle,
  FreenowVehicleState,
} from "../interfaces/freenowVehicles.interface";
import { getFreeNowLoadingState, getFreeNowVehiclesState } from "../selectors";
import { VehicleMarker } from "../../../common/interfaces/coords.interface";
import Map from "../../../components/Map";
import assets from "../../../constants/assets";

export type FreeNowProps = {
  vehicles: FreenowVehicle[];
  isLoading: boolean;
};

const FreeNow: FC<FreeNowProps> = ({ vehicles, isLoading }) => {
  const [filteredVehicles, setFilteredVehicles] = useState<FreenowVehicle[]>(
    []
  );
  // TODO: filer vehicles using selection
  const [selectedVehicleState, setSelectedVehicleState] =
    useState<FreenowVehicleState>();

  const [vehicleMarkers, setVehicleMarkers] = useState<VehicleMarker[]>([]);

  useEffect(() => {
    if (selectedVehicleState) {
      // filter based on selection
      const filteredData = vehicles.filter(
        (vehicle: FreenowVehicle) => vehicle.state === selectedVehicleState
      );
      setFilteredVehicles(filteredData);
    } else {
      // used for initial loading and no filters
      setFilteredVehicles(vehicles);
    }
  }, [selectedVehicleState, vehicles]);

  // update vehicle markers on filtering vehicles
  useEffect(() => {
    const markers: VehicleMarker[] = filteredVehicles.map(
      (vehicle: FreenowVehicle) => ({
        label: vehicle.id.toString(),
        id: vehicle.id,
        coords: {
          lat: vehicle.coordinate.latitude,
          lng: vehicle.coordinate.longitude,
        },
      })
    );
    setVehicleMarkers(markers);
  }, [filteredVehicles]);

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {!isLoading && <Map vehicleMarkers={vehicleMarkers} icon={assets.ICON_TAXI} />}
      {!isLoading &&
        filteredVehicles.map((vehicle: FreenowVehicle) => (
          <>
            <div>
              ID: {vehicle.id} <br />
              State: {vehicle.state} <br />
              Type: {vehicle.type} <br />
            </div>
            <hr />
          </>
        ))}
    </div>
  );
};

const mapStateToProps = (state: object) => ({
  vehicles: getFreeNowVehiclesState(state),
  isLoading: getFreeNowLoadingState(state),
});

export default connect(mapStateToProps)(FreeNow);
