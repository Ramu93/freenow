import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { SharenowVehicle } from "../interfaces/sharenow.interface";
import {
  getShareNowLoadingState,
  getShareNowVehiclesState,
} from "../selectors";
import { VehicleMarker } from "../../../common/interfaces/coords.interface";
import Map from "../../../components/Map";
import assets from "../../../constants/assets";
import { useComponentDidMount } from "../../../utils/customHooks";
import { getShareNowVehicles, getShareNowVehiclesSuccess } from "../actions";
import endpoints from "../../../constants/endpoints";
import { get } from "../../../utils/apiUtil";
import paths from "../../../constants/paths";

type ShareNowProps = {
  vehicles: SharenowVehicle[];
  isLoading: boolean;
  getShareNowVehicles: Function;
  getShareNowVehiclesSuccess: Function;
};

const ShareNow: FC<ShareNowProps> = ({
  vehicles,
  isLoading,
  getShareNowVehicles,
  getShareNowVehiclesSuccess,
}) => {
  const [filteredVehicles, setFilteredVehicles] = useState<SharenowVehicle[]>(
    []
  );
  const [vehicleMarkers, setVehicleMarkers] = useState<VehicleMarker[]>([]);

  useComponentDidMount(async () => {
    getShareNowVehicles();
    const data = await get(
      `${process.env.REACT_APP_BACKEND_URL}${endpoints.SHARENOW_VEHICLES}`
    );
    getShareNowVehiclesSuccess(data.placemarks);
  });

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
      <Link data-testid="linkToFreeNow" to={paths.FREENOW}>
        Free Now
      </Link>
      {!isLoading && (
        <Map vehicleMarkers={vehicleMarkers} icon={assets.ICON_CAR} />
      )}
      {!isLoading &&
        filteredVehicles.map((vehicle: SharenowVehicle) => (
          <>
            <div data-testid="shareNowVehicleItem">
              ID: {vehicle.id} <br />
              Name: {vehicle.name} <br />
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

const mapDispatchToProps = {
  getShareNowVehicles,
  getShareNowVehiclesSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareNow);
