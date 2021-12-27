import { combineReducers } from "redux";

import app from "./AppReducer";
import freeNow from "../../Freenow/reducers";
import shareNow from "../../Sharenow/reducers";

export default combineReducers({
  app,
  freeNow,
  shareNow,
});
