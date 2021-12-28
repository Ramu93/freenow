import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import ShareNow from "../components";
import shareNowVehicles from "../../../fixtures/shareNowVehicles.fixtures";

const mockStore = configureStore([]);

describe("Free Now ", () => {
  let store = mockStore({
    shareNow: {
      isLoading: false,
      vehicles: shareNowVehicles,
    },
  });

  afterEach(cleanup);

  it("List items", () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ShareNow />
        </BrowserRouter>
      </Provider>
    );
    const content = getAllByTestId("share-now-vehicle-item");
    expect(content.length).toBe(7);
  });

  it("Loader based on redux state", () => {
    store = mockStore({
      shareNow: {
        isLoading: true,
        vehicles: [],
      },
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ShareNow />
        </BrowserRouter>
      </Provider>
    );
    const loader = getByTestId("loader-component");
    expect(loader).toBeTruthy();
    expect(getByTestId("share-now-component")).toHaveTextContent("Loading...");
  });
});
