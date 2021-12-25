import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import paths from "../../constants/paths";
import FreeNow from "../Freenow/components";
import ShareNow from "../Sharenow/components";
import { useComponentDidMount } from "../../utils/customHooks";
import {
  getFreeNowVehicles,
  getFreeNowVehiclesSuccess,
} from "../Freenow/actions";
import {
  getShareNowVehicles,
  getShareNowVehiclesSuccess,
} from "../Sharenow/actions";
import { connect } from "react-redux";
import endpoints from "../../constants/endpoints";
import { get } from "../../utils/apiUtil";

type AppProps = {
  getFreeNowVehicles: Function;
  getFreeNowVehiclesSuccess: Function;
  getShareNowVehicles: Function;
  getShareNowVehiclesSuccess: Function;
};

const App: React.FC<AppProps> = ({
  getFreeNowVehicles,
  getFreeNowVehiclesSuccess,
  getShareNowVehicles,
  getShareNowVehiclesSuccess,
}) => {
  const fetchFreeNowVehicles = async () => {
    getFreeNowVehicles();
    const data = await get(
      `${process.env.REACT_APP_BACKEND_URL}${endpoints.FREENOW_VEHICLES}`
    );
    getFreeNowVehiclesSuccess(data.poiList);
  };

  const fetchShareNowVehicles = async () => {
    getShareNowVehicles();
    const data = await get(
      `${process.env.REACT_APP_BACKEND_URL}${endpoints.SHARENOW_VEHICLES}`
    );
    getShareNowVehiclesSuccess(data.placemarks);
  };

  useComponentDidMount(() => {
    fetchFreeNowVehicles();
    fetchShareNowVehicles();
  });

  return (
    <div className="App">
      <Switch>
        <Route path={paths.FREENOW}>
          <FreeNow />
        </Route>
        <Route path={paths.SHARENOW}>
          <ShareNow />
        </Route>
      </Switch>
    </div>
  );
};

const mapDispatchToProps = {
  getFreeNowVehicles,
  getFreeNowVehiclesSuccess,
  getShareNowVehicles,
  getShareNowVehiclesSuccess,
};

export default connect(null, mapDispatchToProps)(App);
