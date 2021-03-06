import { AUTHENTICATE_USER, LOGOUT_USER } from "../actions/actionNameConstants";

const initialState = {
  token: null,
  userId: null,
  expiresIn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        token: action.userData.idToken,
        userId: action.userData.localId,
        expiresIn: action.userData.expiresIn,
      };

    case LOGOUT_USER:
      return initialState;

    // case SIGNUP_USER:
    //   return {
    //     token: action.userData.idToken,
    //     userId: action.userData.localId,
    //     expiresIn: action.userData.expiresIn,
    //   };

    // case LOGIN_USER:
    //   return {
    //     token: action.userData.idToken,
    //     userId: action.userData.localId,
    //     expiresIn: action.userData.expiresIn,
    //   };
    default:
      return state;
  }
};
