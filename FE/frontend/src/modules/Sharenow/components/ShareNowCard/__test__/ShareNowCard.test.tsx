import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import ShareNowCard from "../";
import { SharenowVehicle } from "../../../interfaces/sharenow.interface";
import shareNowVehiclesFixtures from "../../../../../fixtures/shareNowVehicles.fixtures";
import colors from "../../../../../constants/colors";

describe("ShareNowCard component", () => {
  afterEach(cleanup);

  it("Check for data values", () => {
    const vehicle: SharenowVehicle = shareNowVehiclesFixtures[0];
    const { getByTestId } = render(<ShareNowCard vehicle={vehicle} />);

    const component = getByTestId("share-now-vehicle-item");
    expect(component).toHaveTextContent(vehicle.address);
    expect(component).toHaveTextContent(vehicle.vin);
    expect(component).toHaveTextContent(vehicle.engineType);
    expect(component).toHaveTextContent(vehicle.interior);
    expect(component).toHaveTextContent(vehicle.exterior);
    expect(component).toHaveTextContent(`${vehicle.fuel.toString()}%`);
  });

  it("Check interior data item - UNACCEPTABLE", () => {
    const vehicle: SharenowVehicle = shareNowVehiclesFixtures[0];
    const { getAllByTestId } = render(<ShareNowCard vehicle={vehicle} />);
    const component = getAllByTestId("icon-thumbs-down")[0];
    expect(component).toBeTruthy();
  });

  it("Check interior data item - GOOD", () => {
    const vehicle: SharenowVehicle = shareNowVehiclesFixtures[1];
    const { getAllByTestId } = render(<ShareNowCard vehicle={vehicle} />);
    const component = getAllByTestId("icon-thumbs-up")[0];
    expect(component).toBeTruthy();
  });

  it("Check exterior data item - UNACCEPTABLE", () => {
    const vehicle: SharenowVehicle = shareNowVehiclesFixtures[0];
    const { getAllByTestId } = render(<ShareNowCard vehicle={vehicle} />);
    const component = getAllByTestId("icon-thumbs-down")[1];
    expect(component).toBeTruthy();
  });

  it("Check exterior data item - GOOD", () => {
    const vehicle: SharenowVehicle = shareNowVehiclesFixtures[3];
    const { getAllByTestId } = render(<ShareNowCard vehicle={vehicle} />);
    const component = getAllByTestId("icon-thumbs-up")[1];
    expect(component).toBeTruthy();
  });

  it("Fuel data item - range 26% to 74%", () => {
    const vehicle: SharenowVehicle = shareNowVehiclesFixtures[0];
    const { getByTestId } = render(<ShareNowCard vehicle={vehicle} />);
    const component = getByTestId("icon-fuel");
    expect(component).toBeTruthy();
    expect(component).toHaveClass(`test-color-${colors.ORANGE.slice(0)}`);
  });

  it("Fuel data item - range greater than and equal to 75%", () => {
    const vehicle: SharenowVehicle = shareNowVehiclesFixtures[3];
    const { getByTestId } = render(<ShareNowCard vehicle={vehicle} />);
    const component = getByTestId("icon-fuel");
    expect(component).toBeTruthy();
    expect(component).toHaveClass(`test-color-${colors.GREEN.slice(0)}`);
  });

  it("Fuel data item - range less than and equal to 25%", () => {
    const vehicle: SharenowVehicle = shareNowVehiclesFixtures[6];
    const { getByTestId } = render(<ShareNowCard vehicle={vehicle} />);
    const component = getByTestId("icon-fuel");
    expect(component).toBeTruthy();
    expect(component).toHaveClass(`test-color-${colors.RED.slice(0)}`);
  });
});
