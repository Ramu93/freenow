import React, { FC, useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { MdLocalTaxi } from "react-icons/md";
import { IoMdCar } from "react-icons/io";
import { useLocation } from "react-router-dom";

import paths from "../../../../constants/paths";
import "./styles.css";

type NavBarProps = {};

enum RouteEnum {
  FREE_NOW,
  SHARE_NOW,
}

const NavBar: FC<NavBarProps> = ({}) => {
  const location = useLocation();

  const [selectedRoute, setSelectedRoute] = useState<RouteEnum>();

  // handlers when route changed directly from the address bar
  useEffect(() => {
    if (location.pathname === paths.FREENOW) {
      setSelectedRoute(RouteEnum.FREE_NOW);
    } else if (location.pathname === paths.SHARENOW) {
      setSelectedRoute(RouteEnum.SHARE_NOW);
    }
  }, [location]);

  return (
    <div className="nav-container">
      <Link
        data-testid="link-to-share-now"
        to={paths.SHARENOW}
        className={
          selectedRoute === RouteEnum.SHARE_NOW
            ? "nav-element active-nav-element"
            : "nav-element"
        }
      >
        <span
          className={
            selectedRoute === RouteEnum.SHARE_NOW
              ? "nav-text active-nav-text"
              : "nav-text"
          }
        >
          <IoMdCar size={22} className="nav-icon" />
          Share Now
        </span>
      </Link>
      <Link
        data-testid="link-to-free-now"
        to={paths.FREENOW}
        className={
          selectedRoute === RouteEnum.FREE_NOW
            ? "nav-element active-nav-element"
            : "nav-element"
        }
      >
        <span
          className={
            selectedRoute === RouteEnum.FREE_NOW
              ? "nav-text active-nav-text"
              : "nav-text"
          }
        >
          <MdLocalTaxi size={22} className="nav-icon" />
          Free Now
        </span>
      </Link>
    </div>
  );
};

export default memo(NavBar);
