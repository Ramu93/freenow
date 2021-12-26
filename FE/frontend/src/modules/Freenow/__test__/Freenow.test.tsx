import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import FreeNow from "../components";
import freeNowVehicles from "../../../fixtures/freeNowVehicles.fixtures";

const mockStore = configureStore([]);

describe("Free Now ", () => {
  const store = mockStore({
    freeNow: {
      isLoading: false,
      vehicles: freeNowVehicles,
    },
  });

  afterEach(cleanup);

  it("Link to Share Now", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FreeNow />
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId("link-to-share-now")).toHaveTextContent("Share Now");
  });

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
});
