import React, { FC, useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";

import {
  FreenowVehicle,
  FreenowVehicleState,
} from "../interfaces/freenowVehicles.interface";
import { getFreeNowLoadingState, getFreeNowVehiclesState } from "../selectors";
import { getFreeNowVehicles, getFreeNowVehiclesSuccess } from "../actions";
import { setVehicleMarkers } from "../../App/actions";
import { VehicleMarker } from "../../../common/interfaces/coords.interface";
import { useComponentDidMount } from "../../../utils/customHooks";
import endpoints from "../../../constants/endpoints";
import { get } from "../../../utils/apiUtil";
import Select from "../../../components/Select";
import assets from "../../../constants/assets";
import Loader from "../../../components/Loader";
import FreeNowCard from "./FreeNowCard";
import ResetButton from "../../../components/ResetButton";

export type FreeNowProps = {
  vehicles: FreenowVehicle[];
  isLoading: boolean;
  getFreeNowVehicles: Function;
  getFreeNowVehiclesSuccess: Function;
  setVehicleMarkers: Function;
};

const FreeNow: FC<FreeNowProps> = ({
  vehicles,
  isLoading,
  getFreeNowVehicles,
  getFreeNowVehiclesSuccess,
  setVehicleMarkers,
}) => {
  const [filteredVehicles, setFilteredVehicles] = useState<FreenowVehicle[]>(
    []
  );

  const [selectedVehicleState, setSelectedVehicleState] = useState<
    FreenowVehicleState | string
  >("all");

  const vehicleStateOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: FreenowVehicleState.ACTIVE },
    { label: "Inactive", value: FreenowVehicleState.INACTIVE },
  ];

  useComponentDidMount(async () => {
    // fetch data on mount
    // set loading state
    getFreeNowVehicles();
    const data = await get(
      `${process.env.REACT_APP_BACKEND_URL}${endpoints.FREENOW_VEHICLES}`
    );
    // set data and loading state
    getFreeNowVehiclesSuccess(data.poiList);
  });

  const updateFilteredVehicles = useMemo(
    () => () => {
      if (selectedVehicleState !== "all") {
        // filter based on selection
        const filteredData = vehicles.filter(
          (vehicle: FreenowVehicle) => vehicle.state === selectedVehicleState
        );
        setFilteredVehicles(filteredData);
      } else {
        // used for initial loading and no filters
        setFilteredVehicles(vehicles);
      }
    },
    [selectedVehicleState, vehicles]
  );

  useEffect(() => {
    updateFilteredVehicles();
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
    setVehicleMarkers(markers, assets.ICON_TAXI);
  }, [filteredVehicles]);

  const vehicleStateChangeHandler = (value: any) => {
    setSelectedVehicleState(value);
  };

  return (
    <div data-testid="free-now-component">
      <div className="action-btn-container">
        <ResetButton onClick={() => updateFilteredVehicles()} />
        <Select
          options={vehicleStateOptions}
          onChange={vehicleStateChangeHandler}
        />
      </div>
      {isLoading && <Loader />}
      {!isLoading &&
        filteredVehicles.map((vehicle: FreenowVehicle) => (
          <FreeNowCard vehicle={vehicle} />
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
  setVehicleMarkers,
};

export default connect(mapStateToProps, mapDispatchToProps)(FreeNow);
