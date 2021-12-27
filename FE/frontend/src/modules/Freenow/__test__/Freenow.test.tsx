import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import FreeNow from "../components";
import freeNowVehicles from "../../../fixtures/freeNowVehicles.fixtures";
import { FreenowVehicleState } from "../interfaces/freenowVehicles.interface";

const mockStore = configureStore([]);

describe("Free Now ", () => {
  let store = mockStore({
    freeNow: {
      isLoading: false,
      vehicles: freeNowVehicles,
    },
  });

  afterEach(cleanup);

  it("List items", () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FreeNow />
        </BrowserRouter>
      </Provider>
    );
    const content = getAllByTestId("free-now-vehicle-item");
    expect(content.length).toBe(6);
  });

  it("Loader based on redux state", () => {
    store = mockStore({
      freeNow: {
        isLoading: true,
        vehicles: [],
      },
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FreeNow />
        </BrowserRouter>
      </Provider>
    );
    const loader = getByTestId("loader-component");
    expect(loader).toBeTruthy();
    expect(getByTestId("free-now-component")).toHaveTextContent("Loading...");
  });

  it("Check for vehicle state filter options", () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FreeNow />
        </BrowserRouter>
      </Provider>
    );
    const selectOptions = getAllByTestId(
      "select-option"
    ) as HTMLOptionElement[];

    expect(selectOptions[0].value).toBe("all");
    expect(selectOptions[1].value).toBe(FreenowVehicleState.ACTIVE);
    expect(selectOptions[2].value).toBe(FreenowVehicleState.INACTIVE);
  });

  it("Filter by state - all", () => {
    store = mockStore({
      freeNow: {
        isLoading: false,
        vehicles: freeNowVehicles,
      },
    });

    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FreeNow />
        </BrowserRouter>
      </Provider>
    );
    const selectComponent = getByTestId("select-component");
    const selectOptions = getAllByTestId(
      "select-option"
    ) as HTMLOptionElement[];

    fireEvent.change(selectComponent, {
      target: { value: selectOptions[0].value },
    });

    const content = getAllByTestId("free-now-vehicle-item");
    expect(content.length).toBe(6);
  });

  it("Filter by state - ACTIVE", () => {
    store = mockStore({
      freeNow: {
        isLoading: false,
        vehicles: freeNowVehicles,
      },
    });

    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FreeNow />
        </BrowserRouter>
      </Provider>
    );
    const selectComponent = getByTestId("select-component");
    const selectOptions = getAllByTestId(
      "select-option"
    ) as HTMLOptionElement[];

    fireEvent.change(selectComponent, {
      target: { value: selectOptions[1].value },
    });

    const content = getAllByTestId("free-now-vehicle-item");
    expect(content.length).toBe(5);
  });

  it("Filter by state - INACTIVE", () => {
    store = mockStore({
      freeNow: {
        isLoading: false,
        vehicles: freeNowVehicles,
      },
    });

    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FreeNow />
        </BrowserRouter>
      </Provider>
    );
    const selectComponent = getByTestId("select-component");
    const selectOptions = getAllByTestId(
      "select-option"
    ) as HTMLOptionElement[];

    fireEvent.change(selectComponent, {
      target: { value: selectOptions[2].value },
    });

    const content = getAllByTestId("free-now-vehicle-item");
    expect(content.length).toBe(1);
  });
});
