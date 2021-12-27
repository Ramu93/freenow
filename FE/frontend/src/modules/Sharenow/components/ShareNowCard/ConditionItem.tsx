import React, { FC, useEffect, useMemo } from "react";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { RiGasStationLine } from "react-icons/ri";

import { ConditionEnum } from "../../interfaces/sharenow.interface";
import colors from "../../../../constants/colors";

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
    color = colors.GREEN;
    if (value <= 25) {
      color = colors.RED;
    } else if (value > 25 && value < 75) {
      color = colors.ORANGE;
    }
    icon = (
      <div data-testid="icon-fuel" className={`test-color-${color.slice(0)}`}>
        <RiGasStationLine size={16} className="custom-icon" color={color} />
      </div>
    );
  } else if (iconType === Icon.THUMBS) {
    // icon type THUMBS
    if (value === ConditionEnum.GOOD) {
      icon = (
        <div data-testid="icon-thumbs-up">
          <BsHandThumbsUp
            size={16}
            className="custom-icon"
            color={colors.GREEN}
          />
        </div>
      );
    } else if (value === ConditionEnum.UNACCEPTABLE) {
      icon = (
        <div data-testid="icon-thumbs-down">
          <BsHandThumbsDown
            size={16}
            className="custom-icon"
            color={colors.RED}
          />
        </div>
      );
    }
  }

  return (
    <div className="condition-item-container" data-testid="condition-item">
      <span className="condition-item-label">{label}</span>
      <div className="condition-item-value" data-testid="condition-item-value">
        {icon}
        <span>{iconType === Icon.FUEL ? `${value}%` : value}</span>
      </div>
    </div>
  );
};

export default ConditionItem;
