import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    TOGGLE_SHOW: (state, value) => ({ show: !state.show, Navtype: value }),
  };
  initStore(actions, { show: false, Navtype: "" });
};

export default configureStore;
