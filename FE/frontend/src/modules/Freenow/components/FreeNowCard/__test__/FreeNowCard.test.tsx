import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import FreeNowCard from "../";
import colors from "../../../../../constants/colors";
import { FreenowVehicle } from "../../../interfaces/freenowVehicles.interface";
import freeNowVehiclesFixtures from "../../../../../fixtures/freeNowVehicles.fixtures";

const mockStore = configureStore([]);

describe("ShareNowCard component", () => {
  afterEach(cleanup);

  const store = mockStore({
    shareNow: {
      isLoading: false,
      vehicles: [],
    },
  });

  it("Check for ID value", () => {
    const vehicle: FreenowVehicle = freeNowVehiclesFixtures[0];
    const { getAllByTestId } = render(
      <Provider store={store}>
        <FreeNowCard vehicle={vehicle} />
      </Provider>
    );

    const component = getAllByTestId("state-item-value")[0];
    expect(component).toHaveTextContent(vehicle.id.toString());
  });

  it("Check for vehicle state value", () => {
    const vehicle: FreenowVehicle = freeNowVehiclesFixtures[0];
    const { getAllByTestId } = render(
      <Provider store={store}>
        <FreeNowCard vehicle={vehicle} />
      </Provider>
    );

    const component = getAllByTestId("state-item-value")[1];
    expect(component).toHaveTextContent(vehicle.state);
  });

  it("Check for active state icon", () => {
    const vehicle: FreenowVehicle = freeNowVehiclesFixtures[0];
    const { getByTestId } = render(
      <Provider store={store}>
        <FreeNowCard vehicle={vehicle} />
      </Provider>
    );

    const component = getByTestId("icon-active");
    expect(component).toBeTruthy();
    expect(component).toHaveClass(`test-color-${colors.GREEN.slice(0)}`);
  });

  it("Check for inactive state icon", () => {
    const vehicle: FreenowVehicle = freeNowVehiclesFixtures[1];
    const { getByTestId } = render(
      <Provider store={store}>
        <FreeNowCard vehicle={vehicle} />
      </Provider>
    );

    const component = getByTestId("icon-inactive");
    expect(component).toBeTruthy();
    expect(component).toHaveClass(`test-color-${colors.RED.slice(0)}`);
  });
});
