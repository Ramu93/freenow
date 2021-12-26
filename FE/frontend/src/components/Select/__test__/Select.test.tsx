import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Select, { Option } from "../";

describe("Select component", () => {
  const options: Option[] = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Label 1",
      value: "value_1",
    },
    {
      label: "Label 2",
      value: "value_2",
    },
  ];

  it("Default - first option selected", () => {
    const handleChange = jest.fn();
    const { getAllByTestId } = render(
      <Select options={options} onChange={handleChange} />
    );

    let selectOptions = getAllByTestId("select-option");

    expect(selectOptions[0].selected).toBeTruthy();
    expect(selectOptions[1].selected).toBeFalsy();
    expect(selectOptions[2].selected).toBeFalsy();
  });

  it("Option selection", () => {
    const handleChange = jest.fn();
    const { getByTestId, getAllByTestId } = render(
      <Select options={options} onChange={handleChange} />
    );

    const selectComponent = getByTestId("select-component");
    let selectOptions = getAllByTestId("select-option");

    fireEvent.change(selectComponent, { target: { value: options[1].value } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(selectOptions[0].selected).toBeFalsy();
    expect(selectOptions[1].selected).toBeTruthy();
    expect(selectOptions[2].selected).toBeFalsy();
  });
});
