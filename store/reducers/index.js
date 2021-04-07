import cart from './cart';
import order from './order';
import products from './products';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  products,
  cart,
  order,
});

export default rootReducer;
