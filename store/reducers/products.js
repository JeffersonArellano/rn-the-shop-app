import "react-native-get-random-values";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { v4 as uuidv4 } from "uuid";
import data from "../../data/dummy-data";
import Product from "../../models/product";
import {
  GET_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/actionNameConstants";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };

    case CREATE_PRODUCT:
      const product = action.product;

      const newProduct = new Product(
        product.id,
        product.ownerId,
        product.title,
        product.imageUrl,
        product.description,
        product.price
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const receiveProd = action.product;

      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === receiveProd.id
      );

      const updateProduct = new Product(
        receiveProd.id,
        state.userProducts[productIndex].ownerId,
        receiveProd.title,
        receiveProd.imageUrl,
        receiveProd.description,
        state.userProducts[productIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updateProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === receiveProd.id
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updateProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.productId
        ),
      };

    default:
      return state;
  }
};
