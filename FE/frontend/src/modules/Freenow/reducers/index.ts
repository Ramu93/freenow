import { handleActions } from "redux-actions";

import { FreenowVehicle } from "../interfaces/freenowVehicles.interface";
import { getFreeNowVehicles, getFreeNowVehiclesSuccess } from "../actions";

interface FreeNowState {
  vehicles: FreenowVehicle[];
  isLoading: Boolean;
}

const initialState: FreeNowState = {
  vehicles: [],
  isLoading: false,
};

export default handleActions(
  {
    [`${getFreeNowVehicles}`]: (state: FreeNowState) => ({
      ...state,
      isLoading: true,
    }),
    [`${getFreeNowVehiclesSuccess}`]: (
      state: FreeNowState,
      { payload }: any
    ) => ({
      ...state,
      vehicles: payload.vehicles,
      isLoading: payload.isLoading,
    }),
  },
  initialState
);
