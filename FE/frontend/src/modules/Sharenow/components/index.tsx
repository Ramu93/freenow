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

  const updateFilteredVehicles = useMemo(
    () => () => setFilteredVehicles(vehicles),
    [vehicles]
  );

  useEffect(() => {
    // initial load and no filters
    updateFilteredVehicles();
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
    <>
      {isLoading && (
        <p className="loader">Loading...</p>
      )}
      {!isLoading &&
        filteredVehicles.map((vehicle: SharenowVehicle) => (
          <ShareNowCard vehicle={vehicle} />
        ))}
    </>
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
