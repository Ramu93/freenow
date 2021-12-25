import { handleActions } from "redux-actions";

import { getShareNowVehicles, getShareNowVehiclesSuccess } from "../actions";
import { SharenowVehicle } from "../interfaces/sharenow.interface";

interface ShareNowState {
  vehicles: SharenowVehicle[];
  isLoading: Boolean;
}

const initialState: ShareNowState = {
  vehicles: [],
  isLoading: false,
};

export default handleActions(
  {
    [`${getShareNowVehicles}`]: (state: ShareNowState) => ({
      ...state,
      isLoading: true,
    }),
    [`${getShareNowVehiclesSuccess}`]: (
      state: ShareNowState,
      { payload }: any
    ) => ({
      ...state,
      vehicles: payload.vehicles,
      isLoading: payload.isLoading,
    }),
  },
  initialState
);
