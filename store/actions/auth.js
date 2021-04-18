import AsyncStorage from "@react-native-async-storage/async-storage";

import { LOGIN_USER, SIGNUP_USER } from "./actionNameConstants";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0ExpD1wtSuxclRAwvEqbUStbZ3Uk1xxA",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      let message = "Something went wrong";

      if (errorId === "EMAIL_EXISTS") {
        message = "Email already in use";
      }

      throw new Error(message);
    }

    const responseData = await response.json();

    dispatch({ type: SIGNUP_USER, userData: responseData });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0ExpD1wtSuxclRAwvEqbUStbZ3Uk1xxA",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      let message = "Something went wrong";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Email not found";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Invalid password, try again";
      }
      throw new Error(message);
    }

    const responseData = await response.json();

    dispatch({ type: LOGIN_USER, userData: responseData });
    saveDataToStorage(responseData.idToken, responseData.localId);
  };
};

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    "userData",
    json.stringify({ token: token, userId: userId })
  );
};
