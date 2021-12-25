import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import paths from "../../constants/paths";
import FreeNow from "../Freenow/components";
import ShareNow from "../Sharenow/components";

type AppProps = {};

const App: React.FC<AppProps> = ({}) => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={paths.FREENOW}>
            <FreeNow />
          </Route>
          <Route path={paths.SHARENOW}>
            <ShareNow />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
