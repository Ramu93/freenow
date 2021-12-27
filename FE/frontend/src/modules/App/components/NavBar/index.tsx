import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

import paths from "../../../../constants/paths";
import "./styles.css";

type NavBarProps = {};

enum RouteEnum {
  FREE_NOW,
  SHARE_NOW,
}

const NavBar: FC<NavBarProps> = ({}) => {
  const [selectedRoute, setSelectedRoute] = useState<RouteEnum>(
    RouteEnum.SHARE_NOW
  );

  const determineNavElementClass = (route: RouteEnum) => {
    const activeNavClass = "nav-element active-nav-element";
    const navClass = "nav-element";
    if (selectedRoute === route) {
      return activeNavClass;
    }
    return navClass;
  };

  const determineNavTextClass = (route: RouteEnum) => {
    const activeNavTextClass = "nav-text active-nav-text";
    const navTextClass = "nav-text";
    if (selectedRoute === route) {
      return activeNavTextClass;
    }
    return navTextClass;
  };

  return (
    <div className="nav-container">
      <Link
        data-testid="link-to-share-now"
        to={paths.SHARENOW}
        onClick={() => setSelectedRoute(RouteEnum.SHARE_NOW)}
        className={determineNavElementClass(RouteEnum.SHARE_NOW)}
      >
        <span className={determineNavTextClass(RouteEnum.SHARE_NOW)}>
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
          Free Now
        </span>
      </Link>
    </div>
  );
};

export default NavBar;
