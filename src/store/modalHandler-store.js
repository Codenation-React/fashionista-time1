import { initStore } from './store';

const configureStore = () => {
    const actions = {
        TOGGLE_SHOW: (state) => ({ show: !state.show })
    };
    initStore(actions, { show: false });
};

export default configureStore;