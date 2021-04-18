import auth from "./auth";
import cart from "./cart";
import order from "./order";
import products from "./products";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  products,
  cart,
  order,
  auth,
});

export default rootReducer;
