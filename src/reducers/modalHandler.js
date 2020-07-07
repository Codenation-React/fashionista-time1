import { TOGGLE_SHOW } from "../constants/actionTypes";

const initialState = { show: false, Navtype: "" };

const toggleShow = (state, value) => {
  console.log(value);
  return { ...state, show: !state.show, Navtype: value };
};

export default function modalHandlerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SHOW:
      return toggleShow(state, action.value);
    default:
      return state;
  }
}
