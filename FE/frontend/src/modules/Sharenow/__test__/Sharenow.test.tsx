import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import ShareNow from "../components";
import shareNowVehicles from "../../../fixtures/shareNowVehicles.fixtures";

const mockStore = configureStore([]);

describe("Free Now ", () => {
  const store = mockStore({
    freeNow: {
      isLoading: false,
      vehicles: [],
    },
    shareNow: {
      isLoading: false,
      vehicles: shareNowVehicles,
    },
  });

  afterEach(cleanup);

  it("Link to Free Now", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ShareNow />
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId("linkToFreeNow")).toHaveTextContent("Free Now");
  });

  it("List items", () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ShareNow />
        </BrowserRouter>
      </Provider>
    );
    const content = getAllByTestId("shareNowVehicleItem");
    expect(content.length).toBe(7);
  });
});
