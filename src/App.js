import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import saleCartReducer from './reducers/saleCart';

let store = createStore(combineReducers({saleCart: saleCartReducer}));
const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        Content here
      </div>
    </Provider>
  );
}

export default App;
