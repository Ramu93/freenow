import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import ShareNow from "../components";
import App from "../../App";
import shareNowVehicles from "../../../fixtures/shareNowVehicles.fixtures";

const mockStore = configureStore([]);

const renderWithRouter = (ui: any, { route }: { route: string }) => {
  window.history.pushState({}, "Free Now", route);

  return render(ui, { wrapper: MemoryRouter });
};

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

  it("Navigate to Share Now", () => {
    const { getByTestId } = renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: "/sharenow" }
    );
    const navLink = getByTestId("linkToFreeNow");
    fireEvent.click(navLink);
    expect(location.pathname).toEqual("/freenow");
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
