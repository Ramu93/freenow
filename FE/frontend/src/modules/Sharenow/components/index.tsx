import React, { FC, useState, useEffect, useMemo } from "react";
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
import ShareNowCard from "./ShareNowCard";
import Loader from "../../../components/Loader";
import ResetButton from "../../../components/ResetButton";
import Divider from "../../../components/Divider";

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
  // for simplicity and to avoid over engineering of the code,i did not use Redux thunk or Saga to perform API calls
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

  // update vehicle markers on filtering vehicles
  const updateVehicleMarkers = () => {
    const markers: VehicleMarker[] = vehicles.map(
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
  };

  useEffect(() => {
    updateVehicleMarkers();
  }, [vehicles]);

  return (
    <div data-testid="share-now-component">
      {isLoading && <Loader />}
      <div className="action-btn-container">
        <ResetButton onClick={() => updateVehicleMarkers()} />
      </div>
      {!isLoading &&
        vehicles.map((vehicle: SharenowVehicle) => (
          <>
            <ShareNowCard vehicle={vehicle} />
            <Divider />
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
