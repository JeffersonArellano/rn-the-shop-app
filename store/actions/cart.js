import { ADD_TO_CART, REMOVE_FROM_CART } from './actionNameConstants';

export const addToCart = (product) => {
  return { type: ADD_TO_CART, product: product };
};
