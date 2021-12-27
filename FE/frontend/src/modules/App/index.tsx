import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import paths from "../../constants/paths";
import FreeNow from "../Freenow/components";
import ShareNow from "../Sharenow/components";
import Map from "../../components/Map";
import NavBar from "./components/NavBar";
import { getVehicleMarkersState, getVehicleIconUri } from "./selectors";
import { VehicleMarker } from "../../common/interfaces/coords.interface";

type AppProps = {
  vehicleMarkers: VehicleMarker[];
  vehicleIconUri: string;
};

const App: React.FC<AppProps> = ({ vehicleMarkers, vehicleIconUri }) => {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="vehicle-container">
          <NavBar />
          <Switch>
            <Route exact path={paths.SHARENOW}>
              <ShareNow />
            </Route>
            <Route exact path={paths.FREENOW}>
              <FreeNow />
            </Route>
            <Redirect to={paths.SHARENOW} />
          </Switch>
        </div>
        <div className="map-container">
          <Map vehicleMarkers={vehicleMarkers} iconUri={vehicleIconUri} />
        </div>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state: object) => ({
  vehicleMarkers: getVehicleMarkersState(state),
  vehicleIconUri: getVehicleIconUri(state),
});

export default connect(mapStateToProps)(App);
