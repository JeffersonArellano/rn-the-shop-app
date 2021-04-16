import { ADD_ORDER, GET_ORDERS } from "../actions/actionNameConstants";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { orders: action.orders };

    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.orderId,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.orderDate
      );

      return { ...state, orders: state.orders.concat(newOrder) };

    default:
      return state;
  }
};
