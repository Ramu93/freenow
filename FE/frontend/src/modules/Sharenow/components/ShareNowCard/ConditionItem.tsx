import React, { FC, useEffect, useMemo } from "react";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { RiGasStationLine } from "react-icons/ri";

import { ConditionEnum } from "../../interfaces/sharenow.interface";

type ConditionItemProps = {
  label: string;
  value: ConditionEnum | number;
  iconType: Icon;
  position: Position;
};

export enum Icon {
  THUMBS,
  FUEL,
}

export enum Position {
  START,
  CENTER,
  END,
}

const ConditionItem: FC<ConditionItemProps> = ({
  label,
  value,
  iconType,
  position,
}) => {
  let icon;
  let color;

  if (iconType === Icon.FUEL) {
    color = "#03ad3f";
    if (value <= 25) {
      color = "#ad0303";
    } else if (value > 25 && value < 75) {
      color = "#c97a02";
    }
    icon = <RiGasStationLine size={16} className="custom-icon" color={color} />;
  } else if (iconType === Icon.THUMBS) {
    // icon type THUMBS
    if (value === ConditionEnum.GOOD) {
      icon = (
        <BsHandThumbsUp size={16} className="custom-icon" color="#03ad3f" />
      );
    } else if (value === ConditionEnum.UNACCEPTABLE) {
      icon = (
        <BsHandThumbsDown size={16} className="custom-icon" color="#ad0303" />
      );
    }
  }

  return (
    <div className="condition-item-container">
      <span className="condition-item-label">{label}</span>
      <div className="condition-item-value">
        {icon}
        <span className="condition-value-text">
          {iconType === Icon.FUEL ? `${value}%` : value}
        </span>
      </div>
    </div>
  );
};

export default ConditionItem;
