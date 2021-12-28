export interface VehicleMarker {
    label: string;
    id: number;
    coords: Coords;
}

export interface Coords {
    lat: number;
    lng: number;
}