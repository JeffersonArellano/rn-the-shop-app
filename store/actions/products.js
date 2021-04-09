import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from './actionNameConstants';

export const createProduct = (product) => {
  return { type: CREATE_PRODUCT, product };
};

export const updateProduct = (product) => {
  return { type: UPDATE_PRODUCT, product };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId };
};
