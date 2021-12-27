import { createAction } from "redux-actions";
import { VehicleMarker } from "../../../common/interfaces/coords.interface";

export const setVehicleMarkers = createAction(
  "@@state/SET_VEHICLES_MARKERS",
  (vehicleMarkers: VehicleMarker[], vehicleIconUri: string) => ({
    vehicleMarkers,
    vehicleIconUri,
  })
);
