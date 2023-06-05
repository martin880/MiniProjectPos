import { combineReducers } from "redux";
import userReducer from "./middleware/userauth";

const rootReducer = combineReducers({
  auth: userReducer,
});

export default rootReducer;
