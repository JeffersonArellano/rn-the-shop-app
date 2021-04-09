import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ADD_ORDER } from '../actions/actionNameConstants';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        uuidv4(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );

      return { ...state, orders: state.orders.concat(newOrder) };

    default:
      return state;
  }
};
