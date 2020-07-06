import { initStore } from "./store";

const persistLogin = (authData) => {
  localStorage.setItem("authData", JSON.stringify(authData));
};

const removePersistLogin = () => {
  localStorage.removeItem("authData");
};

const loadAuth = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  return authData ?? { isAuth: false, userID: "", idToken: "", fromCheckout: false };
};

const configureStore = () => {
  const actions = {
    AUTH_SUCCESS: (state, value) => {
      const authData = {
        isAuth: true,
        userID: value.userID,
        idToken: value.idToken,
      };
      persistLogin(authData);
      return authData;
    },
    LOGOUT: (state, value) => {
      const authData = {
        isAuth: false,
        userID: "",
        idToken: "",
      };
      removePersistLogin();
      return authData;
    },
    FROM_CHECKOUT: (state, value) => {
        return { ...state, fromCheckout: true };
    }
  };
  initStore(actions, loadAuth());
};

export default configureStore;
