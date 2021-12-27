import React, { FC } from "react";

type ResetButtonProps = {
  onClick: Function;
};

const ResetButton: FC<ResetButtonProps> = ({ onClick }) => (
  <span
    data-testid="reset-button-component"
    onClick={() => onClick()}
    className="reset-button"
  >
    Reset Map
  </span>
);

export default ResetButton;
