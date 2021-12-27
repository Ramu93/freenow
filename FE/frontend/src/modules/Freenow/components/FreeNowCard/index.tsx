import React, { FC } from "react";
import { MdOutlineCheckCircle, MdOutlineHighlightOff } from "react-icons/md";
import { connect } from "react-redux";

import "./styles.css";
import colors from "../../../../constants/colors";
import {
  FreenowVehicle,
  FreenowVehicleState,
} from "../../interfaces/freenowVehicles.interface";
import { setVehicleMarkers } from "../../../App/actions";
import assets from "../../../../constants/assets";

type FreeNowCardProps = {
  vehicle: FreenowVehicle;
  setVehicleMarkers: Function;
};

const FreeNowCard: FC<FreeNowCardProps> = ({ vehicle, setVehicleMarkers }) => {
  const { id, state, coordinate } = vehicle;
  let icon;
  if (state === FreenowVehicleState.ACTIVE) {
    icon = (
      <div
        data-testid="icon-active"
        className={`test-color-${colors.GREEN.slice(0)}`}
      >
        <MdOutlineCheckCircle
          size={16}
          color={colors.GREEN}
          className="custom-icon"
        />
      </div>
    );
  } else {
    icon = (
      <div
        data-testid="icon-inactive"
        className={`test-color-${colors.RED.slice(0)}`}
      >
        <MdOutlineHighlightOff
          size={16}
          color={colors.RED}
          className="custom-icon"
        />
      </div>
    );
  }

  const handleClick = () =>
    setVehicleMarkers(
      [
        {
          coords: { lat: coordinate.latitude, lng: coordinate.longitude },
          label: id,
          id,
        },
      ],
      assets.ICON_TAXI
    );

  return (
    <div
      data-testid="free-now-vehicle-item"
      className="free-now-card"
      onClick={handleClick}
    >
      <div className="card-row-container">
        <div className="state-item-container">
          <span className="state-item-label">ID</span>
          <div className="state-item-value" data-testid="state-item-value">
            {id}
          </div>
        </div>
        <div className="state-item-container">
          <span className="state-item-label">STATE</span>
          <div className="state-item-value" data-testid="state-item-value">
            {icon}
            <span>{state}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setVehicleMarkers,
};

export default connect(null, mapDispatchToProps)(FreeNowCard);
