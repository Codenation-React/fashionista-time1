import * as actionTypes from '../constants/actionTypes';

export const incrementProductQuantity = (style) => {
    return {
        type: actionTypes.INCREMENT_QUANTITY,
        style: style
    }
}

export const decrementProductQuantity = (style) => {
    return {
        type: actionTypes.DECREMENT_QUANTITY,
        style: style
    }
}

export const removeProduct = (style) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        style: style
    }
}