import {
  GET_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "./actionNameConstants";
import Product from "../../models/product";

export const getProducts = () => {
  return async (dispatch, getState) => {
    const idToken = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://rn-the-shop-app-9bfb9-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      products = responseData;

      const loadedProducts = [];
      for (var key in responseData) {
        loadedProducts.push(
          new Product(
            key,
            responseData[key].ownerId,
            responseData[key].title,
            responseData[key].imageUrl,
            responseData[key].description,
            responseData[key].price
          )
        );
      }

      dispatch({
        type: GET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch, getState) => {
    const idToken = getState().auth.token;
    const userId = getState().auth.userId;
    const updatedProduct = { ...product, ownerId: userId };

    const response = await fetch(
      `https://rn-the-shop-app-9bfb9-default-rtdb.firebaseio.com/products.json?auth=${idToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      }
    );

    const responseData = await response.json();
    updatedProduct.id = responseData.name;

    dispatch({ type: CREATE_PRODUCT, updatetdProduct: updatedProduct });
  };
};

export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    const idToken = getState().auth.token;
    const response = await fetch(
      `https://rn-the-shop-app-9bfb9-default-rtdb.firebaseio.com/products/${product.id}.json?auth=${idToken}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          imageUrl: product.imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: UPDATE_PRODUCT, product });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const idToken = getState().auth.token;
    const response = await fetch(
      `https://rn-the-shop-app-9bfb9-default-rtdb.firebaseio.com/products/${productId}.json?auth=${idToken}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: DELETE_PRODUCT, productId });
  };
};
