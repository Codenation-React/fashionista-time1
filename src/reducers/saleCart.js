import {
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_ITEM,
  ADD_TO_CART,
} from "../constants/actionTypes";
import { updateObject } from "../shared/utility";
const initialState = {
  cartItems: [
    {
      name: "REGATA ALCINHA FOLK",
      style: "20002570",
      code_color: "20002570_614",
      color_slug: "preto",
      color: "PRETO",
      on_sale: false,
      regular_price: "R$ 99,90",
      actual_price: "R$ 99,90",
      discount_percentage: "",
      installments: "3x R$ 33,30",
      image:
        "https://viniciusvinna.netlify.app/assets/api-fashionista/20002570_002_catalog_1.jpg",
      sizes: [
        { available: true, size: "PP", sku: "5723_40130843_0_PP" },
        { available: true, size: "P", sku: "5723_40130843_0_P" },
        { available: true, size: "M", sku: "5723_40130843_0_M" },
        { available: true, size: "G", sku: "5723_40130843_0_G" },
        { available: true, size: "GG", sku: "5723_40130843_0_GG" },
      ],
      quantity: 1,
    },
    {
      name: "VESTIDO TRANSPASSE BOW",
      style: "20002605",
      code_color: "20002605_613",
      color_slug: "tapecaria",
      color: "TAPEÇARIA",
      on_sale: false,
      regular_price: "R$ 199,90",
      actual_price: "R$ 199,90",
      discount_percentage: "",
      installments: "3x R$ 66,63",
      image:
        "https://viniciusvinna.netlify.app/assets/api-fashionista/20002605_615_catalog_1.jpg",
      sizes: [
        { available: false, size: "PP", sku: "5807_343_0_PP" },
        { available: true, size: "P", sku: "5807_343_0_P" },
        { available: true, size: "M", sku: "5807_343_0_M" },
        { available: true, size: "G", sku: "5807_343_0_G" },
        { available: false, size: "GG", sku: "5807_343_0_GG" },
      ],
      quantity: 2,
    },
  ],
};

const incrementQuantity = (state, action) => {
  const cartIndex = state.cartItems.findIndex(
    (item) => item.code_color === action.code_color
  );
  const updatedCart = {
    ...state.cartItems,
    [cartIndex]: {
      ...state.cartItems[cartIndex],
      quantity: state.cartItems[cartIndex].quantity + 1,
    },
  };
  const updatedData = Object.values(updatedCart);
  return updateObject(state, {
    cartItems: updatedData,
  });
};

const decrementQuantity = (state, action) => {
  const cartIndex = state.cartItems.findIndex(
    (item) => item.code_color === action.code_color
  );
  const updatedCart = {
    ...state.cartItems,
    [cartIndex]: {
      ...state.cartItems[cartIndex],
      quantity: state.cartItems[cartIndex].quantity - 1,
    },
  };
  const updatedData = Object.values(updatedCart);
  return updateObject(state, {
    cartItems: updatedData,
  });
};

const removeItem = (state, action) => {
  const data = { ...state.cartItems };
  const updatedData = Object.values(data).filter(
    (item) => item.code_color !== action.code_color
  );
  console.log(updatedData);
  return updateObject(state, {
    cartItems: updatedData,
  });
};

const addToCart = (state, action) => {
  const data = { ...state.cartItems };
  const updatedData = Object.values(data).push(action.product);
  return updateObject(state, {
    cartItems: updatedData,
  });
};

export default function saleCartReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_QUANTITY:
      return incrementQuantity(state, action);
    case DECREMENT_QUANTITY:
      return decrementQuantity(state, action);
    case REMOVE_ITEM:
      return removeItem(state, action);
    case ADD_TO_CART:
      return addToCart(state, action);
    default:
      return state;
  }
}
