import { initStore } from './store';
import json from './mocked-data.json';

export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
export const REMOVE_ITEM = "REMOVE_ITEM";

const configureStore = () => {
    const actions = {
        INCREMENT_QUANTITY: ({ cartItems }, style) => {
            const data = cartItems.filter(item => item.style === style)[0];
            data.quantity = data.quantity + 1
        },
        DECREMENT_QUANTITY: ({ cartItems }, style) => {
            const data = cartItems.filter(item => item.style === style)[0];
            if (data.quantity === 1)
                cartItems.splice(cartItems.indexOf(data), 1);
            else
                data.quantity = data.quantity - 1;
        },
        REMOVE_ITEM: ({ cartItems }, style) => {
            const data = cartItems.filter(item => item.style === style)[0];
            cartItems.splice(cartItems.indexOf(data), 1);
        }
    };

    initStore(actions, { products: json, cartItems: [{"name":"REGATA ALCINHA FOLK","style":"20002570","code_color":"20002570_614","color_slug":"preto","color":"PRETO","on_sale":false,"regular_price":"R$ 99,90","actual_price":"R$ 99,90","discount_percentage":"","installments":"3x R$ 33,30","image":"https://viniciusvinna.netlify.app/assets/api-fashionista/20002570_002_catalog_1.jpg","sizes":[{"available":true,"size":"PP","sku":"5723_40130843_0_PP"},{"available":true,"size":"P","sku":"5723_40130843_0_P"},{"available":true,"size":"M","sku":"5723_40130843_0_M"},{"available":true,"size":"G","sku":"5723_40130843_0_G"},{"available":true,"size":"GG","sku":"5723_40130843_0_GG"}], quantity: 1},
    {"name":"VESTIDO TRANSPASSE BOW","style":"20002605","code_color":"20002605_613","color_slug":"tapecaria","color":"TAPEÇARIA","on_sale":false,"regular_price":"R$ 199,90","actual_price":"R$ 199,90","discount_percentage":"","installments":"3x R$ 66,63","image":"https://viniciusvinna.netlify.app/assets/api-fashionista/20002605_615_catalog_1.jpg","sizes":[{"available":false,"size":"PP","sku":"5807_343_0_PP"},{"available":true,"size":"P","sku":"5807_343_0_P"},{"available":true,"size":"M","sku":"5807_343_0_M"},{"available":true,"size":"G","sku":"5807_343_0_G"},{"available":false,"size":"GG","sku":"5807_343_0_GG"}], quantity: 1}] });
};

export default configureStore;