import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import FreeNow from "../components";
import App from "../../App";
import freeNowVehicles from "../../../fixtures/freeNowVehicles.fixtures";

const mockStore = configureStore([]);

const renderWithRouter = (ui: any, { route }: { route: string }) => {
  window.history.pushState({}, "Free Now", route);

  return render(ui, { wrapper: MemoryRouter });
};

describe("Free Now ", () => {
  const store = mockStore({
    freeNow: {
      isLoading: false,
      vehicles: freeNowVehicles,
    },
    shareNow: {
      isLoading: false,
      vehicles: [],
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
    expect(getByTestId("linkToShareNow")).toHaveTextContent("Share Now");
  });

  it("Navigate to Share Now", () => {
    const { getByTestId } = renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: "/freenow" }
    );
    const navLink = getByTestId("linkToShareNow");
    fireEvent.click(navLink);
    expect(location.pathname).toEqual('/sharenow')
  });

  it("List items", () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FreeNow />
        </BrowserRouter>
      </Provider>
    );
    const content = getAllByTestId("freeNowVehicleItem");
    expect(content.length).toBe(6);
  });
});
