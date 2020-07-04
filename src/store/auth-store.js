import { initStore } from './store';

const configureStore = () => {
    const actions = {
        AUTH_SUCCESS: (state, value) => ({ isAuth: true, userID: value }),
    };
    initStore(actions, { isAuth: false, userID: '' });
};

export default configureStore;