import React, { FC } from "react";
import {
  FreenowVehicle,
  FreenowVehicleState,
} from "../../interfaces/freenowVehicles.interface";

import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineCheckCircle, MdOutlineHighlightOff } from "react-icons/md";

import "./styles.css";
import colors from "../../../../constants/colors";

type FreeNowCardProps = {
  vehicle: FreenowVehicle;
};

const FreeNowCard: FC<FreeNowCardProps> = ({ vehicle }) => {
  const { id, state } = vehicle;
  let icon;
  if (state === FreenowVehicleState.ACTIVE) {
    icon = (
      <MdOutlineCheckCircle
        size={16}
        color={colors.GREEN}
        className="custom-icon"
      />
    );
  } else {
    icon = (
      <MdOutlineHighlightOff
        size={16}
        color={colors.RED}
        className="custom-icon"
      />
    );
  }
  return (
    <div data-testid="free-now-vehicle-item" className="free-now-card">
      <div className="card-row-container">
        <div className="state-item-container">
          <span className="state-item-label">ID</span>
          <div className="state-item-value">{id}</div>
        </div>
        <div className="state-item-container">
          <span className="state-item-label">STATE</span>
          <div className="state-item-value">
            {icon}
            <span>{state}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeNowCard;
