import {
  GET_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "./actionNameConstants";
import Product from "../../models/product";

export const getProducts = () => {
  return async (dispatch) => {
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
            "u1",
            responseData[key].title,
            responseData[key].immageUrl,
            responseData[key].description,
            responseData[key].price
          )
        );
      }

      dispatch({ type: GET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      throw error;
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    // any sync code you want
    const response = await fetch(
      "https://rn-the-shop-app-9bfb9-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }
    );

    const responseData = await response.json();
    product.id = responseData.name;

    console.log("product", product);

    dispatch({ type: CREATE_PRODUCT, product });
  };
};

export const updateProduct = (product) => {
  return { type: UPDATE_PRODUCT, product };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId };
};
