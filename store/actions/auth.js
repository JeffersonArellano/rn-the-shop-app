import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTHENTICATE_USER, LOGOUT_USER } from "./actionNameConstants";

let timer;

export const authenticateUser = (userData) => {
  return (dispatch) => {
    const expirationDateMiliseconds = parseInt(userData.expiresIn) * 1000;
    dispatch(setLogoutTimer(expirationDateMiliseconds));
    dispatch({ type: AUTHENTICATE_USER, userData: userData });
  };
};

export const logoutUser = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT_USER };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationDate) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logoutUser());
    }, expirationDate);
  };
};

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

    dispatch(authenticateUser(responseData));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
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

    dispatch(authenticateUser(responseData));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expireDate: expirationDate.toISOString(),
    })
  );
};
