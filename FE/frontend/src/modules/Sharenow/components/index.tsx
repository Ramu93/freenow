import React, { FC, useState, useEffect } from "react";
import { connect } from "react-redux";

import { SharenowVehicle } from "../interfaces/sharenow.interface";
import {
  getShareNowLoadingState,
  getShareNowVehiclesState,
} from "../selectors";
import { VehicleMarker } from "../../../common/interfaces/coords.interface";
import { useComponentDidMount } from "../../../utils/customHooks";
import { getShareNowVehicles, getShareNowVehiclesSuccess } from "../actions";
import { setVehicleMarkers } from "../../App/actions";
import endpoints from "../../../constants/endpoints";
import { get } from "../../../utils/apiUtil";
import assets from "../../../constants/assets";

type ShareNowProps = {
  vehicles: SharenowVehicle[];
  isLoading: boolean;
  getShareNowVehicles: Function;
  getShareNowVehiclesSuccess: Function;
  setVehicleMarkers: Function;
};

const ShareNow: FC<ShareNowProps> = ({
  vehicles,
  isLoading,
  getShareNowVehicles,
  getShareNowVehiclesSuccess,
  setVehicleMarkers,
}) => {
  const [filteredVehicles, setFilteredVehicles] = useState<SharenowVehicle[]>(
    []
  );

  useComponentDidMount(async () => {
    // set loader state
    getShareNowVehicles();
    // fetch data
    const data = await get(
      `${process.env.REACT_APP_BACKEND_URL}${endpoints.SHARENOW_VEHICLES}`
    );
    // set data and loader state to redux
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
    setVehicleMarkers(markers, assets.ICON_CAR);
  }, [filteredVehicles]);

  return (
    <div>
      {/* {!isLoading && (
        <Map vehicleMarkers={vehicleMarkers} icon={assets.ICON_CAR} />
      )} */}
      {!isLoading &&
        filteredVehicles.map((vehicle: SharenowVehicle) => (
          <>
            <div data-testid="share-now-vehicle-item">
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
  setVehicleMarkers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareNow);
