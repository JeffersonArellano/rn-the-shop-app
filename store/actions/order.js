import { ADD_ORDER } from './actionNameConstants';

export const addOrder = (cartItems, totalAmount) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount },
  };
};
