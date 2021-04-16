import Order from "../../models/order";
import { ADD_ORDER, GET_ORDERS } from "./actionNameConstants";

export const getOrders = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://rn-the-shop-app-9bfb9-default-rtdb.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      console.log("responseData", responseData);

      const loadedOrders = [];
      for (var key in responseData) {
        loadedOrders.push(
          new Order(
            key,
            responseData[key].cartItems,
            responseData[key].totalAmount,
            new Date(responseData[key].orderDate)
          )
        );
      }

      dispatch({ type: GET_ORDERS, orders: loadedOrders });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const orderDate = new Date();
    const response = await fetch(
      "https://rn-the-shop-app-9bfb9-default-rtdb.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          orderDate: orderDate.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        orderId: responseData.name,
        items: cartItems,
        amount: totalAmount,
        orderDate,
      },
    });
  };
};
