import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import ResetButton from "../";

describe("Reset button component", () => {
  it("Check for button label", () => {
    const { getByTestId } = render(<ResetButton onClick={() => {}} />);

    expect(getByTestId("reset-button-component")).toHaveTextContent(
      "Reset Map"
    );
  });

  it("Check for button style", () => {
    const { getByTestId } = render(<ResetButton onClick={() => {}} />);

    expect(getByTestId("reset-button-component")).toHaveClass("reset-button");
  });

  it("Check for button handler", () => {
    const mockResetBtnHandler = jest.fn();
    const { getByTestId } = render(
      <ResetButton onClick={mockResetBtnHandler} />
    );

    fireEvent.click(getByTestId("reset-button-component"));
    expect(mockResetBtnHandler).toHaveBeenCalledTimes(1);
  });
});
