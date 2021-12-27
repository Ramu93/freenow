export interface SharenowVehicle {
  address: string;
  coordinates: [number, number, number];
  engineType: string;
  exterior: ConditionEnum;
  fuel: number;
  interior: ConditionEnum;
  name: string;
  vin: string;
  id: number;
}

export enum ConditionEnum {
  GOOD = "GOOD",
  UNACCEPTABLE = "UNACCEPTABLE",
}
