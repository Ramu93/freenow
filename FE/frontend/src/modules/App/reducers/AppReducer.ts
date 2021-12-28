import { handleActions } from "redux-actions";
import { VehicleMarker } from "../../../interfaces/coords.interface";
import { setVehicleMarkers } from "../actions";

interface AppState {
  vehicleMarkers: VehicleMarker[];
  vehicleIconUri: string;
}

const initialState: AppState = {
  vehicleMarkers: [],
  vehicleIconUri: "",
};

export default handleActions(
  {
    [`${setVehicleMarkers}`]: (state: AppState, { payload }: any) => ({
      ...state,
      vehicleMarkers: payload.vehicleMarkers,
      vehicleIconUri: payload.vehicleIconUri,
    }),
  },
  initialState
);
