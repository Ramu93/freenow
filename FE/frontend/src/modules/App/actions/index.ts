import { createAction } from "redux-actions";
import { VehicleMarker } from "../../../interfaces/coords.interface";

export const setVehicleMarkers = createAction(
  "@@state/SET_VEHICLES_MARKERS",
  (vehicleMarkers: VehicleMarker[], vehicleIconUri: string) => ({
    vehicleMarkers,
    vehicleIconUri,
  })
);
