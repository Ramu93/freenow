import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Loader from "../";

describe("Loader component", () => {
  it("Default loader", () => {
    const { getByTestId } = render(<Loader />);

    expect(getByTestId("loader-component")).toHaveClass("loader");
    expect(getByTestId("loader-component")).toHaveTextContent("Loading...");
  });
});
