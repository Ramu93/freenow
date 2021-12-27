import React, { FC, useState, useEffect, useMemo } from "react";
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

  const determineNavElementClass = useMemo(
    () => (route: RouteEnum) => {
      const activeNavClass = "nav-element active-nav-element";
      const navClass = "nav-element";
      if (selectedRoute === route) {
        return activeNavClass;
      }
      return navClass;
    },
    [selectedRoute]
  );

  const determineNavTextClass = useMemo(
    () => (route: RouteEnum) => {
      const activeNavTextClass = "nav-text active-nav-text";
      const navTextClass = "nav-text";
      if (selectedRoute === route) {
        return activeNavTextClass;
      }
      return navTextClass;
    },
    [selectedRoute]
  );

  return (
    <div className="nav-container">
      <Link
        data-testid="link-to-share-now"
        to={paths.SHARENOW}
        onClick={() => setSelectedRoute(RouteEnum.SHARE_NOW)}
        className={determineNavElementClass(RouteEnum.SHARE_NOW)}
      >
        <span className={determineNavTextClass(RouteEnum.SHARE_NOW)}>
          <IoMdCar size={22} className="nav-icon" />
          Share Now
        </span>
      </Link>
      <Link
        data-testid="link-to-free-now"
        to={paths.FREENOW}
        onClick={() => setSelectedRoute(RouteEnum.FREE_NOW)}
        className={determineNavElementClass(RouteEnum.FREE_NOW)}
      >
        <span className={determineNavTextClass(RouteEnum.FREE_NOW)}>
          <MdLocalTaxi size={22} className="nav-icon" />
          Free Now
        </span>
      </Link>
    </div>
  );
};

export default NavBar;
