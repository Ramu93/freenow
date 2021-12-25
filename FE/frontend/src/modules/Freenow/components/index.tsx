import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  FreenowVehicle,
  FreenowVehicleState,
} from "../interfaces/freenowVehicles.interface";
import { getFreeNowLoadingState, getFreeNowVehiclesState } from "../selectors";
import { getFreeNowVehicles, getFreeNowVehiclesSuccess } from "../actions";
import { VehicleMarker } from "../../../common/interfaces/coords.interface";
import Map from "../../../components/Map";
import assets from "../../../constants/assets";
import { useComponentDidMount } from "../../../utils/customHooks";
import endpoints from "../../../constants/endpoints";
import { get } from "../../../utils/apiUtil";
import paths from "../../../constants/paths";

export type FreeNowProps = {
  vehicles: FreenowVehicle[];
  isLoading: boolean;
  getFreeNowVehicles: Function;
  getFreeNowVehiclesSuccess: Function;
};

const FreeNow: FC<FreeNowProps> = ({
  vehicles,
  isLoading,
  getFreeNowVehicles,
  getFreeNowVehiclesSuccess,
}) => {
  const [filteredVehicles, setFilteredVehicles] = useState<FreenowVehicle[]>(
    []
  );
  // TODO: filer vehicles using selection
  const [selectedVehicleState, setSelectedVehicleState] =
    useState<FreenowVehicleState>();

  const [vehicleMarkers, setVehicleMarkers] = useState<VehicleMarker[]>([]);

  useComponentDidMount(async () => {
    getFreeNowVehicles();
    const data = await get(
      `${process.env.REACT_APP_BACKEND_URL}${endpoints.FREENOW_VEHICLES}`
    );
    getFreeNowVehiclesSuccess(data.poiList);
  });

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
    <div data-testid="freeNowComponent">
      <Link data-testid="linkToShareNow" to={paths.SHARENOW}>
        Share Now
      </Link>
      {!isLoading && (
        <Map vehicleMarkers={vehicleMarkers} icon={assets.ICON_TAXI} />
      )}

      {!isLoading &&
        filteredVehicles.map((vehicle: FreenowVehicle) => (
          <>
            <div data-testid="freeNowVehicleItem">
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

const mapDispatchToProps = {
  getFreeNowVehicles,
  getFreeNowVehiclesSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(FreeNow);
