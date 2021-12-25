import { combineReducers } from "redux";

import freeNow from "../Freenow/reducers/";
import shareNow from "../Sharenow/reducers/";

export default combineReducers({
  freeNow,
  shareNow,
});
