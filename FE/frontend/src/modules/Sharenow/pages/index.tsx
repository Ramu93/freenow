import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";

import { SharenowVehicle } from "../interfaces/sharenow.interface";
import {
  getShareNowLoadingState,
  getShareNowVehiclesState,
} from "../selectors";
import { VehicleMarker } from "../../../common/interfaces/coords.interface";
import Map from "../../../components/Map";
import assets from "../../../constants/assets";

type ShareNowProps = {
  vehicles: SharenowVehicle[];
  isLoading: boolean;
};

const ShareNow: FC<ShareNowProps> = ({ vehicles, isLoading }) => {
  const [filteredVehicles, setFilteredVehicles] = useState<SharenowVehicle[]>(
    []
  );
  const [vehicleMarkers, setVehicleMarkers] = useState<VehicleMarker[]>([]);

  useEffect(() => {
    // initial load and no filters
    setFilteredVehicles(vehicles);
  }, [vehicles]);

  // update vehicle markers on filtering vehicles
  useEffect(() => {
    const markers: VehicleMarker[] = filteredVehicles.map(
      (vehicle: SharenowVehicle) => ({
        label: vehicle.id.toString(),
        id: vehicle.id,
        coords: {
          lat: vehicle.coordinates[1],
          lng: vehicle.coordinates[0],
        },
      })
    );
    setVehicleMarkers(markers);
  }, [filteredVehicles]);

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (
        <Map vehicleMarkers={vehicleMarkers} icon={assets.ICON_CAR} />
      )}
      {!isLoading &&
        filteredVehicles.map((vehicle: SharenowVehicle) => (
          <>
            <div>
              ID: {vehicle.id} <br />
              Fuel: {vehicle.name} <br />
              Address: {vehicle.address} <br />
              Engine Type: {vehicle.engineType} <br />
              Interior: {vehicle.interior} <br />
              Exterior: {vehicle.exterior} <br />
              Fuel: {vehicle.fuel} <br />
              vin: {vehicle.vin} <br />
            </div>
            <hr />
          </>
        ))}
    </div>
  );
};

const mapStateToProps = (state: object) => ({
  vehicles: getShareNowVehiclesState(state),
  isLoading: getShareNowLoadingState(state),
});

export default connect(mapStateToProps)(ShareNow);
