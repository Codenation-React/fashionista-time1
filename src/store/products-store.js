import { initStore } from './store';
import json from './mocked-data.json';

const configureStore = () => {
    const actions = {

    };
    initStore(actions, { products: json });
};

export default configureStore;