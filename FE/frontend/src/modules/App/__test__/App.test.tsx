import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "..";

const renderWithRouter = (ui: any, { route }: { route: string }) => {
  window.history.pushState({}, "Free Now", route);

  return render(ui, { wrapper: MemoryRouter });
};

const mockStore = configureStore([]);

describe("renders learn react link", () => {
  const store = mockStore({
    freeNow: {
      isLoading: false,
      vehicles: [],
    },
    shareNow: {
      isLoading: false,
      vehicles: [],
    },
  });

  afterEach(cleanup);

  it("Navigate to Free Now", () => {
    const { getByTestId } = renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: "/sharenow" }
    );
    const navLink = getByTestId("link-to-free-now");
    fireEvent.click(navLink);
    expect(location.pathname).toEqual("/freenow");
  });

  it("Navigate to Share Now", () => {
    const { getByTestId } = renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: "/freenow" }
    );
    const navLink = getByTestId("link-to-share-now");
    fireEvent.click(navLink);
    expect(location.pathname).toEqual("/sharenow");
  });
});
