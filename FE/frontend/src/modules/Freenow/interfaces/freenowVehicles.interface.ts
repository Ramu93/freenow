export interface FreenowVehicle {
  id: number;
  coordinate: FreenowCoordinate;
  state: FreenowVehicleState;
  type: string;
}

export interface FreenowCoordinate {
  latitude: number;
  longitude: number;
}

export enum FreenowVehicleState {
  ACTIVE="ACTIVE",
  INACTIVE="INACTIVE",
}
