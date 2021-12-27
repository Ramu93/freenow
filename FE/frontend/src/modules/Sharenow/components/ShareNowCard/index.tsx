import React, { FC } from "react";
import { IoLocationOutline, IoCarOutline } from "react-icons/io5";

import { SharenowVehicle } from "../../interfaces/sharenow.interface";
import ConditionItem, { Icon, Position } from "./ConditionItem";
import "./styles.css";

type ShareNowCardProps = {
  vehicle: SharenowVehicle;
};

const ShareNowCard: FC<ShareNowCardProps> = ({ vehicle }) => {
  const { name, exterior, interior, engineType, fuel, vin, address } = vehicle;
  return (
    <div className="share-now-card">
      <div className="card-row-container">
        <span className="text-vehicle-name">{name}</span>
      </div>
      <div className="card-row-container">
        <IoLocationOutline size={16} className="custom-icon" />
        <span className="text-address">{address}</span>
      </div>
      <div className="card-row-container">
        <div className="vin-container">
          <IoCarOutline size={16} className="custom-icon" />
          <span className="text-vehicle-info">VIN: {vin}</span>
        </div>
        <div className="engine-container">
          <span className="text-vehicle-info">Engine: {engineType}</span>
        </div>
      </div>
      <div className="card-row-container double-row">
        <ConditionItem
          label="INTERIOR"
          value={interior}
          iconType={Icon.THUMBS}
          position={Position.START}
        />
        <ConditionItem
          label="EXTERIOR"
          value={exterior}
          iconType={Icon.THUMBS}
          position={Position.CENTER}
        />
        <ConditionItem
          label="FUEL"
          value={fuel}
          iconType={Icon.FUEL}
          position={Position.END}
        />
      </div>
    </div>
  );
};

export default ShareNowCard;
