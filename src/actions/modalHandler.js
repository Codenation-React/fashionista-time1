import * as actionTypes from '../constants/actionTypes';

export const toggleModal = (value) => {
    return {
        type: actionTypes.TOGGLE_SHOW,
        value: value
    }
}