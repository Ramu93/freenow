import { createAction } from "redux-actions";
import { FreenowVehicle } from "../interfaces/freenowVehicles.interface";

export const getFreeNowVehicles = createAction(
  "@@state/GET_FREE_NOW_VEHICLES",
  () => ({ isLoading: true })
);

export const getFreeNowVehiclesSuccess = createAction(
  "@@state/GET_FREE_NOW_VEHICLES_SUCCESS",
  (vehicles: FreenowVehicle[]) => ({
    isLoading: false,
    vehicles,
  })
);
