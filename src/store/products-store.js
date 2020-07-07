import { initStore } from "./store";
import { updateObject } from "../shared/utility";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
export const REMOVE_ITEM = "REMOVE_ITEM";

const persistCart = (cartItems) => {
  localStorage.setItem("saleCart", JSON.stringify(cartItems));
};

const loadCart = () => {
  const cartItems = JSON.parse(localStorage.getItem("saleCart"));
  return (
    cartItems ?? [
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
        size: "P",
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
        size: "M",
        quantity: 2,
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
        size: "P",
        quantity: 2,
      },
    ]
  );
};

const configureStore = () => {
  const actions = {
    INCREMENT_QUANTITY: (state, { code_color, size }) => {
      const cartIndex = state.cartItems.findIndex(
        (item) => item.code_color === code_color && item.size === size
      );
      const updatedCart = {
        ...state.cartItems,
        [cartIndex]: {
          ...state.cartItems[cartIndex],
          quantity: state.cartItems[cartIndex].quantity + 1,
        },
      };
      const updatedData = Object.values(updatedCart);
      persistCart(updatedData);
      return updateObject(state, {
        cartItems: updatedData,
      });
    },
    DECREMENT_QUANTITY: (state, { code_color, size }) => {
      const cartIndex = state.cartItems.findIndex(
        (item) => item.code_color === code_color && item.size === size
      );
      const updatedCart = {
        ...state.cartItems,
        [cartIndex]: {
          ...state.cartItems[cartIndex],
          quantity: state.cartItems[cartIndex].quantity - 1,
        },
      };
      const updatedData = Object.values(updatedCart);
      persistCart(updatedData);
      return updateObject(state, {
        cartItems: updatedData,
      });
    },
    REMOVE_ITEM: (state, { code_color, size }) => {
      const data = { ...state.cartItems };
      const updatedData = Object.values(data).filter(
        (item) => item.code_color !== code_color || item.size !== size
      );
      persistCart(updatedData);
      return updateObject(state, {
        cartItems: updatedData,
      });
    },
    ADD_TO_CART: (state, product) => {
      const data = { ...state.cartItems };
      const updatedData = Object.values(data);
      updatedData.push(product);
      persistCart(updatedData);
      return updateObject(state, {
        cartItems: updatedData,
      });
    },
    INIT_PRODUCTS: (state, products) => {
      return { ...state, products: products };
    },
  };

  initStore(actions, { products: [], cartItems: loadCart() });
};

export default configureStore;
