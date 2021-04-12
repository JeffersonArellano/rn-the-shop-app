import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from './actionNameConstants';

export const createProduct = (product) => {
  return async (dispatch) => {
    // any sync code you want
    const response = await fetch(
      'https://rn-the-shop-app-9bfb9-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      }
    );

    const responseData = await response.json();
    product.id = responseData.name;

    console.log('product', product);

    dispatch({ type: CREATE_PRODUCT, product });
  };
};

export const updateProduct = (product) => {
  return { type: UPDATE_PRODUCT, product };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId };
};
